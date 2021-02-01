import axios from "axios";

require("dotenv").config();
const Twit = require("twit");
const Cronjob = require("cron").CronJob;

const app = new Twit({
	consumer_key: process.env.wikired_consumer_key,
	consumer_secret: process.env.wikired_consumer_secret,
	access_token: process.env.wikired_access_token,
	access_token_secret: process.env.wikired_access_secret,
});

const tweet = async () => {
	const text = await axios.get("http://wikired_api/wikired").then((r) => {
		return r.data.text;
	});
	app.post(
		"statuses/update",
		{ status: text },
		function (err: Error, data: any, response: any) {}
	);
};

const job = new Cronjob("0 0-23 * * *", () => {
	tweet().then();
});
job.start();
