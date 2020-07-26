var aktivni;

jeAktivni();

chrome.runtime.onMessage.addListener(
  function(request) {
    if (request.zprava == "klik")
      if(aktivni != "true") {
	loadCSS("styly");
} else {
	unloadCSS("styly");
	}
  });

function jeAktivni() {
chrome.storage.local.get("akt", function (result) {
        aktivni = result.akt;
		prvniSpusteni();
    });
}

function prvniSpusteni() {
if(aktivni != "false") {
	loadCSS("styly");	
}
}

function poslatZpravu(z) {
	chrome.runtime.sendMessage({zprava: z});
}


function loadCSS(file) {
  var link = document.createElement("link");
  link.href = chrome.extension.getURL(file + '.css');
  link.id = file;
  link.type = "text/css";
  link.rel = "stylesheet";
  document.getElementsByTagName("head")[0].appendChild(link);
  aktivni = "true";
chrome.storage.local.set({"akt": "true"});
poslatZpravu("aktivovat");
}

function unloadCSS(file) {
  var cssNode = document.getElementById(file);
  cssNode && cssNode.parentNode.removeChild(cssNode);
  aktivni = "false";
 chrome.storage.local.set({"akt": "false"});
 poslatZpravu("deaktivovat");
}