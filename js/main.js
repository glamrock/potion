var a, b, d, lock, size;
var ext = 0;
var dropped = 0;
var full = [];

// FACES
// ---------------------------------------------------------------------------------------
var smile = ['k5', 'k6', 'k7', 'k9', 'k8', 'c10', 'd10', 'e10', 'd4', 'e4', 'c4', 'a2', 'a1', 'b1', 'a12', 'a13', 'b13', 'm1', 'l1', 'm2', 'l13', 'm13', 'm12', 'j10', 'j4', 'e3', 'e11'];
var neutral = ['k5', 'k6', 'k7', 'k9', 'k8', 'c10', 'd10', 'e10', 'd4', 'e4', 'c4', 'a2', 'a1', 'a12', 'a13', 'm1', 'l1', 'm2', 'l13', 'm13', 'm12', 'e3', 'e11'];
var sad = ['m1', 'e4', 'j8', 'c4', 'm13', 'm2', 'j6', 'c10', 'a2', 'l1', 'm12', 'b13', 'j7', 'a12', 'd10', 'l13', 'd4', 'e10', 'b1', 'a1', 'a13', 'k4', 'j5', 'j9', 'k10', 'd3', 'd11'];
var tsk = ['a12', 'k6', 'b13', 'e10', 'a13', 'm1', 'k5', 'l1', 'l13', 'a2', 'b1', 'm13', 'm12', 'k7', 'e3', 'k8', 'm2', 'e2', 'e9', 'k4'];
var wink = ['k9', 'm2', 'm12', 'a1', 'a12', 'l1', 'e11', 'e10', 'k8', 'b13', 'a2', 'l13', 'b1', 'k5', 'a13', 'k6', 'm1', 'm13', 'k7', 'e3', 'e4', 'e5', 'd10', 'c10', 'j10', 'd5'];
// ---------------------------------------------------------------------------------------

// MISC
// ---------------------------------------------------------------------------------------
var heart = ['d12', 'd2', 'f2', 'e2', 'g3', 'h4', 'i5', 'j6', 'k7', 'e12', 'f12', 'd7', 'c8', 'c9', 'c10', 'c11', 'c5', 'c4', 'c6', 'c3', 'g2', 'g12', 'h11', 'i10', 'j9', 'k8', 'l7', 'k6', 'j5', 'i4', 'h3', 'j7', 'j8', 'g11', 'f11', 'e11', 'd11', 'h8', 'i8', 'i9', 'f10', 'd10', 'h10', 'g10', 'g9', 'g6', 'g5', 'g4', 'f3', 'e3', 'd3', 'd4', 'd5', 'd6', 'd8', 'd9', 'e9', 'e8', 'e7', 'e4', 'e5', 'e6', 'f4', 'f5', 'f7', 'f8', 'f6', 'g8', 'g7', 'h9', 'i7', 'h7', 'h6', 'h5', 'i6', 'a2', 'a1', 'b1', 'a12', 'a13', 'b13', 'm13', 'l13', 'm12', 'm1', 'l1', 'm2'];
var p1 = ['l2', 'd2', 'm5', 'b9', 'f9', 'm10', 'b13', 'f13', 'f3', 'i6', 'a1', 'b6', 'f12', 'a2', 'm2', 'g11', 'g4', 'g3', 'b12', 'd11', 'g13', 'h13', 'c9', 'm4', 'm12', 'c3', 'j11', 'l4', 'e11', 'f10', 'j1', 'a13', 'a11', 'l10', 'k2', 'e1', 'm13', 'j3', 'h12', 'a4', 'l1', 'j12', 'e10', 'c2', 'f4', 'l13', 'c1', 'g10', 'e3', 'k3', 'f5', 'e9', 'a12', 'c10', 'b10', 'h1', 'b3', 'g2', 'j2', 'm7', 'd10', 'e2', 'a6', 'c4', 'b4', 'b8', 'd12', 'b1', 'h11', 'e5', 'l12', 'c5', 'b2', 'l11', 'j7', 'h2', 'd1', 'e4', 'd4', 'k1', 'd9', 'g1', 'c12', 'b7', 'm1', 'i12', 'k8', 'a10', 'm3', 'a5', 'a7', 'h3', 'i1', 'a3', 'm6', 'g12', 'd3', 'b5', 'j13', 'f2', 'm11', 'c11', 'f11', 'm9', 'd5', 'l3', 'a8', 'f1', 'a9', 'e12', 'e13', 'i2', 'c13', 'b11', 'i3', 'm8', 'k13', 'i11', 'k11', 'k12', 'i13', 'd13', 'i8', 'j6', 'k7'];
var p2 = ['c2', 'f9', 'a1', 'd12', 'f4', 'k11', 'm2', 'b3', 'i1', 'd11', 'a5', 'j7', 'm1', 'd3', 'e9', 'l11', 'f2', 'a4', 'm7', 'd4', 'f3', 'k2', 'l10', 'j3', 'c12', 'g13', 'm8', 'g3', 'f13', 'h11', 'a9', 'm12', 'f11', 'f12', 'b12', 'c5', 'i6', 'd1', 'h3', 'j1', 'k7', 'j8', 'c9', 'i13', 'e2', 'f1', 'a12', 'e11', 'e12', 'g4', 'h13', 'f5', 'b1', 'd13', 'c13', 'b10', 'i2', 'c3', 'f10', 'h12', 'h2', 'j13', 'c1', 'm3', 'c11', 'e5', 'i12', 'b9', 'g2', 'd5', 'k3', 'g1', 'g12', 'b2', 'e10', 'a3', 'k13', 'm11', 'a10', 'l4', 'i3', 'd10', 'g10', 'l1', 'l13', 'c10', 'm5', 'j12', 'j11', 'e1', 'b11', 'm10', 'l2', 'j2', 'a11', 'b4', 'k1', 'h1', 'm13', 'a13', 'd9', 'a2', 'i11', 'l3', 'l12', 'm6', 'b13', 'b5', 'm4', 'e4', 'm9', 'e13', 'd2', 'k12', 'e3', 'g11', 'c4', 'a7', 'a8', 'b7', 'b6'];
var p3 = ['e3', 'c4', 'c10', 'm12', 'b1', 'm2', 'm1', 'a13', 'a1', 'd10', 'm13', 'l13', 'b13', 'd4', 'c1', 'd1', 'e1', 'c13', 'd13', 'e13', 'f13', 'g13', 'f12', 'd12', 'c12', 'e12', 'f1', 'g1', 'f2', 'd2', 'a2', 'b2', 'c2', 'e2', 'a12', 'b12', 'a11', 'b11', 'c11', 'd11', 'b10', 'a10', 'b3', 'a3', 'c3', 'd3', 'b4', 'a4', 'e11', 'a5', 'b5', 'c5', 'a9', 'b9', 'c9', 'h1', 'i1', 'j1', 'k1', 'l1', 'h13', 'i13', 'j13', 'k13', 'g12', 'h12', 'i12', 'j12', 'k12', 'l12', 'g2', 'h2', 'i2', 'j2', 'l2', 'k2', 'm3', 'm11', 'l3', 'm10', 'l11', 'f3', 'f11', 'e10', 'e4', 'd5', 'd9', 'g3', 'h3', 'i3', 'j3', 'k3', 'g11', 'h11', 'i11', 'j11', 'k11', 'f10', 'e9', 'f4', 'e5', 'g4', 'f5', 'f9', 'g10', 'a7', 'a6', 'b6', 'l4', 'l10', 'm4', 'm9', 'm5', 'm6', 'm7', 'm8', 'b8', 'j7', 'k7', 'i6', 'k6', 'k8'];
var p4 = ['b1', 'a10', 'l3', 'e12', 'j2', 'm3', 'j13', 'c13', 'h13', 'd4', 'h1', 'm11', 'a3', 'g1', 'i2', 'j1', 'm9', 'd12', 'l1', 'b11', 'j11', 'h2', 'a6', 'h3', 'e9', 'g4', 'c9', 'c12', 'm6', 'a2', 'b4', 'j12', 'i13', 'm5', 'm7', 'f2', 'b9', 'k3', 'f9', 'k13', 'f13', 'd10', 'd3', 'g11', 'd2', 'g3', 'm1', 'e5', 'c2', 'l10', 'c3', 'e11', 'c11', 'a4', 'f12', 'd1', 'g10', 'm4', 'i3', 'c1', 'i12', 'c5', 'k2', 'm2', 'k12', 'a7', 'f5', 'l13', 'd13', 'f3', 'i11', 'f11', 'a5', 'g2', 'm12', 'f10', 'e10', 'l11', 'j3', 'g13', 'e4', 'd5', 'a9', 'a13', 'f1', 'l4', 'e1', 'd11', 'b2', 'a12', 'l2', 'k11', 'a1', 'm8', 'b13', 'c4', 'e13', 'b5', 'k7', 'm10', 'd9', 'f4', 'j7', 'b8', 'b12', 'h12', 'c10', 'h11', 'e3', 'b3', 'e2', 'm13', 'l12', 'a11', 'k1', 'g12', 'i1', 'b10', 'b7', 'i8', 'j6', 'j8'];
var deleted = ['a4', 'b5', 'c6', 'd7', 'c8', 'b9', 'a10', 'a5', 'a6', 'a7', 'a8', 'a9', 'b8', 'b7', 'b6', 'c7', 'm4', 'l5', 'k6', 'j7', 'k8', 'l9', 'm10', 'k7', 'l7', 'l8', 'l6', 'm5', 'm6', 'm7', 'm8', 'm9', 'd13', 'e12', 'f11', 'g10', 'h11', 'i12', 'j13', 'i13', 'h13', 'g13', 'f13', 'e13', 'f12', 'g12', 'h12', 'g11', 'd1', 'e2', 'f3', 'g4', 'h3', 'i2', 'h1', 'f1', 'e1', 'g1', 'g2', 'g3', 'f2', 'h2', 'j1', 'i1', 'a1', 'a13', 'm13', 'm1'];
// ---------------------------------------------------------------------------------------

// TALKERS
// ---------------------------------------------------------------------------------------
var smiletalk = ['m1', 'k7', 'd10', 'l13', 'm13', 'e10', 'k9', 'd4', 'b1', 'm12', 'a13', 'e11', 'c4', 'k8', 'l1', 'm2', 'e3', 'k5', 'b13', 'a1', 'e4', 'j10', 'j4', 'a12', 'a2', 'k6', 'c10', 'j5', 'j6', 'j8', 'j9', 'j7'];
var neutraltalk = ['a2', 'm2', 'e11', 'm13', 'k9', 'k8', 'k7', 'c4', 'a13', 'm12', 'd4', 'k5', 'd10', 'e4', 'a1', 'm1', 'k6', 'c10', 'a12', 'e10', 'l13', 'e3', 'j7', 'j8', 'j6', 'l1'];
var sadtalk = ['m1', 'e4', 'j8', 'c4', 'm13', 'm2', 'j6', 'c10', 'a2', 'l1', 'm12', 'b13', 'j7', 'a12', 'd10', 'l13', 'd4', 'e10', 'b1', 'a1', 'a13', 'k4', 'j5', 'j9', 'k10', 'd3', 'd11', 'k5', 'k6', 'k7', 'k8', 'k9'];
var tsktalk = ['a12', 'k6', 'b13', 'a13', 'm1', 'l1', 'l13', 'a2', 'b1', 'm13', 'm12', 'k7', 'k8', 'm2', 'e4', 'e12', 'e11', 'e5', 'k9', 'k10'];
var winktalk = ['k9', 'm2', 'm12', 'a1', 'a12', 'l1', 'e11', 'e10', 'k8', 'b13', 'a2', 'l13', 'b1', 'k5', 'a13', 'k6', 'm1', 'm13', 'k7', 'e3', 'e4', 'e5', 'd10', 'c10', 'j10', 'j5', 'j6', 'j7', 'j8', 'j9', 'd5'];
var hearttalk = ['e5', 'g3', 'e2', 'i9', 'f5', 'j5', 'h6', 'f8', 'b1', 'e6', 'g9', 'd8', 'c11', 'g6', 'd7', 'm13', 'd12', 'c4', 'c5', 'l13', 'e11', 'h3', 'g12', 'd6', 'd11', 'b13', 'j7', 'k8', 'f10', 'j8', 'i7', 'c10', 'h11', 'f3', 'i4', 'c3', 'f2', 'l1', 'j6', 'e4', 'i6', 'g4', 'a1', 'i8', 'e7', 'h8', 'i10', 'h5', 'f12', 'h4', 'f4', 'd5', 'i5', 'h9', 'c6', 'm12', 'g10', 'h7', 'm2', 'm1', 'l7', 'k7', 'f11', 'h10', 'f6', 'd4', 'g5', 'g7', 'f7', 'a2', 'g2', 'e12', 'c9', 'a13', 'd3', 'e9', 'k6', 'd10', 'e8', 'd9', 'g11', 'c8', 'j9', 'a12', 'e3', 'd2', 'g8', 'a10', 'a7', 'a4'];
var deletedtalk = deleted;
// ---------------------------------------------------------------------------------------

/*$('td').click(function(){
	console.log($(this).attr('id'));
	if ($(this).css('background-color') !== 'rgba(0, 0, 0, 0)') {
		blank($(this).attr('id'));
	}
	else {
		fill($(this).attr('id'));
	}
});*/

function fill(cell) {
	$('#' + cell).css('background-color', '#10122A');
	full.push(cell);
}

function blank(cell) {
	$('#' + cell).css('background', 'none');
	full.splice(jQuery.inArray(cell, full), 1);
}

function blankall() {
	$('td').css('background', 'none');
	full = [];
}

function draw(face, slow) {
	var f = face.slice(0);
	blankall();
	var t = 0;
	while (f.length) {
		var c = Math.floor(Math.random()*f.length);
		if (slow) {
			setTimeout('fill("' + f[c] + '")', t);
			t += 5;
		}
		else {
			fill(f[c]);
		}
		f.splice(c, 1);
	}
}

function animate(faces) {
	var t = 0;
	for (var i=0; i != faces.length; i++) {
		setTimeout('draw(' + faces[i] + ', 0)', t);
		t += 170;
	}
}

function talk(face, message, l) {
	lock = 1;
	$('#message').html('');
	var tp = 0;
	for (var p=0; p != message.length; p++) {
		setTimeout('$("#message").html($("#message").html() + "' + message[p] + '")', tp);
		if ($('#task').val() === '') {
			setTimeout('$("#message").html($("#message").html().replace("store", "<span class=\'blue\'>store</span>"))', tp);
			setTimeout('$("#message").html($("#message").html().replace("play", "<span class=\'blue\'>play</span>"))', tp);
			setTimeout('$("#message").html($("#message").html().replace("delete", "<span class=\'blue\'>delete</span>"))', tp);
		}
		tp += 33;
	}
	if (face) {
		var ti = 0;
		for (var i=0; i < (message.length/5); i++) {
			ti += 120;
			setTimeout('draw(' + face + 'talk, 0)', ti);
			ti += 120;
			setTimeout('draw(' + face + ', 0)', ti);
		}
	}
	if (!l) {
		setTimeout('lock = 0', tp);
	}
}

function blink(n) {
	var t = 0;
	while (n) {
		setTimeout('blank("e3");blank("e11");fill("d3");fill("d11");', t);
		t += 70;
		setTimeout('blank("d3");blank("d11");fill("c3");fill("c11");', t);
		t += 70;
		setTimeout('blank("c3");blank("c11");fill("e3");fill("e11");', t);
		t += 70;
		n--;
	}
}

function menu(i) {
	dropped = 0;
	$('#file').val('');
	$('#key').val('');
	$('#task').val('');
	$('#tag').focus();
	if (!i) {
		talk("smile", "type store, play or delete (or just drag and drop!)", 0);
		$('#task').val('');
	}	
	$('input').keyup(function(evt) {
		if (evt.keyCode === 13) {
			if (lock) {
				return false;
			}
			else if ($('#task').val() === 'enterkey') {
				if ($('#key').val().match(/^\w+$/)) {
					$('#key').attr('class', 'invisible');
					$('#tag').attr('class', 'visible');
					$('#task').val('store');
					if (d) {
						$('#task').val('delete');
					}
					setTimeout("loadform();$('#input').submit()", 100);
				}
				else {
					setTimeout("talk('sad', 'letters & numbers only', 0)", 100);
				}
			}
			else if ($('#task').val() === 'check') {
				if (gettag()) {
					$.get('https://potion.io/process.php?task=check&tag=' + $('#tag').val(), function(msg) {
						if (msg == 'OK' && d) {
							setTimeout("talk('sad', 'tag does not exist.', 0)", 150);
							$('#tag').val('');
							setTimeout('menu()', 1700);
						}
						else if (msg == 'EXIST' && !d) {
							setTimeout("talk('sad', 'tag already exists.', 0)", 150);
							$('#tag').val('');
							setTimeout('menu()', 1700);
						}
						else {
							setTimeout("talk('smile', 'enter delete key', 0)", 150);
							$('#tag').attr('class', 'invisible');
							$('#key').attr('class', 'visible');
							$('#key').val('');
							$('#key').focus();
							$('#task').val('enterkey');
						}
					});
				}
			}
			else if ($('#task').val() === 'play') {
				if ($('#expander').css('height') === '22px') {
					endplay();	
				}
				else if (gettag()) {
					b = setInterval("blink(1)", 420);
					loadform();
					$('#input').submit();
				}
			}
			else if ($('#tag').val().toLowerCase() === 'store') {
				$("#message").html('<div id="select">select audio</div>');
				$('#select').click(function() { 
					$('#file').trigger('click');
				});
				setTimeout("$('#file').trigger('click')", 300);
			}
			else if ($('#tag').val().toLowerCase() === 'play') {
				$('#task').val('play');
				talk('smile', 'enter tag', 0);
				$('#tag').val('');
			}
			else if ($('#tag').val().toLowerCase() === 'delete') {
				d = 1;
				$('#task').val('check');
				talk('smile', 'enter tag', 0);
				$('#tag').val('');
			}
			return false;
		}
	});
}

function endplay() {
	$('.mejs-container').fadeOut();
	$('#expander').animate({height: '2px','margin-top': '+=22px'}, 1000, function() { 
		setTimeout("window.location = 'https://potion.io'", 1000);
	});
}

function gettag() {
	$('#tag').val($('#tag').val().toLowerCase());
	if ($('#tag').val().length < 4) {
		talk('neutral', 'tag too small', 0);
		return false;
	}
	else if ($('#tag').val().match(/^(\w|\s){4,64}$/) 
	&& $('#tag').val() !== 'play'
	&& $('#tag').val() !== 'store') {
		return true;
	}
	else {
		talk('neutral', 'letters, numbers & spaces only', 0);
		return false;
	}
}

function fileselect(evt) {
	evt.stopPropagation();
	evt.preventDefault();
	file = evt.target.files || evt.dataTransfer.files;
	if (file.length === 1) {
		if (file[0].type.match(/audio/)) {
			if (file[0].size > (20*1048576)) {
				setTimeout("talk('sad', 'file too large', 0)", 500);
			}
			else {
				if (dropped && !lock) {
					var reader = new FileReader();
					reader.onload = (function(file) {
						return function(evt) {
							$('#file').val('');
							dropped = evt.target.result;
						};
					})(file[0]);
					reader.readAsDataURL(file[0]);
				}
				ext = file[0].name.match(/\.\w+$/);
				size = file[0].size / 1048576;
				$('#task').val('check');
				setTimeout("talk('smile', 'enter tag (a name for your upload)', 0)", 300);
				$('#tag').val('');
				$('#key').val('');
				$('#tag').focus();
			}
		}
		else {
			setTimeout("talk('sad', 'audio files only', 0)", 500);
		}
	}
	else {
		setTimeout("talk('sad', 'one file at a time', 0)", 500);
	}
}
XMLHttpRequest.prototype.sendAsBinary = function(datastr) {
    function byteValue(x) {
        return x.charCodeAt(0) & 0xff;
    }
    var ords = Array.prototype.map.call(datastr, byteValue);
    var ui8a = new Uint8Array(ords);
    this.send(ui8a.buffer);
}
$('#file').bind('change', function(evt) {
	fileselect(evt);
});
$('body').bind('dragover', function(evt) {
	evt.stopPropagation();
	evt.preventDefault();
});
$('body').bind('dragleave', function(evt) {
	evt.stopPropagation();
	evt.preventDefault();
});
$('body').bind('drop', function(evt) {
	dropped = 1;
});
document.body.addEventListener('drop', fileselect, false);


function loadform() {
	$('form').ajaxForm({
		beforeSubmit: function() {
			lock = 1;
			if ($('#task').val() === 'store') {
				clearInterval(a);
				clearInterval(b);
				b = setInterval("blink(1)", 210);
				$('#message').html('<div class="progress" id="progress"><div id="bar"></div></div>');
			}
		},
		data: { drop: dropped, ext: ext },
		uploadProgress: function(event, position, total, percent) {
			$('#bar').width(percent + '%');
			if (percent == 100) {
				$('.progress').fadeOut(Math.ceil(size * 1750));
			}
		},
		success: function(data) {
			lock = d = 0;
			clearInterval(b);
			if ($('#task').val() === 'play') {
				$.get('https://potion.io/process.php?task=check&tag=' + $('#tag').val(), function(msg) {
					if (msg === 'EXIST') {
						var url = 'https://potion.io/' + $('#tag').val().replace(/\s/g, '%20');
						if (window.location != url) {
							window.location = url;
						}
						$('#player').attr('src', 'https://potion.io/process.php?task=play&tag=' + $('#tag').val());
						$('#player').attr('autoplay', 'autoplay');
						$('#player').attr('onended', 'endplay()');
						$('#player').mediaelementplayer();
						$('#playervars').val('controls=true&file=' + 'https://potion.io/process.php?task=play&tag=' + $('#tag').val());
						animate(['p1','p2','p3', 'p4']);
						a = setInterval("animate(['p1','p2','p3', 'p4'])", 680);
						talk(0, 'now playing!', 0);
						$('#expander').animate({height: '22px', 'margin-top': '-=22px'}, 1000, function() { 
							$('#player').fadeIn();
							b = setTimeout('talk(0, "' + id3 + '", 0)', 1300);
						});
					}
					else {
						talk('sad', 'tag does not exist', 1);
						$('#tag').val('');
						setTimeout('menu()', 2500);
					}
				});
			}
			else if (data === 'OK') {
				if ($('#task').val() === 'delete') {
					setTimeout("talk('deleted', 'done', 0)", 300);
				}
				else {
					setTimeout("talk('heart', 'done', 0)", 300);
				}
				setTimeout('window.location = "https://potion.io"', 3000);
			}
			else if (data === 'EXIST') {
				setTimeout("talk('sad', 'tag already exists.', 0)", 200);
				$('#tag').val('');
				setTimeout('menu()', 1700);
			}
			else if (data === 'ERROR') {
				talk('sad', 'error', 0);
				$('#tag').val('');
				setTimeout('menu()', 2500);
			}
			else {
				console.log(data);
			}
		}
	});
}