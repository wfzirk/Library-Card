	
function dispModal(btn, fontCol, uniCol) {	
		// Get the modal
	var modal = document.getElementById("myModal");

	// Get the button that opens the modal
	//var btn = document.getElementById("myBtn");

	// Get the <span> element that closes the modal
	var span = document.getElementsByClassName("close")[0];

	// When the user clicks the button, open the modal 
	//btn.onclick = function(e) {
	btn.onclick = function(e) {
		modal.style.display = "block";
		var tr = e.target.parentElement;
		console.log(e.target.parentElement);
		console.log(tr.getAttribute("rowdata"))
		//var fontcol = chkCols[0][0];			// fonticon column
		//var unc = chkCols[1][0];				// unicode column
		//var c0 = tr.childNodes[fontCol].innerText.charCodeAt(0).toString(16).toLowerCase();
		//var c1 = tr.childNodes[uniCol].innerText.toLowerCase();
		//var errdata = "Font error<br>icon = " +c0+"<br>unicode = "+c1;
		errdata = tr.getAttribute("rowdata")
		console.log(errdata);
		var mdisp = document.getElementById("mdisp");
		mdisp.innerHTML = errdata;
	}

	// When the user clicks on <span> (x), close the modal
	span.onclick = function() {
		modal.style.display = "none";
	}

	// When the user clicks anywhere outside of the modal, close it
	window.onclick = function(event) {
		if (event.target == modal) {
			modal.style.display = "none";
		}
	}
} //if modal

