window.addEventListener('load', (event) => {
});

mapboxgl.accessToken = '*****************************************************';
var center = [139.5798591, 35.703521];
var zoom = 7;

var map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/streets-v11',
    center: center,
    zoom: zoom
});

map.on('load', () => { 
    axios.get('/sheet')
    .then(response => {
        console.log(response);
        const location = response.data;
        location.map(l => {
            var marker = new mapboxgl.Marker({ "color": "#222529" })
            .setLngLat([l[1], l[0]])
            .addTo(map);
        });
    })
    .catch(err => {
        console.log(err);
    });
});

const trigger = document.getElementById('trigger');
var bool  = false;
var timer = 0;
trigger.addEventListener('click', () => {
    if(bool == false){
        document.getElementById('apple').style = "color: red";
        timer = setInterval(upload, 5000);
    }else{
        document.getElementById('apple').style = "color: black";
        clearInterval(timer);
    }
    bool = !bool;
});

function upload() {
    axios.get('/icloud')
    .then(response => {
        console.log(response);
        axios.post('/sheet', {
            lat: response.data[1],
            lng: response.data[2]
        })
        .then(function (response) {
            console.log("spreadsheet post!")
            var marker = new mapboxgl.Marker({ "color": "#222529" })
            .setLngLat([response.data[1], response.data[0]])
            .addTo(map);
        });
    })
    .catch(err => {
        console.log(err);
    });
}