# Images

## Examples

```jsx
::title=Basic example
::description=Images in React can be responsive and/or wrapped in a link.
<div>
    <Image src="http://placehold.it/1000x100"
           responsive={true}
           href="http://google.com"
           alt="A beautiful placeholder"/>
</div>
```

```jsx
::title=Responsive
::description=Images can be made responsive-friendly via the addition of the `.img-responsive` class. This applies `max-width: 100%;` and `height: auto;` to the image so that it scales nicely to the parent element..
<Grid>
  <FlexCol grow={5}>
    <img alt="Responsive image" className="img-responsive" src="static/such-awesome.jpg"/>
  </FlexCol>
  <FlexCol grow={7}>
    <img alt="Responsive image" className="img-responsive" src="static/such-awesome.jpg"/>
  </FlexCol>
  <FlexCol grow={11}>
    <img alt="Responsive image" className="img-responsive" src="static/such-awesome.jpg"/>
  </FlexCol>
</Grid>
```

#### Responsive SVG

SVG can be made responsive-friendly via the addition of the `.svg-responsive` class on a
wrapper div and the `.svg-content` class on the svg itself. You'll also need to to define
the height to width ratio as an inline padding bottom style on the `.svg-responsive` element like so:

```
<div class="svg-responsive" style="padding-bottom: 78.31%">
  <svg class="svg-content" viewBox="38 45 125 120" preserveAspectRatio="xMinYMin meet">
    ...
  </svg>
</div>
```

```jsx
::title=Custom SVG
<Grid>
  <FlexCol grow={5}>
    <div className="svg-responsive" style={{paddingBottom: '78.31%'}}>
      <svg className="svg-content" viewBox="38 45 125 120" preserveAspectRatio="xMinYMin meet">
        <g className="bird">
            <g className="body" style={{fill:'#B8E4C2'}}>
                <path d="M48.42,78.11c0-17.45,14.14-31.58,31.59-31.58s31.59,14.14,31.59,31.58c0,17.44-14.14,31.59-31.59,31.59
                S48.42,95.56,48.42,78.11"/>
                <path d="M109.19,69.88c0,0-8.5-27.33-42.51-18.53c-34.02,8.81-20.65,91.11,45.25,84.73
                c40.39-3.65,48.59-24.6,48.59-24.6S124.68,106.02,109.19,69.88"/>
                <path className="wing" style={{fill:'#81CCAA'}} d="M105.78,75.09c4.56,0,8.84,1.13,12.62,3.11c0,0,0.01-0.01,0.01-0.01l36.23,12.38c0,0-13.78,30.81-41.96,38.09
                c-1.51,0.39-2.82,0.59-3.99,0.62c-0.96,0.1-1.92,0.16-2.9,0.16c-15.01,0-27.17-12.17-27.17-27.17
                C78.61,87.26,90.78,75.09,105.78,75.09"/>
            </g>
            <g className="head">
                <path className="beak" style={{fill:'#F69C0D'}} d="M50.43,68.52c0,0-8.81,2.58-10.93,4.86l9.12,9.87C48.61,83.24,48.76,74.28,50.43,68.52"/>
                <path className="eye-ball" d="M60.53,71.68c0-6.33,5.13-11.46,11.46-11.46c6.33,0,11.46,5.13,11.46,11.46c0,6.33-5.13,11.46-11.46,11.46
                    C65.66,83.14,60.53,78.01,60.53,71.68"/>
                <path className="pupil" style={{fill:'#1F2600'}} d="M64.45,71.68c0-4.16,3.38-7.53,7.54-7.53c4.16,0,7.53,3.37,7.53,7.53c0,4.16-3.37,7.53-7.53,7.53
                    C67.82,79.22,64.45,75.84,64.45,71.68"/>
                <path className="eye-ball" style={{fill:'#F6FDC4'}} d="M72.39,74.39c0-2.73,2.22-4.95,4.95-4.95c2.73,0,4.95,2.21,4.95,4.95c0,2.74-2.22,4.95-4.95,4.95
                    C74.6,79.34,72.39,77.13,72.39,74.39"/>
            </g>
        </g>
      </svg>
    </div>
  </FlexCol>
  <FlexCol grow={7}>
    <div className="svg-responsive" style={{paddingBottom: '78.31%'}}>
      <svg className="svg-content" viewBox="38 45 125 120" preserveAspectRatio="xMinYMin meet">
        <g className="bird">
            <g className="body" style={{fill:'#B8E4C2'}}>
                <path d="M48.42,78.11c0-17.45,14.14-31.58,31.59-31.58s31.59,14.14,31.59,31.58c0,17.44-14.14,31.59-31.59,31.59
                S48.42,95.56,48.42,78.11"/>
                <path d="M109.19,69.88c0,0-8.5-27.33-42.51-18.53c-34.02,8.81-20.65,91.11,45.25,84.73
                c40.39-3.65,48.59-24.6,48.59-24.6S124.68,106.02,109.19,69.88"/>
                <path className="wing" style={{fill:'#81CCAA'}} d="M105.78,75.09c4.56,0,8.84,1.13,12.62,3.11c0,0,0.01-0.01,0.01-0.01l36.23,12.38c0,0-13.78,30.81-41.96,38.09
                c-1.51,0.39-2.82,0.59-3.99,0.62c-0.96,0.1-1.92,0.16-2.9,0.16c-15.01,0-27.17-12.17-27.17-27.17
                C78.61,87.26,90.78,75.09,105.78,75.09"/>
            </g>
            <g className="head">
                <path className="beak" style={{fill:'#F69C0D'}} d="M50.43,68.52c0,0-8.81,2.58-10.93,4.86l9.12,9.87C48.61,83.24,48.76,74.28,50.43,68.52"/>
                <path className="eye-ball" d="M60.53,71.68c0-6.33,5.13-11.46,11.46-11.46c6.33,0,11.46,5.13,11.46,11.46c0,6.33-5.13,11.46-11.46,11.46
                    C65.66,83.14,60.53,78.01,60.53,71.68"/>
                <path className="pupil" style={{fill:'#1F2600'}} d="M64.45,71.68c0-4.16,3.38-7.53,7.54-7.53c4.16,0,7.53,3.37,7.53,7.53c0,4.16-3.37,7.53-7.53,7.53
                    C67.82,79.22,64.45,75.84,64.45,71.68"/>
                <path className="eye-ball" style={{fill:'#F6FDC4'}} d="M72.39,74.39c0-2.73,2.22-4.95,4.95-4.95c2.73,0,4.95,2.21,4.95,4.95c0,2.74-2.22,4.95-4.95,4.95
                    C74.6,79.34,72.39,77.13,72.39,74.39"/>
            </g>
        </g>
      </svg>
    </div>
  </FlexCol>
  <FlexCol grow={11}>
    <div className="svg-responsive" style={{paddingBottom: '78.31%'}}>
      <svg className="svg-content" viewBox="38 45 125 120" preserveAspectRatio="xMinYMin meet">
        <g className="bird">
            <g className="body" style={{fill:'#B8E4C2'}}>
                <path d="M48.42,78.11c0-17.45,14.14-31.58,31.59-31.58s31.59,14.14,31.59,31.58c0,17.44-14.14,31.59-31.59,31.59
                S48.42,95.56,48.42,78.11"/>
                <path d="M109.19,69.88c0,0-8.5-27.33-42.51-18.53c-34.02,8.81-20.65,91.11,45.25,84.73
                c40.39-3.65,48.59-24.6,48.59-24.6S124.68,106.02,109.19,69.88"/>
                <path className="wing" style={{fill:'#81CCAA'}} d="M105.78,75.09c4.56,0,8.84,1.13,12.62,3.11c0,0,0.01-0.01,0.01-0.01l36.23,12.38c0,0-13.78,30.81-41.96,38.09
                c-1.51,0.39-2.82,0.59-3.99,0.62c-0.96,0.1-1.92,0.16-2.9,0.16c-15.01,0-27.17-12.17-27.17-27.17
                C78.61,87.26,90.78,75.09,105.78,75.09"/>
            </g>
            <g className="head">
                <path className="beak" style={{fill:'#F69C0D'}} d="M50.43,68.52c0,0-8.81,2.58-10.93,4.86l9.12,9.87C48.61,83.24,48.76,74.28,50.43,68.52"/>
                <path className="eye-ball" d="M60.53,71.68c0-6.33,5.13-11.46,11.46-11.46c6.33,0,11.46,5.13,11.46,11.46c0,6.33-5.13,11.46-11.46,11.46
                    C65.66,83.14,60.53,78.01,60.53,71.68"/>
                <path className="pupil" style={{fill:'#1F2600'}} d="M64.45,71.68c0-4.16,3.38-7.53,7.54-7.53c4.16,0,7.53,3.37,7.53,7.53c0,4.16-3.37,7.53-7.53,7.53
                    C67.82,79.22,64.45,75.84,64.45,71.68"/>
                <path className="eye-ball" style={{fill:'#F6FDC4'}} d="M72.39,74.39c0-2.73,2.22-4.95,4.95-4.95c2.73,0,4.95,2.21,4.95,4.95c0,2.74-2.22,4.95-4.95,4.95
                    C74.6,79.34,72.39,77.13,72.39,74.39"/>
            </g>
        </g>
      </svg>
    </div>
  </FlexCol>
</Grid>
```

## Installation & Usage

#### React
`npm install pivotal-ui --save`

`import {Image} from 'pivotal-ui/react/images';`

#### CSS Only
`npm install pivotal-ui --save`

`import * as Images from 'pivotal-ui/css/images';`

## Props

Property | Required | Type | Default | Description
---------|----------|------|---------|------------
responsive | no  | Boolean | false | Whether this image should resize responsively
href       | no  | String  |       | If set, image becomes a link
alt        | no  | String  |       | Alt text
src        | yes | String  |       | Image src