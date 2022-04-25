const { gql } = require('apollo-server-express');

module.exports = gql`
	input AdminSignUpData {
		fullName: String!
		email: String!
		password: String!
	}

	input LoginData {
		email: String!
		password: String!
	}

	type Mutation {
		signUp(adminData: AdminSignUpData!): Admin!
		login(loginData: LoginData!): String!
	}
`;
