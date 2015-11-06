require 'rspec'
require 'capybara/rspec'
require 'selenium-webdriver'
require 'net/http'
require 'uri'
require 'pry'

TEST_STYLEGUIDE_HOST = 'http://localhost:9001'
DEV_STYLEGUIDE_HOST = 'http://localhost:8000'

def test_styleguide_running?
  begin
    uri = URI(TEST_STYLEGUIDE_HOST)
    http = Net::HTTP.new(uri.host, uri.port)
    request = Net::HTTP::Get.new(uri.request_uri)
    response = http.request(request)
    true
  rescue
    false
  end
end

Dir[File.dirname(__FILE__) + "/support/*.rb"].each { |file| require file }

Capybara.app_host = test_styleguide_running? ? TEST_STYLEGUIDE_HOST : DEV_STYLEGUIDE_HOST
Capybara.run_server = false
Capybara.javascript_driver = :selenium

RSpec.configure do |config|
  config.color = true
  config.tty = true
  config.formatter = :documentation
end

def within_example_containing(text)
  example = page.find(:xpath, "//div[contains(@class, 'exampleOutput') and contains(., '#{text}')]")
  within example do
    yield
  end
end

