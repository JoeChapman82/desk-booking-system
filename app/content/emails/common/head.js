const head = `
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <style>
        p, b, h4 {
            color: black;
        }
		.main {
            background-color: rgba(232, 232, 232, 1);
			padding-top: 20px;
			padding-bottom: 50px;
			padding-left: 10px;
            padding-right: 10px;
        }
        .header {
            background-color: black;
            width: 100%;
			text-align: center;
			padding: 10px;
            box-sizing: border-box;
        }
		.header h1 {
			padding: 0;
			margin: 0;
		}
        .footer {
            background-color: black;
            width: 100%;
            height: 50px;
        }
		.header-text,
		.footer-text {
			color: white;
            font-size: 24px;
		}
        .details {
            line-height: 100%;
        }
    </style>
</head>
`;

module.exports = head;
