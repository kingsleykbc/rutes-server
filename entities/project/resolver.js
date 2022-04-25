const Project = require('./model');
const Session = require('../session/model');
const { ApolloError } = require('apollo-server-express');

module.exports = {
	Project: {
		sessions: async parent => {
			const sessions = await Session.find({ projectKey: parent.projectKey });
			return sessions;
		}
	},

	Query: {
		/**
		 * GET ALL PROJECTS
		 */
		projects: async (parent, { keyword }, { user }) => {
			const query = { adminID: user.sub };

			// Keyword search
			if (keyword?.trim()) {
				query.$or = [
					{ title: { $regex: keyword, $options: 'i' } },
					{ description: { $regex: keyword, $options: 'i' } },
					{ url: { $regex: keyword, $options: 'i' } }
				];
			}
			const projects = await Project.find(query).sort({ createdAt: -1 });
			return projects;
		},

		/**
		 * GET SINGLE PROJECT
		 */
		project: async (parent, { projectKey }) => {
			const project = await Project.findOne({ projectKey });
			return project;
		}
	},

	Mutation: {
		/**
		 * CREATE NEW PROJECT
		 */
		createProject: async (parent, { projectData }, { user }) => {
			try {
				// Create project
				projectData.projectKey = generateCode();
				projectData.adminID = user.sub;
				const project = await Project.create(projectData);

				// TODO: Send email to testers

				return project;
			} catch (e) {
				throw new ApolloError(e);
			}
		},

		/**
		 * UPDATE SCREENSHOTS
		 */
		updateProjectScreenshot: async (parent, { projectKey, screenshot }, { user }) => {
			try {
				const updatedProject = await Project.findOneAndUpdate({ projectKey }, { $addToSet: { screenshots: screenshot } }, { new: true });
				return updatedProject;
			} catch (e) {
				console.log(e.message);
				throw new ApolloError(e);
			}
		}
	}
};

/**
 * RETURN CODE
 * @returns {String} Generated code
 */
const generateCode = () => {
	let result = '';
	const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
	for (let i = 0; i < 10; i++) result += characters.charAt(Math.floor(Math.random() * characters.length));
	return result;
};
