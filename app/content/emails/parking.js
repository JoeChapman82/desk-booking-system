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
<h4>Greetings,</h4>
<h4>Here is confirmation of your parking reservation:</h4>

<p class="details">Date: ${personalisation.date}</p>
<p class="details">Space: ${personalisation.space}</p>
<p class="details">Booked for: ${personalisation.name}</p>

<p>If you no longer require the space for your visitor, please click the link below to cancel the reservation</p>
		<p><b>${personalisation.cancelLink}</b></p>
<b>Yours sincerely,</b><br>
<b>The leeds one room booking team.</b>
	</div>
<div class="footer">
</div>
</body>
</html>`
;
};
