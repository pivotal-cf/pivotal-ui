# bar

- a
- b
- c

1. a
1. b
1. c


```jsx
import React from 'react'
import '../../library/src/pivotal-ui/components/buttons'
import {Grid, Col} from '../../library/src/pivotal-ui-react/flex-grids/flex-grids'

module.exports = () => (
  <div style={{width: '100%'}}>
    <Grid>
      <Col>hello</Col>
      <Col>hello</Col>
      <Col>hello</Col>
    </Grid>

    <br/>

    <div className='grid'>
      <div className='col col-sm'>
        <div style={{backgroundColor: 'orange'}}>Column</div>
      </div>
      <div className='col col-sm'>
        <div style={{backgroundColor: 'teal'}}>Column</div>
      </div>
      <div className='col col-sm'>
        <div style={{backgroundColor: 'purple'}}>Column</div>
      </div>
    </div>

    <div className='grid'>
      <div className='col col-md'>
        <div style={{backgroundColor: 'orange'}}>Column</div>
      </div>
      <div className='col col-md'>
        <div style={{backgroundColor: 'teal'}}>Column</div>
      </div>
      <div className='col col-md'>
        <div style={{backgroundColor: 'purple'}}>Column</div>
      </div>
    </div>

    <div className='grid'>
      <div className='col col-lg'>
        <div style={{backgroundColor: 'orange'}}>Column</div>
      </div>
      <div className='col col-lg'>
        <div style={{backgroundColor: 'teal'}}>Column</div>
      </div>
      <div className='col col-lg'>
        <div style={{backgroundColor: 'purple'}}>Column</div>
      </div>
    </div>
  </div>
)
```