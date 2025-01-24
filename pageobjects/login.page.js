const { $ } = require('@wdio/globals')
const commonUtils = require('../pageobjects/commonUtils.page')

/**
 * sub page containing specific selectors and methods for a specific page
 */
class LoginPage  {
    /**
     * define selectors using getter methods
     */
    get inputUsername () {
        return $('//input[@name="name"]');
    }

    get inputEmail () {
        return $('//input[@name="name"]//following::input[@name="email"]');
    }

    get btnSignup () {
        return $('//button[text()="Signup"]');
    }

    /**
     * a method to encapsule automation code to interact with the page
     * e.g. to login using username and password
     */
    async login (username) {
        await this.inputUsername.setValue(username);
        await this.inputEmail.setValue(`test${Date.now()}@example.com`);
        await this.btnSignup.click();
        console.log('New User Signed Up successfully')
    }

    /**
     * overwrite specific options to adapt it to page object
     */
    open () {
        return super.open('login');
    }

}

module.exports = new LoginPage();  
