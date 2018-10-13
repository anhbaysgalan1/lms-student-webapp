import React, { Component } from 'react';
import { Formik } from 'formik';
import {
  Form, FormGroup, Label, Input, Button, Container,
} from 'reactstrap';

class ProfilePassword extends Component {
  constructor(props) {
    super(props);
    this.validate = this.validate.bind(this);
    this.renderForm = this.renderForm.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }
  /*eslint-disable */
  validate(values) {
    const errors = {};
    if (!values.newpassword) {
      errors.newpassword = 'Cant Be Blank!!';
    }
    else if (values.newpassword.length < 8) {
      errors.newpassword = 'Minimum 8 Characters!'
    }

    if (!values.retypePassword) {
      errors.retypePassword = 'Cant Be Blank!!';
    }
    else if (values.retypePassword.length < 8) {
      errors.retypePassword = 'Minimum 8 Characters!'
    }

    if (values.retypePassword !== values.newpassword) {
      errors.retypePassword = 'Passwords do not match!'
    }

    return errors;
  }

  onSubmit(passwordPackage) {
    console.log(passwordPackage);
    console.log(passwordPackage.curpassword.length);
    
    console.log("Submit Clicked!");
  }

  renderForm(formProps) {
    const {
      values,
      errors,
      touched,
      handleChange,
      handleBlur,
      handleSubmit,
      isSubmitting,
    } = formProps;

    const {
      curpassword, newpassword, retypePassword
    } = values;

    return (
      <Container className="mt-5">
      <Form onSubmit={handleSubmit}>
      <FormGroup>
        <Label>Current Password</Label>
        <Input
          type="text"
          name="curpassword"
          value={curpassword}
          onBlur={handleBlur}
          onChange={handleChange}
        />
      </FormGroup>

      <FormGroup>
        <Label>New Password</Label>
        <Input
          type="text"
          name="newpassword"
          value={newpassword}
          onBlur={handleBlur}
          onChange={handleChange}
          invalid={touched.newpassword && !!errors.newpassword}
        />
        <div className="text-danger">
            {touched.newpassword && !!errors.newpassword ? errors.newpassword : ''}
        </div>
      </FormGroup>

      <FormGroup>
        <Label>Re-type New Password</Label>
        <Input
          type="text"
          name="retypePassword"
          value={retypePassword}
          onBlur={handleBlur}
          onChange={handleChange}
          invalid={touched.retypePassword && !!errors.retypePassword}
        />
        <div className="text-danger">
            {touched.retypePassword && !!errors.retypePassword ? errors.retypePassword : ''}
        </div>
      </FormGroup>
      
      {/* Button */}
      <div className="d-flex justify-content-end">
        <Button className="btn btn-info">Submit</Button>
        <Button className="mx-1">Cancel</Button>
      </div>
      </Form>
      </Container>
    );
  }

  // onSubmit(values, {setSubmitting, setErrors}) {
  // }

  render() {
    return (
      <Formik
        initialValues={ {
          curpassword: '',
          newpassword: '',
          retypePassword: '',
        }}
        validate={this.validate}
        onSubmit={this.onSubmit}
        render={this.renderForm}
      />
    );
  }
}

export default ProfilePassword;
