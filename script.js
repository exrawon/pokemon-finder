const searchButton = document.getElementById('search-button');
const output = document.getElementById('output');
const errorMessage = document.getElementById('error-message');
const nameDisplay = document.getElementById('name-display');
const getPokemon = async () => {
	try {
		const pokemonName = document
			.getElementById('pokemon-name')
			.value.toLowerCase();
		if (pokemonName) {
			const response = await fetch(
				`https://pokeapi.co/api/v2/pokemon/${pokemonName}`
			);
			while (output.firstChild) {
				output.removeChild(output.firstChild);
			}
			if (!response.ok) {
				console.log(response.status);

				errorMessage.classList.remove('hidden');
				return;
			}

			const data = await response.json();
			errorMessage.classList.add('hidden');

			const shipImage = new Image();
			shipImage.alt = 'Image of Ship';
			shipImage.src = `${data.sprites.front_default}`;
			output.appendChild(shipImage);
			console.log(data);
			output.innerHTML += `<span id="name-display">#${
				data.id
			} ${data.name.toUpperCase()}</span>`;
		}
	} catch (error) {
		console.log(error);
	}
};

const runApp = () => {
	getPokemon();
	searchButton.disabled = true;
	setTimeout(() => {
		searchButton.disabled = false;
	}, 2000);
};
searchButton.addEventListener('click', runApp);
