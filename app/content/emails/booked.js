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
<h4>Hi ${personalisation.name},</h4>
<h4>Here is confirmation of your booking:</h4>

<p class="details">Room: ${personalisation.roomName}</p>
<p class="details">Description: ${personalisation.bookingDescription}</p>
<p class="details">Date: ${personalisation.bookedDate}</p>
<p class="details">Time: ${personalisation.bookedFrom} - ${personalisation.bookedUntil}</p>

<p>If your plans change, and you no longer need this room, please click the following link to remove your booking so that other people may use the room at this time.</p>
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
