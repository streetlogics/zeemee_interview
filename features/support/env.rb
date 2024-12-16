require 'cucumber/rails'
require 'active_record/fixtures'
require 'capybara-screenshot/cucumber'

# Capybara defaults to CSS3 selectors rather than XPath.
Capybara.default_selector = :css

# By default, any exception happening in your Rails application will bubble up
# to Cucumber so that your scenario will fail. This is a different from how
# your application behaves in the production environment, where an error page
# will be rendered instead.
ActionController::Base.allow_rescue = false

# Database Cleaner configuration
begin
  require 'database_cleaner-active_record'
  DatabaseCleaner.strategy = :transaction
  Cucumber::Rails::Database.javascript_strategy = :transaction
rescue LoadError
  puts "DatabaseCleaner is not available. Please add it to your Gemfile."
end

# Configure Capybara Screenshot
Capybara::Screenshot.autosave_on_failure = true
Capybara::Screenshot.prune_strategy = :keep_last_run

# Set log level to warn to suppress SQL query logs
Rails.logger.level = :warn

# Load fixtures from the same directory as RSpec
fixtures_dir = File.join(Rails.root, 'spec', 'fixtures')
fixtures = Dir[File.join(fixtures_dir, '**', '*.yml')].map { |f| File.basename(f, '.yml') }
ActiveRecord::FixtureSet.create_fixtures(fixtures_dir, fixtures)

Capybara.javascript_driver = :selenium_chrome