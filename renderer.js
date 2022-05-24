//pokemon
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
//doctors
const generateDoctor = document.getElementById("generateDoctor");

generateDoctor.addEventListener("click", async () => {
	const doctor = await window.postgres.getDoctor();
	const doctorDiv = document.getElementById("doctorName");
	doctorDiv.innerText = doctor.name;
});

///////////////////////////////////////////////
//products

async function getProducts() {
	const products = await window.sqlite.getProducts();

	for (let i = 0; i < products.length; i++) {
		insertProduct(products[i].id, products[i].name, products[i].time);
	}
}

getProducts();

function insertProduct(id, name, time) {
	const productsDiv = document.getElementById("products");
	const productDiv = document.createElement("div");
	productDiv.innerHTML = "id: " + id + ", name: " + name + ", time: " + time;
	productDiv.setAttribute("id", id);
	productDiv.addEventListener("click", () => {
		window.sqlite.deleteProduct(id);
		const productDeleting = document.getElementById(id);
		productDeleting.remove();
	});
	productsDiv.appendChild(productDiv);
}

const insertProductButton = document.getElementById("insertProductButton");
insertProductButton.addEventListener("click", async () => {
	const { id, name, time } = await window.sqlite.insertProduct();
	insertProduct(id, name, time);
});
/////////////////////////////////////////////////////////////
//grocery
const insertGroceryButton = document.getElementById("insertGroceryButton");
insertGroceryButton.addEventListener("click", async () => {
	localStorage.setItem(
		String(Math.random()),
		"Juice:" + new Date().toLocaleTimeString()
	);
	renderLocalStorage();
});

function renderLocalStorage() {
	const entries = Object.entries(localStorage);
	entries.sort((a, b) => a[1] - b[1]);
	console.log(`This is entries`);
	console.log(entries);

	const groceryItemsSpan = document.getElementById("groceryItems");
	groceryItemsSpan.innerHTML = "";
	for (let i = 0; i < entries.length; i++) {
		groceryItemsSpan.innerHTML +=
			"Key: " + entries[i][0] + " Value: " + entries[i][1] + "<hr/>";
	}
}

renderLocalStorage();

const clearGroceryListButton = document.getElementById(
	"clearGroceryListButton"
);
clearGroceryListButton.addEventListener("click", () => {
	localStorage.clear();
	renderLocalStorage();
});
