# Media

## Examples

```
import {Image} from 'pivotal-ui/react/images';
```

```jsx
::title=Basic example
::description=A Flag is a special type of media that is vAlign='middle'. The images or other media can be aligned top, middle, or bottom. The default is top aligned. The base button renderer. You won't really interact with this directly.
const mediaBasicImage = <Image src="http://placehold.it/50x50" alt="A sample media object"/>;
const mediaBasicLinkedImage = <Image src="http://placehold.it/50x50" href="http://google.com" alt="A sample media object"/>;

<div>
    <Media image={mediaBasicImage}>
      Science has not yet mastered prophecy. We predict too much for the next year
      and yet far too little for the next 10.
    </Media>
    <br/>
    <Media image={mediaBasicLinkedImage} placement="right">
      We are all connected; To each other, biologically. To the earth, chemically.
      To the rest of the universe atomically.
    </Media>
</div>
```

```html
::title=Image container
::description=Wrap the image in a fixed-size `.image-container` to make sure the image isn't larger than the container
<div class="media">
  <a class="media-left" href="#">
    <div class="image-container" style="width: 100px; height: 50px;">
      <img alt="demo placeholder for media" class="media-object" src="http://placehold.it/64x64"/>
    </div>
  </a>
  <div class="media-body">
    <h4 class="media-heading">Media heading</h4>
    <p>
      Cras sit amet nibh libero, in gravida nulla. Nulla vel metus scelerisque ante sollicitudin commodo. Cras purus odio, vestibulum in vulputate at, tempus viverra turpis. Fusce condimentum nunc ac nisi vulputate fringilla. Donec lacinia congue felis in faucibus.
    </p>
  </div>
</div>
```

```html
::title=Nested media
::description=You can also nest media objects inside of each other (useful for comment threads or articles lists).
<div class="media">
  <a class="media-left" href="#" target="_blank">
    <img alt="demo placeholder for media" class="media-object" src="http://placehold.it/64x64">
  </a>
  <div class="media-body">
    <h4 class="media-heading">Media heading</h4>
    <p>Cras sit amet nibh libero, in gravida nulla. Nulla vel metus scelerisque ante sollicitudin commodo. Cras purus odio, vestibulum in vulputate at, tempus viverra turpis.</p>

    <!-- Nested media object -->
    <div class="media">
      <a class="media-left" href="#" target="_blank">
        <img alt="demo placeholder for media" class="media-object" src="http://placehold.it/64x64">
      </a>
      <div class="media-body">
        <h4 class="media-heading">Nested media heading</h4>
        Cras sit amet nibh libero, in gravida nulla. Nulla vel metus scelerisque ante sollicitudin commodo. Cras purus odio, vestibulum in vulputate at, tempus viverra turpis.

        <!-- Nested media object -->
        <div class="media">
          <a class="media-left" href="#" target="_blank">
            <img alt="demo placeholder for media" class="media-object" src="http://placehold.it/64x64">
          </a>
          <div class="media-body">
            <h4 class="media-heading">Nested media heading</h4>
            Cras sit amet nibh libero, in gravida nulla. Nulla vel metus scelerisque ante sollicitudin commodo. Cras purus odio, vestibulum in vulputate at, tempus viverra turpis.
          </div>
        </div>
      </div>
    </div>

    <!-- Nested media object -->
    <div class="media">
      <a class="media-left" href="#" target="_blank">
        <img alt="demo placeholder for media" class="media-object" src="http://placehold.it/64x64">
      </a>
      <div class="media-body">
        <h4 class="media-heading">Nested media heading</h4>
        Cras sit amet nibh libero, in gravida nulla. Nulla vel metus scelerisque ante sollicitudin commodo. Cras purus odio, vestibulum in vulputate at, tempus viverra turpis.
      </div>
    </div>
  </div>
</div>
```

```jsx
::title=Vertical alignment
const mediaAlignmentImage = <Image href="http://www.google.com" src="http://placehold.it/50x50" alt="A sample media object"/>;

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

```html
::title=Stackable
::description=You can also make the media block stack with grid columns. Media objects switch from being stacked on top to being floated left of the media body as the screen size gets larger. For example, `.media-stackable-xs` is stacked on screen sizes from 0-480px and then left floated on larger screens.
<div>
<div class="media media-stackable-xs">
  <a class="media-left" href="#" target="_blank">
    <img alt="demo placeholder for media" class="media-object" src="http://placehold.it/100x100">
  </a>
  <div class="media-body">
    <p>Extra-small stackable</p>
  </div>
</div>

<div class="media media-stackable-sm">
  <a class="media-left" href="#" target="_blank">
    <img alt="demo placeholder for media" class="media-object" src="http://placehold.it/100x100">
  </a>
  <div class="media-body">
    <p>Small stackable</p>
  </div>
</div>

<div class="media media-stackable-md">
  <a class="media-left" href="#" target="_blank">
    <img alt="demo placeholder for media" class="media-object" src="http://placehold.it/100x100">
  </a>
  <div class="media-body">
    <p>Medium stackable</p>
  </div>
</div>

<div class="media media-stackable-lg">
  <a class="media-left" href="#" target="_blank">
    <img alt="demo placeholder for media" class="media-object" src="http://placehold.it/100x100">
  </a>
  <div class="media-body">
    <p>Large stackable</p>
  </div>
</div>
</div>
```

```jsx
::title=Spacing
::description=Media spacing can be added to the left and right medias. If no spacing is defined, it defaults to large.
const mediaSpacingImage = <Image href="http://www.google.com" src="http://placehold.it/50x50" alt="A sample media object"/>;

<div>
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
</div>
```
## Installation & Usage

#### React
`npm install pivotal-ui --save`

`import {Media, Flag} from 'pivotal-ui/react/media';`

#### CSS Only
`npm install pivotal-ui --save`

`import * as Media from 'pivotal-ui/css/media';`

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
