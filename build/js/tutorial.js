/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./src/tutorial.js":
/*!*************************!*\
  !*** ./src/tutorial.js ***!
  \*************************/
/***/ (() => {

eval("let i = 0\r\nlet sections = {\r\n    0:{text:\"You are currently on the dashboard. Here you can find the leaderboard, profile edit and level selection\", position:{top:50, left:50}},\r\n    1:{text:\"This is the leaderboard section. It shows the top Dart CTF players in order\", position:{top:20, left:35}},\r\n    2:{text:\"This is the profile area. Click the settings (cog) button to edit your profile picture. The help button is used to start the tutorial\", position:{top:15, left:70}},\r\n    3:{text:\"This is the level selection area. Click play to start whichever level you want. We will open the cryptography section in this case\", position:{top:25, left:60}},\r\n    4:{text:\"This is the challenge screen. You wil be prompted with a level selection menu, however it is fairly self explanatory (click the play on the challenge you want)\", position:{top:25, left:60}},\r\n    5:{text:\"This case information panel. You may find some helpful information regarding the level here.\", position:{top:25, left:20}},\r\n    6:{text:\"This is where the real challenge would be. Right now, this area is blank.\", position:{top:75, left:50}},\r\n    7:{text:\"Here you have the flag input. Once you complete the challenge, enter the flag you find (keep in mind the two footnotes)\", position:{top:85, left:20}},\r\n    8:{text:\"In a real challenge, you will recieve feedback in the center of the screen\", position:{top:50, left:50}},\r\n    9:{text:\"That's all for the tutorial. Click next to restart or exit to go back to the dashboard\", position:{top:50, left:50}},\r\n}\r\n\r\nlet challengeHTML = `\r\n<div class=\"container-fluid d-flex flex-row fill-height\">\r\n<div class=\"col-3 d-flex align-items-center flex-column\" style=\"padding: 10px; gap: 5px;\">\r\n    <div class=\"card h-20 w-100 b1\" id=\"board-card\">\r\n        <div class=\"card-body d-flex align-items-center justify-content-center flex-column\"\r\n            style=\"text-align: center;\">\r\n            <h5 class=\"card-title d-flex\" style=\"gap:5px\">Challenge Info<i class=\"bi bi-info-square-fill\"></i>\r\n            </h5>\r\n            <p class=\"card-text d-flex justify-content-center align-items-center flex-column\">\r\n                <span class=\"challname\">Tutorial (fake challenge)</span>\r\n            <div class=\"container-fluid\">\r\n                <a class=\"btn btn-success\" href=\"/dashboard\" aria-hidden=\"true\"><i\r\n                        class=\"bi bi-arrow-90deg-left\"></i>Back to home</a>\r\n            </div>\r\n            </p>\r\n        </div>\r\n    </div>\r\n    <div class=\"card h-60 w-100 b1\" id=\"board-card\">\r\n        <div class=\"card-body d-flex align-items-center justify-content-center flex-column\"\r\n            style=\"text-align:center;\">\r\n            <h5 class=\"card-title d-flex\" style=\"gap:5px\">Case Description<i class=\"bi bi-file-text-fill\"></i>\r\n            </h5>\r\n            <p class=\"card-text d-flex justify-content-center align-items-center\" id=\"challdesc\">Learn how to use Dart CTF!</p>\r\n        </div>\r\n    </div>\r\n    <div class=\"card h-60 w-100 b1\" id=\"board-card\">\r\n        <div class=\"card-body d-flex align-items-center flex-column\">\r\n            <h5 class=\"card-title d-flex\" style=\"gap:5px\">Resources<i class=\"bi bi-bar-chart-fill\"></i></h5>\r\n            <p class=\"card-text d-flex\">\r\n            <ul class=\"challres\"><li>Pay attention</li></ul>\r\n            </p>\r\n        </div>\r\n    </div>\r\n    <div class=\"card h-60 w-100 b1\" id=\"board-card\">\r\n        <div class=\"card-body d-flex align-items-center flex-column\">\r\n            <h5 class=\"card-title d-flex\" style=\"gap:5px\">Flag<i class=\"bi bi-flag-fill\"></i></h5>\r\n            <p class=\"card-text d-flex justify-content-center align-items-center\">\r\n            <div class=\"input-group mb-3\">\r\n                <input id=\"flaginput\" type=\"text\" class=\"form-control\" placeholder=\"Enter the flag\"\r\n                    aria-label=\"Flag enter\" aria-describedby=\"button-addon2\">\r\n                <button class=\"btn btn-success\" type=\"button\" id=\"enterflag\">Enter</button>\r\n            </div>\r\n            <p class=\"mb-1\" style=\"font-size: small;\">All flags are formatted dctf{sometext}</p><br>\r\n            <p class=\"mb-1\" style=\"font-size: x-small;\">If you have any issues, try common troubleshooting tips or contact us</p>\r\n            </p>\r\n        </div>\r\n    </div>\r\n</div>\r\n<div id=\"challengeSection\" class=\"col-9\" style=\"padding: 5px;\">\r\n    <div class=\"chall-divider\"></div>\r\n\r\n    <div id=\"result\" class=\"container d-flex justify-content-center align-items-center flex-column\" style=\"height: 100%;\">\r\n        <div id=\"flagResult\" style=\"width: 100%;\">\r\n\r\n        </div>\r\n    </div>\r\n</div>\r\n</div>\r\n`\r\n\r\n\r\n$('#nextSection').on(\"click\", ()=>{\r\n\r\n    if(i>=Object.keys(sections).length){\r\n        i = 0;\r\n        location.reload();\r\n    }\r\n\r\n    $(\"#tutorialText\").text(sections[i].text)\r\n    $(\"#tutorialCard\").css(\"top\", `${sections[i].position.top}%`);\r\n    $(\"#tutorialCard\").css(\"left\", `${sections[i].position.left}%`);\r\n\r\n    if(i==4){\r\n        $(\"#tutorialContent\").html(challengeHTML)\r\n        $(\"#tutorialContent\").removeClass(\"container mt-2\")\r\n        $(\"#tutorialContent\").addClass(\"container-fluid d-flex flex-row fill-height\")\r\n        $(\"#body\").css(\"height\", \"100vh\")\r\n    }\r\n    i+=1\r\n\r\n})\n\n//# sourceURL=webpack://app/./src/tutorial.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = {};
/******/ 	__webpack_modules__["./src/tutorial.js"]();
/******/ 	
/******/ })()
;