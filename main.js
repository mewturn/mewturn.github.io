// Player attributes
var elem = document.getElementById("myBar");
var exp = 0;
var level = 1;
var baseDamage = 15;
var damageGrowth = 1.1;
var totalDamageGain = 0;
var damage = baseDamage + totalDamageGain;

// Monster attributes
var health = 100;
var currentHealth = health;
var monsters = ['Salmon', 'Trout', 'Shark', 'Stingray'];
var currentMonster = monsters[Math.floor(Math.random() * monsters.length)];
var monsterLevel = Math.floor(Math.random() * level + 1);

// Item attributes - equal chance for each drop, different chance for rarity of drop
var drops = ['Helmet', 'Armor', 'Legs', 'Sword', 'Axe', 'Mace'];
var description = ['Unique', 'Rare', 'Uncommon', ''];
var rarity = [0.999, 0.95, 0.8, 0.7];
var roll = Math.random();
var item = "";
var itemDamage;
var itemDamageMult = [100, 10, 5, 2];
var itemLevel = monsterLevel; 
var itemBonus = [];
var damageGain = 0;

// Global attributes
var expBonus = 100;
var expGain = Math.floor(monsterLevel * expBonus);
var levelGrowth = 1.01
var levelUp = Math.floor(Math.pow((level * levelGrowth), 2) * 100);
var lootButton = document.getElementById("lootButton");
var display = "";
var inventory = "";
var reward = []; 
var status = "";		// Status message

// "Attack" 
function move() {
	
	// If monster doesn't die
	if (currentHealth > damage) {
		currentHealth = currentHealth - damage;
    } 
	
	// If monster dies
	else {
		health = Math.floor(Math.pow(Math.random() * monsterLevel, 2) * 100);
		currentHealth = health;
		exp = exp + expGain;
		
		// If exp is more than the required exp to level up, increase level by 1 and increase base damage
		if (exp >= levelUp) {
			exp = exp % levelUp;
			level++;
			baseDamage = Math.round(baseDamage * damageGrowth);
		}
		
		// Choose a new monster
		createNewMonster();
		
		// Roll for a drop
		itemDrop();
	}
	reload();
}

// "Create a new monster"
function createNewMonster() {
	currentMonster = monsters[Math.floor(Math.random() * monsters.length)];
	monsterLevel = Math.floor(Math.random() * level + 1);
	
	reload();
};

// "Roll for an item drop"
function itemDrop() {
	roll = Math.random();
	
	for (i = 0; i < description.length; i++) {
		if (roll >= rarity[i]) {
			// Generate the item and the damage it gives when "equipped"
			item = drops[Math.floor(Math.random() * drops.length)];
			itemDamage = itemLevel * itemDamageMult[Math.floor(Math.random() * itemDamageMult.length)];
			
			// Save the item and its states in the lists
			reward.push(description[i] + " " + item);
			itemBonus.push(itemDamage);
			
			// Display the item on the main page
			status = "Item dropped!";
			display += " You found a(n) " + description[i] + " " + item + "! <br>"; 
			
			// Add the button to loot the drop
			addButton();
			break;
		}
	}
	
	reload();
};

// Generate "Loot" button
function addButton() {
	lootButton.style.visibility = "visible";
};

// Remove "Loot" button
function removeButton() {
	lootButton.style.visibility = "hidden";
};

// "Loot item drop"
function lootDrop() {
	removeButton();
	display = "";			// Resets the display
	
	for (i = 0; i < reward.length; i++) {
		inventory += reward[i] + "<br>";		// Add rewards to the inventory tab
		damageGain += itemBonus[i];				// Add item damage bonus to the character
		
		// Removes the item from the memory lists
		reward.splice(i, 1);
		itemBonus.splice(i, 1);
	}
	status = damageGain + " damage gained!";	// Prints status message
	totalDamageGain += damageGain;				// Updates the total damage gain
	damageGain = 0;								// Resets the iterated damage gain to 0
	
	reload();
};


// Equip item



// Save game
function save() {
	var save = {
		// Player attributes
		exp: exp,
		level: level,
		baseDamage: baseDamage,
		totalDamageGain: totalDamageGain,
		
		// Monster attributes
		health: health,
		currentHealth: currentHealth,
		currentMonster: currentMonster,
		monsterLevel: monsterLevel,
		
		// Global attributes
		inventory: inventory,
		
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
	
	// Player attributes
	if (typeof savegame.exp !== "undefined") exp = savegame.exp; 
	if (typeof savegame.level !== "undefined") level = savegame.level; 
	if (typeof savegame.baseDamage !== "undefined") baseDamage = savegame.baseDamage;
	if (typeof savegame.totalDamageGain !== "undefined") totalDamageGain = savegame.totalDamageGain;
	
	//  Monster attributes
	if (typeof savegame.health !== "undefined") health = savegame.health; 
	if (typeof savegame.currentHealth !== "undefined") currentHealth = savegame.currentHealth; 
	if (typeof savegame.currentMonster !== "undefined") currentMonster = savegame.currentMonster;
	if (typeof savegame.monsterLevel !== "undefined") monsterLevel = savegame.monsterLevel;
	
	// Global attributes
	if (typeof savegame.reward !== "undefined") reward = savegame.reward;
	if (typeof savegame.inventory !== "undefined") inventory = savegame.inventory;
	if (typeof savegame.itemBonus !== "undefined") itemBonus = savegame.itemBonus;
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


function allZero() {
	// Sets all attributes to default values
	health = 100;
	currentHealth = health;
	exp = 0;
	level = 1;
	damage = 15;
	
	// Creates a new monster
	createNewMonster();
	
	// Clear inventory
	inventory = "";
	
	reload();
};

function reload() {	
	// Player attributes
	damage = baseDamage + totalDamageGain;								// Calculating total damage
	document.getElementById("myExp").innerHTML = exp;					// Current EXP
	levelUp = Math.floor(Math.pow((level * levelGrowth),2) * 100);		// Calculating EXP for next Level
	document.getElementById("expTNL").innerHTML = levelUp;				// EXP for Next Level
	document.getElementById("myDamage").innerHTML = damage;				// Current Damage
	document.getElementById("myLevel").innerHTML = level;				// Current Level
	
	// Monster attributes
	elem.style.width = (currentHealth/health) * 100 + '%';				// Current Health Bar
	document.getElementById("label").innerHTML = currentHealth;			// Current Health
	document.getElementById("monster").innerHTML = currentMonster;		// Current Monster Name
	document.getElementById("monsterLevel").innerHTML = monsterLevel;	// Current Monster Level
	
	// Item attributes
	document.getElementById("itemDrop").innerHTML = display;			// Item Drop Rewards
	document.getElementById("inventory").innerHTML = inventory;			// Inventory
	
	// Global attributes
	document.getElementById("status").innerHTML = status; 				// Status message display
	
};

window.setInterval(function() {
	save();
}, 1000);