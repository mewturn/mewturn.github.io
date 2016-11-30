var content=["hello", "hi"];
var flag = true;
var div = document.createElement('div');
div.className='fight';

var trainee=[5,5,5,5];
var basic = [10,10,10,10];
var intermediate = [20,20,20,20];
var advance = [40,40,40,40];
var statistics=[3,3,50,10];

document.getElementById('points').innerHTML=statistics[0];
document.getElementById('level').innerHTMl = statistics[1];
document.getElementById('wins').innerHTMl = statistics[2];
document.getElementById('loss').innerHTMl = statistics[3];


function createDiv(){
	
	if (flag==true){
		div.innerHTML = content[0];
		document.getElementsByTagName('body')[0].appendChild(div);
		flag= false;	

	}else{
		div.innerHTML = content[1];
		document.getElementsByTagName('body')[0].appendChild(div);
		flag=true;
	}
	setTimeout(createDiv, 1000);


}

function populate(x){
		if (x=='trainee'){
			document.getElementById('strength').innerHTML = trainee[0];
			document.getElementById('dexterity').innerHTML = trainee[1];
			document.getElementById('constitution').innerHTML = trainee[2];
			document.getElementById('intelligence').innerHTML = trainee[3];
		
			
		}else if (x=='basic'){
			document.getElementById('strength').innerHTML = basic[0];
			document.getElementById('dexterity').innerHTML = basic[1];
			document.getElementById('constitution').innerHTML = basic[2];
			document.getElementById('intelligence').innerHTML = basic[3];
			
		}else if (x=='intermediate'){
			document.getElementById('strength').innerHTML = intermediate[0];
			document.getElementById('dexterity').innerHTML = intermediate[1];
			document.getElementById('constitution').innerHTML = intermediate[2];
			document.getElementById('intelligence').innerHTML = intermediate[3];
			
		}else{
			document.getElementById('strength').innerHTML = advance[0];
			document.getElementById('dexterity').innerHTML = advance[1];
			document.getElementById('constitution').innerHTML = advance[2];
			document.getElementById('intelligence').innerHTML = advance[3];			
			
		}
			
}

function add(x){
	
		if(statistics[0]==0){
			alert('earn more points');
		}else{
			if (x=='strength'){
				var temp = document.getElementById('strength_self').innerHTML ;
				temp++;
				document.getElementById('strength_self').innerHTML= temp
				var point = statistics[0];
				point--;
				statistics[0]=point;
				document.getElementById('points').innerHTML=statistics[0];

			
				
			}else if (x=='dexterity'){
				
				var temp = document.getElementById('dexterity_self').innerHTML ;
				temp++;
				document.getElementById('dexterity_self').innerHTML= temp
				var point = statistics[0];
				point--;
				statistics[0]=point;
				document.getElementById('points').innerHTML=statistics[0];

				
			}else if (x=='constitution'){
				var temp = document.getElementById('constitution_self').innerHTML ;
				temp++;
				document.getElementById('constitution_self').innerHTML= temp
				var point = statistics[0];
				point--;
				statistics[0]=point;
				document.getElementById('points').innerHTML=statistics[0];

				
			}else{
				var temp = document.getElementById('intelligence_self').innerHTML ;
				temp++;
				document.getElementById('intelligence_self').innerHTML= temp;
				var point = statistics[0];
				point--;
				statistics[0]=point;
				document.getElementById('points').innerHTML=statistics[0];
				
			}
		}
			
}