var mariana = {
  parse : function(json){
	  console.log('wqd')
    return mariana.checkFragment(json);
  },
  checkFragment : function(arr){
    var out = '';
    for(fragment of arr){
console.log(fragment.type)
      switch(fragment.type){
        case "Element": out += mariana.element(fragment); break;
        case "Text": console.log("text: "+fragment.content);out += fragment.content; break;
        case "comment": out += '<!--'+fragment.content+'-->'; break;
      }
    }

    return out;
  },
  element : function(obj){
	  console.log(obj.tagName + "---")
  	var out = '<'+obj.tagName+mariana.attributes(obj)+'>';
    var voidTags = [
	"!doctype", "area", "base", "br", "col", "command",
	"embed", "hr", "img", "input", "keygen", "link",
	"meta", "param", "source", "track", "wbr"];

    if(voidTags.indexOf(obj.tagName) === -1){

      if(typeof obj.children !== 'undefined'){
        out += mariana.checkFragment(obj.children);
      }

      out += '</'+obj.tagName+'>';
    }

    return out;
  },
  attributes : function(obj){
      var out = [];
    console.log(obj.attributes.id + "-id");
      if(typeof obj.attributes.id !== 'undefined'){
        out[out.length] = 'id="'+obj.attributes.id+'"';
      }

      if(typeof obj.attributes.className !== 'undefined'){
        var cccla= 'class="'+obj.attributes.className+'"';
		var ccclar = cccla.replace(/,/g,' ')
		console.log(ccclar)
		out[out.length] = ccclar
      }

      if(typeof obj.attributes.dataset !== 'undefined'){
        for(key in obj.dataset){
          out[out.length] = 'data-'+key+'="'+obj.attributes.dataset[key]+'"';
        }
      }

      var excluded = ['id', 'tagName', 'className', 'dataset', 'children', 'kind'];

      for(key in obj.attributes){
		  console.log(key+"---key")
		 if (key == 'style'){
			 out[out.length] = 'style="'
			 for(s in obj.attributes[key]){
				 out[out.length] = s+': '+obj.attributes[key][s]+';';
			 }
			 out[out.length] = '"';
		 }

        else if(excluded.indexOf(key) == -1){
          out[out.length] = key+'="'+obj.attributes[key]+'"';
        }
      }
      return out.length !== 0 ? ' '+out.join(' ') : '';
  }
};

document.getElementById("toJSON").addEventListener("click", function(e) {
  var json = [];
  $(".label").each(function(index) {
    var position = $(this).parent().position();
    var x = position.left;
    var y = position.top;
    var width = $(this).parent().width();
    var height = $(this).parent().height();
		var component = {};
		component["type"] = "label";
		component["text"] = $(this).text();
		component["x"] = x;
		component["y"] = y;
		component["width"] = width;
		component["height"] = height;
		json.push(component);
  });
  $(".textfield").each(function(index) {
    var position = $(this).parent().position();
    var x = position.left;
    var y = position.top;
    var width = $(this).parent().width();
    var height = $(this).parent().height();
		var component = {};
		component["type"] = "textfield";
		component["text"] = $(this).val();
		component["x"] = x;
		component["y"] = y;
		component["width"] = width;
		component["height"] = height;
		json.push(component);
  });
  $(".button").each(function(index) {
    var position = $(this).parent().position();
    var x = position.left;
    var y = position.top;
    var width = $(this).parent().width();
    var height = $(this).parent().height();
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
    download(JSON.stringify(json), 'UIDesign.json', 'application/json');
});


var filename
function showname () {
	var name = document.getElementById('fileInput');
	filename = name.files.item(0).name;
	console.log('Selected file: ' + filename);

	readTextFile("/Users/Bryan/Downloads/"+filename, function(text){
		var json = JSON.parse(text);
		document.getElementById("screen").innerHTML = ''+ mariana.parse(json)+'';
		console.log(json);
	});
}

function readTextFile(file, callback) {
	console.log('http request: '+file)
    var rawFile = new XMLHttpRequest();
    rawFile.overrideMimeType("application/json");
    rawFile.open("GET", file, true);
	console.log('getting ready')
    rawFile.onreadystatechange = function() {
		//console.log('calling back'+rawFile.readyState + ", "+rawFile.status)
		//console.log(rawFile.responseText)
        if (rawFile.readyState === 4 && rawFile.status == "0") {
            callback(rawFile.responseText);
        }
		//console.log('error')
    }
    rawFile.send(null);
}

function download(text, name, type) {
    var a = document.createElement("a");
    var file = new Blob([text], {type: type});
    a.href = URL.createObjectURL(file);
    a.download = name;
    a.click();
}


function work(){
    $(".drag").draggable({
    	cancel:false
    });

	$( '.draggable' ).draggable().on('click', function(){
    if ( $(this).is('.ui-draggable-dragging') ) {
        return;
    } else {
        $(this).draggable( 'option', 'disabled', true );
        $(this).prop('contenteditable','true');
        $(this).css('cursor', 'text');
    }
})
.on('blur', function(){
    $(this).draggable( 'option', 'disabled', false);
    $(this).prop('contenteditable','false');
    $(this).css('cursor', 'move');
});
}

var wrapper1 = "<div class='resizable draggable'>"
var wrapper2 = '<div class="ui-resizable-handle ui-resizable-nw"></div>'+
    '<div class="ui-resizable-handle ui-resizable-ne"></div>'+
    '<div class="ui-resizable-handle ui-resizable-sw"></div>'+
    '<div class="ui-resizable-handle ui-resizable-se"></div>'+
    '<div class="ui-resizable-handle ui-resizable-n"></div>'+
    '<div class="ui-resizable-handle ui-resizable-s"></div>'+
    '<div class="ui-resizable-handle ui-resizable-e"></div>'+
    '<div class="ui-resizable-handle ui-resizable-w"></div>'+
'</div>'

document.getElementById("addTxtfld").addEventListener("click", function(e){
	e.preventDefault();
	var ab = $(wrapper1 +"<input class='textfield' type='text'></input> "+wrapper2).draggable().on('click', function(){

	if ( $(this).is('.ui-draggable-dragging') ) {
        return;
    } else {
        $(this).draggable( 'option', 'disabled', true );
        $(this).prop('contenteditable','true');
        $(this).css('cursor', 'text');
    }
})
.on('blur', function(){
    $(this).draggable( 'option', 'disabled', false);
    $(this).prop('contenteditable','false');
    $(this).css('cursor', 'move');
});
var ab1 = $(ab).resizable({
    handles: {
        'nw': '.ui-resizable-nw',
        'ne': '.ui-resizable-ne',
        'sw': '.ui-resizable-sw',
        'se': '.ui-resizable-se',
        'n': '.ui-resizable-n',
        'e': '.ui-resizable-e',
        's': '.ui-resizable-s',
        'w': '.ui-resizable-w'
    }
});
	$('#screen').append(ab1);
	eval(work());
})
document.getElementById("addLbl").addEventListener("click", function(e){
	e.preventDefault();

	var ab3 = $(wrapper1 +"<label class='label'>I AM A TEXT</label> "+wrapper2).draggable().on('click', function(){

	if ( $(this).is('.ui-draggable-dragging') ) {
        return;
    } else {
        $(this).draggable( 'option', 'disabled', true );
        $(this).prop('contenteditable','true');
        $(this).css('cursor', 'text');
    }
})
.on('blur', function(){
    $(this).draggable( 'option', 'disabled', false);
    $(this).prop('contenteditable','false');
    $(this).css('cursor', 'move');
});
var ab4 = $(ab3).resizable({
    handles: {
        'nw': '.ui-resizable-nw',
        'ne': '.ui-resizable-ne',
        'sw': '.ui-resizable-sw',
        'se': '.ui-resizable-se',
        'n': '.ui-resizable-n',
        'e': '.ui-resizable-e',
        's': '.ui-resizable-s',
        'w': '.ui-resizable-w'
    }
});
	$('#screen').append(ab4);
	eval(work());
})
document.getElementById("addBtn").addEventListener("click", function(e){
	e.preventDefault();

		var ab5 = $(wrapper1 +"<input class='button' type='submit' value='I AM A BUTTON'></input>"+wrapper2).draggable().on('click', function(){

	if ( $(this).is('.ui-draggable-dragging') ) {
        return;
    } else {
        $(this).draggable( 'option', 'disabled', true );
        $(this).prop('contenteditable','true');
        $(this).css('cursor', 'text');
    }
})
.on('blur', function(){
    $(this).draggable( 'option', 'disabled', false);
    $(this).prop('contenteditable','false');
    $(this).css('cursor', 'move');
});
var ab6 = $(ab5).resizable({
    handles: {
        'nw': '.ui-resizable-nw',
        'ne': '.ui-resizable-ne',
        'sw': '.ui-resizable-sw',
        'se': '.ui-resizable-se',
        'n': '.ui-resizable-n',
        'e': '.ui-resizable-e',
        's': '.ui-resizable-s',
        'w': '.ui-resizable-w'
    }
});
	$('#screen').append(ab6);
	eval(work());
})
