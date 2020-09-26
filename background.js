chrome.browserAction.onClicked.addListener(function(tab) { 
	chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
		chrome.tabs.sendMessage(tabs[0].id, {zprava: "klik"});
	});
});

chrome.runtime.onMessage.addListener(
  function(request) {
    if (request.zprava == 0) {
		chrome.browserAction.setTitle({
   title:'Teď jsem tu jen na ozdobu...'
});
chrome.browserAction.setIcon({path: 'neaktivni.png'});
	} else if (request.zprava == 1) {
      chrome.browserAction.setTitle({
   title:'Měním text v e-mailech na šedý 😉'
});
   chrome.browserAction.setIcon({path: 'jenpismo.png'});
	} else if (request.zprava == 2) {
		chrome.browserAction.setTitle({
   title:'Měním pozadí a text v e-mailech na černobílo 😉'
});
chrome.browserAction.setIcon({path: 'ipozadi.png'});
	}
  });