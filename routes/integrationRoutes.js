const express = require('express');
const router = express.Router();

router.get("/integration.json", (req, res) => {
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
            "app_url": "https://pagespeed-insight.onrender.com",
            "background_color": "#fff"
          },
          "is_active": true,
          "integration_type": "interval",
          "integration_category": "Monitoring & Logging",
          "key_features": [
            "seo"
          ],
          "author": "Micah Erumaka",
          "settings": [
            {
              "label": "site",
              "type": "text",
              "required": true,
              "default": "naijaceo.com"
            },
            {
              "label": "interval",
              "type": "text",
              "required": true,
              "default": "5"
            }
          ],
          "target_url": "https://pagespeed-insight.onrender.com/integration",
          "tick_url": "https://pagespeed-insight.onrender.com/tick"
        }
      }
    return res.json(integrationJson);
});

module.exports = router;