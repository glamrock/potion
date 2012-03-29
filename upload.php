<?php
$store = '/srv/data/';

if ($_FILES['file']['error'] > 0
|| !preg_match('/^(\w|\s){5,64}$/', $_POST['tag'])
|| !preg_match('/audio/', $_FILES['file']['type'])
|| !preg_match('/^(mp3|aac|wav|ogg|webm)$/', pathinfo($_FILES['file']['name'], PATHINFO_EXTENSION))) {
	echo 'ERROR';
}
else if (file_exists($store.$_FILES['file']['name'])) {
	echo 'EXIST';
}
else {
	move_uploaded_file($_FILES['file']['tmp_name'], $store.$_POST['tag'].'.'.pathinfo($_FILES['file']['name'], PATHINFO_EXTENSION));
	echo 'OK';
}
?>