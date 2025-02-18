const enableExtensionButton = document.getElementById("enableExtension");
const optionsFieldSet = document.getElementById("optionsFieldSet");
const enableAlertsButton = document.getElementById("enableAlerts");
const enableWaybackButton = document.getElementById("enableWayback");
const enableHiddenButton = document.getElementById("enableHidden");
const enableDisabledButton = document.getElementById("enableDisabled");

// Load the current enabled state from storage
chrome.storage.sync.get(["extensionDisabled"], (result) => {
  const extensionDisabled = result.extensionDisabled || "true";
  enableExtensionButton.setAttribute("aria-checked", extensionDisabled);

  // Disable the options if extensionDisabled is true
  optionsFieldSet.disabled = extensionDisabled === "true";
});

chrome.storage.sync.get(["alertsDisabled"], (result) => {
  const alertsDisabled = result.alertsDisabled || "true";
  enableAlertsButton.setAttribute("aria-checked", alertsDisabled);
});
chrome.storage.sync.get(["waybackDisabled"], (result) => {
  const waybackDisabled = result.waybackDisabled || "true";
  enableWaybackButton.setAttribute("aria-checked", waybackDisabled);
});
chrome.storage.sync.get(["hiddenDisabled"], (result) => {
  const hiddenDisabled = result.hiddenDisabled || "true";
  enableHiddenButton.setAttribute("aria-checked", hiddenDisabled);
});
chrome.storage.sync.get(["disabledDisabled"], (result) => {
  const disabledDisabled = result.disabledDisabled || "true";
  enableDisabledButton.setAttribute("aria-checked", disabledDisabled);
});

// Toggle the extension's show alerts state when the checkbox is changed
enableAlertsButton.addEventListener("click", () => {
  // Get the current value of the aria-checked attribute
  const alertsDisabled = enableAlertsButton.getAttribute("aria-checked");

  // Toggle the value (if "true", change it to "false"; if "false", change it to "true")
  const newValue = alertsDisabled === "true" ? "false" : "true";

  // Update the aria-checked attribute with the new value
  enableAlertsButton.setAttribute("aria-checked", newValue);

  const setting = { ["alertsDisabled"]: newValue };
  chrome.storage.sync.set(setting);
});

// Toggle the extension's show wayback state when the checkbox is changed
enableWaybackButton.addEventListener("click", () => {
  // Get the current value of the aria-checked attribute
  const waybackDisabled = enableWaybackButton.getAttribute("aria-checked");

  // Toggle the value (if "true", change it to "false"; if "false", change it to "true")
  const newValue = waybackDisabled === "true" ? "false" : "true";

  // Update the aria-checked attribute with the new value
  enableWaybackButton.setAttribute("aria-checked", newValue);

  const setting = { ["waybackDisabled"]: newValue };
  chrome.storage.sync.set(setting);
});

// Toggle the extension's show hidden state when the checkbox is changed
enableHiddenButton.addEventListener("click", () => {
  // Get the current value of the aria-checked attribute
  const hiddenDisabled = enableHiddenButton.getAttribute("aria-checked");

  // Toggle the value (if "true", change it to "false"; if "false", change it to "true")
  const newValue = hiddenDisabled === "true" ? "false" : "true";

  // Update the aria-checked attribute with the new value
  enableHiddenButton.setAttribute("aria-checked", newValue);

  const setting = { ["hiddenDisabled"]: newValue };
  chrome.storage.sync.set(setting);

  // Reload the active tab to apply changes immediately
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    if (tabs[0]) {
      chrome.tabs.reload(tabs[0].id);
    }
  });
});

// Toggle the extension's show disabled state when the checkbox is changed
enableDisabledButton.addEventListener("click", () => {
  // Get the current value of the aria-checked attribute
  const disabledEnabled = enableDisabledButton.getAttribute("aria-checked");

  // Toggle the value (if "true", change it to "false"; if "false", change it to "true")
  const newValue = disabledEnabled === "true" ? "false" : "true";

  // Update the aria-checked attribute with the new value
  enableDisabledButton.setAttribute("aria-checked", newValue);

  const setting = { ["disabledDisabled"]: newValue };
  chrome.storage.sync.set(setting);

  // Reload the active tab to apply changes immediately
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    if (tabs[0]) {
      chrome.tabs.reload(tabs[0].id);
    }
  });
});

// Toggle the extension's enabled state when the checkbox is changed
enableExtensionButton.addEventListener("click", () => {
  // Get the current value of the aria-checked attribute
  const extensionDisabled = enableExtensionButton.getAttribute("aria-checked");

  // Toggle the value (if "true", change it to "false"; if "false", change it to "true")
  const newValue = extensionDisabled === "true" ? "false" : "true";

  // Update the aria-checked attribute with the new value
  enableExtensionButton.setAttribute("aria-checked", newValue);

  const setting = { ["extensionDisabled"]: newValue };
  chrome.storage.sync.set(setting);

  // Disable the options checkbox if extensionEnabled is true
  optionsFieldSet.disabled = newValue === "true";

  // Reload the active tab to apply changes immediately if necessary
  if (
    enableAlertsButton.getAttribute("aria-checked") === "false" ||
    enableHiddenButton.getAttribute("aria-checked") === "false" ||
    enableDisabledButton.getAttribute("aria-checked") === "false"
  ) {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      if (tabs[0]) {
        chrome.tabs.reload(tabs[0].id);
      }
    });
  }
});
