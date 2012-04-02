<?php
$store = '/srv/data/';
$endid3 = '4JHYMUCdOw33CnOfWRA8CG5YNNJuEnvH';

function sourcecheck() {
	if (preg_match('/^https\:\/\/potion.io\//', $_SERVER['HTTP_REFERER'])
	|| $_SERVER['REMOTE_ADDR'] == '50.116.51.165') { return 1; }
	else { return 0; }
}

if ($_POST) {
	$_GET = $_POST;
}

if (isset($_GET)) {
	if (sourcecheck()
	&& preg_match('/^(\w|\s){5,64}$/', $_GET['tag'])
	&& $_GET['tag'] != 'play'
	&& $_GET['tag'] != 'store') {
		$_GET['tag'] = strtolower($_GET['tag']);
		$tag = hash('ripemd160', hash('sha512', $_GET['tag']));
		$tagkey = substr(hash('sha512', $_GET['tag']), 0, 32);
		if ($_GET['task'] == 'play') {
			if (file_exists($store.$tag.'.webm')) {
				header('Content-Type: audio/webm');
				chmod($store.$tag.'.webm', 0644);
				echo substr(strstr(mcrypt_decrypt(MCRYPT_ARCFOUR, $tagkey, base64_decode(file_get_contents($store.$tag.'.webm')), 'stream'), $endid3), strlen($endid3));
			}
		}
		else if ($_GET['task'] == 'store') {
			if (preg_match('/audio/', substr($_POST['drop'], 0, 128))) {
				$file = file_get_contents($_POST['drop']);
				$tmp = tempnam('/tmp', 'tmp');
				$handle = fopen($tmp, "w");
				fwrite($handle, $file);
				fclose($handle);
				$_FILES['file']['tmp_name'] = $tmp;
			}
			else if ($_FILES['file']['error'] > 0
			|| !preg_match('/audio/', $_FILES['file']['type'])) {
				echo 'ERROR';
				exit;
			}
			if (file_exists($store.$tag.'.webm')) {
				echo 'EXIST';
				exit;
			}
			if (preg_match('/^\w+$/', $_GET['key'])) {
				require_once('id3/getid3.php');
				$tmp = $_FILES['file']['tmp_name'].$_GET['ext'];
				rename($_FILES['file']['tmp_name'], $tmp);
				system('ffmpeg -b:a 192k -i '.$tmp.' '.$store.$tag.'.webm');
				$getID3 = new getID3;
				$id3 = $getID3->analyze($store.$tag.'.webm');
				$options = hash('sha512', $_GET['key']).$id3['matroska']['comments']['title'][0].$endid3;
				$encrypted = base64_encode(mcrypt_encrypt(MCRYPT_ARCFOUR, $tagkey, $options.file_get_contents($store.$tag.'.webm'), 'stream'));
				$file = fopen($store.$tag.'.webm', 'w');
				fwrite($file, $encrypted);
				fclose($file);
				if ($tmp) {
				unlink($tmp);
				}
				echo 'OK';
				exit;
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
				preg_match('/^.+'.$endid3.'/', mcrypt_decrypt(MCRYPT_ARCFOUR, $tagkey, substr(base64_decode(file_get_contents($store.$tag.'.webm')), 0, 1024), 'stream'), $id3);
				echo substr($id3[0], 128, -strlen($endid3));
			}
		}
		else if ($_GET['task'] == 'delete' && preg_match('/^\w+$/', $_GET['key'])) {
			if (file_exists($store.$tag.'.webm')) {
				$delete = substr(mcrypt_decrypt(MCRYPT_ARCFOUR, $tagkey, substr(base64_decode(file_get_contents($store.$tag.'.webm')), 0, 256), 'stream'), 0, 128);
				if (hash('sha512', $_GET['key']) == $delete) {
					unlink($store.$tag.'.webm');
					echo 'OK';
				}
				else {
					echo 'ERROR';
				}
			}
		}
	}
	else {
		echo 'ERROR';
	}
}
?>