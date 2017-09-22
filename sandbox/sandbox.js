import React from 'react';
import {DefaultButton} from '../src/react/buttons';
import {Form} from '../src/react/forms';
import {Input} from '../src/react/inputs';
// import '../src/css/typography';

export default () => (
  <div style={{padding: '16px', paddingLeft: '274px'}}>
    <h2 style={{paddingBottom: '8px', fontWeight: 600}}>Forms</h2>
    <div className="mbxl pbl" style={{
      border: '1px solid #dfe5e8',
      borderRadius: '2px',
      padding: '16px'
    }}>
      <Form {...{
        rows: [[{
          label: 'Email',
          field: <Input {...{placeholder: 'Enter email', type: 'email'}}/>
        }], [{
          label: 'Password',
          field: <Input {...{placeholder: 'Passsword', type: 'password'}}/>
        }], [{
          field: <DefaultButton>Submit</DefaultButton>
        }]]
      }}/>
    </div>
    <h4 className="h4">Row Form (two columns)</h4>
    <p style={{
      fontSize: '14px',
      lineHeight: '20px',
      marginTop: 0,
      marginBottom: '16px'
    }}>
      Use the Flex Grid to organize the <code>form-group</code> into columns
    </p>
    <div className="mbxl pbl" style={{
      border: '1px solid #dfe5e8',
      borderRadius: '2px',
      padding: '16px'
    }}>
      <Form {...{
        rows: [[{
          name: 'firstName',
          label: 'First Name',
          field: <Input {...{placeholder: 'First Name'}}/>
        }, {
          label: 'Last Name',
          field: <Input {...{placeholder: 'Last Name'}}/>
        }], [{
          label: 'Email',
          field: <Input {...{placeholder: 'Enter email', type: 'email'}}/>
        }, {
          label: 'Password',
          field: <Input {...{placeholder: 'Passsword', type: 'password'}}/>
        }], [{}, {
          className: 'col-fixed',
          field: <DefaultButton alt>Cancel</DefaultButton>
        }, {
          className: 'col-fixed',
          field: <DefaultButton type="submit">Submit</DefaultButton>
        }]],
        onSubmit: () => {
          throw new Error(JSON.stringify({
            firstName: 'Error please try again with a real name'
          }));
        },
        submissionErrorHandler: ({message}) => JSON.parse(message)
      }}/>
    </div>
    <h4 className="h4">Inline Single Row</h4>
    <div className="mbxl pbl" style={{
      border: '1px solid #dfe5e8',
      borderRadius: '2px',
      padding: '16px'
    }}>
      <Form {...{
        rows: [[{
          className: 'col-fixed',
          label: 'Email',
          field: <Input {...{placeholder: 'Enter email', type: 'email'}}/>,
          inline: true
        }, {
          className: 'col-fixed',
          label: 'Password',
          field: <Input {...{placeholder: 'Passsword', type: 'password'}}/>,
          inline: true
        }, {
          field: <DefaultButton>Submit</DefaultButton>
        }]]
      }}/>
    </div>
  </div>
);