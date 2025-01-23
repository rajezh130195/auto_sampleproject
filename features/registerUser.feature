Feature: User Registration and Product Checkout

  @smoke  
  Scenario: To Create New User and Register on the Automation Exercise Application
    Given I navigate to the home landing page
    When I click on the "SignIn_Login" button
    And I enter a valid email address name and signUp
    And I fill in personal details and click "Create Account"
    Then I should see my name and surname displayed on the home landing screen

  @smoke
  Scenario: Add a product to the cart
    Given I have already logged in and select product
    When I add a product to the cart in products screen
    And the products should appear in the cart with correct details

  