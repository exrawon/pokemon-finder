const userInput = document.getElementById('pokemon-name');
const searchButton = document.getElementById('search-button');
const output = document.getElementById('output');
const errorMessage = document.getElementById('error-message');

const getPokemon = async () => {
	try {
		const pokemonName = userInput.value.toLowerCase();
		errorMessage.classList.add('hidden');

		if (pokemonName) {
			output.innerHTML = `<img src="./assets/loading.gif" id="sprite" oncontextmenu="return false;"/>`;
			const response = await fetch(
				`https://pokeapi.co/api/v2/pokemon/${pokemonName}`
			);

			if (!response.ok) {
				console.log(response.status);
				output.innerHTML = `<img src="./assets/404.png" id="sprite" oncontextmenu="return false;"/><span id="name-display">NOT FOUND</span>`;
				errorMessage.classList.remove('hidden');
				document.getElementById('pokemon-name').value = '';
				return;
			}

			const data = await response.json();

			output.innerHTML = `<img src="${
				data.sprites.front_default
			}" id="sprite" />
			<span id="name-display">#${data.id} ${data.name.toUpperCase()}</span>`;
			document.getElementById('pokemon-name').value = '';
		}
	} catch (error) {
		console.log(error);
	}
};

searchButton.addEventListener('click', getPokemon);
document.addEventListener('keypress', (e) => {
	if (e.key === 'Enter') {
		getPokemon();
	}
});
