<?php
$store = '/srv/data/';
$ext = pathinfo($_FILES['file']['name'], PATHINFO_EXTENSION);

if (preg_match('/^(\w|\s){5,64}$/', $_POST['tag'])
&& $_POST['tag'] != 'listen'
&& $_POST['tag'] != 'store') {
	if ($_POST['task'] == 'store') {
		if ($_FILES['file']['error'] > 0
		|| !preg_match('/audio/', $_FILES['file']['type'])
		|| !preg_match('/^(mp3|aac|wav|ogg|webm)$/', $ext)) {
			echo 'ERROR';
		}
		else if (file_exists($store.$_POST['tag'].'.'.$ext)) {
			echo 'EXIST';
		}
		else {
			move_uploaded_file($_FILES['file']['tmp_name'], $store.$_POST['tag'].'.'.$ext);
			echo 'OK';
		}
	}
	else if ($_POST['task'] == 'check') {
		if (glob($store.$_POST['tag'].'.*')) {
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