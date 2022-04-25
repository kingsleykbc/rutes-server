const Admin = require('../admin/model');
const jwt = require('jsonwebtoken');
const { ApolloError } = require('apollo-server-express');
const { encrypt, compare } = require('../../helpers/crypt');

module.exports = {
	Mutation: {
		/**
		 * HANDLE SIGN UP
		 */
		signUp: async (parent, { adminData }) => {
			try {
				// Encrypt password
				adminData.password = await encrypt(adminData.password);

				// Create user
				const newAdmin = await Admin.create(adminData);
				return { fullName: newAdmin.fullName, email: newAdmin.email };
			} catch (e) {
				throw new ApolloError(e.message);
			}
		},

		/**
		 * HANDLE LOGIN
		 */
		login: async (parent, { loginData: { email, password } }) => {
			try {
				// Validate email
				const user = await Admin.findOne({ email });
				if (user) {
					// Validate password
					const passwordValid = await compare(password, user.password);
					if (passwordValid) {
						// Register and return authorization token
						const token = jwt.sign({ fullName: user.fullName, email: user.email }, process.env.JWT_SECRET, {
							expiresIn: '30d',
							subject: user._id.toString(),
							algorithm: 'HS256'
						});
						return token;
					}
				}
				throw new Error('User not found');
			} catch (e) {
				throw new ApolloError(e.message);
			}
		}
	}
};
