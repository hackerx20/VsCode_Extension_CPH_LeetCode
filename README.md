# VsCode-CPH-LeetCode
### Overview
The CPH (Competitive Programming Helper) VS Code extension is a tool designed to enhance the experience of competitive programmers by streamlining their workflow within the Visual Studio Code environment. It integrates features to simplify coding, testing, and debugging during competitive programming contests. From the beginning the problem with CPH is that, it is unable to parse LeetCode problems to VsCode. This Extension is specifically designed to parse Leetcode Problems keep in mind the features of leetcode, like giving Expected-Outputs even for self-made Test Cases, etc.
### File information
This VsCode Extension is made using Javascript and with the use of (Leetcode Graphql API)[https://leetcode.com/graphql]

This Repository Contains:
* Extension.js file (Main file for the extension, includes all the functionality related to the extension)
* WebViewContent.js file (This File Mainly involve all the webview content of the Extension)
* getStyles.js file (This File contains the style related to WebViewContent.js pages)
  

### Features
When you install the extension for the first time then you have to follow the procedure given on the instruction page and login.
Then When the Login is Complete. The Tokens will be saved to VsCode Secret Storage for use Afterwards.
Then you can start using the extension. You can fetch Test Cases using the problem's url and the Language you want to write code in.
![HomePageImage](https://github.com/hackerx20/VsCode_Extension_CPH_LeetCode/blob/9518d4d8a8e837490348267f73461020ee249e2b/assets/Screenshot%202025-01-25%20000717.png)
![](https://github.com/hackerx20/VsCode_Extension_CPH_LeetCode/blob/9518d4d8a8e837490348267f73461020ee249e2b/assets/%5BExtension%20Development%20Host%5D%20Description%20Page%20-%20c%2B%2B%20-%20Visual%20Studio%20Code%202025-01-25%2000-08-29%20(online-video-cutter.com).gif)
![](https://github.com/hackerx20/VsCode_Extension_CPH_LeetCode/blob/9518d4d8a8e837490348267f73461020ee249e2b/assets/%5BExtension%20Development%20Host%5D%20Instruction%20Page%20-%20c%2B%2B%20-%20Visual%20Studio%20Code%202025-01-25%2000-00-17%20(online-video-cutter.com).gif)


Basic Features includes:
* Run All Test Cases
* Run Single Test Case
* Delete Test Case
* Add Test Case
* Save Test Case
* Important of all 'Expected Output for self Made Test Cases'

### Command:
LeetCode: Start Extension

### Languages:
This Extension works for 4 languages : cpp , python, java, javascript

## Requirements
Make sure to install node.js, axios using the command below.
```bash
npm i axios
```

## Use Shortcuts

* `ctrl+shift+p `: to open menu of commands

### Contributing
Contributions are welcome! Follow these steps to contribute:
* Fork the repository.
* Create a new branch for your feature or bug fix.
* Submit a pull request with a detailed description of your changes.




