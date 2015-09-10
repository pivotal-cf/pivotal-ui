Hologram::CodeExampleRenderer::Factory.define 'html_inverse' do
  example_template 'markup_inverse_example_template'
  table_template 'markup_inverse_table_template'

  lexer { Rouge::Lexer.find(:html) }
end
