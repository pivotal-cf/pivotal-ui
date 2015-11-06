require 'rspec'
require 'pry'

RSpec.configure do |config|
  config.color = true
  config.tty = true
  config.formatter = :documentation
end
