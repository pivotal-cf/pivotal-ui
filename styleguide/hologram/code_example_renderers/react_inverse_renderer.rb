require_relative '../lib/div_id'
require_relative '../lib/jsx_script_tag'

def is_precompiled?
  %w(production staging).include?(ENV['STYLEGUIDE_ENV'])
end

Hologram::CodeExampleRenderer::Factory.define 'react_inverse' do
  example_template 'markup_inverse_example_template'
  table_template 'markup_inverse_table_template'

  lexer { Rouge::Lexer.find(:html) }

  rendered_example do |code|
    div_id = DivId.next_id
    <<-HTML
      <div id="#{div_id}"></div>
      #{JSXScriptTag.build_script_tag(div_id, code, precompiled: is_precompiled?)}
    HTML
  end
end
