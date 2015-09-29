require_relative '../spec_helper'

feature 'React Expander', js: true do
  scenario 'using the component' do
    visit '/react_components_expander.html'

    within_example_containing('Toggle Content') do
      expect(page).not_to have_content('Content in expander')

      click_on 'Toggle Content'

      expect(page).to have_content('Content in expander')

      click_on 'Toggle Content'

      expect(page).not_to have_content('Content in expander')
    end
  end
end
