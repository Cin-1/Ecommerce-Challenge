import React, { useState } from 'react'
import * as Yup from 'yup'
import Layout from '../components/layouts/layout'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import firebase from '../firebase'
import Router from 'next/router'

const initialValues = {
  email: '',
  name: '',
  lastname: '',
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
  const [userError, setUserError] = useState(false)
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={RegisterSchema}
      onSubmit={async function create(values) {
        try {
          await firebase.register(values.name, values.email, values.password)
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
            <div className="flex flex-col items-center justify-center bg-secondary h-96 register-box sm:w-96 rounded">
              <h1 className="italic text-2xl text-neutral mb-6">
                Register to continue
              </h1>
              <Form className="w-full px-4 sm:px-8">
                <div class="grid grid-cols-2 sm:grid-cols-1">
                  <div className="mr-4 sm:mr-0">
                    <div className="flex flex-col form-row rounded">
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
                      <ErrorMessage
                        name="email"
                        component="span"
                        className="error text-xs bg-danger text-danger px-2 w-full border-danger rounded py-1 my-1"
                      />
                    </div>
                    <div className="flex flex-col form-row rounded">
                      <label htmlFor="name" className="text-neutral">
                        Name
                      </label>
                      <Field
                        type="name"
                        name="name"
                        id="name"
                        className={
                          errors.name && touched.name
                            ? 'rounded-alert'
                            : 'rounded'
                        }
                      />
                      <ErrorMessage
                        name="name"
                        component="span"
                        className="error text-xs bg-danger text-danger px-2 w-full border-danger rounded py-1 my-1"
                      />
                    </div>
                    <div className="flex flex-col form-row rounded">
                      <label htmlFor="lastname" className="text-neutral">
                        Lastname
                      </label>
                      <Field
                        type="lastname"
                        name="lastname"
                        id="lastname"
                        className={
                          errors.lastname && touched.lastname
                            ? 'rounded-alert'
                            : 'rounded'
                        }
                      />
                      <ErrorMessage
                        name="lastname"
                        component="span"
                        className="error text-xs bg-danger text-danger px-2 w-full border-danger rounded py-1 my-1"
                      />
                    </div>
                  </div>

                  <div>
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
                      <ErrorMessage
                        name="password"
                        component="span"
                        className="error text-xs bg-danger text-danger px-2 w-full border-danger rounded py-1 my-1"
                      />
                    </div>
                    <div className="flex flex-col form-row rounded">
                      <label htmlFor="confirmpass" className="text-neutral">
                        Confirm Password
                      </label>
                      <Field
                        type="password"
                        name="confirmpass"
                        id="confirmpass"
                        className={
                          errors.confirmpass && touched.confirmpass
                            ? 'rounded-alert'
                            : 'rounded'
                        }
                      />
                      <ErrorMessage
                        name="confirmpass"
                        component="span"
                        className="error text-xs bg-danger text-danger px-2 w-full border-danger rounded py-1 my-1"
                      />
                    </div>
                  </div>
                </div>

                <button
                  type="submit"
                  className="bg-success hover:bg-successhover duration-300 text-neutral h-8 w-full mt-10 rounded"
                  disabled={!(dirty && isValid)}
                >
                  Register
                </button>
              </Form>
            </div>
          </div>
        )
      }}
    </Formik>
  )
}
export default Register
