require_relative('../spec_helper')
require_relative('../../../hologram/lib/pretty_nav')

describe PrettyNav do
  it 'capitalizes labels' do
    ugly_nav = {
      'react' => {
        'objects' => {
          'bagel' => 'react_objects_bagel.html',
        }
      }
    }

    expect(PrettyNav.new(ugly_nav).to_hash).to eq(
        {
          'React' => {
            'Objects' => {
              'Bagel' => 'react_objects_bagel.html',
            }
          }
        }
      )
  end

  it 'puts CSS in all caps' do
    ugly_nav = {
      'css' => {
        'grass' => {
          'mower' => 'css_grass_mower.html',
        }
      }
    }

    expect(PrettyNav.new(ugly_nav).to_hash).to eq(
        {
          'CSS' => {
            'Grass' => {
              'Mower' => 'css_grass_mower.html',
            }
          }
        }
      )
  end

  it 'splits component names and capitalizes' do
    ugly_nav = {
      'react' => {
        'spanakopita' => {
          'tastes-pretty-good' => 'react_spanakopita_tastes-pretty-good.html',
        }
      }
    }

    expect(PrettyNav.new(ugly_nav).to_hash).to eq(
        {
          'React' => {
            'Spanakopita' => {
              'Tastes Pretty Good' => 'react_spanakopita_tastes-pretty-good.html',
            }
          }
        }
      )
  end
end
