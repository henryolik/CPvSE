chrome.browserAction.onClicked.addListener(function(tab) { 
	chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
		chrome.tabs.sendMessage(tabs[0].id, {zprava: "klik"});
	});
});

chrome.runtime.onMessage.addListener(
  function(request) {
    if (request.zprava == "aktivovat") {
      chrome.browserAction.setTitle({
   title:'Měním text v e-mailech na šedý 😉'
});
   chrome.browserAction.setIcon({path: 'aktivni.png'});
	} else if (request.zprava == "deaktivovat") {
		chrome.browserAction.setTitle({
   title:'Teď jsem tu jen na ozdobu...'
});
chrome.browserAction.setIcon({path: 'neaktivni.png'});
	}
  });