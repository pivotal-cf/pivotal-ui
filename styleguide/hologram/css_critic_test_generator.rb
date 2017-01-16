# Source: https://gist.github.com/jdcantrell/b0ad9a6bcbfc2551713f

require 'pry'

class CssCriticTestGenerator < Hologram::Plugin
  attr :output_dir, :tests

  HTML_HEADER = <<-eos
<html>
  <head>
    <meta name="viewport" content="width=device-width">
    <link rel="stylesheet" href="components.css">
    <link rel="stylesheet" href="styleguide/styleguide.css">
    <link rel="stylesheet" href="styleguide/github.css">
  </head>
  <body class="pam">
  eos

  HTML_FOOTER = "\n\n</body>\n</html>"

  CODE_REGEX_HTML = /^\s*```html_example(?:_table)?(.*?)\s*```/m
  CODE_REGEX_WRAPPED_HTML = /^\s*```html_wrapped_example(.*?)\s*```/m

  def initialize(config, args)
    @name = 'css-test'
    @tests = []

    super(config, args)

    if self.is_active?
      @output_dir = setup_dir(config)
    end
  end

  def plugin(text, block, file)
    write_test(block.config['name'], [text])
    return ''
  end

  def block(comment_block, file, has_plugin)
    unwrapped_tests = comment_block.markdown.scan(CODE_REGEX_HTML).flatten
    wrapped_tests = comment_block.markdown.scan(CODE_REGEX_WRAPPED_HTML).flatten.map do |example|
      %Q(<div class="styleguide-component-wrapper">#{example}</div>)
    end
    tests = unwrapped_tests + wrapped_tests
    write_test(comment_block.config['name'], tests) unless tests.empty?
  end

  def finalize(pages)
    puts "Tests can be found in #{@output_dir}"
  end

  def is_active?
    true
  end

  private
  def write_test(name, content)
    test_name = "#{name}.html"

    fh = File.open("#{@output_dir}/#{test_name}", 'w')

    fh.write(HTML_HEADER)
    for fragment in content
      fh.write(fragment)
    end
    fh.write(HTML_FOOTER)

    fh.close

    @tests.push(test_name)
  end

  def setup_dir(config)
    destination = config['destination'] + '/../spec/css/components'
    FileUtils.mkdir_p(destination)
    return Pathname.new(destination).realpath
  end

end
