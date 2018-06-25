
// Create csInterface object, get UI data
var csInterface = new CSInterface();
var appSkin = csInterface.hostEnvironment.appSkinInfo;

// Paths to variables
var sysPath = csInterface.getSystemPath(SystemPath.EXTENSION);
var logPath = sysPath + "/log/";
var hostPath = sysPath + "/host/";
var userPath = csInterface.getSystemPath(SystemPath.USER_DATA);
var myDocPath = csInterface.getSystemPath(SystemPath.MY_DOCUMENTS);
var commonPath = csInterface.getSystemPath(SystemPath.COMMON_FILES);
var hostAppPath = csInterface.getSystemPath(SystemPath.HOST_APPLICATION);
// var appPath = csInterface.getSystemPath(SystemPath.APPLICATION); // same as EXTENSION

var actionButton = document.getElementById('action');
var actionNameInput = document.getElementById('actionName');
var actionSetInput = document.getElementById('actionSet');

var data = {
	text: "none",
	actionName: "Rotate 90 CW (selection)",
	actionSet: "Default Actions"
};


// Loading initial stack from libraries
callDoc();
buildUI();
logSkin(appSkin);
loadBorderWidth();
console.log(`Loading for ${appInfo.name}`);
console.log(appInfo);
// loadJSX(`json2.jsx`);  // if using stringify and parse in Extendscript



actionButton.addEventListener("click", function(e){
	data.actionName = actionNameInput.value;
	data.actionSet = actionSetInput.value;
	csInterface.evalScript(`doAction('${data.actionName}, ${data.actionSet}')`, catchMsg)
	console.log(`name: ${data.actionName}, set: ${data.actionSet}`);
}, false)

function catchMsg(params){
	console.log(params);
}

function getKeyShortcutPath() {
	data.pathToHost = hostAppPath.substring(0, hostAppPath.indexOf("2018") + 4);
	data.pathToKeyMap = data.pathToHost.concat("/Presets/", appInfo.lang, "/Keyboard Shortcuts/Illustrator Default.kys");
	return data.pathToKeyMap;
}

// scribe('write', 'something');
// quickWriteFile(getKeyShortcutPath(), data.text);
// quickReadFile(getKeyShortcutPath());

console.log(getKeyShortcutPath());

function quickWriteFile(pathTo, contents) {
	var result = window.cep.fs.writeFile(pathTo, contents);
	if (0 == result.err) {
		console.log("Success");
		console.log(result);
	} else {
		console.log(`Error ${result.err}`);
	}
}

function quickReadFile(pathTo){
	var result = window.cep.fs.readFile(pathTo);
	console.log(result);
	return result;
}

function scribe(whichWay, contents){
	var path = logPath + "scribe.jsx";
	if (whichWay === 'write') {
		var result = window.cep.fs.writeFile(path, contents);
		if (0 == result.err) {
				 console.log("Success");
				 console.log(result);
		} else {
				 console.log(`Error ${result.err}`);
		}
	} else if (whichWay === 'read') {
		contents = window.cep.fs.readFile(path);
		// data.text = result.data;
		return contents;
	}
}
