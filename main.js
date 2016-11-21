var elem = document.getElementById("myBar");
var health = 100;
var currenthealth = health;
var exp = 0;
var level = 1;
var damage = 15;

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
		
	elem.style.width = (currenthealth/health) * 100 + '%';
	document.getElementById("label").innerHTML = currenthealth;
	document.getElementById("myExp").innerHTML = exp;
	document.getElementById("myDamage").innerHTML = damage;
	document.getElementById("myLevel").innerHTML = level;
}
