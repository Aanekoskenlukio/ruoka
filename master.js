//Declare HTML DOM variables
var menuTitle = document.getElementById('title');
var regularMenuElement = document.getElementById('regularMenu');
var vegetarianMenuElement = document.getElementById('vegetarianMenu');
var regularMealTomorrow = document.getElementById('regularMealTomorrow');



//Get dates in yyyymmdd format
var today = new Date();
var tomorrow = new Date(new Date().getTime() + 24 * 60 * 60 * 1000);

var dayToday = today.getDate();
var monthToday = today.getMonth() + 1; //January 0th
var yearToday = today.getFullYear();

var dayTomorrow = tomorrow.getDate();
var monthTomorrow = tomorrow.getMonth() + 1;
var yearTomorrow = tomorrow.getFullYear();

if(dayToday < 10) {
	dayToday = '0' + dayToday;
}
if(monthToday < 10) {
	monthToday = '0' + monthToday;
}
if(dayTomorrow < 10) {
	dayTomorrow = '0' + dayTomorrow;
}
if(monthTomorrow < 10) {
	monthTomorrow = '0' + monthTomorrow;
}

var dateToday = "" + yearToday + monthToday + dayToday;
var dateTomorrow = "" + yearTomorrow + monthTomorrow + dayTomorrow;



//Mmake the returned array friendly for HTML
function parseData(menu) {
	var dataString = "";

	dataString += "<table>";
	for (var i = 0; i < menu.length; i++) {
		dataString += "<tr><td>";
		dataString += menu[i]["name"];
		dataString += "</td><td><u>";
		dataString += menu[i]["diets"];
		dataString += "</u></td></tr>";
	}
	dataString += "</table>";

	return dataString;
}



//Set request URL
//var proxyUrl = "https://crossorigin.me/"; //TODO: eradicate proxy use
var menuUrl = "http://www.jamix.fi/ruokalistapalvelu/rest/haku/menu/95710/8?lang=fi&date=";
//var url = proxyUrl + menuUrl;
var url = menuUrl;



//Get today's menu
$.get(url + dateToday, function(data) {
	//Parse response object into javascript arrays
	//Second index number points to specific menu
	var regularMenu = data[0]["menuTypes"][0]["menus"][0]["days"][0]["mealoptions"][0]["menuItems"];
	var vegetarianMenu = data[0]["menuTypes"][2]["menus"][0]["days"][0]["mealoptions"][0]["menuItems"];
										   // ^ Menu index

	//Parse js arrays into HTML tables
	var regularMenuString = parseData(regularMenu);
	var vegetarianMenuString = parseData(vegetarianMenu);

	//Modify HTML, print data on website
	regularMenuElement.innerHTML = regularMenuString;
	vegetarianMenuElement.innerHTML = vegetarianMenuString;
}).fail(function() {
	//Show error
	menuTitle.style.color = "red";
	menuTitle.innerHTML = "Verkkovirhe!"
	//Reload page and try again
	//window.location.reload();
});



/* Feature deprecated

//Get tomorrow's primary meal
$.get(url + dateTomorrow, function(data) {
	var regularMenu = data[0]["menuTypes"][0]["menus"][0]["days"][0]["mealoptions"][0]["menuItems"];
	regularMealTomorrow.innerHTML = regularMenu[0]["name"];
}).fail(function() {
	//menuTitle.style.color = "red";
	//menuTitle.innerHTML = "Päivitetään..."
	//window.location.reload();
	regularMealTomorrow.innerHTML = "verkkovirhe 404";
});

*/
