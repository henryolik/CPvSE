var mode;

loadMode();

chrome.runtime.onMessage.addListener(function(request)
{
    if (request.msg == "click")
	{
		if(mode == 0)
		{
			load("grayText");
		} 
		else if(mode == 1)
		{
			unload("grayText");
			load("gmailStyle");
		}
		else
		{
		unload("gmailStyle");
		}
	}
});

function loadMode()
{
	chrome.storage.local.get("mod", function (result)
	{
        mode = result.mod;
		
		if(mode == 2)
		{
			load("gmailStyle");	
		} 
		else if(mode == 1 || mode != 0) 
		{
			load("grayText");
		}
		else
		{
			mode = 0;
			save(mode);
		}
	});
}

function sendMsg(txt) {
	chrome.runtime.sendMessage({msg: txt});
}


function load(file)
{
	var link = document.createElement("link");
	link.href = chrome.runtime.getURL(file + '.css');
	link.id = file;
	link.type = "text/css";
	link.rel = "stylesheet";
	document.getElementsByTagName("head")[0].appendChild(link);
	
	if(file == "grayText")
	{
		mode = 1;
	}
	else if(file == "gmailStyle")
	{
		mode = 2;
	}
	
	save(mode);
}

function unload(file)
{
	var cssNode = document.getElementById(file);
	cssNode && cssNode.parentNode.removeChild(cssNode);
	mode = 0;
	save(mode);
}

function save(mode)
{
	chrome.storage.local.set({"mod": mode});
	sendMsg(mode);
}