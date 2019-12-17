const head = require('./common/head');

module.exports = (personalisation) => {
return `
<!DOCTYPE html>
<html lang="en-US">
${head}
<body>
<div class="header">
    <h1 class="header-text">Leeds One Room Booking</h1>
</div>
	<div class="main">
<h2>Create your new Leeds One booking system account.</h2>
<h4>Greetings.</h4>
<h4>You have received an invitation to create an administrator account on the new Leeds One room booking system.</h4>

<p>Click the link below to confirm your email address and choose your password.</p>
		<p><b>${personalisation.link}</b></p>
<b>Yours sincerely,</b><br>
<b>The leeds one room booking team.</b>
	</div>
<div class="footer">
</div>
</body>
</html>`
;
};
