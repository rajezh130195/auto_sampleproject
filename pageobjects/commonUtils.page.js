const { $ } = require('@wdio/globals')
const LoginPage = require('./login.page');

const jsonData = require('../testdata/testdataFile.json');

/**
 * sub page containing specific selectors and methods for a specific page
 */
class CommonUtils {
    /**
     * define selectors using getter methods
     */
    async actualExpectedValidation(getAttribute, value){
        const actualValue = await getAttribute.getText();
        const expectedValue = value;
        console.log("value is "+actualValue.toString(), expectedValue.toString())
        expect(actualValue).toBe(expectedValue.toString());
    }

    async selectDropdownByVisibleText(selector, visibleText) {
        try {
            const dropdown = await $(selector); // Find the dropdown element
            await dropdown.selectByVisibleText(visibleText); // Select the option by visible text
            console.log(`Successfully selected '${visibleText}' from dropdown with selector '${selector}'.`);
        } catch (error) {
            console.error(`Failed to select '${visibleText}' from dropdown. Error: ${error.message}`);
        }
    }

    async isElementPresent(selector){
        try{
            await $(selector).isDisplayed();
        }
        catch (error) {
            console.error(` '${selector}' Element is not displayed on the Page. Error: ${error.message}`);
        }
    }
}

module.exports =  new CommonUtils();
