//show the current date
function showDay(){
	   var d = new Date();
	   var y = d.getFullYear();
	   var m = d.getMonth();
	   var day = d.getDate();
	   day = checkIncrement(day);
	   var t = d.getDay();
	   var weekday = new Array("Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday");
	   var month = new Array("Jan", "Feb", "Mar", "Apr", "May", "Jun" ,"Jul", "Aug", "Sep", "Oct", "Nov", "Dec");
	   document.getElementById("showday").innerHTML=weekday[t] + " "+ day+ " " + month[m] + " " + y;
}
	
//show the current time with increment
function startT(){
	   var d = new Date();
	   var m = d.getMinutes();
	   var s = d.getSeconds();
	   var h = d.getHours();
	   m = checkIncrement(m);
	   s = checkIncrement(s);
	   document.getElementById("showtime").innerHTML = h+" :"+ m +", ";
	   var st = setTimeout("startT()",500);
}
	
function checkIncrement(i){
	if(i < 10)
	{
	     i = "0" + i;
	 }
	   return i;
}
	
function search_a_query(){
	var sf = document.searchf;
	var search_value = sf.search_engine.options[sf.search_engine.selectedIndex].value + escape(sf.query.value);
		
	window.open(search_value);
	return false;
}	

// highlight a whole row; if there is a rowspan or particular cell, escape such cell, but highlight rest of the cells in such row
function highlight_row(obj, bgcolor){
	if(obj.childNodes != null){
		for(var i=0; i<obj.childNodes.length;i++){
			if(obj.childNodes[i].className != null && obj.childNodes[i].className.indexOf("nohighlight") == -1){
				if(bgcolor != null){
					obj.childNodes[i].style.backgroundColor = bgcolor;
				}
				else{
					obj.childNodes[i].style.backgroundColor = "";
				}
			}
			else{
				if(obj.childNodes[i].nodeName != '#text')
					obj.childNodes[i].style.backgroundColor = "";
			}
		}
	
	}
	
}

// highlight the current clicked tab, and change previous tab as normal, including the bgcolor and font color.
function swap_tab(id,content_id){
	var eid = content_id + '_title';
	var ele = document.getElementById(eid);
	var ele_parent = ele.parentNode.childNodes;
	
	
	for(var j=0; j<ele_parent.length;j++){
		if(ele_parent[j].id != "" && typeof ele_parent[j].id != 'undefined'){ // for chrome, check undefined for space or text
			ele_parent[j].style.backgroundColor  = "#777777";
			
			var text_ele = ele_parent[j].childNodes[0];
			if(text_ele.nodeName == '#text'){
				text_ele = ele_parent[j].childNodes[1];  //for chrome, the first element is text
			}	
			text_ele.style.color = "white"; 
			
		}
	}
	ele.style.backgroundColor = "#ffffff";
	var child_ele = ele.childNodes[0];
	if(child_ele.nodeName == '#text'){
		child_ele = ele.childNodes[1]; //for chrome, the first element is text
	}	
	child_ele.style.color = "#464646";  
	
	var eles = document.getElementById(id).childNodes;
	
	for(var i=0;i< eles.length; i++){	
	if(typeof eles[i].style != 'undefined'){
		eles[i].style.display = "none";  
	}					
	}
	document.getElementById(content_id).style.display = "block";
}

// IE supports currentStyle method, but others support getComputedStyle method, to avoid this conflict, handle in the below.
function getCurrentStyleProperty(obj, prop){
	var current_property;
	if (window.getComputedStyle) { 
    	current_property = getComputedStyle(obj, null).getPropertyValue(prop); 
    } 
	else {  
		current_property = obj.currentStyle[prop]; 
    } 
	return current_property;
}

// highlight the tab when mouse over it, by change the bgcolor and font color. 
function cColorMouseOverOutTab(tabId,bgc){
	var leng = tabId.indexOf('_title');
	var contentId = tabId.substring(0,leng);
	var contentObj = document.getElementById(contentId);
	var current_property = getCurrentStyleProperty(contentObj,"display");

	if(current_property == 'none'){
		changeBackgroundColor(tabId,bgc);
	}
}

function changeBackgroundColor(id,bgc){
	document.getElementById(id).style.backgroundColor = bgc;
}

function disableDateSelect(bool){
	var dateArr = ["date1","date2","date3","date4","date5","date6","date7"];
	
	if(bool){
		for(var i =0; i < dateArr.length; i++){
			document.getElementById(dateArr[i]).disabled = true;
		}
	}
	if(!bool){
		for(var i =0; i < dateArr.length; i++){
			document.getElementById(dateArr[i]).disabled = false;
		}
	}
}

function printStars(star,noStar){
	for(var i = 0; i< star; i++){
		document.write("<img src='../images/tvguideImages/star.gif'>");
	}
	for(var j = 0; j< noStar; j++){
		document.write("<img src='../images/tvguideImages/nostar.gif'>");
	}
}

function showHideTopic(obj,id){
	var contentObj = document.getElementById(id);
	var imgs = obj.getElementsByTagName("IMG");
	var current_property = getCurrentStyleProperty(contentObj,"display");
	
	if(current_property == 'none'){
		contentObj.style.display = 'block';
		imgs[0].src = "../images/down_gray.gif";
	}
	else{
		contentObj.style.display = 'none';
		imgs[0].src = "../images/right_gray.gif";
	}
}

function changeFontColor(obj, font_color){
	if(obj.getElementsByTagName("SPAN") != null){
		obj.getElementsByTagName("SPAN")[0].style.color = font_color;
	}
}

function changeLinkFontColor(obj, font_color){	
		obj.style.color = font_color;	
}

function clearDefaultVal(obj){
	if(obj.value == "Search for ..."){
		obj.value = "";
		obj.className = "";
	}
	
}
function searchReset(){
 	if(document.forms[0].name == "searchf"){
		document.forms[0].reset();
		document.forms[0].query.blur();
	}
}


function addDlgImg(title,id,img){
	document.getElementById("ui-dialog-title-img-dialog").innerHTML = title;
	document.getElementById(id).innerHTML = "<img src='"+img+"' width='100%' height='100%' />";
	
}

function  changeSymbol(obj,classname,imgsrc){
	obj.className = classname;
	obj.src = imgsrc;
}

function total_score(name){
	var elems = document.forms[name].elements;
	var total = 0;
	for(var i=0;i<elems.length;i++){
		if(elems[i].name.indexOf('weight') != -1 && elems[i].checked){
			total += parseInt(elems[i].value);
		}
	}
	return total;
}

//calculate score from given form
function getQuizResult(title,name,id){
	document.getElementById("ui-dialog-title-quiz-result").innerHTML = title;
	var total = total_score(name);
	var elems = document.forms[name].elements;
	
	if(total == 0 || total == null){
		document.getElementById("altForm").style.display = "block";
		document.getElementById("scrollTop").click();
	}
	else{
		document.getElementById("altForm").style.display = "none";
		desc_score(total);
	}
}

var scoreResultPairs = '{ quizResultdesc : ['+
'{desc:"You\'re a one-person welcome wagon! No doubt, you meet lots of interesting professional contacts and potential friends, but being so available to others encourages them to walk all over you and invade your personal space. &quot;The problem with being so accessible is that you don\'t know how to establish boundaries for yourself because you want everyone to like you,&quot; says Shielagh Shusta, Ph.D., a psychologist in Manhattan."},'+
'{desc:"You know how to be friendly, and you\'re good to your friends, but you don\'t waste time with irritating or boring conversation. It\'s a good balance, but don\'t be too quick to shun potentially interesting people." },' +
'{desc:"You\'re so aloof, you make store mannequins look approachable. While giving some people the cold shoulder -- such as a dodgy person in a bar -- is smart, you could be preventing great people from reaching out to you. Surprisingly, your chilly demeanor probably comes from insecurity, not a superiority complex." } ]}';

// according to the given score, and map to its description 
function desc_score(total){
	document.getElementById("total_score").innerHTML = total;
	var obj = eval ("(" + scoreResultPairs + ")");

	if(total >= 10 && total <=15){
		document.getElementById("score_range").innerHTML = "10 - 15";
		document.getElementById("meaning").innerHTML = obj.quizResultdesc[0].desc;
	}
	else if(total >= 6 && total <= 9){
		document.getElementById("score_range").innerHTML = "6 - 9";
		document.getElementById("meaning").innerHTML = obj.quizResultdesc[1].desc;
	}
	else{
		document.getElementById("score_range").innerHTML = "1 - 5";
		document.getElementById("meaning").innerHTML = obj.quizResultdesc[2].desc;
	}
	
}

function resetForm(name){
	document.forms[name].reset();
	document.getElementById("scrollTop").click();
}

//for mad lib generator
// generate a story from form values

function madlib_generator()
{
		var myform = document.forms["madlib"];
		var name = myform.name.value;
		var fname = myform.fname.value;
		var name2 = myform.name2.value;
		var animal = myform.animal.value;
		var animal2 = myform.animal2.value;
		var animal3 = myform.animal3.value;
		var animal4 = myform.animal4.value;
		var food = myform.food.value;
		var iname = myform.iname.value;
		var cname = myform.cname.value;
		var season = myform.season.value;
		var adj = myform.adj.value;
		var email = myform.email.value;
		
		var txt = "<p>Jeremy and Marcus were camping by Mt. Pondy last winter when it began to snow "+
					"like horses and dragons. Their tent fell down and there wasn\'t much food"+
					"left. Marcus had only some chicken, and that was all! There was no one for miles!"+
					"<p>So they had to set out on their way to safety with only their backpacks and "+
					"computer. After hours of hiking, Jeremy spotted a green duck high in a tree, "+
					"watching them! \"Don\'t worry,\" said Marcus. \"The duck is not interested in humans "+ 
					"if you leave it alone. But that pidgeon over there sure seems angry about something!\""+
					"<p>The pidgeon was coming right at them growling and with what looked "+
					"like flaky teeth! The two climbed up a tree, and the pidgeon came ever closer. "+ 
					"Marcus and Jeremy were so scared! But when they looked again, it was only a baby pidgeon "+
					"that wanted to eat their yummy chicken.";
		
		var id_name = new Array("req_name","req_fname", "req_animal","req_animal2");
		var id_name2 = new Array("required_field1","required_field2", "required_field3","required_field4");
		var myArray3 = new Array(name, fname, animal, animal2);
		var msgs = new Array("Your name","Your friend's name","Animal's name","Another animal's name");
		
		check_email(email);
		
		if(name == "" || fname == "" || animal == "" || animal2 == "")
		{
			for(a=0; a<id_name.length; a++)
			{
				if(myArray3[a] == "")
				{
					document.getElementById(id_name[a]).style.display = "block";
					document.getElementById(id_name[a]).innerHTML = msgs[a] + " is required.";
					document.getElementById(id_name2[a]).style.backgroundColor = "yellow";
				}
				else
				{
					document.getElementById(id_name[a]).style.display = "none";
					document.getElementById(id_name2[a]).style.backgroundColor = "white";
				}
			}
		}
		
		
		else
		{
			
			for(j=0; j<id_name.length; j++)
			{
				document.getElementById(id_name[j]).style.display = "none";
				document.getElementById(id_name2[j]).style.backgroundColor = "white";
			}
			
			var myArray4 = new Array("Marcus", "Jeremy", "horses", "dragons");
			
			for(k=0; k<myArray3.length; k++)
			{
				var patt2 = new RegExp(myArray4[k], "g");
				txt = txt.replace(patt2,myArray3[k]);
			}
			
			
			var myArray = new Array(name2, animal3, animal4, food, iname, cname, adj);
			var myArray2 = new Array("Pondy", "duck", "pidgeon", "chicken","computer","green","flaky");
			
			for(i=0; i<myArray.length;i++)
			{
				if(myArray[i] != "")
				{
					var patt = new RegExp(myArray2[i],"g");
					txt = txt.replace(patt,myArray[i]);
				}
			}
				
			if(season != "")
			{
				if((season).toLowerCase() == "spring")
				{
					txt = txt.replace(/snow/g,"leaf");
				}
				if((season).toLowerCase() == "summer")
				{
					txt = txt.replace(/snow/g,"flower");
				}
				if((season).toLowerCase() == "autumn")
				{
					txt = txt.replace(/snow/g,"rain");
				}
				
					txt = txt.replace(/winter/g,season);
				
			}
			
			
			document.getElementById("story").style.display = "block";
			document.getElementById("story").innerHTML = txt;
		}
}
	
// in case, if email value has been filled in, then check such value is valid or not; and give error warning if it is invalid.	
	function check_email(email)
	{
		this.email = email;
		var atp = email.indexOf("@");
		var dotp = email.lastIndexOf(".");
		
		if(email != "")
		{
			if(atp <1 || (dotp - atp) <2)
			{
				document.getElementById("invalid").style.display = "block";
				document.getElementById("invalid").innerHTML = "This email address is invalid.";
				document.getElementById("invalid_email").style.backgroundColor = "yellow";
			}
		
			else
			{
				document.getElementById("invalid").style.display = "none";
				document.getElementById("invalid_email").style.backgroundColor = "#ebf5fc";
			}
		}
	}
	

function showMenu(id)
	{
		document.getElementById(id).style.visibility = "visible";
		
	}
	
function hideMenu(id)
	{
		document.getElementById(id).style.visibility = "hidden";
	}