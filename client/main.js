// This script writes and reads files

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
var fileName = document.getElementById('fileName');
var fileText = document.getElementById('text');

var data = {
	text: "none",
	actionName: "Rotate 90 CW (selection)",
	actionSet: "Default Actions"
};


// Loading initial stack from libraries
callDoc();
buildUI();
loadBorderWidth();

// logSkin(skin) updates the skinInfo object
// logSkin(csInterface.hostEnvironment.appSkinInfo)
logSkin(appSkin);

console.log(`Loading for ${appInfo.name}`);
console.log(appInfo);
// loadJSX(`json2.jsx`);  // if using stringify and parse in Extendscript


actionButton.addEventListener("click", function(e){
	var path = logPath + fileName.value;
  var data = fileText.value;
  console.log(path + ", " + data);
  var result = window.cep.fs.writeFile(path, data);
  // var result = window.cep.fs.readFile(path);
  if (0 == result.err) {
       console.log("Success");
       console.log(result);
			 alert(`${fileName.value} successfully written`)
  } else {
       console.log(`Error ${result.err}`);
  }
}, false)

function catchMsg(params){
	console.log(params);
}


function getKeyShortcutPath() {
	data.pathToHost = hostAppPath.substring(0, hostAppPath.indexOf("2018") + 4);
	data.pathToKeyMap = data.pathToHost.concat("/Presets/", appInfo.lang, "/Keyboard Shortcuts/Illustrator Default.kys");
	return data.pathToKeyMap;
}

console.log(getKeyShortcutPath());
// scribe('write', 'something');

// quickWriteFile(getKeyShortcutPath(), data.text);
// quickReadFile(getKeyShortcutPath());

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

// writes and reads from the /log/scribe.jsx file
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
