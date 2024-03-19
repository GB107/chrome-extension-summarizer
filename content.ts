// content.ts

import type { PlasmoCSConfig } from "plasmo";

export const config: PlasmoCSConfig = {
  matches: ["*://*/*"],
};

const sendData = async () => {
  try {
    console.log("Content script running");

    // Get all elements on the page
    const allElements = document.querySelectorAll('a');

    // Convert NodeList to Array for easier manipulation
    const elementsArray = Array.from(allElements);

    // Filter anchor elements to include only those with specified file extensions
    const supportedFileExtensions = ['.pdf', '.doc', '.docx', '.xls', '.xlsx'];
    const supportedLinksArray = elementsArray
      .filter((anchor) => supportedFileExtensions.some(extension => anchor.href.toLowerCase().endsWith(extension)))
      .map((anchor) => anchor.href);

    // Log the array of supported links to the console
    console.log(JSON.stringify(supportedLinksArray));

    // Send data to the background script
    chrome.runtime.sendMessage({ action: "sendDataToPopup", data: supportedLinksArray });
    console.log("Sent data");
  } catch (error) {
    console.error('Error sending data:', error);
  }
};

// Call the sendData function when the content script is loaded
sendData();
