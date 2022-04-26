const mailjet = require('node-mailjet').connect('7e3955e638f44d792ce942cba02224bd', '4949d724a5c03a69c4f47a8e099e4ea9');

module.exports.sendMail = () =>
	mailjet
		.post('send', { version: 'v3.1' })
		.request({
			Messages: [
				{
					From: {
						Email: 'kcha1@student.le.ac.uk',
						Name: 'Kingsley'
					},
					To: [
						{
							Email: 'chubiekay@yahoo.com',
							Name: 'Kingsley'
						}
					],
					Subject: 'Greetings from Mailjet.',
					TextPart: 'My first Mailjet email',
					HTMLPart:
						"<h3>Dear passenger 1,c  welcome to <a href='https://www.mailjet.com/'>Mailjet</a>!</h3><br />May the delivery force be with you!",
					CustomID: 'AppGettingStartedTest'
				}
			]
		})
		.then(result => {
			console.log(result.body);
		})
		.catch(err => {
			console.log(err.message);
			console.log(err.statusCode);
		});

// var nodemailer = require('nodemailer');

// const mailJet = '7e3955e638f44d792ce942cba02224bd';
// const mailJetSecretKey = '4949d724a5c03a69c4f47a8e099e4ea9';

// var transporter = nodemailer.createTransport({
// 	service: 'SendGrid',
// 	auth: {
// 		user: 'apikey',
// 		pass: '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'
// 	}
// });

// var mailOptions = {
// 	from: 'kcha1@student.le.ac.uk',
// 	to: 'chubiekay@yahoo.com',
// 	subject: 'Sending Email using Node.js',
// 	text: 'That was easy!'
// };

// module.exports.sendMail = () => {
// 	// transporter.sendMail(mailOptions, function (error, info) {
// 	// 	if (error) {
// 	// 		console.log({ error: error });
// 	// 	} else {
// 	// 		console.log('Email sent: ' + info.response);
// 	// 	}
// 	// });
// };

// const sgMail = require('@sendgrid/mail');
// sgMail.setApiKey(process.env.SENDGRID_API_KEY);

// module.exports.sendMail = () => {
// 	const msg = {
// 		to: 'kanyabuike@gmail.com',
// 		from: 'kcha1@student.le.ac.uk',
// 		subject: 'Sending with SendGrid is Fun',
// 		text: 'and easy to do anywhere, even with Node.js',
// 		body: '<strong>and easy to do anywhere, even with Node.js</strong>'
// 	};
// 	sgMail
// 		.send(msg)
// 		.then(mail => {
// 			console.log('Email sent', mail);
// 		})
// 		.catch(error => {
// 			console.error(error);
// 		});
// };
