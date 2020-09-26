var mod;

jeAktivni();

chrome.runtime.onMessage.addListener(
  function(request) {
    if (request.zprava == "klik")
      if(mod == 0) {
	nacti("jenpismo");
} else if(mod == 1) {
	vypnout("jenpismo");
	nacti("ipozadi");
	} else {
		vypnout("ipozadi");
	}
  });

function jeAktivni() {
chrome.storage.local.get("mod", function (result) {
        mod = result.mod;
		prvniSpusteni();
    });
}

function prvniSpusteni() {
if(mod == 2) {
	nacti("ipozadi");	
} else if(mod != 0 || mod != "false") {
	nacti("jenpismo");
}
}

function poslatZpravu(z) {
	chrome.runtime.sendMessage({zprava: z});
}


function nacti(co) {
  var link = document.createElement("link");
  link.href = chrome.extension.getURL(co + '.css');
  link.id = co;
  link.type = "text/css";
  link.rel = "stylesheet";
  document.getElementsByTagName("head")[0].appendChild(link);
if(co == "jenpismo") {
	mod = 1;
	ulozit(mod);
} else if(co == "ipozadi") {
	mod = 2;
	ulozit(mod);
}
}

function vypnout(co) {
  var cssNode = document.getElementById(co);
  cssNode && cssNode.parentNode.removeChild(cssNode);
  mod = 0;
  ulozit(mod);
}

function ulozit(co) {
	chrome.storage.local.set({"mod": co});
	poslatZpravu(co);
}