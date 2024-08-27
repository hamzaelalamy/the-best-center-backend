const Postulation = require("../models/postulation.js");
const { sendNewsletter } = require("../utils/newsletter.js");

exports.sendNewOffers = async (req, res) => {
    try {
        // Fetch all email addresses from the database
        const data = await Postulation.find({}, 'email').lean().exec();
        const emails = [...new Set(data.map(item => item.email))]; // Remove duplicates

        console.log(`Sending emails to ${emails.length} recipients`);

        // Create email content in French
        const subject = "Nouvelles offres disponibles !";
        const offersLink = "https://az-hub-uwhv.onrender.com/offres"; // Replace with your actual offers page URL
        const content = `
            <html>
                <body>
                    <h2>Chers candidats,</h2>
                    <p>Nous sommes ravis de vous informer que de nouvelles offres d'emploi sont disponibles !</p>
                    <p>Ne manquez pas cette opportunité de trouver le poste parfait pour vous.</p>
                    <p>Cliquez sur le lien ci-dessous pour consulter nos dernières offres :</p>
                    <p><a href="${offersLink}">Voir les nouvelles offres</a></p>
                    <p>Si vous avez des questions, n'hésitez pas à nous contacter.</p>
                    <p>Cordialement,<br>L'équipe de recrutement</p>
                </body>
            </html>
        `;

        // Send emails
        const emailPromises = emails.map(email =>
            sendNewsletter(email, subject, content)
                .catch(error => console.error(`Failed to send email to ${email}:`, error))
        );

        await Promise.all(emailPromises);

        res.status(200).json({ message: `Newsletters sent to ${emails.length} recipients` });
    } catch (error) {
        console.error('Error in sendNewOffers:', error);
        res.status(500).json({ error: error.message });
    }
};