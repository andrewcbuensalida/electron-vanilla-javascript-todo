

function getPokemon() {
	fetch(
		`https://pokeapi.co/api/v2/pokemon/${
			Math.floor(Math.random() * 151) + 1
		}`
	)
		.then((pokemonJSON) => pokemonJSON.json())
		.then((pokemon) => {
			const pokemonImg = document.getElementById("pokemonImg");
			pokemonImg.setAttribute("src", pokemon.sprites.front_default);
		});
}

const generateButtton = document.getElementById("generateButton");
generateButtton.addEventListener("click", getPokemon);
