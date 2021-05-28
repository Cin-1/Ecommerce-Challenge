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
          <div className="flex items-center justify-center bg-primary h-screen w-screen">
            <div className="flex flex-col items-center justify-center bg-secondary h-96 w-80 sm:w-96 login-box rounded">
              <h1 className="italic text-2xl text-neutral mb-6">
                Login to continue
              </h1>
              <Form className="w-full px-4">
                <div className="flex flex-col form-row mb-2 rounded">
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
                      className=" flex flex-col form-row  text-xs bg-danger text-danger px-2 w-full border-danger rounded py-1 my-1"
                    />
                  </div>
                </div>
                <div className="flex flex-col form-row rounded">
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
                      className=" flex flex-col form-row text-xs bg-danger text-danger  px-2 w-full border-danger rounded py-1 my-1"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="bg-success hover:bg-successhover duration-300 text-neutral h-8 w-full mt-10 rounded"
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
