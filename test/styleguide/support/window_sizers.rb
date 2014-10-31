def set_window_size_mobile
  set_window_size(400, 600)
end

def set_window_size(width, height)
  window = Capybara.current_session.driver.browser.manage.window
  window.resize_to(width, height)
end
