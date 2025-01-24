const { Given, When, Then} = require('@wdio/cucumber-framework')
const { expect, $ } = require('@wdio/globals')


const jsonData = require('../testdata/testdataFile.json')
const productPage = require('../pageobjects/product.page')
const commonUtils = require('../pageobjects/commonUtils.page')

Given(/^I have already logged in and select product$/, async () => {
    await $('//a[text()=" Products"]').click();
    console.log("Products tab is selected");
});

When(/^I add a product to the cart in products screen$/, async () => {
    //It is to add products to the user cart
    await productPage.addProducts(3);
    await productPage.addProducts(1);
    await productPage.addProducts(2);
    await productPage.logProducts();
    
});

Then(/^the products should appear in the cart with correct details$/, async () => {
    //Validates alll products and performs checkouts
    await $('//a[text()="Proceed To Checkout"]').click();
    await productPage.verifyCartProducts(1);
    await productPage.verifyCartProducts(2);
    await productPage.verifyCartProducts(3);
    await commonUtils.actualExpectedValidation( $('//ul[@id="address_delivery"]/li[8]'), jsonData.userRegistration.phoneNumber);
    await commonUtils.actualExpectedValidation( $('//ul[@id="address_delivery"]/li[6]'), jsonData.userRegistration.city+" "+jsonData.userRegistration.state+" "+jsonData.userRegistration.zipCode);
    console.log("User's Delivery Address Phone Number is displayed as expected");
    await $('//textarea[@name="message"]').click();
    await $('//textarea[@name="message"]').setValue("Placing order for all the added products in the cart for the respective user address");
    await $('//a[text()="Place Order"]').click();
});
