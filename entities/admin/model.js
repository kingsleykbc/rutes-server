const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const adminSchema = new Schema(
	{
		fullName: { type: String, required: true },
		email: { type: String, required: true, unique: true, lowercase: true },
		password: { type: String, required: true }
	},
	{ timestamps: true }
);

module.exports = mongoose.model('admin', adminSchema);
