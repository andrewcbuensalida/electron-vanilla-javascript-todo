// could also be here instead of preload since it doesn't require any node_module
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

const generatePokemon = document.getElementById("generatePokemon");
generatePokemon.addEventListener("click", getPokemon);

///////////////////////////////////////////////

const generateDoctor = document.getElementById("generateDoctor");

generateDoctor.addEventListener("click", async () => {
	const doctor = await window.pg.getDoctor();
	const doctorDiv = document.getElementById("doctorName");
	doctorDiv.innerText = doctor.name;

});
