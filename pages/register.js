import React from 'react'
import * as Yup from 'yup'
import Layout from '../components/layouts/layout'
import { Formik, Form, Field, ErrorMessage } from 'formik'

const initialValues = {
  email: '',
  name: '',
  lastName: '',
  password: '',
  confirmpass: ''
}

const RegisterSchema = Yup.object().shape({
  email: Yup.string().email().required('Email is required'),
  name: Yup.string()
    .required('Name is required')
    .min(3, 'Name is too short - should be 3 chars minimum'),
  lastname: Yup.string()
    .required('Lastname is required')
    .min(3, 'Lastname is too short - should be 3 chars minimum'),

  password: Yup.string()
    .required('Password is required')
    .min(4, 'Password is too short - should be 4 chars minimum'),
  confirmpass: Yup.string().oneOf(
    [Yup.ref('password'), null],
    'Passwords must match'
  )
})

const Register = () => {
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={RegisterSchema}
      onSubmit={values => {
        console.log(values)
      }}
    >
      {formik => {
        const { errors, touched, isValid, dirty } = formik
        return (
          <div className="container">
            <h1>Register to continue</h1>
            <Form>
              <div className="form-row">
                <label htmlFor="email">Email</label>
                <Field
                  type="email"
                  name="email"
                  id="email"
                  className={
                    errors.email && touched.email ? 'input-error' : null
                  }
                />
                <ErrorMessage name="email" component="span" className="error" />
              </div>
              <div className="form-row">
                <label htmlFor="name">Name</label>
                <Field
                  type="name"
                  name="name"
                  id="name"
                  className={errors.name && touched.name ? 'input-error' : null}
                />
                <ErrorMessage name="name" component="span" className="error" />
              </div>
              <div className="form-row">
                <label htmlFor="lastname">Lastname</label>
                <Field
                  type="lastname"
                  name="lastname"
                  id="lastname"
                  className={
                    errors.lastname && touched.lastname ? 'input-error' : null
                  }
                />
                <ErrorMessage
                  name="lastname"
                  component="span"
                  className="error"
                />
              </div>

              <div className="form-row">
                <label htmlFor="password">Password</label>
                <Field
                  type="password"
                  name="password"
                  id="password"
                  className={
                    errors.password && touched.password ? 'input-error' : null
                  }
                />
                <ErrorMessage
                  name="password"
                  component="span"
                  className="error"
                />
              </div>
              <div className="form-row">
                <label htmlFor="confirmpass">Confirm Password</label>
                <Field
                  type="password"
                  name="confirmpass"
                  id="confirmpass"
                  className={
                    errors.confirmpass && touched.confirmpass
                      ? 'input-error'
                      : null
                  }
                />
                <ErrorMessage
                  name="confirmpass"
                  component="span"
                  className="error"
                />
              </div>

              <button
                type="submit"
                className={!(dirty && isValid) ? 'disabled-btn' : ''}
                disabled={!(dirty && isValid)}
              >
                Register
              </button>
            </Form>
          </div>
        )
      }}
    </Formik>
  )
}
export default Register
