Feature: User Registration and Product Checkout

  @smoke  
  Scenario: To Create New User and Register on the Automation Exercise Application
    Given I navigate to the home landing page
    When I click on the "SignIn_Login" button
    Then I enter a valid email address name and signUp
    Then I fill in personal details and click "Create Account"
    Then I should see my name and surname displayed on the home landing screen

  @smoke
  Scenario: Add a product to the cart
    Given I have already logged in and select product
    When I add a product to the cart in products screen
    Then the products should appear in the cart with correct details


  @smoke
  Scenario: Place the Order from the Cart 
    Given I am on the cart page
    Then I click on the "Place Order" button and navigate to payment page
    Then I enter card payment details on the payment page 
    Then I Should place the order successfully

    

  