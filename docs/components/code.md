---
title: Code
cssPath: pivotal-ui/css/code
---

```html
//title=Basic unstyled
<pre class="pre-unstyled"><code>class Foo
  def bar
    puts 'hi'
  end
end</code></pre>
```

```html
//title=Inline
<p>This is an example of a paragraph with <code>an inline code snippet</code> within it.</p>
```

```html
//title=Inline dark
<p>This is an example of a paragraph with <code class="inline-dark">a dark inline code snippet</code> within it.</p>
```

#### Styled Code
In order to show syntax-highlighted code, you will need to apply a language specific class to the code tag. For example, `.language-ruby`.

There are several languages already available (and others available from the [Prismjs.com](http://prismjs.com
) website), including:

* Markup
* CSS
* C-like
* JavaScript
* Java
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
//title=Scrollable
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
//title=Terminal window
//description=Use the `terminal` class around a `<ul>` that has class `terminal-dots` to wrap code blocks in a terminal window.
<div class="terminal">
  <ul class="terminal-dots"><li/><li/><li/></ul>
  <pre><code class="language-bash">~/my/computer
$ echo 'Hello World!';</code></pre>
</div>
```

```html
//title=Terminal window with Mac-styled buttons
//description=Apply the `color` class to the `terminal-dots` to give them the colors they have in Mac OS X.
<div class="terminal">
  <ul class="terminal-dots color"><li/><li/><li/></ul>
  <pre><code class="language-bash">~/my/computer
$ echo 'Hello World!';</code></pre>
</div>
```