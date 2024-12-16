Given('I visit the homepage') do
  visit root_path
end

Then('I should see a list of cocktails') do
  expect(page).to have_css('.card', minimum: 1)
end

When('I search for {string}') do |search_term|
  fill_in 'search-bar', with: search_term, disabled: false
  click_button 'GO'
end

Then('I should see {string} in the results') do |expected_text|
  expect(page).to have_content(expected_text)
end
Then('I should not see {string} in the results') do |string|
  expect(page).to have_content("0 results")
end

When('I click {string}') do |button_text|
  click_button button_text
end

Then('I should see more cocktails') do
  expect(page).to have_css('.card', minimum: 1)
end

When('I click on the first cocktail') do
  first('.card').click
end

Then('I should see the cocktail details') do
  expect(page).to have_css('.cocktail-name')
end

Given('I visit the cocktail detail page') do
  visit "/share/#{Cocktail.first.id}/test"
end

When('I click the copy button') do
  click_button 'Copy'
end

Then('I should see "Share link copied"') do
  expect(page).to have_content('Share link copied')
end

When('I click the next page button') do
  all('.nav-icon')[1].click
end