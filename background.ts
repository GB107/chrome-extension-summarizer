// background.ts

let dataFromContent: string[] = [];

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  if (request.action === "sendDataToPopup") {
    dataFromContent = request.data;

    // Optionally, you can send the data to the popup script
    chrome.runtime.sendMessage({ action: "sendDataToPopup", data: dataFromContent });

    // Perform any other actions based on the received data

    // Send a response if needed
    sendResponse({ message: "Data received in background script" });
  }
});
