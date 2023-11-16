const enableExtensionButton = document.getElementById("enableExtension");
const optionsFieldSet = document.getElementById("optionsFieldSet");
const enableAlertsButton = document.getElementById("enableAlerts");
const enableWaybackButton = document.getElementById("enableWayback");
const enableHiddenButton = document.getElementById("enableHidden");
const enableDisabledButton = document.getElementById("enableDisabled");

// Load the current enabled state from storage
browser.storage.sync.get(["extensionDisabled"], (result) => {
  const extensionDisabled = result.extensionDisabled;
  enableExtensionButton.checked = extensionDisabled;

  // Disable the options if extensionDisabled is true
  optionsFieldSet.disabled = extensionDisabled;
});

browser.storage.sync.get(["alertsDisabled"], (result) => {
  const alertsDisabled = result.alertsDisabled;
  enableAlertsButton.checked = alertsDisabled;
});
browser.storage.sync.get(["waybackDisabled"], (result) => {
  const waybackDisabled = result.waybackDisabled;
  enableWaybackButton.checked = waybackDisabled;
});
browser.storage.sync.get(["hiddenDisabled"], (result) => {
  const hiddenDisabled = result.hiddenDisabled;
  enableHiddenButton.checked = hiddenDisabled;
});
browser.storage.sync.get(["disabledDisabled"], (result) => {
  const disabledDisabled = result.disabledDisabled;
  enableDisabledButton.checked = disabledDisabled;
});

// Toggle the extension's show alerts state when the checkbox is changed
enableAlertsButton.addEventListener("click", () => {
  // Get the current value of the aria-checked attribute
  const alertsDisabled = enableAlertsButton.checked;

  // Toggle the value (if "true", change it to "false"; if "false", change it to "true")
  const newValue = alertsDisabled;

  // Update the aria-checked attribute with the new value
  enableAlertsButton.checked = newValue;

  const setting = { ["alertsDisabled"]: newValue.toString() };
  browser.storage.sync.set(setting);
});

// Toggle the extension's show wayback state when the checkbox is changed
enableWaybackButton.addEventListener("click", () => {
  // Get the current value of the aria-checked attribute
  const waybackDisabled = enableWaybackButton.checked;

  // Toggle the value (if "true", change it to "false"; if "false", change it to "true")
  const newValue = waybackDisabled;

  // Update the aria-checked attribute with the new value
  enableWaybackButton.checked = newValue;

  const setting = { ["waybackDisabled"]: newValue.toString() };
  browser.storage.sync.set(setting);
});

// Toggle the extension's show hidden state when the checkbox is changed
enableHiddenButton.addEventListener("click", () => {
  // Get the current value of the aria-checked attribute
  const hiddenDisabled = enableHiddenButton.checked;

  // Toggle the value (if "true", change it to "false"; if "false", change it to "true")
  const newValue = hiddenDisabled;

  // Update the aria-checked attribute with the new value
  enableHiddenButton.checked = newValue;

  const setting = { ["hiddenDisabled"]: newValue.toString() };
  browser.storage.sync.set(setting);

  // Reload the active tab to apply changes immediately
  browser.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    if (tabs[0]) {
      browser.tabs.reload(tabs[0].id);
    }
  });
});

// Toggle the extension's show disabled state when the checkbox is changed
enableDisabledButton.addEventListener("click", () => {
  // Get the current value of the aria-checked attribute
  const disabledEnabled = enableDisabledButton.checked;

  // Toggle the value (if "true", change it to "false"; if "false", change it to "true")
  const newValue = disabledEnabled;

  // Update the aria-checked attribute with the new value
  enableDisabledButton.checked = newValue;

  const setting = { ["disabledDisabled"]: newValue.toString() };
  browser.storage.sync.set(setting);

  // Reload the active tab to apply changes immediately
  browser.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    if (tabs[0]) {
      browser.tabs.reload(tabs[0].id);
    }
  });
});

// Toggle the extension's enabled state when the checkbox is changed
enableExtensionButton.addEventListener("click", () => {
  // Get the current value of the aria-checked attribute
  const extensionDisabled = enableExtensionButton.checked;

  // Toggle the value (if "true", change it to "false"; if "false", change it to "true")
  const newValue = extensionDisabled;

  // Update the aria-checked attribute with the new value
  enableExtensionButton.checked = newValue;

  const setting = { ["extensionDisabled"]: newValue.toString() };
  browser.storage.sync.set(setting);

  // Disable the options checkbox if extensionEnabled is true
  optionsFieldSet.disabled = newValue;

  // Reload the active tab to apply changes immediately if necessary
  if (
    !enableAlertsButton.checked ||
    !enableHiddenButton.checked ||
    !enableDisabledButton.checked
  ) {
    browser.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      if (tabs[0]) {
        browser.tabs.reload(tabs[0].id);
      }
    });
  }
});
