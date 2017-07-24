require 'babel/transpiler'

Hologram::CodeExampleRenderer::Factory.define 'jsx' do
  example_template 'jsx_example_template'

  lexer { Rouge::Lexer.find(:jsx) }

  rendered_example do |code|
    Babel::Transpiler.transform(code.strip)["code"]
  end
end
