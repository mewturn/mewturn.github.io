// Player attributes
var elem = document.getElementById("myBar");
var exp = 0;
var level = 1;
var damage = 15;
var damageGain = 1.1;

// Creature attributes
var health = 100;
var currentHealth = health;
var healthGain = 1.07;
var monsters = ['Salmon', 'Trout', 'Shark', 'Stingray']
var currentMonster = monsters[Math.floor(Math.random() * monsters.length)];
var monsterLevel = Math.floor(Math.random() * level + 1)

// Global attributes
var expBonus = 100;
var expGain = Math.floor(monsterLevel * expBonus);
var levelGrowth = 1.01
var levelUp = Math.floor(Math.pow((level * levelGrowth),2) * 100);

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
		createNewMonster();
	}
	reload();
}

// "Create a new monster"
function createNewMonster() {
	currentMonster = monsters[Math.floor(Math.random() * monsters.length)];
	monsterLevel = Math.floor(Math.random() * level + 1);
	
	reload();
};





// Save game
function save() {
	var save = {
		health: health,
		currentHealth: currentHealth,
		exp: exp,
		level: level,
		damage: damage,
		currentMonster: currentMonster,
		monsterLevel: monsterLevel,
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
	if (typeof savegame.monsterLevel !== "undefined") monsterLevel = savegame.monsterLevel;
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
	// Player attributes
	document.getElementById("myExp").innerHTML = exp;					// Current EXP
	levelUp = Math.floor(Math.pow((level * levelGrowth),2) * 100);		// Calculating EXP for next Level
	document.getElementById("expTNL").innerHTML = levelUp;				// EXP for Next Level
	document.getElementById("myDamage").innerHTML = damage;				// Current Damage
	document.getElementById("myLevel").innerHTML = level;				// Current Level
	
	// Monster attributes
	elem.style.width = (currentHealth/health) * 100 + '%';				// Current Health Bar
	document.getElementById("label").innerHTML = currentHealth;			// Current Health
	document.getElementById("monster").innerHTML = currentMonster;		// Current Monster Name
	document.getElementById("monsterLevel").innerHTML = monsterLevel	// Current Monster Level
	
};

window.setInterval(function() {
	save();
}, 1000);