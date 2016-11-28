// Item variables
var elem = document.getElementById("myBar");
var health = 100;
var currenthealth = health;
var exp = 0;
var level = 1;
var damage = 15;

// "Attack" 
function move() {

	if (currenthealth > damage) {
		currenthealth = currenthealth - damage;
    } 
	else {
		health = Math.round(health * 1.2);
		currenthealth = health;
		damage = Math.round(damage * 1.1);
		exp = exp + 33;
		if (exp >= 100) {
			exp = exp % 100;
			level++;
		}
	}
	reload();
}

// Save game
function save() {
	var save = {
		health: health,
		currenthealth: currenthealth,
		exp: exp,
		level: level,
		damage: damage,
	};
	localStorage.setItem("save",JSON.stringify(save)); 
};

// Load game
function load() {
	updateSavefile();
	reload();
};

function updateSavefile() {	
	// Savefiles 
	var savegame = JSON.parse(localStorage.getItem("save")); // Main Savefile
	
	// Attribute variables
	if (typeof savegame.health !== "undefined") health = savegame.health; 
	if (typeof savegame.currenthealth !== "undefined") currenthealth = savegame.currenthealth; 
	if (typeof savegame.exp !== "undefined") exp = savegame.exp; 
	if (typeof savegame.level !== "undefined") level = savegame.level; 
	if (typeof savegame.damage !== "undefined") damage = savegame.damage; 
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
	health = 100;
	currenthealth = health;
	exp = 0;
	level = 1;
	damage = 15;
	reload();
};

function reload() {
	elem.style.width = (currenthealth/health) * 100 + '%';
	document.getElementById("label").innerHTML = currenthealth;
	document.getElementById("myExp").innerHTML = exp;
	document.getElementById("myDamage").innerHTML = damage;
	document.getElementById("myLevel").innerHTML = level;
};

window.setInterval(function() {
	save();
}, 1000);