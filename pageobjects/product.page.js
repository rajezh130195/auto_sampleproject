const { $ } = require('@wdio/globals')
const LoginPage = require('./login.page');

const jsonData = require('../testdata/testdataFile.json');
const commonUtils = require('../pageobjects/commonUtils.page')

/**
 * sub page containing specific selectors and methods for a specific page
 */
class AccountInfoPage {
    /**
     * define selectors using getter methods
     */
    
    constructor() {
        this.productMap = new Map(); // Initialize a Map to store product details
    }

    get inputUsername() {
        return $('#username');
    }

    get inputPassword() {
        return $('#password');
    }

    get btnSubmit() {
        return $('button[type="submit"]');
    }

    /**
     * a method to encapsule automation code to interact with the page
     * e.g. to login using username and password
     */

    async addProducts(productNumber) {
        const productName = await $('(//img[@alt="ecommerce website products"]/following-sibling::p)[' + productNumber + ']').getText();
        const productAmount = await $('(//img[@alt="ecommerce website products"]/following-sibling::h2)[' + productNumber + ']').getText();

        if (!this.productMap.has(productName)) {
            this.productMap.set(productName, [productAmount]);
        }

        await $('(//div/a[@data-product-id="' + productNumber + '"])[1]').click();
        const isDisplayed = commonUtils.isElementPresent('//div/p[text()="Your product has been added to cart."]')
        if (isDisplayed) {
            console.log(`Product "${productName}" with amount "${productAmount}" has been added to the cart successfully.`);
        }
        if (productNumber != 2) {
            await $('//button[text()="Continue Shopping"]').click();
        } else {
            await $('//a/u[text()="View Cart"]').click();
        }
    }

    async logProducts() {
        if (this.productMap.size === 0) {
            console.log("No products have been added to the Map.");
            return;
        }

        console.log("Products in the Map:");
        this.productMap.forEach((amount, name) => {
            console.log(`Product Name: ${name}, Product Amount: ${amount}`);
        });
    }


    async verifyCartProducts(number) {
        
        // Iterate over each cart product
            const cartProductName = await $('//a[@href="/product_details/'+number+'"]').getText(); // Get the product name from the element
    
            // Check if the product name exists in productMap
            if (this.productMap.has(cartProductName)) {
                console.log(`Product '${cartProductName}' is present in the cart and matches the productMap.`);
            } else {
                console.error(`Product '${cartProductName}' is not found in the productMap.`);
            }
    }

    async actualExpectedValidation(getAttribute, value){
        const actualValue = await getAttribute.getText();
        const expectedValue = value;
        console.log("value is "+actualValue.toString(), expectedValue.toString())
        expect(actualValue).toBe(expectedValue.toString());
    }

    /**
     * overwrite specific options to adapt it to page object
     */
    open() {
        return super.open('login');
    }

}

module.exports =  new AccountInfoPage();
