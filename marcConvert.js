function convertAndCopy() {
	var inputText = document.getElementById('input').value;
	var inputTextarea = document.getElementById('input');
	var outputTextarea = document.getElementById('output');
	
	var button = document.getElementById('btn');
	var btnClicked = document.getElementsByClassName('btn_clicked');
	var outputText = '';	

// return focus to input if nothing there to work on
	if (!inputText) {
		inputTextarea.focus();	
		return;
	}
// transform inputText
// try text copied from LoC Authorities first:
	outputText =   inputText.replace(/^(\d{3})\t([\_\d]{2}) \|\w (.*)/gm,'$1$2$3')
								.replace(/(\d{3})__/g,'$1  ')
								.replace(/(\d{4})_/g,'$1 ')
								.replace(/ (\|.) /g,'$1');

// now convert text copied from OCLC Connexion (web or client):
	outputText =   outputText.replace(/ +\t(\d{3})\t? \t(?:  \t)?([\d\_]{2}|  )[ \t]+(.*)/gm,'$1$2$3')
								.replace(/ (?:ǂ|‡)(.) /g,'|$1')
								.replace(/_‡(.) /g,'_|$1')
								.replace(/(\d{3,4})_/g,'$1 ');
	
// try and decompose combining diacritics into single characters
	outputText = outputText.normalize("NFC");

	outputTextarea.textContent = outputText;
	outputTextarea.select();
	button.innerText = 'Copied! Click to reset';

// only copy contents if this is first time clicking
	if (btnClicked.length == 0) {
		document.execCommand('copy');
		button.classList.add('btn_clicked');
	}	

// hard reload of page to get around bug where user interactions with output textarea break things
	button.addEventListener('click', (function(){window.location.reload(true)}));
	
	return;
}

// focus on input textarea on load
window.addEventListener('load', function() {
	document.getElementById('input').focus();
})
