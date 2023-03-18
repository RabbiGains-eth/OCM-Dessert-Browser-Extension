const clickEventHandler = () => {
  const isSelected = localStorage.getItem('isAllowed') ? true : false;
  if (isSelected) {
    localStorage.removeItem('isAllowed');
    chrome.storage.local.set({ isAllowed: false });
  } else {
    localStorage.setItem('isAllowed', true);
    chrome.storage.local.set({ isAllowed: true });
  }
  var element = document.querySelector(".toggle_container");
  element.classList.toggle("toggleSelected");

  chrome.tabs.query({ currentWindow: true, active: true }, function (tabs) {
    var activeTab = tabs[0];
    chrome.tabs.sendMessage(activeTab.id, { "message": "allowed", selected: !isSelected });
  });
}

const isAllowed = localStorage.getItem('isAllowed');

if (isAllowed) {
  let element = document.querySelector(".toggle_container");
  element.classList.toggle("toggleSelected");

  chrome.tabs.query({ currentWindow: true, active: true }, function (tabs) {
    var activeTab = tabs[0];
    chrome.tabs.sendMessage(activeTab.id, { "message": "allowed", selected: isAllowed ? true : false });
  });
}

const toggleObject = document.querySelector('.toggleWrap');
if (toggleObject) {
  toggleObject.addEventListener("click", clickEventHandler);
}

function checkingUpdateAlert() {
  const version = 0.2;
  fetch(`https://hook.us1.make.com/fbhg4wlaargqm5haee6wf5t3tn22iz4t`)
    .then(response => response.text())
    .then(res => {
      const updateAlert = document.querySelector('.update-alert');
      if (updateAlert) {
        if (res > version) {
          updateAlert.style.display = 'block';
        } else {
          updateAlert.style.display = 'none';
        }
      }
    })
    .catch(error => {
      console.log(`An error occurred while checking for updates.`);
      console.log(error);
    });
}

checkingUpdateAlert();
