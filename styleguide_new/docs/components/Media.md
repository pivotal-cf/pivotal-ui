# Media

## Description

## Props

## Basic Usage

```jsx_example
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