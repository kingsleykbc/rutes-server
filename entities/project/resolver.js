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

		// Get single project
		project: async (parent, { projectKey }) => {
			const project = await Project.findOne({ projectKey });
			return project;
		}
	},

	Mutation: {
		// Add new Project
		createProject: async (parent, { projectData }, { user }) => {
			try {
				// Create project
				projectData.projectKey = generateCode(10);
				projectData.adminID = user.sub;
				const project = await Project.create(projectData);

				// Send email to testers

				return project;
			} catch (e) {
				throw new ApolloError(e);
			}
		},

		// Update screenshots
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

// GENERATE CODE
const generateCode = length => {
	let result = '';
	const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
	for (let i = 0; i < length; i++) result += characters.charAt(Math.floor(Math.random() * characters.length));
	return result;
};
