# Code

## Examples

```html
::title=Basic unstyled
<pre class="pre-unstyled"><code>class Foo
  def bar
    puts 'hi'
  end
end</code></pre>
```

```html
::title=Inline
<p>This is an example of a paragraph with <code>an inline code snippet</code> within it.</p>
```

```html
::title=Inline dark
<p>This is an example of a paragraph with <code class="inline-dark">a dark inline code snippet</code> within it.</p>
```

#### Styled Code
```html
::noToolbar
<div class="alert alert-info mbxl">
<div>
  <h5 class="em-high mtn">
    Special installation instructions
  </h5>
  <p>
    Our code is styled using <a href="http://prismjs.com" target="_blank">PrismJS</a>.
    You will need some additional setup to get it to work:
  </p>

  <ol class="mtxl">
    <li>
      <p>Install <code>pui-prismjs</code>. This package provides the code parsing magic.</p>
      <div class="mbl">
        <code class="pam">
          <img src="/static/download.svg" width="16" height="16" alt="Install Prismjs"/>
          npm install pui-prismjs --save
        </code>
      </div>
    </li>

    <li>
      <p>Include `pui-prismjs` in your main javascript file:</p>
      <div class="mbl">
        <code class="pam">
          require("pui-prismjs");
        </code>
      </div>
    </li>

    <li>
      <p>Install a PrismJs theme. This makes the code look pretty.</p>
      <div class="mbl">
        <code class="pam">
          <img src="/static/download.svg" width="16" height="16" alt="Install Prismjs"/>
          npm install prismjs-&lt;theme&gt;-theme --save
        </code>
      </div>
      <p>The two light and dark Pivotal themes are:</p>
      <ul>
        <li><code>prismjs-okaidia-theme</code></li>
        <li><code>prismjs-default-theme</code></li>
      </ul>
    </li>
  </ol>
</div>
</div>
```


In order to show syntax-highlighted code, you will need to apply a language specific class to the code tag. For example, `.language-ruby`.

There are several languages already available (and others available from the [Prismjs.com](http://prismjs.com
) website), including:

* Markup
* CSS
* C-like
* JavaScript
* Java
* PHP
* PHP
* CoffeeScript
* Sass
* Bash
* Python
* HTTP
* Ruby
* Go


```html
<pre><code class="language-ruby">class Foo
  def bar
    puts 'hi'
  end
end</code></pre>
```

```html
::title=Scrollable
<pre class="pre-scrollable"><code class="language-ruby">class Foo
  def bar
    puts 'hi'
  end

  def bar
    puts 'hi'
  end

  def bar
    puts 'hi'
  end

  def bar
    puts 'hi'
  end

  def bar
    puts 'hi'
  end

  def bar
    puts 'hi'
  end

  def bar
    puts 'hi'
  end
end</code></pre>
```

```html
::title=Terminal window
::description=You will need to follow the PrismJS installation instructions in the <a href="#code_styled">styled code</a> section.
<div class="terminal">
  <ul class="terminal-dots"><li/><li/><li/></ul>
  <pre><code class="language-ruby">class Foo
  def bar
    puts 'hi'
  end
end

class Bar
  def bar
    puts 'hi'
  end
end

class Baz
  def bar
    puts 'hi'
  end
end

class Bop
  def bar
    puts 'hi'
  end
end</code></pre>
</div>

```

## Installation & Usage

`npm install pivotal-ui --save`

`import * as Code from 'pivotal-ui/css/code';`