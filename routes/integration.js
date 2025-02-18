const express = require ('express');
const app = express.Router();


// Here I target the the integration Json end poiny as pointed out by the

app.get("/integration", (req,res)=>{
    const baseUrl = `${req.protocol}://${req.get("host")}`;
    res.json(
        {
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
    });
})


module.exports = app;