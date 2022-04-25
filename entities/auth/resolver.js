const Admin = require('../admin/model');
const jwt = require('jsonwebtoken');
const { ApolloError } = require('apollo-server-express');

module.exports = {
	Mutation: {
		signUp: async (parent, { adminData }) => {
			try {
				const newAdmin = await Admin.create(adminData);
				// hash password here
				return { fullName: newAdmin.fullName, email: newAdmin.email };
			} catch (e) {
				throw new ApolloError(e.message);
			}
		},
		login: async (parent, { loginData: { email, password } }) => {
			const admin = await Admin.findOne({ email, password });

			if (!admin) throw 'User not found';
			const token = jwt.sign({ fullName: admin.fullName, email: admin.email }, process.env.JWT_SECRET, {
				expiresIn: '30d',
				subject: admin._id.toString(),
				algorithm: 'HS256'
			});
			return token;
		}
	}
};
