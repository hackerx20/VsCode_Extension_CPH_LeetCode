const { getHomePageStyle, getDescriptionPageStyle, getInstructionPageStyle} = require('./getStyle');
function getHomePageContent(){
    return `<html lang="en" data-bs-theme="bootstrap-dark">
<head>
    <style>${getHomePageStyle()}</style>
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-dark-5@1.1.0/dist/css/bootstrap-dark.min.css" />
</head>

<body>
    <div class="container">
        <h2><b>CPH LeetCode!</b></h2>
        <hr class="border border-primary border-3 opacity-75">
        <div class="form-group">
            <label for="url">LeetCode Problem URL:</label>
            <input type="url" id="url" class="form-control" placeholder="Enter problem URL" name="url" />
        </div>
        <div class="form-group">
            <label for="selectLanguage">Select Language:</label>
            <select class="form-control" id="selectLanguage" name="langSlug">
                <option value="">Choose a language</option>
                <option value="cpp">C++</option>
                <option value="python">Python</option>
                <option value="javascript">JavaScript</option>
                <option value="java">Java</option>
            </select>
        </div>
        <button class="btn btn-primary" onclick="SubmitQuestion()">Submit Problem</button>
    </div>
    <script>
        function SubmitQuestion() {
            const url = document.getElementById('url').value;
            const language = document.getElementById('selectLanguage').value;
            
            // Comprehensive validation
            if (!url) {
                alert('Please enter a LeetCode problem URL');
                return;
            }
            
            if (!language) {
                alert('Please select a programming language');
                return;
            }

            // Log to console for debugging
            console.log('Submitting:', { url, language });

            // Send message to extension
            try {
                const vscode = acquireVsCodeApi();
                vscode.postMessage({
                    command: 'SubmitQuestion',
                    url: url,
                    language: language
                });
            } catch (error) {
                console.error('Error sending message:', error);
                alert('Failed to submit. Check console for details.');
            }
        }
    </script>
</body>
</html>
`
}
function getInstructionPageContent(){
    return `<html lang="en" data-bs-theme="bootstrap-dark">
<head>
    <style>${getInstructionPageStyle()}</style>
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-dark-5@1.1.0/dist/css/bootstrap-dark.min.css" />
</head>

<body>
    <div class="container">
        <h1>🔐 LeetCode Extension Token Retrieval Guide</h1>
        
        <div class="step">
            <span class="step-number">Step 1:</span>
            Log in to LeetCode Official Website
            <p>Navigate to <code>https://leetcode.com</code> and log in to your account.</p>
        </div>
        
        <div class="step">
            <span class="step-number">Step 2:</span>
            Open Browser Developer Tools
            <p>Press <code>F12</code> or Right-click and select "Inspect" or use keyboard shortcut:</p>
            <ul>
                <li>Windows/Linux: <code>Ctrl + Shift + I</code></li>
                <li>Mac: <code>Cmd + Option + I</code></li>
            </ul>
        </div>
        
        <div class="step">
            <span class="step-number">Step 3:</span>
            Navigate to Cookies
            <p>In Developer Tools, go to the "Application" tab (Chrome) or "Storage" tab (Firefox).</p>
            <p>Find and expand the "Cookies" section for <code>https://leetcode.com</code>.</p>
        </div>
        
        <div class="step">
            <span class="step-number">Step 4:</span>
            Find csrfToken
            <p>Locate the cookie named <code>csrftoken</code>. Copy its entire value.</p>
        </div>
        
        <div class="step">
            <span class="step-number">Step 5:</span>
            Find LEETCODE_SESSION Token
            <p>Find the cookie named <code>LEETCODE_SESSION</code>. Copy its entire value.</p>
        </div>
        
        <div class="warning">
            ⚠️ Important Security Notes:
            <ul>
                <li>Never share these tokens with anyone</li>
                <li>These tokens are personal authentication credentials</li>
                <li>Treat them like passwords</li>
            </ul>
        </div>
        
        <div class="login-form">
            <h2><b>Login to LeetCode</b></h2>
            <hr class="border border-primary border-3 opacity-75">
            <div class="form-group">
                <label for="text">Enter Csrf Token:</label>
                <input type="text" id="text-1" class="form-control" placeholder="Enter Csrf Token" name="csrfToken" />
            </div>
            <div class="form-group">
                <label for="selectLanguage">Enter ls Token:</label>
                <input type="text" id="text-2" class="form-control" placeholder="Enter ls Token" name="lsToken" />
            </div>
            <button class="btn btn-primary" onclick="StartExtension()">Login!</button>
        </div>
        
        <div class="step">
            <span class="step-number">Step 6:</span>
            Paste Tokens in Extension
            <p>Copy the tokens from the browser and paste them into the corresponding fields in the extension's login form.</p>
        </div>
    </div>
    <script>
        function StartExtension() {
            const csrfToken = document.getElementById('text-1').value;
            const lsToken = document.getElementById('text-2').value;
            
            // Comprehensive validation
            if (!csrfToken) {
                alert('Please enter Token Value!');
                return;
            }
            
            if (!lsToken) {
                alert('Please enter Token Value!');
                return;
            }

            // Log to console for debugging
            console.log('Submitting:', { csrfToken, lsToken});

            // Send message to extension
            try {
                const vscode = acquireVsCodeApi();
                vscode.postMessage({
                    command: 'startExtension',
                    csrfToken: csrfToken,
                    lsToken: lsToken
                });
            } catch (error) {
                console.error('Error sending message:', error);
                alert('Failed to submit. Check console for details.');
            }   
        }
    </script>
</body>
</html>
`
}

function getDescriptionPageContent(context, filename, testCase) {
    return `<!DOCTYPE html>
    <html lang="en" data-bs-theme="bootstrap-dark-5">
    <head>
        <style>${getDescriptionPageStyle()}</style>
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-dark-5@1.1.0/dist/css/bootstrap-dark.min.css" />
    </head>
    <body class="container my-4">
        <h1 class="text-center mb-4">
            ${filename}
        </h1>
        <div class="card">
            <div class="card-body">
                <button class="btn btn-success mb-3" onclick="runAllTests()">Run All</button>
                <div class="accordion" id="testCaseAccordion">
                    ${testCase.map((tc, i) => `
                    <div class="accordion-item">
                        <h2 class="accordion-header" id="heading${i}">
                            <button class="accordion-button collapsed" id="accbtn-${i}" type="button" data-bs-toggle="collapse" data-bs-target="#collapse${i}" aria-expanded="false" aria-controls="collapse${i}">
                                Test Case ${i + 1}
                            </button>
                        </h2>
                        <div id="collapse${i}" class="accordion-collapse collapse" aria-labelledby="heading${i}">
                            <div class="accordion-body">
                                <textarea class="form-control mb-3 test-case result-box" rows="3" name="testcase-${i + 1}">${tc}</textarea>
                                <div class="result-container d-none">
                                    <div class="result-box actual-answer">
                                        <div class="result-title">Actual Answer</div>
                                        <div class="result-content-actual" id="actualAnswer-${i + 1}">
                                            Your solution's output will be displayed here
                                        </div>
                                        <div class="status-indicator">
                                            <div class="status-icon"></div>
                                            <span class="status-text"></span>
                                        </div>
                                    </div>
                                    <div class="result-box expected-answer">
                                        <div class="result-title">Expected Answer</div>
                                        <div class="result-content-expected" id="expectedAnswer-${i + 1}">
                                            Expected output will be shown here
                                        </div>
                                        <div class="status-indicator">
                                            <div class="status-icon"></div>
                                            <span class="status-text"></span>
                                        </div>
                                    </div>
                                </div>
                                <div class="d-flex justify-content-end">
                                    <button class="btn btn-success me-2" onclick="runTestCase(this)">Run</button>
                                    <button class="btn btn-success me-2" onclick="saveTestCase(this)">Save Changes!</button>
                                    <button id="${i}" class="btn btn-danger" onclick="deleteTestCase(this)">Delete</button>
                                </div>
                            </div>
                        </div>
                    </div>
                    `).join('')}
                </div>
                <div class="mt-4 d-flex justify-content-between">
                    <button id="addTestCaseButton" class="btn btn-success" onclick="addTestCase()">+ Add Test-Cases</button>
                    <button class="btn btn-info" onclick="loadNewProblem()">New Problem!</button>
                </div>
            </div>
        </div>
    
        <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js"></script>
        <script>
            const vscode = acquireVsCodeApi();
            function loadNewProblem(button){
                vscode.postMessage({ command: 'loadNewProblem' });
            }
            function addTestCase(button){
                vscode.postMessage({ command: 'addTestCase' });
            }
            function deleteTestCase(button){
                const testCaseIndex = button.id;
                vscode.postMessage({ command: 'deleteTestCase',
                    index : testCaseIndex
                });
            }
            function runTestCase(button){
                const accordionBody = button.closest('.accordion-body');
                const textarea = accordionBody.querySelector('.test-case');
                const testCaseValue = textarea.value.trim();
                if (!testCaseValue) {
                    console.log('Test case cannot be empty.');
                    return;
                }
                vscode.postMessage({ 
                    command: 'runTestCase',
                    testCaseValue : testCaseValue
                });
                window.addEventListener('message', (event) => {
                    if (event.data.type === 'TestCaseResult') {
                        const CodeAnswers = event.data.code_answer;
                        const ExpectedCodeAnswers = event.data.expected_code_answer;
                        var element = accordionBody.querySelector('.result-container');
                        element.classList.remove('d-none');
                        accordionBody.querySelector('.result-content-actual').innerHTML = CodeAnswers;
                        accordionBody.querySelector('.result-content-expected').innerHTML = ExpectedCodeAnswers;
                        const resultBoxes = element.querySelectorAll('div.result-box');
                        if (String(CodeAnswers).trim() === String(ExpectedCodeAnswers).trim()) {
                            resultBoxes[0].classList.add('pass-border');
                            resultBoxes[1].classList.add('pass-border');
                            accordionBody.querySelectorAll('.status-icon')[0].classList.add('pass');
                            accordionBody.querySelectorAll('.status-icon')[1].classList.add('pass');
                            accordionBody.querySelectorAll('.status-text')[0].innerHTML= "Passed";
                            accordionBody.querySelectorAll('.status-text')[1].innerHTML= "Passed";
                        } else {
                            resultBoxes[0].classList.add('fail-border');
                            resultBoxes[1].classList.add('fail-border');
                            accordionBody.querySelectorAll('.status-icon')[0].classList.add('fail');
                            accordionBody.querySelectorAll('.status-icon')[1].classList.add('fail');
                            accordionBody.querySelectorAll('.status-text')[0].innerHTML= "Failed";
                            accordionBody.querySelectorAll('.status-text')[1].innerHTML= "Failed";
                        }
                    }
                });
            }
            function saveTestCase(button){
                const accordionBody = button.closest('.accordion-body');
                const textarea = accordionBody.querySelector('textarea');
                const testCaseValue = textarea.value.trim();
                if (!testCaseValue) {
                    console.log('Test case cannot be empty.');
                    return;
                }
                const deleteButton = accordionBody.querySelector('.btn-danger');
                const testCaseIndex = deleteButton.id;
                vscode.postMessage({ command: 'saveTestCase',
                    index : testCaseIndex,
                    testCaseValue : testCaseValue
                });
            }
            function runAllTests(button){
                vscode.postMessage({ command: 'runAllTests' });
            }
            window.addEventListener('message', (event) => {
                if (event.data.type === 'TestCaseResults') {
                    const CodeAnswers = event.data.code_answer;
                    const ExpectedCodeAnswers = event.data.expected_code_answer;
                    
                    // Ensure CodeAnswers and ExpectedCodeAnswers are arrays
                    const resultContainers = document.querySelectorAll('.result-container');
                    
                    CodeAnswers.forEach((answer, i) => {
                        // Ensure the result container exists
                        if (resultContainers[i]) {
                            resultContainers[i].classList.remove('d-none');
                            
                            const actualAnswerElement = document.getElementById("actualAnswer-"+(i + 1));
                            const expectedAnswerElement = document.getElementById("expectedAnswer-"+(i + 1));
                            
                            actualAnswerElement.innerHTML = CodeAnswers[i];
                            expectedAnswerElement.innerHTML = ExpectedCodeAnswers[i];
                            
                            // Check for equality
                            const isPass = String(CodeAnswers[i]).trim() === String(ExpectedCodeAnswers[i]).trim();
                            
                            // Update result styling
                            const resultBoxes = resultContainers[i].querySelectorAll('.result-box');
                            const statusIcons = resultContainers[i].querySelectorAll('.status-icon');
                            const statusTexts = resultContainers[i].querySelectorAll('.status-text');
                            
                            if (isPass) {
                                resultBoxes[0].classList.add('pass-border');
                                resultBoxes[1].classList.add('pass-border');
                                statusIcons[0].classList.add('pass');
                                statusIcons[1].classList.add('pass');
                                statusTexts[0].innerHTML = "Passed";
                                statusTexts[1].innerHTML = "Passed";
                            } else {
                                resultBoxes[0].classList.add('fail-border');
                                resultBoxes[1].classList.add('fail-border');
                                statusIcons[0].classList.add('fail');
                                statusIcons[1].classList.add('fail');
                                statusTexts[0].innerHTML = "Failed";
                                statusTexts[1].innerHTML = "Failed";
                            }
                        }
                    });
                }
            });
        </script>
    </body>
    </html>`;
}




module.exports = {getInstructionPageContent,getHomePageContent, getDescriptionPageContent};
