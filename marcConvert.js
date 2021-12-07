function convertAndCopy() {
	var inputText = document.getElementById('input').value;
	var inputTextarea = document.getElementById('input');
	var outputTextarea = document.getElementById('output');
	
	var button = document.getElementById('btn');

// return focus to input if nothing there to work on
	if (!inputText) {
		inputTextarea.focus();	
		return;
	}
// transform inputText
	var outputText =   inputText.replace(/[^\n][ \t]+(\d{3}) \t +\t(..)[ \t]+(.*)/g,'$1$2$3')
								.replace(/ ‡(.) /g,'|$1')
								.replace(/_‡(.) /g,'_|$1')
								.replace(/(\n\d{3,4})_/g,'$1 ');
	
	outputTextarea.textContent = outputText;
	outputTextarea.select();
	button.innerText = 'Copied! Click to reset';
// hard reload of page to get around bug where user interactions with output textarea break things
	button.addEventListener('click', (function(){window.location.reload(true)}));
	document.execCommand('copy');
	
	return;
}

// focus on input textarea on load
window.addEventListener('load', function() {
	document.getElementById('input').focus();
})
