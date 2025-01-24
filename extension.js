const vscode = require('vscode');
const fs = require('fs').promises;
const path = require('path');
const axios = require('axios');
const { getHomePageContent, getDescriptionPageContent, getInstructionPageContent } = require('./src/webViewContent');
let url;
let language;
let questionId = 0;
let titleSlug = '';
var testCase = [];
let filename = '';
let filePath = '';
let expected_code_answer = [];
let code_answer = [];
let csrfToken = '';
let lsToken = '';
let currentPanel = undefined;

function activate(context) {
	const secretStorage = context.secrets;
    context.subscriptions.push({
        dispose() {
            if (currentPanel) {
                currentPanel.dispose();
                currentPanel = undefined;
            }
        }
    });
    context.subscriptions.push(
        vscode.commands.registerCommand('extension.startExtensionVSCodeLeetCode', async () => {
            try {
                csrfToken = await secretStorage.get('csrfToken');
                lsToken = await secretStorage.get('lsToken');
				
				if (csrfToken && lsToken) {
                    await showPage('home');
                } else {
                    await showPage('instruction');
                }
            } catch (error) {
                throw new Error(`Failed to start extension: ${error.message}`);
            }
        })
    );
    context.subscriptions.push(
        vscode.commands.registerCommand('extension.showHomePage', async () => {
            await showPage('home');
        })
    );
    context.subscriptions.push(
        vscode.commands.registerCommand('extension.showDescriptionPage', async () => {
            await showPage('description');
        })
    );
    context.subscriptions.push(
        vscode.commands.registerCommand('extension.showInstructionPage', async () => {
            await showPage('instruction');
        })
    );
    async function showPage(page) {
        try {
            if (currentPanel) {
                if (page === 'home') {
                    currentPanel.title = 'Home Page';
                    currentPanel.webview.html = getHomePageContent(currentPanel.webview);
                } else if(page === 'description') {
                    currentPanel.title = 'Description Page';
                    currentPanel.webview.html = getDescriptionPageContent(currentPanel.webview, filename, testCase);
                } else {
					currentPanel.title = 'Instruction Page';
					currentPanel.webview.html = getInstructionPageContent(currentPanel.webview);
				}
            } else {
                currentPanel = vscode.window.createWebviewPanel(
                    'leetcodePage',
                    page === 'home' ? 'Home Page' : 
                    (page === 'instruction' ? 'Instruction Page' : 'Description Page'),
                    vscode.ViewColumn.One,
                    {
                        enableScripts: true,
                        retainContextWhenHidden: true
                    }
                );
                // Set initial content
                if (page === 'home') {
                    currentPanel.webview.html = getHomePageContent(currentPanel.webview);
                } else if (page === 'instruction') {
                    currentPanel.webview.html = getInstructionPageContent(currentPanel.webview);
                } else {
                    currentPanel.webview.html = getDescriptionPageContent(currentPanel.webview, filename, testCase);
                }
                // Handle panel disposal
                currentPanel.onDidDispose(
                    () => {
                        currentPanel = undefined;
                    },
                    null,
                    context.subscriptions
                );
                // Handle messages
                currentPanel.webview.onDidReceiveMessage(
                    async message => {
                        try {
                            console.log('Received message:', message);
                            switch (message.command) {
								case 'startExtension':
									if (!message.csrfToken || !message.lsToken) {
                                        vscode.window.showErrorMessage('Invalid input: Both Tokens are required');
                                        return;
                                    }
                                    csrfToken = message.csrfToken;
                                    lsToken = message.lsToken;
                                    console.log(`csrfToken: ${csrfToken}, lsToken: ${lsToken}`);
                                    await secretStorage.store('csrfToken', csrfToken);
                                    await secretStorage.store('lsToken', lsToken);
                                    console.log("Token Stored!");
                                    try {
                                        console.log(" showing Home Page");
                                        await showPage('home');
                                    }
                                    catch (error) {
                                        vscode.window.showErrorMessage(`Failed to start extension: ${error.message}`);
                                        console.error(error);
                                    }
									break;
                                case 'SubmitQuestion':
                                    if (!message.url || !message.language) {
                                        vscode.window.showErrorMessage('Invalid input: URL and language are required');
                                        return;
                                    }
                                    url = message.url;
                                    language = message.language;
                                    try {
                                        await fetchTestCase(url, language);
                                        await showPage('description');
                                    } catch (error) {
                                        vscode.window.showErrorMessage(`Failed to fetch test case: ${error.message}`);
                                        console.error('Fetch Test Case Error:', error);
                                    }
                                    break;
                                case 'loadNewProblem':
                                    await showPage('home');
                                    break;
                                case 'addTestCase':
                                    testCase.push('');
                                    await showPage('description');
                                    break;
                                case 'deleteTestCase':
                                    testCase.splice(message.index, 1);
                                    await showPage('description');
                                    break;
                                case 'runTestCase':
                                    await runTestCasefunction(questionId, titleSlug, language, filename, message.testCaseValue, csrfToken, lsToken);
                                    currentPanel.webview.postMessage({
                                        type: "TestCaseResult",
                                        code_answer : code_answer,
                                        expected_code_answer: expected_code_answer
                                    });
                                    break;
                                case 'saveTestCase':
                                    if(message.testCaseValue === ''){
                                        vscode.window.showErrorMessage('Test case cannot be empty.');
                                        return;
                                    }
                                    testCase[message.index] = message.testCaseValue;
                                    await showPage('description');
                                    break;
                                case 'runAllTests':
                                    const resultString = testCase.join('\n');
                                    console.log(`Test Cases: ${testCase.length}, ${testCase}`);
                                    await runTestCasefunction(questionId, titleSlug, language, filename, resultString, csrfToken, lsToken);
                                    currentPanel.webview.postMessage({
                                        type: "TestCaseResults",
                                        code_answer : code_answer,
                                        expected_code_answer: expected_code_answer
                                    });
                                    break;
                            }
                        } catch (error) {
                            console.error('Message handling error:', error);
                            vscode.window.showErrorMessage(`Failed to process message: ${error.message}`);
                        }
                    },
                    undefined,
                    context.subscriptions
                );
            }
        } catch (error) {
            console.error(`Error showing ${page} page:`, error);
            vscode.window.showErrorMessage(`Failed to show ${page} page: ${error.message}`);
        }
    }
}





async function fetchTestCase(url1, langSlug) {
    const query = `
    query getQuestionDetails($titleSlug: String!) {
        question(titleSlug: $titleSlug) {
            questionId
            exampleTestcaseList
            codeSnippets {
                lang
                langSlug
                code
            }
        }
    }`;

    const languageExtensions = {
        cpp: 'cpp',
        javascript: 'js',
        python: 'py',
        java: 'java',
    };

    const match = url1.match(/\/problems\/([^/]+)\//);
    if (!match) {
        throw new Error("Invalid URL format");
    }

    titleSlug = match[1];
    const variables = { titleSlug };

    try {
        const response = await axios.post('https://leetcode.com/graphql', {
            query,
            variables,
        }, {
            headers: {
                'Content-Type': 'application/json',
            }
        });

        const { data } = response.data;
        testCase = data.question.exampleTestcaseList;
        questionId = data.question.questionId;

        if (!languageExtensions[langSlug]) {
            throw new Error("Invalid Language!");
        }

        const snippet = data.question.codeSnippets.find(s => s.langSlug === langSlug);
        if (!snippet) {
            throw new Error(`No template found for language ${langSlug}`);
        }

        const extension = languageExtensions[langSlug];
        filename = `${titleSlug}.${extension}`;

        const workspaceFolder = vscode.workspace.workspaceFolders?.[0]?.uri.fsPath;
        if (!workspaceFolder) {
            throw new Error("No workspace folder found. Please open a folder first.");
        }
        filePath = path.join(workspaceFolder, filename);
		
        const exists = await fs.access(filePath).then(() => true).catch(() => false);
        if(exists===false){
            await fs.writeFile(filePath, snippet.code, 'utf8');
        }
        console.log(`Template saved as ${filePath}`);
        try {
            const document = await vscode.workspace.openTextDocument(filePath);
            await vscode.window.showTextDocument(document, {
                viewColumn: vscode.ViewColumn.One,
                preview: false
            });
            vscode.window.showInformationMessage(`Created and opened ${filename}`);
        } catch (error) {
            throw new Error(`Error opening file in VSCode: ${error.message}`);
        }

        return { questionId, titleSlug };
    } catch (error) {
        throw new Error(`Error fetching test case: ${error.message}`);
    }
}


async function runTestCasefunction(questionId, titleSlug, langSlug, filename, testcaseString, csrf_token, ls_token) {
    const baseURL = "https://leetcode.com/";
    try {
        const workspaceFolder = vscode.workspace.workspaceFolders?.[0]?.uri.fsPath;
        if (!workspaceFolder) {
            throw new Error("No workspace folder found. Please open a folder first.");
        }
        const actualFilePath = filePath || path.join(workspaceFolder, filename);
        
        // const code_string = (await fs.readFile(actualFilePath, "utf8"))
        //     .split("\n")
        //     .map(line => line.trim())
        //     .join("\n");
        const code_string = (await fs.readFile(actualFilePath, "utf8"))
            .split("\n")
            .map(line => {
                // Preserve leading whitespace (indentation)
                const leadingWhitespace = line.match(/^\s*/)[0];
                // Remove trailing whitespace
                const trimmedLine = line.trimEnd();
                return leadingWhitespace + trimmedLine;
            })
            .join("\n")
            // Remove multiple consecutive blank lines, but keep at least one
            .replace(/\n{3,}/g, '\n\n');
        const url = `${baseURL}problems/${titleSlug}/interpret_solution/`;
        const payload = {
            lang: langSlug,
            question_id: questionId,
            typed_code: code_string,
            data_input: testcaseString
        };
        console.log(payload);
        const headers = {
            "Content-Type": "application/json",
            "Referer": `https://leetcode.com/problems/${titleSlug}/`,
            "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36",
            "X-CSRFToken": csrf_token,
            Cookie: `csrftoken=${csrf_token}; LEETCODE_SESSION=${ls_token};`
        };
        
        const response = await axios.post(url, payload, { headers });
        
        const sub_id = response.data.interpret_id;
        
        console.log(`Interpretation ID: ${sub_id}`);
        await new Promise(resolve => setTimeout(resolve, 8000));
        
        const url1 = `https://leetcode.com/submissions/detail/${sub_id}/check/`;
        const response1 = await axios.get(url1, { headers });
        if(response1.status === 200) {
			const data1 = response1.data;
			vscode.window.showInformationMessage(`Your Answer: ${data1.code_answer}`);
			vscode.window.showInformationMessage(`Expected Answer:${data1.expected_code_answer}`);
			code_answer = data1.code_answer;
			expected_code_answer = data1.expected_code_answer;
			return data1;
		}
    } catch (error) {
        throw new Error(`Failed to run test case: ${error.message}`);
    }
}


function deactivate() {}


module.exports = {
    activate,
    deactivate
};

//nW8iXGgHylFxZMsqoxY7ISgSdXIws2wDmd1Fj0b0YfSAWDGomTvnKLvqYkh8PDYN
//eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJfYXV0aF91c2VyX2lkIjoiMTQwODY2MTQiLCJfYXV0aF91c2VyX2JhY2tlbmQiOiJkamFuZ28uY29udHJpYi5hdXRoLmJhY2tlbmRzLk1vZGVsQmFja2VuZCIsIl9hdXRoX3VzZXJfaGFzaCI6IjFhZmQzYmUwZTA2NGJhZDk1ZDkwZTRjYzU4NTQ0NmU5YzNlNDYxY2M1MTVhZGQ0NjRmNjcxNTgwMjFmMjMwMjAiLCJzZXNzaW9uX3V1aWQiOiIzYzFjM2MxNiIsImlkIjoxNDA4NjYxNCwiZW1haWwiOiJ0aXdhcmlzaGl2MjAwNUBnbWFpbC5jb20iLCJ1c2VybmFtZSI6InNoaXZhbnNoXzIwMDUiLCJ1c2VyX3NsdWciOiJzaGl2YW5zaF8yMDA1IiwiYXZhdGFyIjoiaHR0cHM6Ly9hc3NldHMubGVldGNvZGUuY29tL3VzZXJzL2RlZmF1bHRfYXZhdGFyLmpwZyIsInJlZnJlc2hlZF9hdCI6MTczNzcxNDU5MCwiaXAiOiIyNDA1OjIwMTo2MDA1OmQ4OGI6NDI0YTpmMTUxOmY4M2Y6MTY3ZiIsImlkZW50aXR5IjoiNzFlNDcxODRmMDEwNjVlZWMxNGI1NzZkYTY2ODI3YmYiLCJkZXZpY2Vfd2l0aF9pcCI6WyJjZWI0YzYzMjk4ZDRlYmI1OGM5YjJlY2Y2ZWIwNzczNiIsIjI0MDU6MjAxOjYwMDU6ZDg4Yjo0MjRhOmYxNTE6ZjgzZjoxNjdmIl0sIl9zZXNzaW9uX2V4cGlyeSI6MTIwOTYwMH0.ptATtLwRCrjr94cC6OYiayP-qDLQYvh10h3YB2T62l4