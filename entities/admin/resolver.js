const { users } = require('../../dummybase');
const Admin = require('./model');

module.exports = {
	Query: {
		async admin(parent, { id }) {
			const data = await Admin.findOne({ _id: id });
			return data;
		}
	}
};
