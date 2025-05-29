let isEnabled = true;

browser.storage.local.get('isEnabled').then((result) => {
  if (result.isEnabled !== undefined) {
    isEnabled = result.isEnabled;
  }
  console.log("Background: Initial state loaded, isEnabled:", isEnabled);
});

browser.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === 'toggle') {
    isEnabled = message.enabled;
    browser.storage.local.set({ isEnabled: isEnabled }).then(() => {
      console.log("Background: State saved, isEnabled:", isEnabled);
      browser.tabs.query({}).then(tabs => {
        tabs.forEach(tab => {
          browser.tabs.sendMessage(tab.id, { action: 'toggle', enabled: isEnabled }).catch(error => {
            if (!error.message.includes("Could not establish connection. Receiving end does not exist.")) {
              console.error("Error sending toggle message to tab:", tab.id, error);
            }
          });
        });
      });
    });
    sendResponse({ success: true });
  } else if (message.action === 'getState') {
    console.log("Background: Sending current state:", isEnabled);
    sendResponse({ enabled: isEnabled });
  }
});
