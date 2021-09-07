# VeduDB

VeduDB is a lightweight and simple to use JSON based database

# How to use VeduDB

```js
let vedudb = require("@vedux/vedudb");
let db = new vedudb("database.json");

(async () => {
  // Make some values with a key
  await db.set("Developer1", "Ducksquaddd");
  await db.set("Developer2", "bqini");

  // Log whatever the value is to this key
  console.log(await db.get("Developer1")); // => "Ducksquaddd

  // I dont like Develper 2
  console.log(await db.delete("Developer2")); // => true

  // I robbed an old lady
  await db.set("money", 250);

  // Then I hacked the CIA
  await db.add("money" 100000);

  // And then i got caught
  await db.subtract("money", 100250)
})();
```
