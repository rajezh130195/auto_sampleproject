const { Given, When, Then } = require('@wdio/cucumber-framework');
const { expect, $ } = require('@wdio/globals', 'expect')


const jsonData = require('../testdata/testdataFile.json');
const homePage = require('../pageobjects/homePage.page')
const commonUtils = require('../pageobjects/commonUtils.page');
const loginPage = require('../pageobjects/login.page');

Given(/^I navigate to the home landing page$/, async () => {
    await browser.url('https://automationexercise.com');
});

When(/^I click on the "SignIn_Login" button$/, async () => {
    await $('a[href="/login"]').click();
});

When(/^I enter a valid email address name and signUp$/, async () => {
    //New User SignUp
    await loginPage.login(jsonData.userRegistration.firstName);
});

When(/^I fill in personal details and click "Create Account"$/, async () => {
    //enter all the personal infirmation details using below script in after user SignUp
    await $('//input[@value="Mr"]').click();
    await $('//input[@id="password"]').click();
    await $('//input[@id="password"]').setValue(jsonData.userRegistration.password);
    await homePage.selectDate(13 , 'March' ,1998);
    await homePage.nameAddress();
    //jsonData.userRegistration.firstName, jsonData.userRegistration.lastName, jsonData.userRegistration.company, jsonData.userRegistration.address, jsonData.userRegistration.state, jsonData.userRegistration.city, jsonData.userRegistration.zipCode, jsonData.userRegistration.phoneNumber
    await $('//button[text()="Create Account"]').click();
    await homePage.continueAction();
    
});

Then(/^I should see my name and surname displayed on the home landing screen$/, async () => {
    await $('//img[@alt="Website for automation practice"]').isDisplayed();
    console.log('Landed on the Automation Exercise Home Page');
    await commonUtils.actualExpectedValidation($('//a[text()=" Logged in as "]/b'), jsonData.userRegistration.firstName );
    console.log('Successfully logged in with : '+jsonData.userRegistration.firstName+' user');
});
