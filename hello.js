console.log('background.js loaded');

// 监听按钮
document.getElementById("car_img_analyze").addEventListener("click",async () => {
    let queryOptions = { active: true, lastFocusedWindow: true };
    // `tab` will either be a `tabs.Tab` instance or `undefined`.
    let [tab] = await chrome.tabs.query(queryOptions);
    console.log(tab.id);
    // 调用content获取页面元素
    chrome.scripting.executeScript({
        target: { tabId: tab.id },
        files: ['content.js']
    });
});


// 监听来自 background.js 的消息
chrome.runtime.onMessage.addListener(function(message, sender, sendResponse) {
    if (message.type === 'analysisResult') {
        // 处理成功结果
        document.getElementById('result').value = JSON.stringify(message.data, null, 2);
        document.getElementById('status').textContent = '分析完成';
    } else if (message.type === 'analysisError') {
        // 处理错误信息
        document.getElementById('result').value = '分析失败: ' + message.error;
        document.getElementById('status').textContent = '系统异常';
    }
});