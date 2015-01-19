var cookies = 0;
var children = 0;
var childrenCps = 1;

var grandmas = 0;
var grandmasCps = 5;

var bakerys = 0;
var bakerysCps = 30;

function cookieClick(number) {
	cookies = cookies + number;
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

function buyBakerys() {
	if (cookies >= bakerysCost) {
		bakerys = bakerys + 1;
		cookies = cookies - bakerysCost;
		reload();
	};
};


function save() {
	var save = {
		cookies: cookies,
		children: children,
		childrenCost: childrenCost,
		grandmas: grandmas,
		grandmasCost: grandmasCost,
		bakerys: bakerys,
		bakerysCost: bakerysCost
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
	if (typeof savegame.bakerys !== "undefined") bakerys = savegame.bakerys; 
	if (typeof savegame.bakerysCost !== "undefined") bakerysCost = savegame.bakerysCost; 
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
	grandmasCost = Math.floor(100 * Math.pow(1.2,grandmas));
	document.getElementById("grandmasCost").innerHTML = formatNumber(grandmasCost);
	bakerysCost = Math.floor(500 * Math.pow(1.3,bakerys));
	document.getElementById("bakerysCost").innerHTML = formatNumber(bakerysCost);
};

function updateResources() {
	document.getElementById("cookies").innerHTML = formatNumber(cookies);
	document.getElementById("children").innerHTML = formatNumber(children);
	document.getElementById("grandmas").innerHTML = formatNumber(grandmas);
	document.getElementById("bakerys").innerHTML = formatNumber(bakerys);
};

function updateRates() {
	document.getElementById("cps").innerHTML = (childrenCps * children) + (grandmasCps * grandmas) + (bakerysCps * bakerys);
	document.getElementById("childrenCps").innerHTML = formatNumber(childrenCps);
	document.getElementById("grandmasCps").innerHTML = formatNumber(grandmasCps);
	document.getElementById("bakerysCps").innerHTML = formatNumber(bakerysCps);
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
	cookieClick(30 * bakerys);
	save();
}, 1000);
