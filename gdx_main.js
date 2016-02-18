// Item variables
var cookies = 0;
var tcookies = 0;

var children = 0;
var childrenCost = Math.floor(10 * Math.pow(1.1,children));
var childrenCps = 1;

var grandmas = 0;
var grandmasCost = Math.floor(100 * Math.pow(1.2,grandmas));
var grandmasCps = 5;

var factories = 0;
var factoriesCost = Math.floor(1000 * Math.pow(1.35,factories));
var factoriesCps = 20;

var cps = 0;

// High scores
var bestCookies = 0;
var bestCps = 0;



function cookieClick(number) {
	cookies += number;
	tcookies += number;
	updateResources();
};

function buyChildren() {
	if (cookies >= childrenCost) {
		children = children + 1;
		cookies = cookies - childrenCost;
		reload();
	};
};

function buyGrandmas() {
	if (cookies >= grandmasCost) {
		grandmas = grandmas + 1;
		cookies = cookies - grandmasCost;
		reload();
	};
};

function buyFactories() {
	if (cookies >= factoriesCost) {
		factories = factories + 1;
		cookies = cookies - factoriesCost;
		reload();
	};
};

function save() {
	var save = {
		cookies: cookies,
		tcookies: tcookies,
		cps: cps,
		children: children,
		childrenCost: childrenCost,
		childrenCps: childrenCps,
		grandmas: grandmas,
		grandmasCost: grandmasCost,
		grandmasCps: grandmasCps,
		factories: factories,
		factoriesCost: factoriesCost,
	};
	localStorage.setItem("save",JSON.stringify(save)); 
};

function load() {
	updateSavefile();
	reload();
};

function updateSavefile() {	
	// Savefiles 
	var highscore = JSON.parse(localStorage.getItem("highscore")); // Highscore Savefile
	var savegame = JSON.parse(localStorage.getItem("save")); 	   // Other Savefile
	
	// Attribute variables
	if (typeof savegame.cookies !== "undefined") cookies = savegame.cookies; 
	if (typeof savegame.cookies !== "undefined") tcookies = savegame.tcookies; 
	if (typeof savegame.cps !== "undefined") cps = savegame.cps; 
	if (typeof savegame.children !== "undefined") children = savegame.children; 
	if (typeof savegame.childrenCost !== "undefined") childrenCost = savegame.childrenCost; 
	if (typeof savegame.grandmas !== "undefined") grandmas = savegame.grandmas; 
	if (typeof savegame.grandmasCost !== "undefined") grandmasCost = savegame.grandmasCost;
	if (typeof savegame.factories !== "undefined") factories = savegame.factories;
	if (typeof savegame.factoriesCost !== "undefined") factoriesCost = savegame.factoriesCost;
	
	// Highscore elements
	if (typeof highscore.bestCookies !== "undefined") bestCookies = highscore.bestCookies;
	if (typeof highscore.bestCps !== "undefined") bestCps = highscore.bestCps;
	
};

function updateCosts() {
	childrenCost = Math.floor(10 * Math.pow(1.1, children));
	document.getElementById("childrenCost").innerHTML = formatNumber(childrenCost);
	grandmasCost = Math.floor(100 * Math.pow(1.2, grandmas));
	document.getElementById("grandmasCost").innerHTML = formatNumber(grandmasCost);
	factoriesCost = Math.floor(1000 * Math.pow(1.35,factories));
	document.getElementById("factoriesCost").innerHTML = formatNumber(factoriesCost);
};

function updateResources() {
	// Cookies & CPS
	document.getElementById("cookies").innerHTML = formatNumber(cookies);
	document.getElementById("tcookies").innerHTML = formatNumber(tcookies);
	cps = (children*childrenCps) + (grandmas*grandmasCps) + (factories*factoriesCps);
	
	// Cookie generators
	document.getElementById("children").innerHTML = formatNumber(children);
	document.getElementById("grandmas").innerHTML = formatNumber(grandmas);
	document.getElementById("factories").innerHTML = formatNumber(factories);
};

function updateRates() {
	document.getElementById("cps").innerHTML = formatNumber(cps);
};

function updateHighscore() {
	document.getElementById("bestCps").innerHTML = formatNumber(bestCps);
	document.getElementById("bestCookies").innerHTML = formatNumber(bestCookies);
};

function reset() {
	if (confirm("Are you sure you want to reset? All your progress and savefile will be lost!")) {
		localStorage.removeItem("save");
		allZero();
		reload();
	}
	else {
		reload();
	}
};

function allZero() {
	cookies = 0;
	tcookies = 0;
	children = 0;
	grandmas = 0;
	factories = 0;
	cps = 0;
	reload();
};

function saveHighscore() {
	if (tcookies > bestCookies) {
		bestCookies = tcookies;
	}
	
	if (cps > bestCps) {
		bestCps = cps;
	}
	
	updateHighscore();
	
	var highscoreSave = {
		bestCookies: bestCookies,
		bestCps: bestCps,
	};
	
	localStorage.setItem("highscore",JSON.stringify(highscoreSave)); 
};

function formatNumber (num) {
    return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,")
};

function reload() {
	updateCosts();
	updateResources();
	updateRates();
	saveHighscore();
};

window.setInterval(function() {
	cookieClick(children);
	cookieClick(5 * grandmas);
	cookieClick(10 * factories);
	save();
	reload();
}, 1000);
