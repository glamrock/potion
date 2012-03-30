<?php
$site = 'http://cyanode.nadim.cc/potion/';
$store = '/srv/data/';
$ext = pathinfo($_FILES['file']['name'], PATHINFO_EXTENSION);

if (preg_match('/^\w{5,64}$/', $_GET['tag'])
&& $_GET['tag'] != 'listen'
&& $_GET['tag'] != 'store'
&& $_SERVER['HTTP_REFERER'] == $site) {
	if ($_GET['task'] == 'listen') {
		if (file_exists($store.$_GET['tag'].'.webm')) {
			header("Content-Type: audio/webm");
			header("Content-Length: " . filesize($store.$_GET['tag'].'.webm'));
			readfile($store.$_GET['tag'].'.webm');
		}
	}
	else if ($_GET['task'] == 'store') {
		if ($_FILES['file']['error'] > 0
		|| !preg_match('/audio/', $_FILES['file']['type'])
		|| !preg_match('/^(mp3|aac|wav|ogg|webm)$/', $ext)) {
			echo 'ERROR';
		}
		else if (file_exists($store.$_GET['tag'].'.webm')) {
			echo 'EXIST';
		}
		else {
			system('ffmpeg -i '.$_FILES['file']['tmp_name'].' '.$store.$_GET['tag'].'.webm');
			echo 'OK';
		}
	}
	else if ($_GET['task'] == 'check') {
		if (glob($store.$_GET['tag'].'.*')) {
			echo 'EXIST';
		}
		else {
			echo 'OK';
		}
	}
}
else {
	echo 'ERROR';
}
?>