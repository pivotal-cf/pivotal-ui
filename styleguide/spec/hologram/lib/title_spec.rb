require_relative('../spec_helper')
require_relative('../../../hologram/lib/title')

describe Title do
  it 'returns a beautified version of the portion of the category string' do
    title = Title.from_category('react_astronomy_spacebubble')
    expect(title.to_s).to eq('Pivotal UI React: Spacebubble')
  end

  it 'upcases css to CSS' do
    title = Title.from_category('css_canoe_baseball')
    expect(title.to_s).to eq('Pivotal UI CSS: Baseball')
  end

  it 'subs spaces for dashes and capitalizes every word in component name' do
    title = Title.from_category('react_sandbag_existential-angst')
    expect(title.to_s).to eq('Pivotal UI React: Existential Angst')
  end

  it 'uses the original title when it does not match the nav pattern' do
    title = Title.from_category('i-am-special-love-me')
    expect(title.to_s).to eq('Pivotal UI: I Am Special Love Me')
  end
end
