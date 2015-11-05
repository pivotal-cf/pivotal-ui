require_relative '../lib/div_id'
require_relative '../lib/jsx_script_tag'

def is_precompiled?
  %w(production staging).include?(ENV['STYLEGUIDE_ENV'])
end

Hologram::CodeExampleRenderer::Factory.define 'react_wrapped' do
  example_template 'markup_example_template'
  table_template 'markup_table_template'

  lexer { Rouge::Lexer.find(:html) }

  rendered_example do |code|
    div_id = DivId.next_id
    <<-HTML
      <div class="styleguide-component-wrapper">
        <div id="#{div_id}"></div>
      </div>
      #{JSXScriptTag.build_script_tag(div_id, code, precompiled: is_precompiled?)}
    HTML
  end
end
