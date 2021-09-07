const vedudb = require("../src/vedu");
const db = new vedudb("db.json");

async function yer() {
  let username = "duckywucky"; // Just some username
  await db.set(`${username}_money`, 69); // Creating our "character" with a base money of 69
  console.log(await db.fetch(`${username}_money`)); // Fetching our money
  await db.add(`${username}_money`, 420); // Adding 420 onto 69. 69 + 420 = 489
  console.log(await db.fetch(`${username}_money`)); // Fetching our money
}

yer();
