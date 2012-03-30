<?php
$site = 'https://potion.io/';
$store = '/srv/data/';

if ($_GET) {
	$_GET['tag'] = strtolower($_GET['tag']);
	if (preg_match('/^(\w|\s){5,64}$/', $_GET['tag'])
	&& $_GET['tag'] != 'play'
	&& $_GET['tag'] != 'store'
	&& $_SERVER['HTTP_REFERER'] == $site) {
		$tag = hash('ripemd160', hash('sha512', $_GET['tag']));
		$key = substr(hash('sha512', $_GET['tag']), 0, 32);
		if ($_GET['task'] == 'play') {
			if (file_exists($store.$tag.'.webm')) {
				$file = substr(mcrypt_decrypt(
					MCRYPT_RIJNDAEL_256, $key, 
					readfile($store.$tag.'.webm'), MCRYPT_MODE_CBC, 
					mcrypt_create_iv(32, MCRYPT_DEV_URANDOM)
				), 32);
				header('Content-Type: audio/webm');
				header('Content-Length: '.strlen($file));
				echo $file;
			}
		}
		else if ($_GET['task'] == 'store') {
			if ($_FILES['file']['error'] > 0
			|| !preg_match('/audio/', $_FILES['file']['type'])) {
				echo 'ERROR';
			}
			else if (file_exists($store.$tag.'.webm')) {
				echo 'EXIST';
			}
			else {
				system('ffmpeg -b 192k -i "'.$_FILES['file']['tmp_name'].'" '.$store.$tag.'.webm');
				$file = fopen($store.$tag.'.webm', 'r+');
				fwrite($file, mcrypt_encrypt(
					MCRYPT_RIJNDAEL_256, $key, 
					(mcrypt_create_iv(32, MCRYPT_DEV_URANDOM).fread($file, filesize($store.$tag.'.webm')))
					, MCRYPT_MODE_CBC, mcrypt_create_iv(32, MCRYPT_DEV_URANDOM)
				));
				fclose($file);
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
}
?>