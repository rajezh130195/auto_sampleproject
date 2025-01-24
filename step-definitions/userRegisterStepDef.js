const { Given, When, Then } = require('@wdio/cucumber-framework');
const { expect, $ } = require('@wdio/globals', 'expect')


const jsonData = require('../testdata/testdataFile.json');
const loginPage = require('../pageobjects/login.page')
const accountInfoPage = require('../pageobjects/accountInfo.page')

Given(/^I navigate to the home landing page$/, async () => {
    await browser.url('https://automationexercise.com');
});

When(/^I click on the "SignIn_Login" button$/, async () => {
    await $('a[href="/login"]').click();
});

When(/^I enter a valid email address name and signUp$/, async () => {
    //New User SignUp
    const nameInput = $('//input[@name="name"]');
    await nameInput.setValue(jsonData.userRegistration.firstName);
    const emailInput = $('//input[@name="name"]//following::input[@name="email"]');
    await emailInput.setValue(`test${Date.now()}@example.com`);
    const signIn = $('//button[text()="Signup"]');
    await signIn.click();
});

When(/^I fill in personal details and click "Create Account"$/, async () => {
    //enter all the personal infirmation details using below script in after user SignUp
    await $('//input[@value="Mr"]').click();
    await $('//input[@id="password"]').click();
    await $('//input[@id="password"]').setValue(jsonData.userRegistration.password);
    await loginPage.selectDate(13 , 'March' ,1998);
    await accountInfoPage.nameAddress();
    //jsonData.userRegistration.firstName, jsonData.userRegistration.lastName, jsonData.userRegistration.company, jsonData.userRegistration.address, jsonData.userRegistration.state, jsonData.userRegistration.city, jsonData.userRegistration.zipCode, jsonData.userRegistration.phoneNumber
    await $('//button[text()="Create Account"]').click();
    await accountInfoPage.continueAction();
    
});

Then(/^I should see my name and surname displayed on the home landing screen$/, async () => {
    await $('//img[@alt="Website for automation practice"]').isDisplayed();
    console.log('Landed on the Automation Exercise Home Page');
    await accountInfoPage.actualExpectedValidation($('//a[text()=" Logged in as "]/b'), jsonData.userRegistration.firstName );
    console.log('Successfully logged in with : '+jsonData.userRegistration.firstName+' user');
});
