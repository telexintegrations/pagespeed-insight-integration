const express = require('express');
const router = express.Router();

router.get("/integration.json", (req, res) => {
    
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
            "is_active": False,
            "integration_type": "interval",
            "key_features": [ "seo"],
            "integration_category": "Marketing Automation",
            "author": "Micah Erumaka",
            "website": baseUrl,
            "settings": [
                {
                    "label": "site",
                    "type": "text",
                    "description": "The URL of the website to monitor",
                    "required": True,
                    "default": ""
                },
                 {
                    "label": "interval",
                    "type": "text",
                    "description": "How often to run the check (crontab syntax)",
                    "required": True,
                    "default": "* * * * *" 
                },
                {
                    "label": "performanceThreshold",
                    "type": "number",
                    "description": "Minimum acceptable PageSpeed Insights performance score (0-100)",
                    "required": True,
                    "default": 70  
                },
                  {
                    "label": "brokenLinksLimit",
                    "type": "number",
                    "description": "Maximum number of broken links to tolerate before reporting",
                    "required": True,
                    "default": 1  
                },
                  {
                    "label": "slowPagesLimit",
                    "type": "number",
                    "description": "Maximum number of slow pages to tolerate before reporting",
                    "required": True,
                    "default": 2  
                }
            ],
            "tick_url": `${baseUrl}/tick`, 
            "target_url": "" 
        }
    };

    return res.json(integrationJson);
});

module.exports = router;