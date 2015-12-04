require_relative 'spec_helper'

feature 'the main nav', js: true do
  pending 'navigating in mobile mode' do
    set_window_size_mobile
    visit '/'
    within('.styleguide-header') do
      expect(page).not_to have_content 'Layout'
      click_on 'Toggle navigation'
      expect(page).to have_content 'Layout'

      expect(page).not_to have_content 'Vertical Align'
      click_on 'Expand Layout'
      expect(page).to have_content 'Vertical Align'

      click_on 'Expand Objects'
      expect(page).to have_content 'Tables'
      expect(page).not_to have_content 'Vertical Align'

      click_on 'Expand Objects'
      expect(page).not_to have_content 'Tables'

      click_on 'Toggle navigation'
      expect(page).not_to have_content 'Layout'
    end
  end
end
