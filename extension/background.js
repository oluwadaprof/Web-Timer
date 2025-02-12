let lastActivity = null;
const IDLE_TIMEOUT = 60; // seconds

// Productive domains list
const productiveDomains = [
  "github.com",
  "stackoverflow.com",
  "docs.google.com",
  "tempolabs.ai",
];

// Activity tracking function
function trackActivity(tab) {
  const now = new Date();
  if (lastActivity) {
    const duration = Math.floor((now - lastActivity.timestamp) / 1000);
    if (duration > 0) {
      const url = new URL(tab.url);
      const data = {
        type: "ACTIVITY_UPDATE",
        data: {
          appName: "Browser",
          windowTitle: tab.title,
          duration: duration,
          isProductive: isProductiveUrl(tab.url),
          url: url.hostname,
        },
      };

      // Send to all connected Tempo tabs
      chrome.tabs.query({ url: "*://*.tempolabs.ai/*" }, (tabs) => {
        tabs.forEach((tab) => {
          chrome.tabs.sendMessage(tab.id, data);
        });
      });
    }
  }

  lastActivity = {
    timestamp: now,
    title: tab.title,
    url: tab.url,
  };
}

// Check if URL is productive
function isProductiveUrl(url) {
  try {
    const hostname = new URL(url).hostname;
    return productiveDomains.some((domain) => hostname.includes(domain));
  } catch {
    return false;
  }
}

// Event listeners
chrome.tabs.onActivated.addListener(async (activeInfo) => {
  const tab = await chrome.tabs.get(activeInfo.tabId);
  trackActivity(tab);
});

chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (changeInfo.status === "complete") {
    trackActivity(tab);
  }
});

chrome.idle.setDetectionInterval(IDLE_TIMEOUT);
chrome.idle.onStateChanged.addListener((state) => {
  if (state === "active") {
    chrome.tabs.query({ active: true, currentWindow: true }, ([tab]) => {
      if (tab) trackActivity(tab);
    });
  }
});

// Handle connection requests
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.type === "CONNECT") {
    sendResponse({ success: true });
    return true;
  }
});
