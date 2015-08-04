require 'babel/transpiler'
require_relative './div_id'

module JSXScriptTag
  def self.build_script_tag(div_id, code, opts={})
    precompiled = opts[:precompiled]
    if precompiled
      js_code = Babel::Transpiler.transform("var reactElement = #{code.strip}")["code"]
      <<-JS
        <script>
          (function() {
            #{js_code}
            React.render(
              reactElement,
              document.getElementById('#{div_id}')
            );
          })();
        </script>
      JS
    else
      <<-JS
        <script type="text/jsx">
          (function() {
            React.render(
              #{code.strip},
              document.getElementById('#{div_id}')
            );
          })();
        </script>
      JS
    end
  end
end
