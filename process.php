<?php
$store = '/srv/data/';

if ($_GET) {
	$_GET['tag'] = strtolower($_GET['tag']);
	if (preg_match('/^https\:\/\/potion.io\//', $_SERVER['HTTP_REFERER'])
	&& preg_match('/^(\w|\s){5,64}$/', $_GET['tag'])
	&& $_GET['tag'] != 'play'
	&& $_GET['tag'] != 'store') {
		$tag = hash('ripemd160', hash('sha512', $_GET['tag']));
		$tagkey = substr(hash('sha512', $_GET['tag']), 0, 32);
		if ($_GET['task'] == 'play') {
			if (file_exists($store.$tag.'.webm')) {
				header('Content-Type: audio/webm');
				echo substr(strstr(mcrypt_decrypt(MCRYPT_ARCFOUR, $tagkey, base64_decode(file_get_contents($store.$tag.'.webm')), 'stream'), '!!ENDTAG!!'), 10);
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
				require_once('id3/getid3.php');
				system('ffmpeg -b 192k -i "'.$_FILES['file']['tmp_name'].'" '.$store.$tag.'.webm');
				$getID3 = new getID3;
				$id3 = $getID3->analyze($store.$tag.'.webm');
				$encrypted = base64_encode(mcrypt_encrypt(MCRYPT_ARCFOUR, $tagkey, $id3['matroska']['comments']['title'][0].'!!ENDTAG!!'.file_get_contents($store.$tag.'.webm'), 'stream'));
				$file = fopen($store.$tag.'.webm', 'w');
				fwrite($file, $encrypted);
				fclose($file);
				echo 'OK';
			}
		}
		else if ($_GET['task'] == 'check') {
			if (file_exists($store.$tag.'.webm')) {
				echo 'EXIST';
			}
			else {
				echo 'OK';
			}
		}
		else if ($_GET['task'] == 'id3') {
			if (file_exists($store.$tag.'.webm')) {
				preg_match('/^.+!!ENDTAG!!/', mcrypt_decrypt(MCRYPT_ARCFOUR, $tagkey, substr(base64_decode(file_get_contents($store.$tag.'.webm')), 0, 512), 'stream'), $id3);
				echo substr($id3[0], 0, -10);
			}
		}
	}
	else {
		echo 'ERROR';
	}
}
?>