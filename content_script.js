// listen for a full mouse click
document.addEventListener("mousedown", function(event){
	document.addEventListener("mouseup", function(event){
		// get selected text
		var selected = window.getSelection().toString();
	    
	    if(selected != '') {
	    	// broadcast text to background
	        chrome.extension.sendMessage({
	            'message': 'updateContextMenu', 
	            'selection': true,
	            'data': selected
	        });
	    }
	}, true)
    
}, true);