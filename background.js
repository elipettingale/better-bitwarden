chrome.runtime.onInstalled.addListener(() => {
  chrome.action.setBadgeText({
    text: "OFF",
  });
});

async function insertAssets(tabId) {
  await chrome.scripting.insertCSS({
    files: ["assets/css/index.css"],
    target: { tabId: tabId },
  });
}

async function removeAssets(tabId) {
  await chrome.scripting.removeCSS({
    files: ["assets/css/index.css"],
    target: { tabId: tabId },
  });
}

chrome.action.onClicked.addListener(async (tab) => {
  if (!tab.url.startsWith("https://vault.bitwarden.com")) {
    return;
  }

  const prevState = await chrome.action.getBadgeText({ tabId: tab.id });
  const nextState = prevState === "ON" ? "OFF" : "ON";

  await chrome.action.setBadgeText({
    tabId: tab.id,
    text: nextState,
  });

  nextState === "ON" ? insertAssets(tab.id) : removeAssets(tab.id);
});
