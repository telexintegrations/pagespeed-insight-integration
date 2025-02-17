const express = require('express');
const app = express.Router();
const {checkSeoHealth} = require('../services/seoAnalysis'); 

app.post('/tick', async (req,res)=>{

    try{
        const {settings, return_url} = req.body;

        // Here the site URL is extracted from the settings
        const siteSetting = settings.find(s => s.label === "site");
            if (!siteSetting || !siteSetting.default) {
                return res.status(400).json({ error: "Site URL is required." });
            }
            const site = siteSetting.default;
        
        
        const seoChecker = await checkSeoHealth(site);

        if (!seoChecker) {
            return res.status(500).json({ error: "SEO check failed." });
        }

        // Here I construct the message for Telex
        const message = `SEO Report for ${seoChecker.site}:\n- Performance: ${seoChecker.performance}%\n${seoChecker.reportSummary}`;

        // Post to return_url (Telex)
        await axios.post(return_url, {
            message,
            username: "SEO Monitor",
            event_name: "SEO Check",
            status: "info"
        });
        res.status(202).json({ status: "accepted", site: seoChecker.site, performance: seoChecker.performance });
    }catch (error) {
        console.error("Error in /tick route:", error);
        res.status(500).json({ error: "Internal server error." });
    }

})

module.exports = app;