function stripFrontSpaces(s){
	var query = s;

	// strip spaces from front
	if(query.charAt(0) == " "){
		query = query.replace(/\s+/, "");
	}
	return query;
}

function stripBothEndSpaces(s){
	var query = s;

	stripFrontSpaces(query);

	// reverse the query
	query = query.split("").reverse().join("");

	// strip from back (now front)
	stripFrontSpaces(query);

	// reverse the query again
	query = query.split("").reverse().join("");

}

search = function(s){
	var query = s.selectionText;
	stripBothEndSpaces(query);
	query = query.replace(/\s/g, "%20");
	console.log(query);
	chrome.tabs.create({url: "https://yale-csm.symplicity.com/students/?s=quicksearch&query=" + query});
}

function createDropdownMenu(){
	var dropdownMenu = chrome.contextMenus.create({
		title: "Search Yale Symplicity",
		contexts: ["selection"],
		onclick: search,
		id: "dropdownMenu"
	});
}

chrome.extension.onMessage.addListener(function(request, sender, sendResponse) {
    if (request.message == 'updateContextMenu') {
        createDropdownMenu();
    } else {
        sendResponse({});
    }
});




