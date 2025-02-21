const { checkSeoHealth } = require('../services/seoAnalysis');
require('dotenv').config();
describe('checkSeoHealth', () => {
    it('should return a valid SEO report with the correct performance score when the API call is successful', async () => {
        const websiteUrl = 'https://www.naijaceo.com'; 
        const seoReport = await checkSeoHealth(websiteUrl);

        // Assert that the function returns an object
        expect(typeof seoReport).toBe('object');

        // Assert that the object has the expected properties
        expect(seoReport).toHaveProperty('site');
        expect(seoReport).toHaveProperty('performance');
        expect(seoReport).toHaveProperty('reportSummary');

        // Assert that the 'site' property is the input website URL
        expect(seoReport.site).toBe(websiteUrl);

        // Assert that the 'performance' property is a number between 0 and 100
        expect(typeof seoReport.performance).toBe('number');
        expect(seoReport.performance).toBeGreaterThanOrEqual(0);
        expect(seoReport.performance).toBeLessThanOrEqual(100);

        // You can add more assertions to check the 'reportSummary' property if needed
        expect(typeof seoReport.reportSummary).toBe('string');
    },100000);
});