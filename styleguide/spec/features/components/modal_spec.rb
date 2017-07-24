require_relative '../spec_helper'

feature 'React Modal', js: true do
  scenario 'using the component' do
    visit '/react_components_modals.html'
    expect(page).not_to have_css('.modal')
    expect(page).not_to have_css('.modal-backdrop')

    click_on 'Open Modal'
    within '.modal' do
      expect(page).to have_content('WHAT A HEADER!')
    end
    expect(page).to have_css('.modal-backdrop')

    within '.modal' do
      click_on 'Close'
    end
    expect(page).not_to have_css('.modal')
    expect(page).not_to have_css('.modal-backdrop')
  end
end
