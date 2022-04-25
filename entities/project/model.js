/**
 * PROJECT SCHEMA
 */
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const testSchema = new Schema({
	route: { type: String, required: true },
	fullRoute: { type: String, required: true },
	instructions: [String]
});

const questionnaireSchema = new Schema({
	type: { type: String, required: true },
	question: { type: String, required: true },
	options: [String]
});

const screenshotSchema = new Schema({
	device: String,
	route: String,
	screenshot: String
});

// ===================================================================================================================
//  MAIN
// ===================================================================================================================
const projectSchema = new Schema(
	{
		title: { type: String, required: true },
		description: { type: String, required: true },
		tests: [testSchema],
		preQuestionnaire: [questionnaireSchema],
		postQuestionnaire: [questionnaireSchema],
		projectKey: { type: String, required: true, unique: true },
		url: { type: String, required: true },
		approvedTesters: [String],
		screenshots: [screenshotSchema],
		adminID: { type: mongoose.Types.ObjectId, required: true }
	},
	{ timestamps: true }
);

module.exports = mongoose.model('project', projectSchema);
