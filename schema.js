const { gql } = require('apollo-server-express');
const adminTypeDef = require('./entities/admin/typedef');
const adminResolver = require('./entities/admin/resolver');
const authTypeDef = require('./entities/auth/typeDef');
const authResolver = require('./entities/auth/resolver');
const projectTypeDef = require('./entities/project/typeDef');
const projectResolver = require('./entities/project/resolver');
const sessionTypeDef = require('./entities/session/typeDef');
const sessionResolver = require('./entities/session/resolver');

const typeDef = gql`
	type Query
`;

module.exports.typeDefs = [typeDef, adminTypeDef, authTypeDef, projectTypeDef, sessionTypeDef];

module.exports.resolvers = [authResolver, adminResolver, projectResolver, sessionResolver];
