// Helper: safely switch to previous tab
async function switchToPreviousTab() {
    const data = await chrome.storage.local.get("lastTabId");
    const tabId = data.lastTabId;

    if (tabId !== null && tabId !== undefined) {
        try {
            const tab = await chrome.tabs.get(tabId);
            if (tab) {
                await chrome.tabs.update(tabId, { active: true });
            }
        } catch (error) {
            // Tab no longer exists or can't be activated – do nothing
            console.warn("Cannot switch to previous tab:", error.message);
        }
    }
}

// Track current and previous tab
chrome.tabs.onActivated.addListener(async (activeInfo) => {
    const data = await chrome.storage.local.get("currentTabId");
    const previousTabId = data.currentTabId || null;

    await chrome.storage.local.set({
        lastTabId: previousTabId,
        currentTabId: activeInfo.tabId,
    });
});

// Click on extension icon
chrome.action.onClicked.addListener(() => {
    switchToPreviousTab();
});

// Keyboard shortcut
chrome.commands.onCommand.addListener((command) => {
    if (command === "go-back-to-previous-tab") {
        switchToPreviousTab();
    }
});
