import React, { Component } from 'react';
import { Formik } from 'formik';
import {
  Form,
  FormGroup,
  Label,
  Input,
  Button,
} from 'reactstrap';

class LoginForm extends Component {
  constructor(props) {
    super(props);
    this.validate = this.validate.bind(this);
    this.renderForm = this.renderForm.bind(this);
  }
/*eslint-disable */
  validate(values) {
    const errors = {};
    return errors;
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

    const { username, password } = values;

    return (
      <Form onSubmit={handleSubmit}>
        <FormGroup>
          <Label>Username</Label>
          <Input
            type="text"
            name="username"
            value={username}
            onBlur={handleBlur}
            onChange={handleChange}
            invalid={loginReducer.errMsg !== null}
          />
        </FormGroup>

        <FormGroup>
          <Label>Password</Label>
          <Input
            type="password"
            name="password"
            value={password}
            onBlur={handleBlur}
            onChange={handleChange}
            invalid={loginReducer.errMsg !== null}
          />
        </FormGroup>
        <div className="login">
          <Label check>
            <Input type="checkbox" />{' '}
            remember me
          </Label>
        <Button className="button-login"> Log In </Button>
        </div> 
      </Form>
    );
  }

  // onSubmit(values, {setSubmitting, setErrors}) {
  // }

  render() {
    return (
      <Formik
        initialValues={this.props.initialValues}
        validate={this.validate}
        onSubmit={this.props.onSubmit}
        render={this.renderForm}
      />
    );
  }
}

export default LoginForm;
