# Source: https://gist.github.com/jdcantrell/b0ad9a6bcbfc2551713f

require 'pry'

class CssCriticTestGenerator < Hologram::Plugin
  attr :output_dir, :tests

  HTML_HEADER = <<-eos
<html>
  <head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
    <meta name="viewport" content="width=device-width">
    <link rel="stylesheet" href="/build/css/screen.css">
  </head>
  <body class="pam">
  eos

  HTML_FOOTER = "\n\n</body>\n</html>"

  CODE_REGEX = /^\s*```html_example(.*?)\s*```/m

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
    #We create tests based of html_examples if a comment has the test
    #config and no plugin block
    if comment_block.config.has_key?('test') and !has_plugin
      tests = comment_block.markdown.scan(CODE_REGEX)
      write_test(comment_block.config['name'], tests.flatten) unless tests.empty?
    end
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
    destination = config['destination'] + '/../test/components'
    FileUtils.mkdir_p(destination)
    return Pathname.new(destination).realpath
  end

end