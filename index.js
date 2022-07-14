const searchCity = document.getElementById('search-city');
const middle = document.querySelector('.middle');
const getGeo = document.getElementById('getGeo');
let cityName = document.getElementById('cityName');

cityName.addEventListener('keyup', () => {
	if (cityName.value !== '') {
		searchCity.classList.remove('activeSearch');
		middle.classList.add('active');
		getGeo.classList.add('active');
	} else {
		searchCity.classList.add('activeSearch');
		middle.classList.remove('active');
		getGeo.classList.remove('active');
	}
});

const API_KEY = 'd3a33df3c65b46289a310734221307';
const getDataApi = async (query) => {
	const res = await fetch(
		`https://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${query}`,
		{
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
			},
		}
	);
	const data = await res.json();
	renderData(
		data.current.condition.icon,
		data.current.condition.text,
		data.current.feelslike_c,
		data.current.temp_c,
		data.current.humidity,
		data.location.country,
		data.location.region
	);
};

const getLocation = () => {
	const popUpCard = document.querySelector('.pop-up-card');
	const message = document.getElementById('message');
	const icons = document.querySelector('.fas');
	const cardSearch = document.querySelector('.card-search');
	navigator.geolocation.getCurrentPosition(success, err);
	function success(data) {
		popUpCard.classList.add('active-success');
		icons.classList.add('fa-check-circle');
		message.textContent = 'Coordinate successfully obtained';
		const time = setTimeout(() => {
			popUpCard.classList.remove('active-success');
			clearTimeout(time);
			cardData.classList.add('go-to-data');
			cardSearch.classList.add('hidden-card-search');
		}, 4000);
		const lat = data.coords.latitude;
		const lon = data.coords.longitude;
		getDataApi(`${lat},${lon}`);
	}

	function err(data) {
		popUpCard.classList.add('active-error');
		icons.classList.add('fa-times');
		message.textContent = data.message;
		const time = setTimeout(() => {
			popUpCard.classList.remove('active-error');
			clearTimeout(time);
		}, 4000);
	}
};

const getNameCity = () => {
	const city = cityName.value;
	getDataApi(`Dominican Republic, ${city}`);
	cityName.value = '';
};

searchCity.addEventListener('click', getNameCity);

getGeo.onclick = (e) => {
	e.preventDefault();
	getLocation();
};

function renderData(icon, desc, feelsLike, temp, humidity, country, region) {
	const cardData = document.querySelector('.card-data ');
	const template = `
	<div class="return-home">
			<div class="slide">
				<i class="fas fa-arrow-left"></i>
				<h3>Weather App <i class="fas fa-cloud-sun"></i></h3>
			</div>
		</div>
		<div class="body-data">
		<img src=${icon} alt=${desc} />
		<h1 id="grade">${Math.round(temp)}°C</h1>
		<span id="desc">${desc}</span>
		<div class="address">
			<i class="fas fa-map-marker-alt"></i>
			<span id="location">${country}, ${region}</span>
		</div>
	</div>
	<div class="foot-data">
		<div class="feels-like">
			<div class="icon-feels">
				<i class="fa-solid fa-temperature-high"></i>
			</div>
			<div class="dec-feels">
				<span id="feels-like"> ${Math.round(feelsLike)}°C</span>
				<span>Feels like</span>
			</div>
		</div>
		<div class="humidity">
			<div class="icon-humidity">
				<i class="fa-solid fa-droplet"></i>
			</div>
			<div class="dec-humidity">
				<span id="humidity"> ${humidity}%</span>
				<span>Humidity</span>
			</div>
		</div>
	</div>
	`;
	cardData.innerHTML = template;

	//Animated Arrow back
	const btnSlice = document.querySelector('.slide');
	function goToHome() {
		cardData.classList.remove('go-to-data');
		cardSearch.classList.remove('hidden-card-search');
	}
	btnSlice.addEventListener('click', goToHome);
}
