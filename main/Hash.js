const crypto = require("crypto");
const fs = require("fs");

/**
 * Documentaion
 * @method - Get file hash.
 * @param {String} - file Path (REQUIRED).
 * @returns {String} - The file hash.
 */

module.exports = function getFileHash(file) {
  return new Promise((resolve, reject) => {
    const hash = crypto.createHash("sha256");
    const stream = fs.createReadStream(file);
    stream.on("data", (data) => hash.update(data));
    stream.on("error", (err) => reject(err));
    stream.on("end", () => resolve(hash.digest("hex")));
  });
};
