require 'hologram'

include ERB::Util

class PivotalUiRenderer < Hologram::MarkdownRenderer
  ## Block items using the default Redcarpet implementation
  # block_html(raw_html)
  # block_quote(quote)
  # footnotes(content)
  # footnote_def(content, number)
  # hrule()
  # list_item(text, list_type)
  # table_row(content)
  # table_cell(content, alignment)

  def list(contents, list_type)
    case list_type
    when :ordered
      "<ol class=\"#{css_class_name}\">#{contents}</ol>"
    else
      "<ul class=\"#{css_class_name}\">#{contents}</ul>"
    end
  end

  def paragraph(text)
    "<p class=\"#{css_class_name}\">#{text}</p>"
  end

  def table(header, body)
    "<table class=\"#{css_class_name}\"> #{header} #{body} </table>"
  end

  # def table_cell(content, alignment)
    # puts "*"*50 + " OMG CONTENT!"
    # puts content
    # puts "*"*50
  # end

  ## Span items using the default Redcarpet implementation
  # autolink(link, link_type)
  # double_emphasis(text)
  # emphasis(text)
  # image(link, title, alt_text)
  # linebreak()
  # raw_html(raw_html)
  # triple_emphasis(text)
  # strikethrough(text)
  # superscript(text)
  # underline(text)
  # highlight(text)
  # quote(text)
  # footnote_ref(number)

  def codespan(code)
    "<code class=\"#{css_class_name}\">#{html_escape(code)}</code>"
  end

  def link(link, title, content)
    "<a class=\"#{css_class_name}\" href=\"#{link}\" title=\"#{title || link}\">#{content}</a>"
  end

  private

  def css_class_name
    'styleguide'
  end
end
