function createDiv(){
	
	var ok = true;
	
	while(ok==true){
		var div = document.createElement('div');
		div.className='fight';
		
		div.innerHTML +="Fight details";
		document.getElementsByTagName('body')[0].appendChild(div);
		ok = false;
	}
	
	


}