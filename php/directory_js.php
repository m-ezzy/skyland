<?php
	include 'server.php';

	$files = array();
	$rii = new RecursiveIteratorIterator(new RecursiveDirectoryIterator('../js/'));

	foreach ($rii as $file) {
		if ($file->isDir()) {
			continue;
		}
		$files[] = str_replace("\\","/",$file->getPathname());
	}
	$json = json_encode($files);
	echo $json;
?>
