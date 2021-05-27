import React from 'react'
import * as Yup from 'yup'
import Layout from '../components/layouts/layout'
import { Formik, Form, Field, ErrorMessage } from 'formik'

const initialValues = {
  email: '',
  password: ''
}

const LoginSchema = Yup.object().shape({
  email: Yup.string().email().required('Email is required'),

  password: Yup.string()
    .required('Password is required')
    .min(4, 'Password is too short - should be 4 chars minimum')
})

const Login = () => {
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={LoginSchema}
      onSubmit={values => {
        console.log(values)
      }}
    >
      {formik => {
        const { errors, touched, isValid, dirty } = formik
        return (
          <div className="container">
            <h1>Login to continue</h1>
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

              <button
                type="submit"
                className={!(dirty && isValid) ? 'disabled-btn' : ''}
                disabled={!(dirty && isValid)}
              >
                Login
              </button>
            </Form>
          </div>
        )
      }}
    </Formik>
  )
}
export default Login
