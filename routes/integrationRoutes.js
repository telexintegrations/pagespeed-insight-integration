const express = require('express');
const router = express.Router();

router.get("/integrations.json", (req, res) => {
    //Use a secure base url from env so if we need to change it its not hardcoded
    const baseUrl = process.env.BASE_URL || `${req.protocol}://${req.get("host")}`;

    const integrationJson = {
        "data": {
            "date": {
                "created_at": "2025-02-18",
                "updated_at": "2025-02-18"
            },
            "descriptions": {
                "app_name": "Pagespeed-insight",
                "app_description": "Monitors website SEO performance using Google PageSpeed",
                "app_logo": "https://i.imgur.com/lZqvffp.png",
                "app_url": baseUrl,
                "background_color": "#fff"
            },
            "integration_category": "Marketing Automation",
            "is_active": true,
            "integration_type": "interval",
            "key_features": [
                "seo"
            ],
            "author": "Micah Erumaka",
            "settings": [
                {
                    "label": "site",
                    "type": "text",
                    "description": "The URL of the website to monitor",
                    "required": true,
                    "default": "https://naijaceo.com"
                },
                 {
                    "label": "interval",
                    "type": "text",
                    "description": "How often to run the check (crontab syntax)",
                    "required": true,
                    "default": "* * * * *" // Every minute
                },
                {
                    "label": "performanceThreshold",
                    "type": "number",
                    "description": "Minimum acceptable PageSpeed Insights performance score (0-100)",
                    "required": true,
                    "default": 70  //Example value
                },
                  {
                    "label": "brokenLinksLimit",
                    "type": "number",
                    "description": "Maximum number of broken links to tolerate before reporting",
                    "required": true,
                    "default": 1  //Example value
                },
                  {
                    "label": "slowPagesLimit",
                    "type": "number",
                    "description": "Maximum number of slow pages to tolerate before reporting",
                    "required": true,
                    "default": 2  //Example value
                }
            ],
            "tick_url": `${baseUrl}/tick`, 
            "target_url": "" 
        }
    };

    res.json(integrationJson);
});

module.exports = router;