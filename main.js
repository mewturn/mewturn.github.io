var cookies = 0;
var children = 0;
var childrenCost = 10;
var grandmas = 0;
var grandmasCost = 100;

function cookieClick(number) {
	cookies = cookies + number;
	updateResources();
};

function buyChildren() {
	var childrenCost = Math.floor(10 * Math.pow(1.1,children));
	if (cookies >= childrenCost) {
		children = children + 1;
		cookies = cookies - childrenCost;
		reload();
	};
};

function buyGrandmas() {
	var grandmasCost = Math.floor (100 * Math.pow(1.3,grandmas));
	if (cookies >= grandmasCost) {
		grandmas = grandmas + 1;
		cookies = cookies - grandmasCost;
		reload();
	};
};

function save() {
	var save = {
		cookies: cookies,
		children: children,
		childrenCost: childrenCost,
		grandmas: grandmas,
		grandmasCost: grandmasCost
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
	reload();
};

function reload() {
	updateCosts();
	updateResources();
	updateRates();
};

function updateCosts() {
	childrenCost = Math.floor(10 * Math.pow(1.1, children));
	document.getElementById("childrenCost").innerHTML = formatNumber(childrenCost);
	grandmasCost = Math.floor(100 * Math.pow(1.3,grandmas));
	document.getElementById("grandmasCost").innerHTML = formatNumber(grandmasCost);
};

function updateResources() {
	document.getElementById("cookies").innerHTML = formatNumber(cookies);
	document.getElementById("children").innerHTML = formatNumber(children);
	document.getElementById("grandmas").innerHTML = formatNumber(grandmas);
};

function updateRates() {
	document.getElementById("cps").innerHTML = children + (5 * grandmas);
};

function reset() {
	localStorage.removeItem("save");
};

function formatNumber (num) {
    return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,")
}

window.setInterval(function() {
	cookieClick(children);
	cookieClick(5 * grandmas);
	save();
}, 1000);
