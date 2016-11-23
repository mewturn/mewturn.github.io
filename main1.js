var content=["hello", "hi"];
var flag = true;
var div = document.createElement('div');
div.className='fight';

function createDiv(){
	
	var ok = true;

	
	while(ok==true){
		
		if (flag==true){
			div.innerHTML = content[0];
			document.getElementsByTagName('body')[0].appendChild(div);
			flag= false;	

		}else{
			div.innerHTML = content[1];
			document.getElementsByTagName('body')[0].appendChild(div);
			flag=true;
		}
			
		ok=false;
	}
	
	


}

setInterval('createDiv()', 1000);