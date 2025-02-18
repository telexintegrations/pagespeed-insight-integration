const express = require('express');
const router = express.Router();
const { checkSeoHealth } = require('../services/seoAnalysis');
const axios = require('axios'); //Ensure axios is required here

async function postToReturnUrl(returnUrl, message) {
    try {
        await axios.post(returnUrl, {
            message: message,
            username: "SEO Monitor",
            event_name: "SEO Check",
            status: "info"
        }, {
            headers: { 'Content-Type': 'application/json' } // Set the correct Content-Type header
        });
    } catch (error) {
        console.error("Error posting to target_url:", error);
        throw error; //Re-throw so calling function knows it failed
    }
}
router.post('/tick', async (req, res) => {
    try {
        const { settings, target_url } = req.body;

        console.log(target_url);

        // Extract settings
        const siteSetting = settings.find(s => s.label === "site");
        const intervalSetting = settings.find(s => s.label === "interval");
        const performanceThresholdSetting = settings.find(s => s.label === "performanceThreshold");
        const brokenLinksLimitSetting = settings.find(s => s.label === "brokenLinksLimit");
        const slowPagesLimitSetting = settings.find(s => s.label === "slowPagesLimit");

        // Validate required settings
        if (!siteSetting || !siteSetting.default) {
            return res.status(400).json({ error: "Site URL is required." });
        }
        if (!intervalSetting || !intervalSetting.default) {
            return res.status(400).json({ error: "Interval is required." });
        }
        //Extract values
        const site = siteSetting.default;
        const interval = intervalSetting.default;  //Crontab expression
        const performanceThreshold = Number(performanceThresholdSetting.default); //Ensure number
        const brokenLinksLimit = Number(brokenLinksLimitSetting.default);
        const slowPagesLimit = Number(slowPagesLimitSetting.default);
        
        // Perform SEO check
        const seoChecker = await checkSeoHealth(site);

        if (!seoChecker) {
            const errorMessage = "SEO check failed.";
            await postToReturnUrl(target_url, errorMessage)
            return res.status(500).json({ error: errorMessage });
        }

        // Check if SEO performance is below threshold
        let reportSummary = "";
        if (seoChecker.performance < performanceThreshold) {
            reportSummary = `Performance is below the threshold of ${performanceThreshold}%.`;
        }
        if (seoChecker.brokenLinks && seoChecker.brokenLinks.length > brokenLinksLimit) {
            reportSummary += `  Too many broken links: ${seoChecker.brokenLinks.length}.  Limit is ${brokenLinksLimit}`;
        }
        if (seoChecker.slowPages && seoChecker.slowPages.length > slowPagesLimit) {
            reportSummary += `  Too many slow pages: ${seoChecker.slowPages.length}.  Limit is ${slowPagesLimit}`;
        }

        // Construct message for Telex
        const message = `SEO Report for ${seoChecker.site}:\n- Performance: ${seoChecker.performance}%\n${reportSummary}`;

        // Post to target_url (Telex)
        await postToReturnUrl(target_url, message);

        res.status(202).json({ status: "accepted", site: seoChecker.site, performance: seoChecker.performance });

    } catch (error) {
        console.error("Error in /tick route:", error);
        try {
            //Attempt to send error to target_url even on failure
            if (req.body.target_url) {
                await postToReturnUrl(req.body.target_url, "Internal server error during SEO check.");
            }
        } catch (postError) {
            console.error("Failed to post error message to target_url", postError)
        }
        res.status(500).json({ error: "Internal server error." });
    }
});

module.exports = router;