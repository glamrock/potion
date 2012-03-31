<!DOCTYPE html>
<head>
	<meta charset="UTF-8" />
	<meta name="keywords" content="Potion, audio sharing, private audio storage, audio storage, potion.io" />
	<meta name="description" content="Potion lets you safely store (and share!) your audio without logins or delays." />
	<meta property="og:image" content="img/logo.png" />
	<link rel="icon" type="image/gif" href="img/favicon.gif" />
	<title>Potion</title>
	<link rel="stylesheet" href="css/style.css" type="text/css" />
	<script type="text/javascript" src="js/jquery.js"></script>
	<script type="text/javascript" src="js/form.js"></script>
</head>
<body>
	<div class="main">
		<div class="box">
			<table>
				<tr>
					<td id="a1"></td><td id="a2"></td><td id="a3"></td><td id="a4"></td><td id="a5">
					</td><td id="a6"></td><td id="a7"></td><td id="a8"></td><td id="a9"></td><td id="a10"></td>
					<td id="a11"></td><td id="a12"></td><td id="a13"></td>
				</tr>
				<tr>
					<td id="b1"></td><td id="b2"></td><td id="b3"></td><td id="b4"></td><td id="b5">
					</td><td id="b6"></td><td id="b7"></td><td id="b8"></td><td id="b9"></td><td id="b10"></td>
					<td id="b11"></td><td id="b12"></td><td id="b13"></td>
				</tr>
				<tr>
					<td id="c1"></td><td id="c2"></td><td id="c3"></td><td id="c4"></td><td id="c5">
					</td><td id="c6"></td><td id="c7"></td><td id="c8"></td><td id="c9"></td><td id="c10"></td>
					<td id="c11"></td><td id="c12"></td><td id="c13"></td>
				</tr>
				<tr>
					<td id="d1"></td><td id="d2"></td><td id="d3"></td><td id="d4"></td><td id="d5">
					</td><td id="d6"></td><td id="d7"></td><td id="d8"></td><td id="d9"></td><td id="d10"></td>
					<td id="d11"></td><td id="d12"></td><td id="d13"></td>
				</tr>
				<tr>
					<td id="e1"></td><td id="e2"></td><td id="e3"></td><td id="e4"></td><td id="e5">
					</td><td id="e6"></td><td id="e7"></td><td id="e8"></td><td id="e9"></td><td id="e10"></td>
					<td id="e11"></td><td id="e12"></td><td id="e13"></td>
				</tr>
				<tr>
					<td id="f1"></td><td id="f2"></td><td id="f3"></td><td id="f4"></td><td id="f5">
					</td><td id="f6"></td><td id="f7"></td><td id="f8"></td><td id="f9"></td><td id="f10"></td>
					<td id="f11"></td><td id="f12"></td><td id="f13"></td>
				</tr>
				<tr>
					<td id="g1"></td><td id="g2"></td><td id="g3"></td><td id="g4"></td><td id="g5">
					</td><td id="g6"></td><td id="g7"></td><td id="g8"></td><td id="g9"></td><td id="g10"></td>
					<td id="g11"></td><td id="g12"></td><td id="g13"></td>
				</tr>
				<tr>
					<td id="h1"></td><td id="h2"></td><td id="h3"></td><td id="h4"></td><td id="h5">
					</td><td id="h6"></td><td id="h7"></td><td id="h8"></td><td id="h9"></td><td id="h10"></td>
					<td id="h11"></td><td id="h12"></td><td id="h13"></td>
				</tr>
				<tr>
					<td id="i1"></td><td id="i2"></td><td id="i3"></td><td id="i4"></td><td id="i5">
					</td><td id="i6"></td><td id="i7"></td><td id="i8"></td><td id="i9"></td><td id="i10"></td>
					<td id="i11"></td><td id="i12"></td><td id="i13"></td>
				</tr>
				<tr>
					<td id="j1"></td><td id="j2"></td><td id="j3"></td><td id="j4"></td><td id="j5">
					</td><td id="j6"></td><td id="j7"></td><td id="j8"></td><td id="j9"></td><td id="j10"></td>
					<td id="j11"></td><td id="j12"></td><td id="j13"></td>
				</tr>
				<tr>
					<td id="k1"></td><td id="k2"></td><td id="k3"></td><td id="k4"></td><td id="k5">
					</td><td id="k6"></td><td id="k7"></td><td id="k8"></td><td id="k9"></td><td id="k10"></td>
					<td id="k11"></td><td id="k12"></td><td id="k13"></td>
				</tr>
				<tr>
					<td id="l1"></td><td id="l2"></td><td id="l3"></td><td id="l4"></td><td id="l5">
					</td><td id="l6"></td><td id="l7"></td><td id="l8"></td><td id="l9"></td><td id="l10"></td>
					<td id="l11"></td><td id="l12"></td><td id="l13"></td>
				</tr>
				<tr>
					<td id="m1"></td><td id="m2"></td><td id="m3"></td><td id="m4"></td><td id="m5">
					</td><td id="m6"></td><td id="m7"></td><td id="m8"></td><td id="m9"></td><td id="m10"></td>
					<td id="m11"></td><td id="m12"></td><td id="m13"></td>
				</tr>
			</table>
		</div>
		<div id="message"></div>
		<form id="input" method="get" action="process.php" enctype="multipart/form-data">
			<input type="text" name="task" id="task" class="invisible" />
			<input type="text" name="tag" id="tag" autocomplete="off" maxlength="32" />
			<input type="file" name="file" id="file" />
		</form>
		<div id="expander">
			<audio id="player" src="#" controls="controls"></audio>
		</div>
	</div>
	<script type="text/javascript" src="js/main.js"></script>
	<script type="text/javascript">
		$(document).ready(function() {
			$('#tag').select();
			<?php
				if (isset($_GET['p'])) {
					//echo "setTimeout(\"$('#task').val('play'); $('#tag').val('".$_GET['p']."'); $('#input').submit(); menu(1);\", 1000);";
				}
				else {
					echo "animate(['p1','p2','p3', 'p4']);\n";
					echo "setTimeout(\"talk('smile', 'store audio, play anywhere.', 1)\", 680);\n";
					echo "setTimeout('menu()', 2500);\n";
					echo "s = setInterval('blink(1)', 4500);\n";
				}
			?>
		});
	</script>
	<a href="about" class="about">about</a>
</body>
</html>