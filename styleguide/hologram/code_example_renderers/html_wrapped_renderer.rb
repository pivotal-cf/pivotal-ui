require 'securerandom'

Hologram::CodeExampleRenderer::Factory.define 'html_wrapped' do
  example_template 'markup_example_template'
  table_template 'markup_table_template'

  lexer { Rouge::Lexer.find(:html) }

  rendered_example do |code|
    "<div class=\"styleguide-component-wrapper\">#{code}</div>"
  end
end
