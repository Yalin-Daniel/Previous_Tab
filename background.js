let lastTabId = null;
let currentTabId = null;

chrome.tabs.onActivated.addListener((activeInfo) => {
    if (currentTabId !== activeInfo.tabId) {
        lastTabId = currentTabId;
        currentTabId = activeInfo.tabId;
    }
});

chrome.action.onClicked.addListener(() => {
    if (lastTabId !== null) {
        chrome.tabs.update(lastTabId, { active: true });
    }
});

chrome.commands.onCommand.addListener((command) => {
    if (command === "go-back-to-previous-tab" && lastTabId !== null) {
        chrome.tabs.update(lastTabId, { active: true });
    }
});
