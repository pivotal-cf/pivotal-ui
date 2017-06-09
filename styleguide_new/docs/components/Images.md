# Images

## Description
Image description goes here.

## Basic Usage

Import the subcomponent:

```
import {Image} from 'pui-react-images';
```

Images in React can be responsive and/or wrapped in a link.

```jsx
::title=Basic Example
<div>
    <Image src="http://placehold.it/1000x100"
           responsive={true}
           href="http://google.com"
           alt="A beautiful placeholder"/>
</div>
```
## Props

Property | Required | Type | Default | Description
---------|----------|------|---------|------------
responsive | no  | Boolean | false | Whether this image should resize responsively
href       | no  | String  |       | If set, image becomes a link
alt        | no  | String  |       | Alt text
src        | yes | String  |       | Image src
