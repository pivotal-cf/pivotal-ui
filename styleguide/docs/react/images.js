/*doc
---
title: Images
name: image_react
categories:
- react_base_images
- react_all
---

<code class="pam">
<img src="/styleguide/download.svg" width="16" height="16"/>
npm install pui-react-images --save
</code>

## Props

Property | Required | Type | Default | Description
---------|----------|------|---------|------------
responsive | no  | Boolean | false | Whether this image should resize responsively
href       | no  | String  |       | If set, image becomes a link
alt        | no  | String  |       | Alt text
src        | yes | String  |       | Image src

## Basic usage

Import the subcomponent:

```
import {Image} from 'pui-react-images';
```

Images in React can be responsive and/or wrapped in a link.

```react_example
<Image src="http://placehold.it/1000x100"
       responsive={true}
       href="http://google.com"
       alt="A beautiful placeholder"/>
```
*/
