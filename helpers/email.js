const nodemailer = require('nodemailer');
require('dotenv').config();

// Setup SMTP
const transporter = nodemailer.createTransport({
	service: 'yahoo',
	auth: {
		user: process.env.EMAIL_USER,
		pass: process.env.EMAIL_PASSWORD
	},
	tls: {
		rejectUnauthorized: false
	}
});

// Email template
const html = (projectTitle, projectURL) => `
<html lang="en">
	<head>
		<style>
			body {
				border: 2px solid #ddd;
				max-width: 500px;
				margin: 20px auto;
				padding: 30px;
				text-align: center;
				font-family: Arial, Helvetica, sans-serif;
			}
			p {
				text-align: left;
				line-height: 30px;
			}
			button {
				background: #eb3f5b;
				padding: 15px 30px;
				border-radius: 5px;
				border: none;
				cursor: pointer;
				color: #fff;
				font-weight: bold;
				font-size: 1rem;
			}
		</style>
	</head>
	<body>
		<div class="heading">
			<img
				width="40px"
				src="http://cdn.mcauto-images-production.sendgrid.net/8c11f6f0706ba20f/d606ae93-01ad-43e2-a4ee-2b72d9dfb28e/41x41.png"
			/>
		</div>
		<h3>New Test Added</h3>
		<p>
			Hello,
			<br />
			You have been added as a tester for the ${projectTitle} project.
			<br />
			To proceed with the test, please visit: <b>${projectURL}</b> or click the button below
		</p>
		<a href="${projectURL}">
			<button>Commence Test</button>
		</a>
	</body>
</html>
`;

/**
 * SEND NOTIFICATION EMAIL
 * @param {String} email - Tester email
 * @param {String} projectTitle - Project title
 * @param {String} projectURL - Project URL
 * @returns {SMTPTransport.SentMessageInfo} - Sent email
 */
module.exports.sendMail = async (email, projectTitle, projectURL) => {
	return transporter
		.sendMail({
			from: process.env.EMAIL_USER,
			to: email,
			subject: 'NEW RUTES TEST PROJECT',
			html: html(projectTitle, projectURL)
		})
		.then(mail => {
			return mail;
		})
		.catch(err => {
			console.log('Error sending mail', err.message);
			return err;
		});
};
