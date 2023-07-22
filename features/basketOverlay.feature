Feature: Open Basket page

      As User I want
      to check details about added in basket items
      or proceed to Basket page via Basket header button

      Background: Sign in to application and clear basket
      Given I reset dedicated shared storage
      When I open Shop "Login page"
        And I enter "Login" for Test User
        And I enter "Password" for Test User
        And I click "Submit" button
      Then I expect "Shop" page is opened
      # Then I clear basket via API
      Then I clear basket via UI when it contains items
        And I expect basket is clear

    Scenario: TC-1 Open Basket Page with empty basket
        And I expect "0" displayed near header basket button
      When I click "Basket" button
      Then I expect Basket overlay is opened
      When I click "Navigate to Basket Page"
      Then I expect "Basket" page is opened

    Scenario Outline: <testCaseId> Open Basket Page with <quantity> <productType> product
        And I expect "0" displayed near header basket button
      Then I add "<quantity>" piece of "<productType>" product "#1" in basket
        And I expect "<quantity>" displayed near header basket button
      When I click "Basket" button
      Then I expect Basket overlay is opened
        And I verify details for added in basket items
        And I verify total cost of added in basket items
      When I click "Navigate to Basket Page"
      Then I expect "Basket" page is opened

      Examples:
      | testCaseId | productType | quantity |
      | TC-2       | standard    | 1        |
      | TC-3       | discount    | 1        |

    Scenario: TC-4 Open Basket Page with 9 different products
        And I expect "0" displayed near header basket button
      When I add "1" piece of "discount" product "#1" in basket
        And I add "8" unique different products in basket
      Then I expect "9" displayed near header basket button
      When I click "Basket" button
      Then I expect Basket overlay is opened
        And I verify details for added in basket items
        And I verify total cost of added in basket items
      When I click "Navigate to Basket Page"
      Then I expect "Basket" page is opened

    Scenario: TC-5 Open Basket Page with 9 discount products
        And I expect "0" displayed near header basket button
      When I add "9" pieces of "discount" product "#1" in basket
      Then I expect "9" displayed near header basket button
      When I click "Basket" button
      Then I expect Basket overlay is opened
        And I verify details for added in basket items
        And I verify total cost of added in basket items
      When I click "Navigate to Basket Page"
      Then I expect "Basket" page is opened
