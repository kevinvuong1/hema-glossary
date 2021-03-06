const Terms = require('../models/terms');
const termCheck = require('../util/term_check');


exports.retrieveTerms = async function(req, res, next) {
    try {
        // Retrieve list of terms from database
        const terms = await Terms.find({});

        res.json({terms});

    } catch (err) {
        res.status(500).send(err);
    }
};

exports.createTerm = async function(req, res, next) {
    try {
        let { word, lang, trans, comments } = req.body;

        // Trim whitespace from both sides of strings
        word = word.trim();
        lang = lang.trim();
        trans = trans.trim();
        comments = comments.trim();

        // Check if the fields are valid
        termCheck({ word, lang, trans, comments });

        const term = new Terms({word, lang, trans, comments});
        await term.save();

        // Send back term indicating that it was created.
        res.json({term});

    } catch (err) {
        console.log(err);
        if(err) {
            return next(err);
        }
    }
};