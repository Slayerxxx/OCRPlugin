console.log('background.js loaded');

async function sendPostRequest(url, data) {
    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const result = await response.json();
        console.log(result);
        // 发送结果给 hello.js
        chrome.runtime.sendMessage({
            type: 'analysisResult',
            data: result
        });

    } catch (error) {
        console.error('Error:', error);
        // 发送错误信息给 hello.js
        chrome.runtime.sendMessage({
            type: 'analysisError',
            error: error.message
        });
    }
}

chrome.runtime.onMessage.addListener(
    function (request, sender, sendResponse) {
        console.log(sender.tab ?
            "from a content script:" + sender.tab.url :
            "from the extension");

        console.log(request.greeting);
        const url = 'http://127.0.0.1:8080/health/check';
        const data = { appno: '123', eapid: '321' };
        sendPostRequest(url, data);
        sendResponse({ farewell: "recieved" });
    }
);

// 示例调用
