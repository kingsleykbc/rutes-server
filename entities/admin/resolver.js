const Admin = require('./model');

module.exports = {
	Query: {
		/**
		 * GET ADMIN DATA
		 */
		async admin(parent, { id }) {
			const data = await Admin.findOne({ _id: id });
			return data;
		}
	}
};
