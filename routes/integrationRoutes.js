const express = require('express');
const router = express.Router();

router.get("/integration.json", (req, res) => {
    //Use a secure base url from env so if we need to change it its not hardcoded
    const baseUrl = process.env.BASE_URL || `${req.protocol}://${req.get("host")}`;

    const integrationJson = {
        "data": {
          "descriptions": {
            "app_name": "Minimal SEO",
            "app_description": "Basic SEO check",
            "app_url": baseUrl // Replace with your app's URL
          },
          "integration_type": "interval",
          "integration_category": "Monitoring & Logging",
          "author": "Micah Erumaka",
          "settings": [
            {
              "label": "site",
              "type": "text",
              "required": true,
              "default": "https://naijaceo.com"
            },
            {
              "label": "interval",
              "type": "text",
              "required": true,
              "default": "* * * * *"
            }
          ],
          "tick_url": `${baseUrl}/tick`,   // Replace with your app's /tick URL
          "target_url": "" // Leave empty
        }
      }

    return res.json(integrationJson);
});

module.exports = router;