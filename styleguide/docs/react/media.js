/*doc
---
title: Media
name: media_react
categories:
 - react_utilities_media
 - react_all
---

<code class="pam">
<i class="fa fa-download" alt="Install the Component">
npm install pui-react-media --save
</i>
</code>

For the example, you also need to install [Images][image_react] and require `Image` from it.


Require the subcomponents:

```
var Media = require('pui-react-media').Media;
var Flag = require('pui-react-media').Flag;
```

A Flag is a special type of media that is vAlign='middle'.

## General media object modifiers

Media Modifiers     | Options                                        | Description
------------------- | ---------------------------------------------- | --------------------------------------------------------------------------
`placement`         | "left" (default), "right"                      | Horizontal placement of the media
`vAlign`            | top (default), "middle", "bottom"              | Vertical alignment of the body (used for large images with small content next to it, usually centered)
`stackSize`         | "xsmall", "small", "medium", "large"           | At what breakpoint should the media object stack
`mediaSpacing`      | "small", "medium", "large", "xlarge"           | Amount of whitespace between media and body

The images or other media can be aligned top, middle, or bottom. The default is top aligned.

The base button renderer. You won't really interact with this directly.

```jsx_example
var mediaBasicImage = <Image src='http://placehold.it/50x50' alt='A sample media object'/>;
var mediaBasicLinkedImage = <Image src='http://placehold.it/50x50' href="http://google.com" alt='A sample media object'/>;
```

```react_example_table
<Media image={mediaBasicImage}>
  Science has not yet mastered prophecy. We predict too much for the next year and yet far too little for the next 10.
</Media>

<Media image={mediaBasicLinkedImage}
       placement='right'>
  We are all connected; To each other, biologically. To the earth, chemically. To the rest of the universe atomically.
</Media>
```

*/

/*doc
---
title: Vertical Alignment
name: media_alignment_react
parent: media_react
---

```jsx_example
var mediaAlignmentImage = <Image href='http://www.google.com' src='http://placehold.it/50x50'  alt='A sample media object'/>;
```

```react_example
<div>
  <Media image={mediaAlignmentImage}>
    Media: top aligned image - Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
  </Media>

  <Flag image={mediaAlignmentImage}>
    Flag: middle aligned image - Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
  </Flag>

  <Media
    image={mediaAlignmentImage}
    vAlign='bottom'>
    Media: bottom aligned - This is rarely, if ever, used. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
  </Media>
</div>
```
*/

/*doc
---
title: Spacing
name: media_spacing_react
parent: media_react
---


Media spacing can be added to the left and right medias. If no spacing is defined, it defaults to large.

```jsx_example
var mediaSpacingImage = <Image href='http://www.google.com' src='http://placehold.it/50x50' alt='A sample media object'/>;
```

```react_example_table
<Media image={mediaSpacingImage}>
  default image spacing media
</Media>

<Media
  image={mediaSpacingImage}
  mediaSpacing='small'>
  small image spacing media
</Media>

<Media
  image={mediaSpacingImage}
  mediaSpacing='medium'>
  medium image spacing media
</Media>

<Media
  image={mediaSpacingImage}
  mediaSpacing='large'>
  large image spacing media
</Media>

<Media
  image={mediaSpacingImage}
  mediaSpacing='xlarge'>
  xlarge image spacing media
</Media>
```

 */
