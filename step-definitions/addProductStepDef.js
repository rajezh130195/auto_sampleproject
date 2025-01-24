const { Given, When, Then} = require('@wdio/cucumber-framework');
const { expect, $ } = require('@wdio/globals')


const jsonData = require('../testdata/testdataFile.json');
const loginPage = require('../pageobjects/login.page')
const accountInfoPage = require('../pageobjects/accountInfo.page')

Given(/^I have already logged in and select product$/, async () => {
    await $('//a[text()=" Products"]').click();
    console.log("Products tab is selected");
});

When(/^I add a product to the cart in products screen$/, async () => {
    //It is to add products to the user cart
    await accountInfoPage.addProducts(3);
    await accountInfoPage.addProducts(1);
    await accountInfoPage.addProducts(2);
    await accountInfoPage.logProducts();
    
});

Then(/^the products should appear in the cart with correct details$/, async () => {
    //Validates alll products and performs checkouts
    await $('//a[text()="Proceed To Checkout"]').click();
    await accountInfoPage.verifyCartProducts(1);
    await accountInfoPage.verifyCartProducts(2);
    await accountInfoPage.verifyCartProducts(3);
    await accountInfoPage.actualExpectedValidation( $('//ul[@id="address_delivery"]/li[8]'), jsonData.userRegistration.phoneNumber);
    await accountInfoPage.actualExpectedValidation( $('//ul[@id="address_delivery"]/li[6]'), jsonData.userRegistration.city+" "+jsonData.userRegistration.state+" "+jsonData.userRegistration.zipCode);
    console.log("User's Delivery Address Phone Number is displayed as expected");
    await $('//textarea[@name="message"]').click();
    await $('//textarea[@name="message"]').setValue("Placing order for all the added products in the cart for the respective user address");
    await $('//a[text()="Place Order"]').click();
});
