const mongoose = require('mongoose');

// Setup mongoose server
/**
 * @reference (taken from mongoose (url))
 */
mongoose
	.connect(process.env.MONGO_DB, { useNewUrlParser: true, useUnifiedTopology: true })
	.then(() => console.log('Mongo DB Connected'))
	.catch(e => console.log('Error connecting to Mongo DB: ', e.message));
