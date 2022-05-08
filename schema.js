/**
 * COMBINE ALL THE TYPE DEFINITIONS AND RESOLVERS
 */
const { gql } = require('apollo-server-express');
const adminTypeDef = require('./entities/admin/typedef');
const adminResolver = require('./entities/admin/resolver');
const authTypeDef = require('./entities/auth/typedef');
const authResolver = require('./entities/auth/resolver');
const projectTypeDef = require('./entities/project/typedef');
const projectResolver = require('./entities/project/resolver');
const sessionTypeDef = require('./entities/session/typedef');
const sessionResolver = require('./entities/session/resolver');

const typeDef = gql`
	type Query
`;

module.exports.typeDefs = [typeDef, adminTypeDef, authTypeDef, projectTypeDef, sessionTypeDef];
module.exports.resolvers = [authResolver, adminResolver, projectResolver, sessionResolver];
