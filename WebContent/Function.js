document.getElementById("toJSON").addEventListener("click", function(e) {
  var json = [];
  var labels = $('.drag').toArray;
  // for(var i =0; i<labels.length; i++){
  // var position = $labels[i].position;
  // var x = position.left
  // var y = position.top
  // var width = $labels[i].width;
  // var height = $labels[i].height;
  // var text = $labels[i].text;
  // var labelInfo=" 'type' : 'label', 'text' : '"+text+"', 'x' :'" +x+"', 'y' : ''"+y+"'"
  // json.push(labelInfo);
  // }
  $(".lbl").each(function(index) {
    var position = $(this).position();
    var x = position.left;
    var y = position.top;
    var width = $(this).width();
    var height = $(this).height();
		var component = {};
		component["type"] = "label";
		component["text"] = $(this).text();
		component["x"] = x;
		component["y"] = y;
		component["width"] = width;
		component["height"] = height;
		json.push(component);
  });
  $(".txtfld").each(function(index) {
    var position = $(this).position();
    var x = position.left;
    var y = position.top;
    var width = $(this).width();
    var height = $(this).height();
		var component = {};
		component["type"] = "textfield";
		component["text"] = $(this).text();
		component["x"] = x;
		component["y"] = y;
		component["width"] = width;
		component["height"] = height;
		json.push(component);
  });
  $(".btn").each(function(index) {
    var position = $(this).position();
    var x = position.left;
    var y = position.top;
    var width = $(this).width();
    var height = $(this).height();
		var component = {};
		component["type"] = "button";
		component["text"] = $(this).val();
		component["x"] = x;
		component["y"] = y;
		component["width"] = width;
		component["height"] = height;
		json.push(component);
  });
	console.log(json);
  // console.log('Labels: '+labels.length);
  //
  // var html = document.getElementById("screen").innerHTML;
  // var json = window.himalaya.parse(html)
  // console.log('json:', json)
     download(JSON.stringify(json), 'UIDesign.json', 'application/json');
});

function download(text, name, type) {
  var a = document.createElement("a");
  var file = new Blob([text], {
    type: type
  });
  a.href = URL.createObjectURL(file);
  a.download = name;
  a.click();
}


function work() {
  $(".drag").draggable({
    cancel: false
  });
}
document.getElementById("addTxtfld").addEventListener("click", function(e) {
  e.preventDefault();
  var html = document.getElementById("screen").innerHTML += "<input class='drag txtfld' type='text'></input> ";
  eval(work());
})
document.getElementById("addLbl").addEventListener("click", function(e) {
  e.preventDefault();
  var html = document.getElementById("screen").innerHTML += "<label class='drag lbl'>I AM A TEXT</label>";;
  eval(work());
})
document.getElementById("addBtn").addEventListener("click", function(e) {
  e.preventDefault();
  var html = document.getElementById("screen").innerHTML += "<input class='drag btn' type='submit' value='I AM A BUTTON'></input>";
  eval(work());
})
