const { $ } = require('@wdio/globals')
const LoginPage = require('./login.page');

const jsonData = require('../testdata/testdataFile.json');
const commonUtils = require('../pageobjects/commonUtils.page')

/**
 * sub page containing specific selectors and methods for a specific page
 */
class HomePage {
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

    async selectDate(date, month, year) {
        await commonUtils.selectDropdownByVisibleText('//select[@id="days"]' ,date.toString() )
        await commonUtils.selectDropdownByVisibleText('//select[@id="months"]' ,month.toString() )
        await commonUtils.selectDropdownByVisibleText('//select[@id="years"]' ,year.toString() )
    }


}

module.exports =  new HomePage();
