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
});
