console.log('content.js loaded');
// 识别页面内容，调用background.js
var ele111 = document.getElementById("su");
console.log(ele111);
(async () => {
    const response = await chrome.runtime.sendMessage({greeting: ele111});
    // do something with response here, not outside the function
    console.log(response);
  })();