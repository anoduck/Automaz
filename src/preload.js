
window.elementHighlighterEnabled = false;

window.elementHighlighted = function(elem)
{
	const ipcRenderer = require('electron').ipcRenderer;
	ipcRenderer.send('element-highlighted', getElementIdentifier(elem));

}


/// TODO : Google to see better implementation
function getElementIdentifier(elem)
{
	if(elem.id != "")
  		return `#${elem.id}`;
	if(elem.name != "")
  		return `[name="${elem.name}"]`;
	if(elem.className != "")
  		return `${elem.className}`;
}
