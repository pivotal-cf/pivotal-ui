require 'babel/transpiler'

Hologram::CodeExampleRenderer::Factory.define 'jsx' do
  example_template 'js_example_template'

  lexer { Rouge::Lexer.find(:js) }

  rendered_example do |code|
    Babel::Transpiler.transform(code.strip)["code"]
  end
end
