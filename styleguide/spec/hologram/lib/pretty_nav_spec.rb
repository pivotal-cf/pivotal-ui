require_relative('../spec_helper')
require_relative('../../../hologram/lib/pretty_nav')

describe PrettyNav do
  it 'capitalizes labels' do
    ugly_nav = {
      'react' => {
	      'bagel' => 'react_bagel.html',
      }
    }

    expect(PrettyNav.new(ugly_nav).to_hash).to eq(
        {
          'React' => {
	          'Bagel' => 'react_bagel.html',
          }
        }
      )
  end

  it 'puts CSS in all caps' do
    ugly_nav = {
      'css' => {
	      'mower' => 'css_mower.html',
      }
    }

    expect(PrettyNav.new(ugly_nav).to_hash).to eq(
        {
          'CSS' => {
              'Mower' => 'css_mower.html',
          }
        }
      )
  end

  it 'splits component names and capitalizes' do
    ugly_nav = {
      'react' => {
	      'tastes-pretty-good' => 'react_tastes-pretty-good.html',
      }
    }

    expect(PrettyNav.new(ugly_nav).to_hash).to eq(
        {
          'React' => {
	          'Tastes Pretty Good' => 'react_tastes-pretty-good.html',
          }
        }
      )
  end
end
