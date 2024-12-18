let map;

function initMap() {
  map = new google.maps.Map(document.getElementById('map'), {
    center: { lat: 42.445106506347656, lng: -76.4826431274414 }, // TODO: eventually parse zip code / location here
    zoom: 14,
    disableDefaultUI: true,
    draggable: false,
    scrollwheel: true,
    gestureHandling: 'cooperative',
    maxZoom: 16,
    minZoom: 12,
  });
}

document.addEventListener('DOMContentLoaded', () => {
  if (typeof google === 'object' && typeof google.maps === 'object') {
    initMap();
    startFetchingEvents();
  } else {
    console.error('Google Maps JavaScript API not loaded.');
  }
});

function addEventToMap(event) {
  console.log('Adding event to map:', event);

  new google.maps.Marker({
    position: { lat: event.lat, lng: event.lng },
    map: map,
    title: event.description,
  });
}

function addEventToEntries(event) {
  const sideElement = document.querySelector('.side');
  const entry = document.createElement('div');
  entry.classList.add('entry');
  entry.innerHTML = `
    <h3>${event.case_id}</h3>
    <p>${event.description}</p>
    <p>${new Date(event.timestamp).toLocaleString()}</p>
  `;
  sideElement.appendChild(entry);
}

function fetchEvents() {
  return fetch('/api/events')
    .then(response => response.json())
    .then(data => data.events);
}

function startFetchingEvents() {
  setInterval(() => {
    fetchEvents().then(events => {
      events.forEach(event => {
        addEventToMap(event);
        addEventToEntries(event);
      });
    }).catch(error => console.error('Error fetching events:', error));
  }, 5000); // Adjust the interval as needed
}

document.getElementById('demobutton').addEventListener('click', function () {
  document.getElementById('popup').style.display = 'block';
});

document.getElementById('closePopup').addEventListener('click', function () {
  document.getElementById('popup').style.display = 'none';
});

window.addEventListener('click', function (event) {
  if (event.target == document.getElementById('popup')) {
    document.getElementById('popup').style.display = 'none';
  }
});

