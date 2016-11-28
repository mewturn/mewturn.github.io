// Player attributes
var elem = document.getElementById("myBar");
var exp = 0;
var level = 1;
var damage = 15;
var damageGain = 1.1;

// Creature attributes
var health = 100;
var currentHealth = health;
var healthGain = 1.2;
var monsters = ['Salmon', 'Trout', 'Shark', 'Stingray']
var currentMonster = monsters[Math.floor(Math.random() * monsters.length)];

// Global attributes
var expGain = 25;
var levelUp = level * 100;

// "Attack" 
function move() {

	if (currentHealth > damage) {
		currentHealth = currentHealth - damage;
    } 
	else {
		health = Math.round(health * healthGain);
		currentHealth = health;
		damage = Math.round(damage * damageGain);
		exp = exp + expGain;
		
		// If exp is more than the required exp to level up, increase level by 1
		if (exp >= levelUp) {
			exp = exp % levelUp;
			level++;
		}
		
		// Choose a new monster
		currentMonster = monsters[Math.floor(Math.random() * monsters.length)];
	}
	reload();
}

// Save game
function save() {
	var save = {
		health: health,
		currentHealth: currentHealth,
		exp: exp,
		level: level,
		damage: damage,
		currentMonster: currentMonster,
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
	if (typeof savegame.currentHealth !== "undefined") currentHealth = savegame.currentHealth; 
	if (typeof savegame.exp !== "undefined") exp = savegame.exp; 
	if (typeof savegame.level !== "undefined") level = savegame.level; 
	if (typeof savegame.damage !== "undefined") damage = savegame.damage; 
	if (typeof savegame.currentMonster !== "undefined") currentMonster = savegame.currentMonster;
};

// Resets the game save file
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

// Sets all attributes to default values
function allZero() {
	health = 100;
	currentHealth = health;
	exp = 0;
	level = 1;
	damage = 15;
	reload();
};

function reload() {
	elem.style.width = (currentHealth/health) * 100 + '%';
	document.getElementById("label").innerHTML = currentHealth;
	document.getElementById("myExp").innerHTML = exp;
	document.getElementById("myDamage").innerHTML = damage;
	document.getElementById("myLevel").innerHTML = level;
	document.getElementById("monster").innerHTML = currentMonster;
};

window.setInterval(function() {
	save();
}, 1000);