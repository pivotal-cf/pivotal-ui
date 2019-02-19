# Pivotal UI documentation

The Markdown files in this directory are transformed into pages on the [style guide](https://styleguide.pivotal.io).

We welcome any and all contributions towards improving the documentation!

For small changes, you can click the "Edit this file" button (pencil icon) from GitHub's UI. Follow the suggested steps to fork the repo, then submit a pull request back this repo.

For larger changes, we suggest you fork the repo, make your change locally, then submit a pull request.

## How these files are structured

In general, these files look like this:

```markdown
---
title: Page title goes here
---

Some content.

## A heading

Some more content.

## Another heading

And another paragraph of content.
```

The block of YAML at the top (wrapped in `---`) contains page metadata. To make changes to the page title, do it here.

The rest of the file is standard Markdown, with only one exception: our editable code examples.

Normal code blocks in Markdown look like:

```markdown
\```js
const someJavaScript = "hello, world!!";
\```
```

To turn a code block into an editable example, add a line that says `//title=Example title goes here`:

```markdown
\```js
//title=A simple example
const someJavaScript = "hello, world!!";
\```
```

That's it! When the style guide is rebuilt with your change, this will turn into an editable block.