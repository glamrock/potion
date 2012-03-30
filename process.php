<?php
$site = 'https://potion.io/';
$store = '/srv/data/';
$ext = pathinfo($_FILES['file']['name'], PATHINFO_EXTENSION);

if (preg_match('/^\w{5,64}$/', $_GET['tag'])
&& $_GET['tag'] != 'play'
&& $_GET['tag'] != 'store'
&& $_SERVER['HTTP_REFERER'] == $site) {
	$tag = hash('ripemd160', hash('ripemd160', $_GET['tag']));
	if ($_GET['task'] == 'play') {
		if (file_exists($store.$tag.'.webm')) {
			header('Content-Type: audio/webm');
			header('Content-Length: '.filesize($store.$tag.'.webm'));
			readfile($store.$tag.'.webm');
		}
	}
	else if ($_GET['task'] == 'store') {
		if ($_FILES['file']['error'] > 0
		|| !preg_match('/audio/', $_FILES['file']['type'])
		|| !preg_match('/^(mp3|aac|wav|ogg|webm)$/', $ext)) {
			echo 'ERROR';
		}
		else if (file_exists($store.$tag.'.webm')) {
			echo 'EXIST';
		}
		else {
			system('ffmpeg -i '.$_FILES['file']['tmp_name'].' '.$store.$tag.'.webm');
			echo 'OK';
		}
	}
	else if ($_GET['task'] == 'check') {
		if (glob($store.$tag.'.*')) {
			echo 'EXIST';
		}
		else {
			echo 'OK';
		}
	}
	else if ($_GET['task'] == 'id3') {
		if (file_exists($store.$tag.'.webm')) {
 			require_once('id3/getid3.php');
			$getID3 = new getID3;
			$id3 = $getID3->analyze($store.$tag.'.webm');
			echo $id3['matroska']['comments']['title'][0];
		}
	}
}
else {
	echo 'ERROR';
}
?>