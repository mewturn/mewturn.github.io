var cookies = 0;
var children = 0;
var childrenCost = 10;
var childrenCps = 1;

var grandmas = 0;
var grandmasCost = 100;
var grandmasCps = 5;

var factories = 0;
var factoriesCost = 1000;
var factoriesCps = 20;

var cps = 0;

function cookieClick(number) {
	cookies = cookies + number;
	updateResources();
};

function buyChildren() {
	var childrenCost = Math.floor(10 * Math.pow(1.1,children));
	if (cookies >= childrenCost) {
		children = children + 1;
		cookies = cookies - childrenCost;
		cps = cps + childrenCps
		reload();
	};
};

function buyGrandmas() {
	var grandmasCost = Math.floor(100 * Math.pow(1.2,grandmas));
	if (cookies >= grandmasCost) {
		grandmas = grandmas + 1;
		cookies = cookies - grandmasCost;
		reload();
	};
};

function buyFactories() {
	var factoriesCost = Math.floor(1000 * Math.pow(1.35,factories));
	if (factories >= factoriesCost) {
		factories = factories + 1;
		cookies = cookies - factoriesCost;
		reload();
	};
};

function save() {
	var save = {
		cookies: cookies,
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
	var savegame = JSON.parse(localStorage.getItem("save")); 		
	if (typeof savegame.cookies !== "undefined") cookies = savegame.cookies; 
	if (typeof savegame.children !== "undefined") children = savegame.children; 
	if (typeof savegame.childrenCost !== "undefined") childrenCost = savegame.childrenCost; 
	if (typeof savegame.grandmas !== "undefined") grandmas = savegame.grandmas; 
	if (typeof savegame.grandmasCost !== "undefined") grandmasCost = savegame.grandmasCost;
	if (typeof savegame.factories !== "undefined") factories = savegame.factories;
	if (typeof savegame.factoriesCost !== "undefined") factoriesCost = savegame.factoriesCost;
	reload();
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
	document.getElementById("cookies").innerHTML = formatNumber(cookies);
	document.getElementById("children").innerHTML = formatNumber(children);
	document.getElementById("grandmas").innerHTML = formatNumber(grandmas);
	document.getElementById("factories").innerHTML = formatNumber(factories);
};

function updateRates() {
	document.getElementById("cps").innerHTML = cps;
};

function reset() {
	localStorage.removeItem("save");
	reload();
};

function formatNumber (num) {
    return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,")
}

function reload() {
	updateCosts();
	updateResources();
	updateRates();
};

window.setInterval(function() {
	cookieClick(children);
	cookieClick(5 * grandmas);
	cookieClick(10 * factories);
	save();
}, 1000);
