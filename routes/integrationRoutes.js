const express = require('express');
const router = express.Router();
require('dotenv').config();
router.get("/integration.json", (req, res) => {
    
    const baseUrl = process.env.BASE_URL || `${req.protocol}://${req.get("host")}`;
    console.log(baseUrl);
    const integrationJson = {
        "data": {
            "date": {
                "created_at": "2025-02-18",
                "updated_at": "2025-02-18"
            },
            "descriptions": {
                "app_description": "Monitors website SEO performance using Google PageSpeed",
                "app_logo": "https://res.cloudinary.com/naijaceo/image/upload/v1595027227/3d_logo_maker_bonus_ssqd0g.png",
                "app_name": "Pagespeed-insight",
                "app_url": baseUrl,
                "background_color": "#fff"
            },
            "is_active": true,
            "integration_type": "interval",
            "key_features": [ "seo Perfomance Monitoring"],
            "integration_category": "Monitoring & Logging",
            "author": "Micah Erumaka",
            // "website": baseUrl,
            "settings": [
                {
                    "label": "site-1",
                    "type": "text",
                    "required": true,
                    "default": ""
                },
                {
                    "label": "interval",
                    "type": "text",
                    "required": true,
                    "default": "0 0 * * 0"
                  },
                {
                    "label": "performance Threshold",
                    "type": "number",
                    "required": true,
                    "default": 70  
                },
                  {
                    "label": "brokenLinksLimit",
                    "type": "number",
                    "required": true,
                    "default": 1 
                },
                  {
                    "label": "slowPagesLimit",
                    "type": "number",
                    "required": true,
                    "default": 2,  
                }
            ],
            "tick_url": `${baseUrl}/tick`, 
            "target_url": "" 
        }
    };

    res.json(integrationJson);
});

module.exports = router;