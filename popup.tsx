// popup.tsx

import React, { useEffect, useState } from "react";
import AccordionUsage from "~components/accordion";
import { CircularProgress } from "@mui/material";

function IndexPopup() {
  const [dataFromContent, setDataFromContent] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => { 
    chrome.runtime.onMessage.addListener(function (request) {
      if (request.action === "sendDataToPopup") {
        setDataFromContent(request.data);
        console.log("Received data in popup.tsx:", request.data);

        setLoading(false);
      }
    });

    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      chrome.tabs.sendMessage(tabs[0].id, { action: "readDom" });
      chrome.tabs.reload(tabs[0].id);
    });
  }, []);



  return (
    <div>
      <h1>Data from Content Script:</h1>

        {loading ?
          <CircularProgress />
          :
          <AccordionUsage data={dataFromContent} />
}
      
    </div>
  );
}

export default IndexPopup;
