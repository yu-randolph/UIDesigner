
document.getElementById("toJSON").addEventListener("click", function(e) { 
	var html = document.getElementById("screen").outerHTML;
	var json = window.himalaya.parse(html)
	console.log('json:', json)
});

function work(){
    $(".drag").draggable({
    	cancel:false
    });
}
document.getElementById("addTxtfld").addEventListener("click", function(e){
	e.preventDefault();
	var html = document.getElementById("screen").innerHTML+="<input class='drag txtfld' type='text'></input> ";
	eval(work());
})
document.getElementById("addLbl").addEventListener("click", function(e){
	e.preventDefault();
	var html = document.getElementById("screen").innerHTML+="<label class='drag lbl'>I AM A TEXT</label>";;
	eval(work());
})
document.getElementById("addBtn").addEventListener("click", function(e){
	e.preventDefault();
	var html = document.getElementById("screen").innerHTML+="<input class='drag btn' type='submit' value='I AM A BUTTON'></input>";
	eval(work());
})
