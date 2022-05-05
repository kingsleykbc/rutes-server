const { ApolloError } = require('apollo-server-express');
const Session = require('./model');
const Project = require('../project/model');
const { doc, setDoc } = require('firebase/firestore');
const { db } = require('../../helpers/firebase');

module.exports = {
	Session: {
		// Get nested project in session
		project: async session => {
			try {
				const project = await Project.findOne({ projectKey: session.projectKey });
				return project;
			} catch (e) {
				throw new ApolloError(e);
			}
		}
	},

	Query: {
		// Get all sessions
		sessions: async (parent, { projectKey }) => {
			const sessions = await Session.find({ projectKey });
			return sessions;
		},

		// Get single session
		session: async (parent, { id, testerEmail, projectKey }) => {
			try {
				if (!(id || (testerEmail && projectKey))) throw Error('Invalid identifiers');

				// If ID was passed, just return the session
				if (id) {
					const session = await Session.findOne({ _id: id });
					return session;
				}

				// Verify that it is an approved tester
				const project = await Project.findOne({ projectKey });
				if (!project) throw Error('Invalid project key');

				if (!project.approvedTesters.includes(testerEmail)) throw Error('Tester email not permitted');

				let session = await Session.findOne({ projectKey, testerEmail });

				// If no session exists, create one
				if (!session) session = await createNewSession(testerEmail, projectKey);

				return session;
			} catch (e) {
				throw new ApolloError(e);
			}
		}
	},

	Mutation: {
		// Add new session
		createSession: async (parent, { sessionData: { testerEmail, projectKey } }) => {
			const session = await createNewSession(testerEmail, projectKey);
			return session;
		},

		// Update session
		updateSession: async (parent, { id, projectKey, sessionUpdateData: { response } }) => {
			const project = await Project.findOne({ projectKey }, { tests: 1 });
			const progress = (response.completedTests.length / project.tests.length) * 100;
			const updatedSession = await Session.findOneAndUpdate({ _id: id }, { progress, response }, { new: true });
			return updatedSession;
		},

		// Update feedbacks
		updateSessionFeedback: async (parent, { id, feedbackID, feedbackData }) => {
			const op = feedbackData
				? { $addToSet: { 'response.feedback': feedbackData } }
				: { $pull: { 'response.feedback': { _id: feedbackID } } };
			const updatedSession = await Session.findOneAndUpdate({ _id: id }, op, { new: true });

			return updatedSession;
		},

		// Update completed tests
		updateCompletedTests: async (parent, { id, route }) => {
			// Update the response
			let updatedSession = await Session.findOneAndUpdate({ _id: id }, { $addToSet: { 'response.completedTests': route } }, { new: true });

			// Update the progress
			const project = await Project.findOne({ projectKey: updatedSession.projectKey }, { tests: 1 });
			const progress = (updatedSession.response.completedTests.length / project.tests.length) * 100;
			updatedSession = await Session.findOneAndUpdate({ _id: id }, { progress }, { new: true });

			return updatedSession;
		},

		// Update questionnaire response
		updateQuestionnaireResponse: async (parent, { id, type, answers }) => {
			const field = type.toLowerCase() === 'pre' ? 'response.preQuestionnaireResponse' : 'response.postQuestionnaireResponse';
			const updatedSession = await Session.findOneAndUpdate({ _id: id }, { [field]: answers }, { new: true });
			return updatedSession;
		},

		// Update annotations
		updateAnnotations: async (parent, { id, annotationID, annotationData }) => {
			const op = annotationData
				? { $addToSet: { 'response.annotations': annotationData } }
				: { $pull: { 'response.annotations': { _id: annotationID } } };
			const updatedSession = await Session.findOneAndUpdate({ _id: id }, op, { new: true });

			return updatedSession;
		},

		// Update screenshot (done here to force a data refresh on the client)
		updateProjectScreenshotFromSession: async (parent, { id, screenshot }, { user }) => {
			try {
				const session = await Session.findOne({ _id: id });
				await Project.updateOne({ projectKey: session.projectKey }, { $addToSet: { screenshots: screenshot } });
				return session;
			} catch (e) {
				console.log(e.message);
				throw new ApolloError(e);
			}
		},

		// Update Recording
		updateRecordings: async (parent, { id, recording }, { user }) => {
			try {
				const session = await Session.findOneAndUpdate({ _id: id }, { $addToSet: { 'response.recordings': recording } }, { new: true });
				return session;
			} catch (e) {
				console.log(e.message);
				throw new ApolloError(e);
			}
		}
	}
};

/**
 * CREATE SESSION
 * @param {String} testerEmail The testers email
 * @param {String} projectKey The project key
 * @returns Session data
 */
const createNewSession = async (testerEmail, projectKey) => {
	try {
		const existingSessions = await Session.findOne({ testerEmail, projectKey });
		if (existingSessions) throw new ApolloError('Session already exists');

		// Create the session
		const session = await Session.create({ testerEmail, projectKey });

		// Create chat session in firebase
		await setDoc(doc(db, 'rutes-session', session._id.toString()), {
			adminTyping: false,
			testerTyping: false,
			createdAt: new Date(),
			lastUpdated: new Date(),
			testerEmail,
			projectKey
		});

		return session;
	} catch (e) {
		throw new ApolloError(e.message);
	}
};
