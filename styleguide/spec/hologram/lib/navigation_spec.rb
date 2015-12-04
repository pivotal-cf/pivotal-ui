require_relative('../spec_helper')
require_relative('../../../hologram/lib/navigation')

describe NavPath do
  it 'categorizes react components' do
    nav_path = NavPath.from_category('react_crises_bath-tub')
    expect(nav_path.language).to eq('react')
    expect(nav_path.component_type).to eq('crises')
    expect(nav_path.component).to eq('bath-tub')
  end

  it 'categorizes css components' do
    nav_path = NavPath.from_category('css_bingo_bango')
    expect(nav_path.language).to eq('css')
    expect(nav_path.component_type).to eq('bingo')
    expect(nav_path.component).to eq('bango')
  end

  it 'returns null for others' do
    nav_path = NavPath.from_category('banana_hammock-role')
    expect(nav_path).to be_nil
  end
end

describe 'generate_nav_from_categories' do
  it 'creates a directory structure by from underscore separated values' do
    categories = {
      'react_objects_bagel' => 'react_objects_bagel.html',
    }

    expect(generate_nav_from_categories(categories)).to eq({
          'react' => {
            'objects' => {
              'bagel' => 'react_objects_bagel.html',
            }
          }
        }
      )
  end

  it 'maps components to their urls' do
    categories = {
      'react_objects_bagel' => 'react_objects_bagel.html',
      'react_objects_candle' => 'react_objects_candle.html',
    }

    expect(generate_nav_from_categories(categories)).to eq({
          'react' => {
            'objects' => {
              'bagel' => 'react_objects_bagel.html',
              'candle' => 'react_objects_candle.html',
            }
          }
        }
      )
  end

  it 'separates components by component type' do
    categories = {
      'react_objects_bagel' => 'react_objects_bagel.html',
      'react_bandolier_keyboard' => 'react_bandolier_keyboard.html',
    }

    expect(generate_nav_from_categories(categories)).to eq({
          'react' => {
            'objects' => {
              'bagel' => 'react_objects_bagel.html',
            },
            'bandolier' => {
              'keyboard' => 'react_bandolier_keyboard.html',
            },
          },
        }
      )
  end

  it 'separates component types by language' do
    categories = {
      'react_objects_bagel' => 'react_objects_bagel.html',
      'css_guilt_skateboard' => 'css_guilt_skateboard.html',
    }

    expect(generate_nav_from_categories(categories)).to eq({
          'react' => {
            'objects' => {
              'bagel' => 'react_objects_bagel.html',
            },
          },
          'css' => {
            'guilt' => {
              'skateboard' => 'css_guilt_skateboard.html',
            },
          },
        }
      )
  end
end
