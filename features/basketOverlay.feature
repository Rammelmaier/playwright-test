Feature: Verify Basket functionality

    As User I want to have ability
    to check details about added in basket items
    or proceed to Basket page via Basket header button

    # Background: Sign in and clear basket

    Scenario: Open Basket Page for empty basket
      Given I open Shop "Login page"
      When I enter "Login" for Test User
        And I enter "Password" for Test User
        And I click "Submit" button
      Then I expect "Shop" page is opened
      Then I clear basket manually if it contains items
        And I expect basket is clear
# Then I clear basket via API
# Then I add "1" piece of "standard" product "#1" in basket
# Then I add "2" piece of "standard" product "#3" in basket
# When I click "Basket" button
#   And I expect Basket overlay is opened
#   And I verify details for added in basket items
#   And I verify total cost of added in basket items

# npm run test:cucumber
