let map;

function initMap() {
  map = new google.maps.Map(document.getElementById('map'), {
    center: { lat: 42.4427012, lng: -76.5189745 },
    zoom: 8,
  });

  fetch('/api/events')
    .then(response => response.json())
    .then(events => {
      events.forEach(event => {
        new google.maps.Marker({
          position: { lat: event.lat, lng: event.lng },
          map: map,
          title: event.description,
        });
      });
    });

  map.addListener('click', event => {
    const lat = event.latLng.lat();
    const lng = event.latLng.lng();
    const case_id = prompt('Enter case ID:');
    const description = prompt('Enter description:');

    if (case_id && description) {
      fetch('/api/events', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ case_id, lat, lng, description }),
      })
        .then(response => response.json())
        .then(event => {
          new google.maps.Marker({
            position: { lat, lng },
            map: map,
            title: description,
          });
        });
    }
  });
}
