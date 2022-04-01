var fontCol = 0;
var uniCol = 2;
var nameCol = 1;
var synCol = 4;
var xrefCol = 3;
var noCols = 3;
	
// find font column and unicode column	
/*
function findCol(arry) {
	var t0 = performance.now();
	var found = false;
	var rowx = 0;
	for (var i = 4; i < arry.length; i ++) {
		rowx = arry[i]
		console.log(i, rowx.length, rowx);
		for (var j = 0;  j < rowx.length; j++) {  //  eeac8d = eb0d
			var	uni = rowx[j].charCodeAt(0).toString(16).toUpperCase();
			console.log(i, j, '|'+uni+'|', uni.length);
		    if (uni.length == 4) { 
				fontCol = j;
				for (var k = 0;  k < rowx.length; k++){
					if (k === fontCol) continue;
					//console.log(j,k,uni, rowx[k], rowx[k].length, fontCol);
					if (rowx[k].toUpperCase() === uni) {
						console.log('found')
						uniCol = k;
						found = true;
						break;
					}
				}
			}	
		}
		if (i > 16) break;   
		if (found) break;
	}
	noCols = arry[5].length;
	if (fontCol === 0 && uniCol == 3) {
		nameCol = 1
		synCol = 2
		xrefCol = 4
	} 	
		
	console.log(noCols,fontCol, uniCol, nameCol, synCol, xrefCol);
	var t1 = performance.now();
	console.log("findCol " + (t1 - t0) + " milliseconds.");
}
*/

function generateTable(lines, colLen){
	console.log('generateTable');
	var t0 = performance.now();
	document.getElementById("output").innerHTML = "";
	var table = document.createElement("table");
	table.id = "searchtable";
	table.className = 'xreftable';
	var len = 0;
	for (var i = 0; i < lines.length; i++) {
	  // find longest row
		if (lines[i].length > len) {
			len = lines[i].length;
		}
	}
	console.log(lines[5].length)

	table.createCaption();
	table.caption.innerHTML = lines[0];
	// make header
	var row = document.createElement('TR');
	for (var j = 0; j < len; j++) {
		var th = document.createElement("TH");
		th.appendChild(document.createTextNode('col '+j));
		var fontCol = 0;
		if (colLen[j] < 2) th.style.display = "none";

	}

	
	table.appendChild(row);
	var tbody = document.createElement('TBODY');
	for (var i = 0; i < lines.length; i++) {  // get line
		if (lines[i].length > 1) {	// process row
			var row = document.createElement('TR');
			row.className = "item";
			var mismatch = false;
			var c0;
		    var c1;
			for (var j = 0; j < lines[i].length; j++) {
				var text = "";
				var td = document.createElement("TD");
				if (lines[i][j]) text = lines[i][j].trim();
				if (colLen[j] < 2) td.style.display = "none";

				td.appendChild(document.createTextNode(text));
				row.appendChild(td);
			}  // end column process
			row.style.display = "";
			if (c0 !== c1) {
				console.log('not equal',i,c0, c1)
				var errdata = "Font error\nicon = " +c0+"\nunicode ="+ c1;
				row.className = "uerror";
				row.setAttribute("rowdata", errdata);
				dispModal(row, fontCol, uniCol);
			}

		}	// end row process
		tbody.appendChild(row);
	}  // end process line
	table.appendChild(tbody);
	document.getElementById("output").appendChild(table);
	var t1 = performance.now();
	console.log("generateTable " + (t1 - t0) + " milliseconds.");
}


  function toHex(str) {
    var result = '';
    for (var i=0; i<str.length; i++) {
      result += str.charCodeAt(i).toString(16);
    }
	console.log('toHex', str, result);
	 return result;
  }
   function toHexArray(str) {
    var result = [];
    for (var i=0; i<str.length; i++) {
      result.push(str.charCodeAt(i).toString(16));
    }
	//console.log('toHexArr', str, result);
	 return result;
  }

function jscsvToArray(text) {
	console.log('xcsv...')
	row = [];
	lines = text.split('\n');
	for (var i in lines){
		//l = lines[i].replace(/|/g, ",");
		l = lines[i].split('|')
		for (var j in l) {
			l[j] = l[j].substring(1, l[j].length - 1)
		}
		row.push(l);
	}
	console.log(row[2])
	return row;
}

function csvToArray(text) {
	var t0 = performance.now();
	let p = '', row = [''], ret = [row], i = 0, r = 0, s = !0, line;
	for (line of text) {
	    if ('"' === line) {
            if (s && line === p) {
				row[i] += line;
			}
            s = !s;
        } else if (',' === line && s) {
      		line = row[++i] = '';
		} else if ('\n' === line && s) {
            if ('\r' === p) {
				row[i] = row[i].slice(0, -1);
			}
            row = ret[++r] = [line = '']; i = 0;
        } else {
			row[i] += line;
		}
        p = line;
	}
	
	var t1 = performance.now();
		
	console.log("csvToArray " + (t1 - t0) + " milliseconds.");
    return ret;
};

function search_Table(){
	var input = document.getElementById('xsearch').value.toUpperCase();
	var filter =  input.split(' '); 
	console.log('searchtable',srchType, input)	
	table = document.getElementById("searchtable");
	if (table) {
		tr = table.getElementsByTagName("tr");
		for (i = 1; i < tr.length; i++) {		// start row 1
			td = tr[i].getElementsByTagName("td") ; 
			var txt = "+";
			for(j=0 ; j < td.length ; j++) {		// start column 0
				  let tdata = td[j] ;
				  if (tdata) {
					 txt = txt +'+'+ tdata.innerHTML.toUpperCase();
				  }
			}
			//console.log('srch',txt, 'filter',filter);
			if (srchType === 'word') {  // word search
				txt = txt +'+';
				txt = txt.replace(/ /g,'+')
				txt = txt.replace(/:/g,'+')
				txt = txt.replace(/,/g,'+')
				//txt = txt.split('+')
				
				var found = true;
				for(var f = 0; f < filter.length; f++) {
					if (txt.indexOf('+'+filter[f]+'+')  === -1) { 
						found = false;
					}
				}
			} else {			// char search
				var found = true;
				for(var f = 0; f < filter.length; f++) {
					if (txt.indexOf(filter[f])  === -1) { 
						found = false;
					}
				}
			}	
			//found = arrayContains(txt, filter)
			//console.log(i,input, txt, found)
			if (found) {
					tr[i].style.display = "";
			} else {
					tr[i].style.display = "none";
			}
		}
	}
}

