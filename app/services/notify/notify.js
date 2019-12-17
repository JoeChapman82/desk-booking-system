const NotifyClient = require('notifications-node-client').NotifyClient;

module.exports = {
	sendEmail: (templateId, emailAddress, personalisation) => {
		const notifyClient = new NotifyClient(process.env.NOTIFY_API_KEY);
		return notifyClient.sendEmail(templateId, emailAddress, personalisation);
	},
};
