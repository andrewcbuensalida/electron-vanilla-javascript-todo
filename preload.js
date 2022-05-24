const { contextBridge } = require("electron");
const postgres = require("./db/postgres");

const sqliteDriver = require("./db/sqlite");

async function getProducts() {
	const sqlite = await sqliteDriver();
	// await sqlite.run("CREATE TABLE Products (id, name, time)");
	let products = [];

	await sqlite.each("SELECT * FROM Products", function (err, row) {
		products.push(row);
	});

	sqlite.close();
	return products;
}

async function deleteProduct(id) {
	const sqlite = await sqliteDriver();

	await sqlite.run("DELETE FROM Products WHERE id=?", [id]);
	sqlite.close();
}

async function insertProduct() {
	const sqlite = await sqliteDriver();
	const id = Math.random();
	const date = new Date().toLocaleTimeString();
	const name = "Oranges";
	await sqlite.run("INSERT INTO Products VALUES (?, ?, ?)", [id, name, date]);

	sqlite.close();
	return { id, name, date };
}

contextBridge.exposeInMainWorld("sqlite", {
	getProducts,
	insertProduct,
	deleteProduct,
});

///////////////////////////////////////////////////

async function getDoctor() {
	const doctorData = await postgres.query(
		`SELECT * FROM doctors LEFT JOIN (SELECT doctor_id, COUNT(*), TRUNC(AVG(rating),1) AS average_rating FROM reviews GROUP BY doctor_id) reviews ON doctors.id = reviews.doctor_id ORDER BY name OFFSET 0 LIMIT 40 ;`
	);
	const doctor = doctorData.rows[Math.floor(Math.random() * 40)];
	return doctor;
}

contextBridge.exposeInMainWorld("postgres", {
	getDoctor,
});
