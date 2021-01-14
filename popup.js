document.addEventListener('DOMContentLoaded', function () {
  restoreToggle();
  document.getElementById('toggle').addEventListener('click', updateToggleState);
});

function restoreToggle() {
  // default value = false
  chrome.storage.sync.get({
      toggleValue: false
  }, function (items) {
      document.getElementById('toggle').checked = items.toggleValue;
  });
}

function updateToggleState() {
  chrome.storage.sync.set({
      toggleValue: document.getElementById('toggle').checked
  });
}

