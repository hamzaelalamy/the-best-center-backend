const Postulation = require("../models/Postulation.js");
const { sendNewsletter } = require("../utils/newsletter.js");

exports.sendNewOffers = async (req, res) => {
    try {
        const data = await Postulation.find({}, 'email').exec();
        const emails = data.map((item) => item.email);
        console.log(emails);
        emails.forEach(element => {
            sendNewsletter(element, "New Offers", "Check out our new offers!");
        });

        // const { email, subject, content } = req.body;
        // sendNewsletter(email, subject, content);
        res.status(200).json({ message: "Newsletter sent" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
