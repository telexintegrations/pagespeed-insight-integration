const express = require ('express');
const app = express.Router();


// Here I target the the integration Json end poiny as pointed out by the

app.get("/integration.json", (req,res)=>{
    const baseUrl = `${req.protocol}://${req.get("host")}`;
    res.json({
        data: {
            descriptions: {
                app_name: "SEO Monitor",
                app_description: "Monitors website SEO performance using Google PageSpeed",
                app_url: baseUrl,
                app_logo: "https://i.imgur.com/lZqvffp.png",
                background_color: "#fff"
            },
            integration_type: "interval",
            settings: [
                { label: "site", type: "text", required: true, default: "" },
                { label: "interval", type: "text", required: true, default: "* * * * *" }
            ],
            tick_url: `${baseUrl}/tick`
        }
    });
})


module.exports = app;