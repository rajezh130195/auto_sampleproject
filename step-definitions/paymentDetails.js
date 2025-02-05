const { Given, When, Then} = require('@wdio/cucumber-framework')
const { expect, $ } = require('@wdio/globals')


const jsonData = require('../testdata/testdataFile.json')
const productPage = require('../pageobjects/product.page')
const commonUtils = require('../pageobjects/commonUtils.page')

Given(/^I am on the cart page$/, async () => {
    await commonUtils.actualExpectedValidation( $('//ul[@id="address_delivery"]/li[8]'), jsonData.userRegistration.phoneNumber);
    await commonUtils.actualExpectedValidation( $('//ul[@id="address_delivery"]/li[6]'), jsonData.userRegistration.city+" "+jsonData.userRegistration.state+" "+jsonData.userRegistration.zipCode);
    console.log("User's Delivery Address Phone Number is displayed as expected");
});

Then(/^I click on the "Place Order" button and navigate to payment page$/, async () => {
    //It helps to place the order from the user cart
    await $('//textarea[@name="message"]').click();
    await $('//textarea[@name="message"]').setValue("Placing order for all the added products in the cart for the respective user address");
    await $('//a[text()="Place Order"]').click();
});

Then(/^I enter card payment details on the payment page$/, async () => {
    //Validates all details and enters card payment details to place order
    await commonUtils.isElementPresent('//h2[text()="Payment"]');
    await commonUtils.inputSetValue('//input[@name="name_on_card"]', jsonData.checkout.cardDetails.cardName)
    await commonUtils.inputSetValue('//input[@name="card_number"]', jsonData.checkout.cardDetails.cardNumber)
    await commonUtils.inputSetValue('//input[@name="cvc"]', jsonData.checkout.cardDetails.cvv)
    await commonUtils.inputSetValue('//input[@name="expiry_month"]', jsonData.checkout.cardDetails.expiryMonth)
    await commonUtils.inputSetValue('//input[@name="expiry_year"]', jsonData.checkout.cardDetails.expiryYear);
});


Then(/^I Should place the order successfully$/, async () => {
    //Validates the order is placed 
    await $('//button[text()="Pay and Confirm Order"]').click()
    await commonUtils.isElementPresent('//b[text()="Order Placed!"]')
    await commonUtils.isElementPresent('//p[contains(text(), "Your order has been confirmed")]')
    await commonUtils.actualExpectedValidation($('//p[contains(text(), "Your order has been confirmed")]'), "Congratulations! Your order has been confirmed!");
});