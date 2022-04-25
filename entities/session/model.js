/**
 * SESSION SCHEMA
 */
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const AnnotationSchema = new Schema(
	{
		device: { type: String, required: true },
		route: { type: String, required: true },
		point: { mouseX: Number, mouseY: Number },
		message: { type: String, required: true },
		element: { tag: String, id: String, className: String }
	},
	{ timestamps: true }
);

const FeedbackSchema = new Schema(
	{
		title: { type: String, required: true },
		type: { type: String, required: true },
		message: { type: String, required: true }
	},
	{ timestamps: true }
);

const QuestionnaireResponseSchema = new Schema(
	{
		questionID: { type: String, required: true },
		answer: { type: String, required: true }
	},
	{ timestamps: true }
);

// ===================================================================================================================
//  MAIN
// ===================================================================================================================
const sessionSchema = new Schema(
	{
		testerEmail: { type: String, required: true },
		progress: { type: Number, default: 0 },
		response: {
			annotations: [AnnotationSchema],
			feedback: [FeedbackSchema],
			completedTests: [String],
			preQuestionnaireResponse: [QuestionnaireResponseSchema],
			postQuestionnaireResponse: [QuestionnaireResponseSchema]
		},
		projectKey: { type: String, required: true }
	},
	{ timestamps: true }
);

module.exports = mongoose.model('session', sessionSchema);
