require 'rspec'
require 'capybara/rspec'
require 'selenium-webdriver'

Dir[File.dirname(__FILE__) + "/support/*.rb"].each { |file| require file }

Capybara.register_driver :chrome do |app|
  Capybara::Selenium::Driver.new(app, browser: :chrome)
end

Capybara.app_host = 'http://localhost:8000'
Capybara.run_server = false
Capybara.javascript_driver = :chrome

RSpec.configure do |config|
  config.color = true
  config.tty = true
  config.formatter = :documentation
end
