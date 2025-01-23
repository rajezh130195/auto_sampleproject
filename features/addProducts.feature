Feature: Add Products to cart

 @smoke
 Scenario: Add a product to the cart in products screen
    Given I have already logged in and select product
    When I add a product to the cart in products screen
    And the products should appear in the cart with correct details