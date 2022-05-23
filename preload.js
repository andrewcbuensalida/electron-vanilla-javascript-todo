const { contextBridge } = require("electron");
const db = require("./db");

async function getDoctor() {
	const doctorData = await db.query(
		`SELECT * FROM doctors LEFT JOIN (SELECT doctor_id, COUNT(*), TRUNC(AVG(rating),1) AS average_rating FROM reviews GROUP BY doctor_id) reviews ON doctors.id = reviews.doctor_id ORDER BY name OFFSET 0 LIMIT 40 ;`
	);
	const doctor = doctorData.rows[Math.floor(Math.random() * 40)];
	return doctor;
}

contextBridge.exposeInMainWorld("pg", {
	getDoctor,
});
