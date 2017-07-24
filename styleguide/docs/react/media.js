/*doc
---
title: Media
name: media_react
categories:
- react_utilities_media
- react_all
---

<code class="pam">
<img src="/styleguide/download.svg" width="16" height="16"/>
npm install pui-react-media --save
</code>

## Props

Property | Required | Type | Default | Description
---------|----------|------|---------|------------
image          | yes | Node                                        |        | The image displayed
innerClassName | no  | String                                      |        | The classname of the inner element
mediaSpacing   | no  | oneOf('small', 'medium', 'large', 'xlarge') |        | Amount of whitespace between media and body
stackSize      | no  | oneOf('xsmall', 'small', 'medium', 'large') |        | At what breakpoint should the media object stack
vAlign         | no  | oneOf('middle', 'bottom')                   |        | Vertical alignment of the body (used for large images with small content next to it, usually centered)
placement      | no  | oneOf('left', 'right')                      | 'left' | Horizontal placement of the media
className      | no  | String                                      |        | The classname of the element

## Basic usage

Import the subcomponents:

```
import {Media, Flag} from 'pui-react-media';

// for the example
import {Image} from 'pui-react-images';
```

A Flag is a special type of media that is vAlign='middle'.

The images or other media can be aligned top, middle, or bottom. The default is top aligned.

The base button renderer. You won't really interact with this directly.

```jsx_example
const mediaBasicImage = <Image src="http://placehold.it/50x50" alt="A sample media object"/>;
const mediaBasicLinkedImage = <Image src="http://placehold.it/50x50" href="http://google.com" alt="A sample media object"/>;
```

```react_example_table
<Media image={mediaBasicImage}>
  Science has not yet mastered prophecy. We predict too much for the next year
  and yet far too little for the next 10.
</Media>

<Media image={mediaBasicLinkedImage} placement="right">
  We are all connected; To each other, biologically. To the earth, chemically.
  To the rest of the universe atomically.
</Media>
```

## Vertical Alignment

```jsx_example
const mediaAlignmentImage = <Image href="http://www.google.com" src="http://placehold.it/50x50" alt="A sample media object"/>;
```

```react_example
<div>
  <Media image={mediaAlignmentImage}>
    Media: top aligned image - Lorem ipsum dolor sit amet, consectetur
    adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna
    aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris
    nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
    reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
    pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa
    qui officia deserunt mollit anim id est laborum.
  </Media>

  <Flag image={mediaAlignmentImage}>
    Flag: middle aligned image - Lorem ipsum dolor sit amet, consectetur
    adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna
    aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris
    nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
    reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
    pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa
    qui officia deserunt mollit anim id est laborum.
  </Flag>

  <Media image={mediaAlignmentImage} vAlign='bottom'>
    Media: bottom aligned - This is rarely, if ever, used. Lorem ipsum dolor
    sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
    labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
    exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis
    aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu
    fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt
    in culpa qui officia deserunt mollit anim id est laborum.
  </Media>
</div>
```

## Spacing

Media spacing can be added to the left and right medias. If no spacing is defined, it defaults to large.

```jsx_example
const mediaSpacingImage = <Image href="http://www.google.com" src="http://placehold.it/50x50" alt="A sample media object"/>;
```

```react_example_table
<Media image={mediaSpacingImage}>
  default image spacing media
</Media>

<Media image={mediaSpacingImage} mediaSpacing="small">
  small image spacing media
</Media>

<Media image={mediaSpacingImage} mediaSpacing="medium">
  medium image spacing media
</Media>

<Media image={mediaSpacingImage} mediaSpacing="large">
  large image spacing media
</Media>

<Media image={mediaSpacingImage} mediaSpacing="xlarge">
  xlarge image spacing media
</Media>
```
*/
