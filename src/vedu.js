const fs = require("fs");
const { resolve } = require("path");
var writeFileAtomic = require("write-file-atomic");

/* //////////////////////////////////////////////////////////////////////////////// */
/*                                                                                  */
/*                                 Vedux Development                                */
/*                       Maintained by, Ducksquaddd, and bqini                      */
/*                                                                                  */
/* //////////////////////////////////////////////////////////////////////////////// */

class VeduDB {
  /**
   *
   * Create a new JSON database
   *
   * @param {string} database The name of the JSON db to be created or used
   * @returns {boolean} If the database was created/used or it failed
   * @example
   * const vedudb = require('@vedux/vedudb');
   * var database = new vedudb("database.json");
   *
   */

  constructor(database) {
    if (!/\w+.json/.test(database)) {
      throw new TypeError(
        "Invalid database name. Make sure you have provided a valid file name."
      );
    }

    // use an existing database or create a new one
    if (fs.existsSync(resolve(process.cwd(), database))) {
      this.database = database;
    } else {
      fs.writeFileSync(resolve(process.cwd(), database), "{}");
      this.database = database;
    }
    return true;
  }
  /**
   *
   * Adds an element to a database with the specified value. If element exists, element value is updated.
   *
   * @param {string} key Key of the element to be set.
   * @param {*} value Value of the element to be set.
   * @returns {boolean} If the element succesfully saved returns true or false
   * @example
   * database.set("firstName", "Ducksquaddd");
   * database.set("age", 34);
   *
   * database.set("language", "fr"); => { "language": "fr" }
   * database.set("language", "en"); => { "language": "en" }
   *
   * let set = database.set("firstName", "Duckywucky");
   * console.log(set); // returns true
   *
   */
  async set(key, value) {
    if (typeof key !== "string" || key === "") {
      throw new TypeError("Invalid key or value for element");
    }

    let db = JSON.parse(
      fs.readFileSync(resolve(process.cwd(), this.database), "utf8")
    );
    db[key] = value;
    try {
      await writeFileAtomic(
        resolve(process.cwd(), this.database),
        JSON.stringify(db)
      );
      return true;
    } catch (err) {
      console.error(err);
      return false;
    }
  }
  /**
   *
   * Gets the value of an element based on it's key name.
   *
   * @param {string} key The key of the element to be fetched.
   * @returns {*} Returns the keys value if the element exists, else returns false
   * @example
   * database.set("bqini", "cool dude");
   *
   * let var = database.get("bqini");
   * console.log(var) => returns cool dude
   *
   * let var = database.get("BQinty")
   * console.log(var) => return false
   */
  async fetch(key) {
    // look for tricks
    if (typeof key !== "string" || key == "") {
      throw new TypeError("Invalid key of element");
    }

    let db = fs.readFileSync(resolve(process.cwd(), this.database), "utf8");
    db = JSON.parse(db);
    if (Object.prototype.hasOwnProperty.call(db, key)) {
      let dayta = db[key];
      return dayta;
    } else {
      return false;
    }
  }

  /* Ill work on this sometime */
  /* Essentially it will work like this */
  /* let all = database.fetchAll(); */
  /* console.log(all) =>  { "firstName": "Bob", "age": 32 }*/
  // async fetchAll() {}

  /**
   *
   * Delete an element from the db based on its key/name
   *
   * @param {string} key The name of a key
   * @returns {Boolean} Returns true or false based on if it exists
   * @example
   *
   * database.delete("keyName"); // returns true
   *
   */
  async remove(key) {
    if (typeof key !== "string" || key === "") {
      throw new TypeError("Invalid key");
    }

    let db = JSON.parse(
      fs.readFileSync(resolve(process.cwd(), this.database), "utf8")
    );
    if (Object.prototype.hasOwnProperty.call(db, key)) {
      try {
        const Property = key;
        const { [Property]: remove, ...rest } = db;
        await writeFileAtomic(
          resolve(process.cwd(), this.database),
          JSON.stringify(rest)
        );
        return true;
      } catch (err) {
        console.error(err);
        return false;
      }
    } else {
      return false;
    }
  }
  /**
   *
   * Performs mathematical operations on values of elements.
   *
   * @param {string} key The key of the element on which you would like to change
   * @param {number} amount The number you would like to add
   *
   * @returns {Boolean} True if the operation succeeded, else false.
   *
   * @example
   * database.set("money", 1);
   *
   * database.add("money", 68);
   *
   * console.log(database.get("money")); // returns 69 because 1 + 68 = 69
   *
   */
  async add(key, amount) {
    if (typeof key !== "string" || key == "") {
      throw new TypeError("Invalid key of element");
    }

    if (typeof amount !== "number") {
      throw new TypeError("Amount must be a integer/number!");
    }
    let db = JSON.parse(
      fs.readFileSync(resolve(process.cwd(), this.database), "utf-8")
    );
    if (Object.prototype.hasOwnProperty.call(db, key)) {
      let value = db[key];
      if (typeof value !== "number") {
        throw new Error("Key of existing element must be a number.");
      }
      var result = value + amount;
      db[key] = result;
      try {
        await writeFileAtomic(
          resolve(process.cwd(), this.database),
          JSON.stringify(db)
        );
        return true;
      } catch (err) {
        console.error(err);
        return false;
      }
    } else {
      return false;
    }
  }

  /**
   *
   * Returns all the elements and their values of the JSON database.
   *
   * @returns {Object} The object of all the key-value pairs of the database.
   * @example
   * database.set("Ducky", "Pro gramer");
   * database.set("bqini", "insane siege player");
   *
   * let all = database.all();
   * console.log(all); // { "Ducky": "Pro gramer", "bqini": "insane siege player" }
   *
   */
  async fetchAll() {
    let data = fs.readFileSync(resolve(process.cwd(), this.database), "utf-8");
    data = JSON.parse(data);
    return data;
  }

  /**
   *
   * Performs mathematical operations on values of elements.
   *
   * @param {string} key The key of the element on which you would like to change
   * @param {number} amount The number you would like to subtract
   *
   * @returns {Boolean} True if the operation succeeded, else false.
   *
   * @example
   * database.set("money", 420);
   *
   * database.subtract("money", 351);
   *
   * console.log(database.get("money")); // returns 69 because 420 - 351 = 69
   *
   */
  async subtract(key, amount) {
    if (typeof key !== "string" || key == "") {
      throw new TypeError("Invalid key of element");
    }

    if (typeof amount !== "number") {
      throw new TypeError("Amount must be a integer/number!");
    }

    let db = JSON.parse(
      fs.readFileSync(resolve(process.cwd(), this.database), "utf8")
    );
    if (Object.prototype.hasOwnProperty.call(db, key)) {
      let value = db[key];
      if (typeof value !== "number") {
        throw new Error("Key of existing element must be a number.");
      }
      var result = value - amount;
      db[key] = result;
      try {
        await writeFileAtomic(
          resolve(process.cwd(), this.database),
          JSON.stringify(db)
        );
        return true;
      } catch (err) {
        console.error(err);
        return false;
      }
    } else {
      return false;
    }
  }

  /**
   *
   * See if a particular element exists by using it's key.
   *
   * @param {string} key The key name to see if it exists.
   *
   * @returns {Boolean} True if it exists else false
   *
   * @example
   * database.set("user", "bqini");
   *
   * let has = database.has("bqini");
   * console.log(has); => returns true
   *
   * let has2 = database.has("ducksquaddd");
   * console.log(has2); => returns false
   */
  async has(key) {
    // too many tricks
    if (typeof key !== "string" || key == "") {
      throw new TypeError("Invalid key of element");
    }

    let db = fs.readFileSync(resolve(process.cwd(), this.database), "utf-8");
    db = JSON.parse(db);

    if (Object.prototype.hasOwnProperty.call(db, key)) {
      return true;
    } else {
      return false;
    }
  }

  /**
   * @callback filterPredicate
   * @param {any} entry
   * @param {string} key
   * @returns {boolean} If the predicate matched the parameters
   */

  /**
   * Filter the database for any entries that meet the predicate condition
   * @param {filterPredicate} predicate 
   * @returns {any[]} Entries in the database that meet the condition specified in a callback function.
   */
  filter(predicate) {
    let matches = [];

    let db = fs.readFileSync(resolve(process.cwd(), this.database), "utf-8");
    db = JSON.parse(db);

    for (const key in db) {
      if (Object.prototype.hasOwnProperty.call(db, key)) {
        if (predicate(db[key], key)) {
          matches.push(db[key]);
        }
      }
    }
    
    return matches;
  }

  /**
   * Find the first entry that matches the predicate
   * @param {filterPredicate} predicate 
   * @returns {any} The first element that matches the predicate
   */
  find(predicate) {
    return this.filter(predicate)[0];
  }

  /**
   * Like find but returns the key instead of the value
   * @param {filterPredicate} predicate 
   * @returns {any} The key of the first value that matches the predicate
   */
  findKey(predicate) {
    let db = fs.readFileSync(resolve(process.cwd(), this.database), "utf-8");
    db = JSON.parse(db);

    for (const key in db) {
      if (Object.prototype.hasOwnProperty.call(db, key)) {
        if (predicate(db[key], key)) {
          return key;
        }
      }
    }
  }

  /**
   * Get a random entry from the database
   * @returns {any} A random entry in the database
   */
  random() {
    let db = fs.readFileSync(resolve(process.cwd(), this.database), "utf-8");
    db = JSON.parse(db);

    const values = Object.values(db);
    
    return values[Math.floor(Math.random() * values.length)];
  }

  /**
   * Get the amount of entries in the database
   * @returns {number} The amount of entries in the database
   */
  count() {
    let db = fs.readFileSync(resolve(process.cwd(), this.database), "utf-8");
    db = JSON.parse(db);
    
    return Object.keys(db).length;
  }

}

module.exports = VeduDB;
