<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");

$lat = $_GET['lat'];
$lng = $_GET['lng'];

$API_KEY = "AIzaSyB8zvdzwc1kNgvhKuhGoyFawHotcyDXNqQ";

$url = "https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=$lat,$lng&radius=30000&keyword=cricket%20academy&key=$API_KEY";

echo file_get_contents($url);
?>
