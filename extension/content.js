// Forward messages from the background script to the webpage
chrome.runtime.onMessage.addListener((message, sender) => {
  window.postMessage(message, "*");
});

// Handle connection requests from the webpage
window.addEventListener("message", (event) => {
  if (event.data.type === "CONNECT") {
    chrome.runtime.sendMessage(event.data);
  }
});
