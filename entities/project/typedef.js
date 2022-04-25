const { gql } = require('apollo-server-express');

module.exports = gql`
	type Test {
		id: ID!
		route: String!
		fullRoute: String!
		instructions: [String]!
	}

	input TestData {
		route: String!
		fullRoute: String!
		instructions: [String]
	}

	type Questionnaire {
		id: ID!
		type: String!
		question: String!
		options: [String]
	}

	input QuestionnaireData {
		type: String!
		question: String!
		options: [String]
	}

	type Screenshot {
		id: ID!
		device: String!
		route: String!
		screenshot: String!
	}

	input ScreenshotData {
		device: String!
		route: String!
		screenshot: String!
	}

	type Project {
		id: ID!
		title: String!
		description: String!
		tests: [Test]
		preQuestionnaire: [Questionnaire]
		postQuestionnaire: [Questionnaire]
		projectKey: String!
		url: String!
		approvedTesters: [String]
		adminID: ID!
		screenshots: [Screenshot]
		sessions: [Session]
		createdAt: String
		updatedAt: String
	}

	input ProjectData {
		title: String!
		description: String!
		tests: [TestData]!
		preQuestionnaire: [QuestionnaireData]
		postQuestionnaire: [QuestionnaireData]
		url: String!
		approvedTesters: [String]
	}

	extend type Query {
		project(projectKey: String!): Project!
		projects(keyword: String): [Project]
	}

	#MUTATIONS
	type Mutation {
		createProject(projectData: ProjectData!): Project!
		updateProjectScreenshot(projectKey: String!, screenshot: ScreenshotData!): Project!
	}
`;
