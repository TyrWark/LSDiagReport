
// ==UserScript==
// @name         Diagnostic Links for BackOffice
// @namespace    http://tampermonkey.net/
// @version      1.0
// @description  Adds links for easy access to Diag reports
// @author       Ty Wark
// @match        https://lightspeedanalytics.net/cl_accounts/settings
// @match        https://app.lightspeedanalytics.net/embed/explore/*
// @match        https://app.lightspeedanalytics.net/embed/*
// @require      https://raw.githubusercontent.com/TyrWark/LSDiagReport/main/Include.js
// @run-at      document-idle
// @grant       GM_addStyle
// ==/UserScript==

//Documentation found here https://lightspeedhq.atlassian.net/wiki/spaces/CLOUD/pages/139441487/Looker+Diagnostic+Analytics+Reports
/* globals jQuery, $, waitForKeyElements */

console.log("DL Links Fired")
