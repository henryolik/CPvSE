chrome.action.onClicked.addListener(function(tab)
{
	chrome.tabs.query({active: true, currentWindow: true}, function(tabs)
	{
		chrome.tabs.sendMessage(tabs[0].id, {msg: "click"});
	});
});

chrome.runtime.onMessage.addListener(function(request)
{
	if (request.msg == 0)
	{
		chrome.action.setTitle({title: 'Teď jsem tu jen na ozdobu...'});
		chrome.action.setIcon({path: 'inactive.png'});
	}
	else if (request.msg == 1)
	{
		chrome.action.setTitle({title: 'Měním text v e-mailech na šedý 😉'});
		chrome.action.setIcon({path: 'grayText.png'});
	}
	else if (request.msg == 2)
	{
	chrome.action.setTitle({title:'Měním pozadí a text v e-mailech na černobílo 😉'});
	chrome.action.setIcon({path: 'gmailStyle.png'});
	}
});

function injectScript(tabId) {
	chrome.scripting.executeScript(
		{
			target: {tabId: tabId},
			files: ["smartMode.js"]
		}
	);

}

// adds a listener to tab change
chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {

	// check for a URL in the changeInfo parameter (url is only added when it is changed)
	if (changeInfo.url) {

		// calls the inject function
		injectScript(tabId);

	}
});
