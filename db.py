
// Need API
<!DOCTYPE html>
<html>
<head>
    <title>Simple Map</title>
    <script src="https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY&callback=initMap"
    async defer></script>
    <script>
    var map;
    function initMap() {
        map = new google.maps.Map(document.getElementById('map'), {
            center: {lat: <!DOCTYPE html>
<html>
<head>
    <title>Simple Map</title>
    <script src="https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY&callback=initMap"
    async defer></script>
    <script>
    var map;
    function in_Map() {
        map = new google.maps.Map(document.getElementById('map'), {
            center: {lat: 42.4427012, lng: -76.5189745},
            zoom: 8
        });

        ensure_marker = new google.maps.Marker({
            position: {lat: 42.4427012, lng: -76.5189745},
            map: map,
            title: 'Hello World!'
        });
    }
    </script>
</head>
<body>
    <div id="map" style="height: 500px; width: 100%;"></div>
</body>
</html>
