const { $ } = require('@wdio/globals')
const LoginPage = require('../pageobjects/login.page');

const jsonData = require('../testdata/testdataFile.json');

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
    async login(username, password) {
        await this.inputUsername.setValue(username);
        await this.inputPassword.setValue(password);
        await this.btnSubmit.click();
    }

    async selectDate(date, month, year) {
        await $('//select[@id="days"]').selectByVisibleText(date.toString());
        await $('//select[@id="months"]').selectByVisibleText(month).toString();
        await $('//select[@id="years"]').selectByVisibleText(year.toString());
    }

    async nameAddress() {
        await $('//input[@id="first_name"]').setValue(jsonData.userRegistration.firstName);
        await $('//input[@id="last_name"]').setValue(jsonData.userRegistration.lastName);
        await $('//input[@id="company"]').setValue(jsonData.userRegistration.company);
        await $('//input[@id="address1"]').setValue(jsonData.userRegistration.address);
        await $('//input[@id="state"]').setValue(jsonData.userRegistration.state);
        await $('//input[@id="city"]').setValue(jsonData.userRegistration.city);
        await $('//input[@id="zipcode"]').setValue(jsonData.userRegistration.zipCode);
        await $('//input[@id="mobile_number"]').setValue(jsonData.userRegistration.phoneNumber);
    }

    async continueAction() {
        await $('//a[text() ="Continue"]').click();
    }

    async addProducts(productNumber) {
        const productName = await $('(//img[@alt="ecommerce website products"]/following-sibling::p)[' + productNumber + ']').getText();
        const productAmount = await $('(//img[@alt="ecommerce website products"]/following-sibling::h2)[' + productNumber + ']').getText();

        if (!this.productMap.has(productName)) {
            this.productMap.set(productName, [productAmount]);
        }

        await $('(//div/a[@data-product-id="' + productNumber + '"])[1]').click();
        const isDisplayed = await $('//div/p[text()="Your product has been added to cart."]').isDisplayed();
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
