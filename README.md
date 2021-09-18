# VeduDB

VeduDB is a lightweight and simple to use JSON based database (That doesnt corrupt)

# Installing VeduDB

npm:

```
npm i --save @vedux/vedudb
```

Yarn:

```
yarn add @vedux/vedudb
```

# How to use VeduDB

```js
let vedudb = require("@vedux/vedudb");
let db = new vedudb("database.json");

(async () => {
  // Make some values with a key
  await db.set("Developer1", "Ducksquaddd");
  await db.set("Developer2", "bqini");

  // Log whatever the value is to this key
  console.log(await db.get("Developer1")); // => "Ducksquaddd"

  // I want to get all my stored data
  console.log(await db.fetchAll())) // => { All the db content }

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

# Discord

Come join the [Discord](https://discord.gg/8SUmcBSk8u) If you would like help with this package!

# license

This package is open sourced under the [MIT License](https://github.com/Vedux-Development/VeduDB/blob/master/LICENSE).

# FAQ
