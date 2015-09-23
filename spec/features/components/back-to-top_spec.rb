require_relative '../spec_helper'

def expect_page_to_be_at_top
  page.document.synchronize do |variable|
    scroll_top = page.evaluate_script('$("html, body").scrollTop()')
    raise Capybara::ElementNotFound, "Page is not at the top. Scroll top = #{scroll_top}" unless scroll_top == 0
  end
end

feature 'JQuery Back to Top', js: true do
  scenario 'using the component' do
    visit '/'
    expect(page).not_to have_css('.back-to-top')

    page.evaluate_script('$("html, body").scrollTop(500)')
    page.find('.back-to-top').click

    expect_page_to_be_at_top
    expect(page).not_to have_css('.back-to-top')
  end
end
