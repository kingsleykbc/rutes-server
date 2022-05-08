const bcrypt = require('bcrypt');

/**
 * ENCRYPT WORD WITH BCRYPT
 *
 * @param {String} word - Word/Password to encrypt
 * @returns {String} - Hashed word
 */
module.exports.encrypt = async word => {
	const salt = await bcrypt.genSalt(10); 
	const hashedWord = await bcrypt.hash(word, salt);
	return hashedWord;
};

/**
 * COMPARE WORD WITH HASH
 *
 * @param {String} word - Word/Password to encrypt
 * @param {String} hashedWord - Hashed Word/Password
 * @returns {Boolean} - is valid
 */
module.exports.compare = async (word, hashedWord) => {
	const isValid = await bcrypt.compare(word, hashedWord);
	return isValid;
};
