const { gql } = require('apollo-server-express');

module.exports = gql`
	scalar Date

	type Point {
		mouseX: Float!
		mouseY: Float!
	}

	input PointData {
		mouseX: Float!
		mouseY: Float!
	}

	type Element {
		tag: String
		id: String
		className: String
	}

	input ElementData {
		tag: String
		id: String
		className: String
	}

	type Annotation {
		id: ID!
		device: String!
		route: String!
		point: Point!
		message: String!
		element: Element
		createdAt: Date
		updatedAt: Date
	}

	input AnnotationData {
		device: String!
		route: String!
		point: PointData!
		message: String!
		element: ElementData
		createdAt: Date
		updatedAt: Date
	}

	type Feedback {
		id: ID!
		title: String!
		type: String!
		message: String!
		createdAt: Date
		updatedAt: Date
	}

	input FeedbackData {
		title: String!
		type: String!
		message: String!
		createdAt: Date
		updatedAt: Date
	}

	type QuestionnaireResponse {
		questionID: ID!
		answer: String
		createdAt: Date
		updatedAt: Date
	}

	input QuestionnaireResponseData {
		questionID: ID!
		answer: String
		createdAt: Date
		updatedAt: Date
	}

	type Recording {
		route: String
		recording: String
		createdAt: Date
	}

	input RecordingData {
		route: String
		recording: String
		createdAt: Date
	}

	type Response {
		annotations: [Annotation]
		feedback: [Feedback]
		completedTests: [String]
		preQuestionnaireResponse: [QuestionnaireResponse]
		postQuestionnaireResponse: [QuestionnaireResponse]
		recordings: [Recording]
	}

	input ResponseData {
		annotations: [AnnotationData]
		feedback: [FeedbackData]
		completedTests: [String]
		preQuestionnaireResponse: [QuestionnaireResponseData]
		postQuestionnaireResponse: [QuestionnaireResponseData]
		recordings: [RecordingData]
	}

	type Session {
		id: ID!
		testerEmail: String!
		progress: Float
		response: Response
		projectKey: String!
		project: Project
		createdAt: Date
		updatedAt: Date
	}

	input SessionData {
		testerEmail: String!
		projectKey: String!
	}

	input SessionUpdateData {
		response: ResponseData
	}

	extend type Query {
		sessions(projectKey: String!): [Session]!
		session(id: ID, testerEmail: String, projectKey: String): Session
	}

	# MUTATIONS
	type Mutation {
		createSession(sessionData: SessionData): Session
		updateSession(id: ID!, projectKey: String!, sessionUpdateData: SessionUpdateData!): Session
		updateSessionFeedback(id: ID!, feedbackID: ID, feedbackData: FeedbackData): Session
		updateCompletedTests(id: ID!, route: String!): Session
		updateQuestionnaireResponse(id: ID!, type: String!, answers: [QuestionnaireResponseData]!): Session
		updateAnnotations(id: ID!, annotationID: ID, annotationData: AnnotationData): Session
		updateRecordings(id: ID!, recording: RecordingData!): Session
		updateProjectScreenshotFromSession(id: ID!, screenshot: ScreenshotData!): Session
	}
`;
