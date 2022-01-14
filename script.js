let START_TIME
let END_TIME;
let MIN_TO_BE_EARTHQUAKE;
let container;
let items;
let loader;
let apiGateway;
let btn;

let cache = () => {
    container = document.getElementById('container');
    items = document.getElementById('items');
    loader = document.querySelector('.loader');
    START_TIME = document.querySelector('.startdate').value || '2021-12-01';
    END_TIME = document.querySelector('.enddate').value || '2022-02-01';
    MIN_TO_BE_EARTHQUAKE = document.querySelector('.mag').value || 6;
    apiGateway = `https://earthquake.usgs.gov/fdsnws/event/1/query?format=geojson&starttime=${START_TIME}&endtime=${END_TIME}`;
    btn = document.querySelector('button');
};

let bind = () => {
    btn.addEventListener('click', handleClick);
};

let handleClick = (e) => {
    clearData();
    getData();
}

let clearData = () => {
    items.innerHTML = '';
}

let getData = () => {
    START_TIME = document.querySelector('.startdate').value;
    END_TIME = document.querySelector('.enddate').value;
    MIN_TO_BE_EARTHQUAKE = document.querySelector('.mag').value || 6;
    apiGateway = `https://earthquake.usgs.gov/fdsnws/event/1/query?format=geojson&starttime=${START_TIME}&endtime=${END_TIME}`;
    loader.classList.add('loading');

    fetch(apiGateway)
    .then(response => response.json())
    .then(data => {
        let onlyEarthquakes = data.features.filter((item) => {
            return parseInt(item.properties.mag) >= parseInt(MIN_TO_BE_EARTHQUAKE)
        })
        onlyEarthquakes.forEach((item) => {
            let datetime = new Date(item.properties.time);
            let listItem = document.createElement('div');
            listItem.innerHTML = `
            <div class="item" style='display:inline-block;padding:10px;border-radius:12px;margin-bottom:20px;border:1px white solid'>
                <div style='text-decoration:underline'>${datetime}</div>
                <div>Terremoto de <span style='color:orange;font-weight:bold;'>${item.properties.mag}</span> en ${item.properties.place}</div>
            </div>
            `;
            items.appendChild(listItem);
            console.log(`Terremoto de ${item.properties.mag} en ${item.properties.place} en la fecha: ${datetime}`);
            console.log('---')
        })
        loader.classList.remove('loading');
    })
};

let setup = () => {
    getData();
};

let main = () => {
    cache();
    bind();
    setup();
}

document.addEventListener('DOMContentLoaded', main);