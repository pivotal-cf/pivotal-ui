class BlockCodeRenderer < Struct.new(:code, :markdown_language)
  def render
    if is_html?
      [
        "<div class=\"codeExample\">",
          "<div class=\"exampleOutput\">",
            code,
          "</div>",
          code_block,
        "</div>"
      ].join('')

    elsif is_haml?
      [
        "<div class=\"codeExample\">",
          "<div class=\"exampleOutput\">",
            haml_engine.render(Object.new, {}),
          "</div>",
          code_block,
        "</div>"
      ].join('')

    elsif is_js?
      [
        "<script>#{code}</script> ",
        code_block(extra_classes: ['jsExample'])
      ].join('')

    else
      code_block
    end
  end

  private

  def is_haml?
    markdown_language == 'haml_example'
  end

  def is_html?
    markdown_language == 'html_example'
  end

  def is_js?
    markdown_language == 'js_example'
  end

  def code_block(extra_classes: [])
    classes = extra_classes.insert(0, 'codeBlock')
    [
      "<div class=\"#{classes.join(' ')}\">",
        "<div class=\"highlight\">",
          "<pre>",
            "#{formatter.format(lexer.lex(code))}",
          "</pre>",
        "</div>",
      "</div>",
    ].join('')
  end

  def haml_engine
    @_haml_engine ||= Haml::Engine.new(code.strip)
  end

  def lexer
    @_lexer ||= if is_html?
      Rouge::Lexer.find('html')
    elsif is_haml?
      Rouge::Lexer.find('haml')
    elsif is_js?
      Rouge::Lexer.find('js')
    else
      Rouge::Lexer.find_fancy('guess', code)
    end
  end

  def formatter
    @_formatter ||= Rouge::Formatters::HTML.new(wrap: false)
  end
end
