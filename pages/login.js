import React, { useState } from 'react'
import * as Yup from 'yup'
import Layout from '../components/layouts/layout'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import firebase from '../firebase'
import Router from 'next/router'

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
  const [userError, setUserError] = useState(false)

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={LoginSchema}
      onSubmit={async function signin(values) {
        try {
          await firebase.login(values.email, values.password)
          Router.push('/')
        } catch (error) {
          setUserError(error.message)
        }
      }}
    >
      {formik => {
        const { errors, touched, isValid, dirty } = formik
        return (
          <div className="flex items-center justify-center w-full h-screen bg-primary font-montserrat">
            <div className="flex flex-col items-center justify-center rounded bg-secondary h-96 w-80 sm:w-96 login-box">
              <h1 className="mb-6 text-2xl italic text-neutral">
                Login to continue
              </h1>
              <Form className="w-full px-4">
                <div className="flex flex-col mb-2 rounded form-row">
                  {userError && <p>{userError}</p>}
                  <label htmlFor="email" className="text-neutral">
                    Email
                  </label>
                  <Field
                    type="email"
                    name="email"
                    id="email"
                    className={
                      errors.email && touched.email
                        ? 'rounded-alert'
                        : 'rounded'
                    }
                  />
                  <div>
                    <ErrorMessage
                      name="email"
                      component="span"
                      className="flex flex-col w-full px-2 py-1 my-1 text-xs rounded  form-row bg-danger text-danger border-danger"
                    />
                  </div>
                </div>
                <div className="flex flex-col rounded form-row">
                  <label htmlFor="password" className="text-neutral">
                    Password
                  </label>
                  <Field
                    type="password"
                    name="password"
                    id="password"
                    className={
                      errors.password && touched.password
                        ? 'rounded-alert'
                        : 'rounded'
                    }
                  />
                  <div>
                    <ErrorMessage
                      name="password"
                      component="span"
                      className="flex flex-col w-full px-2 py-1 my-1 text-xs rounded  form-row bg-danger text-danger border-danger"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full h-8 mt-10 duration-300 rounded bg-success hover:bg-successhover text-neutral"
                  disabled={!(dirty && isValid)}
                >
                  Login
                </button>
              </Form>
            </div>
          </div>
        )
      }}
    </Formik>
  )
}
export default Login
