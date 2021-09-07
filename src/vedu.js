const fs = require("fs");
const { resolve } = require("path");
var writeFileAtomic = require("write-file-atomic");

/* //////////////////////////////////////////////////////////////////////////////// */
/*                                                                                  */
/*                                 Vedux Development                                */
/*                       Maintained by, Ducksquaddd, and bqini                      */
/*                                                                                  */
/* //////////////////////////////////////////////////////////////////////////////// */

class Vedudb {
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

    // see if value exists
    let db = JSON.parse(
      fs.readFileSync(resolve(process.cwd(), this.database), "utf-8")
    );
    if (Object.prototype.hasOwnProperty.call(db, key)) {
      // key exists
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
    // key types
    if (typeof key !== "string" || key == "") {
      throw new TypeError("Invalid key of element");
    }

    if (typeof amount !== "number") {
      throw new TypeError("Amount must be a integer/number!");
    }

    // see if value exists
    let db = JSON.parse(
      fs.readFileSync(resolve(process.cwd(), this.database), "utf8")
    );
    if (Object.prototype.hasOwnProperty.call(db, key)) {
      // key exists
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
}

module.exports = Vedudb;
