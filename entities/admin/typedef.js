const { gql } = require('apollo-server-express');

module.exports = gql`
	type Admin {
		id: ID!
		fullName: String!
		email: String!
		password: String
	}

	extend type Query {
		admin(id: ID!): Admin
	}
`;
