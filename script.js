document.addEventListener('DOMContentLoaded', async () => {
  try {
    const response = await fetch('/api/events');
    const events = await response.json();
    initMap(events);
  } catch (error) {
    console.error('Error fetching events:', error);
  }
});

function initMap(events) {
  const map = new google.maps.Map(document.querySelector('gmp-map'), {
    center: { lat: 42.445106506347656, lng: -76.4826431274414 },
    zoom: 14,
    mapId: 'DEMO_MAP_ID',
  });

  events.forEach(event => {
    new google.maps.Marker({
      position: { lat: event.lat, lng: event.lng },
      map: map,
      title: event.description,
    });
  });
}

