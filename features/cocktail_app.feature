@javascript
Feature: Cocktail App

  Scenario: Load homepage with cocktails
    Given I visit the homepage
    Then I should see a list of cocktails

  Scenario: Search for a cocktail
    Given I visit the homepage
    When I search for "Mojito"
    Then I should see "Mojito" in the results

  Scenario: Search for an unknowncocktail
    Given I visit the homepage
    When I search for "Fakey McTesterson"
    Then I should not see "Fakey McTesterson" in the results

  Scenario: Paginate through cocktails
    Given I visit the homepage
    When I click the next page button
    Then I should see more cocktails

  Scenario: Load cocktail detail page
    Given I visit the homepage
    When I click on the first cocktail
    Then I should see the cocktail details

  Scenario: Copy the share link
    Given I visit the cocktail detail page
    When I click the copy button
    Then I should see "Share link copied" 