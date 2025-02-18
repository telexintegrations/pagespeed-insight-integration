const axios = require('axios');
const cron = require('cron')


 const checkSeoHealth = async (site)=>{
  
   try {

        const apiKey = process.env.GOOGLE_API_KEY;
        const encodedSite = encodeURIComponent(site); // Encode the URL
        const apiUrl = `https://www.googleapis.com/pagespeedonline/v5/runPagespeed?url=${encodedSite}&key=${apiKey}`;
    
        const response = await axios.get(apiUrl);
        const data = response.data;

        // Extract relevant data
        const performanceScore = data.lighthouseResult.categories.performance.score;
        const runtimeError = data.lighthouseResult.runtimeError;
        const audits = data.lighthouseResult.audits;

        // Build a report
        let report = `SEO Health Report for ${site}:\n`;
        report += `Performance Score: ${performanceScore}\n`;

        // Check for runtime errors
        if (runtimeError && runtimeError.code !== "NO_ERROR") {
            report += `\nError: ${runtimeError.message}\n`;
        }

        // Check for broken links
        if (audits["link-text"] && audits["link-text"].warnings) {
            report += `\nLink Text Warnings:\n`;
            audits["link-text"].warnings.forEach(warning => {
                report += `- ${warning}\n`;
            });
        }

        // Check for slow pages Leveraging on the Performance Score
        if (performanceScore < 0.5) {
            report += `\nWarning: Page is slow (Performance Score: ${performanceScore}).\n`;
        }

        // Check for unoptimized content
        if (audits["offscreen-images"] && audits["offscreen-images"].score < 0.8){
            report += `\nUnoptimized Content: Offscreen images are not deferred.\n`;
        }

        console.log("Posting to Telex:\n", report);
    
        return {
            site,
            performance: performanceScore * 100,
            reportSummary: report
        };

    } catch (error) {
        console.error("Error fetching PageSpeed data:", error);
    }
}

// Example usage
module.exports = {checkSeoHealth};
