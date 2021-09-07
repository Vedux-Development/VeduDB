const vedudb = require("@vedux/vedudb");
const db = new vedudb("database.json");

(async () => {
  await db.set("bqini", "is pro");
  await db.set("bqinimoney", 100);
  await db.add("bqinimoney", 100);

  console.log(await db.fetch("bqini")); // => is prototype
  console.log(await db.fetch("bqinimoney")); // => 300
})();
