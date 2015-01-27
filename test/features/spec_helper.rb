require 'rspec'
require 'capybara/rspec'
require 'selenium-webdriver'

Dir[File.dirname(__FILE__) + "/support/*.rb"].each { |file| require file }

Capybara.app_host = 'http://localhost:9001'
Capybara.run_server = false
Capybara.javascript_driver = :selenium

RSpec.configure do |config|
  config.color = true
  config.tty = true
  config.formatter = :documentation
end
