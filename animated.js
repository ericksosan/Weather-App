//animated btn search
//call card search
const btnSearchCity = document.getElementById('search-city');
//call card data
const cardData = document.querySelector('.card-data');
const cardSearch = document.querySelector('.card-search');
//change classList to .go-to-data

function goToData() {
	cardData.classList.add('go-to-data');
	cardSearch.classList.add('hidden-card-search');
}

btnSearchCity.addEventListener('click', goToData);

