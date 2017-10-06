
window.elementHighlighted = function(elem)
{
	const ipcRenderer = require('electron').ipcRenderer;
	ipcRenderer.send('element-highlighted', getElementIdentifier(elem));

}