import React, { useState } from 'react'
import * as Yup from 'yup'
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
          <div className="flex items-center justify-center w-full h-screen bg-primary font-montserrat">
            <div className="flex flex-col items-center justify-center rounded bg-secondary h-96 register-box sm:w-96">
              <h1 className="mb-6 text-2xl italic text-neutral">
                Register to continue
              </h1>
              <Form className="w-full px-4 sm:px-8">
                <div class="grid grid-cols-2 sm:grid-cols-1">
                  <div className="mr-4 sm:mr-0">
                    <div className="flex flex-col rounded form-row">
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
                        className="w-full px-2 py-1 my-1 text-xs rounded error bg-danger text-danger border-danger"
                      />
                    </div>
                    <div className="flex flex-col rounded form-row">
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
                        className="w-full px-2 py-1 my-1 text-xs rounded error bg-danger text-danger border-danger"
                      />
                    </div>
                    <div className="flex flex-col rounded form-row">
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
                        className="w-full px-2 py-1 my-1 text-xs rounded error bg-danger text-danger border-danger"
                      />
                    </div>
                  </div>

                  <div>
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
                      <ErrorMessage
                        name="password"
                        component="span"
                        className="w-full px-2 py-1 my-1 text-xs rounded error bg-danger text-danger border-danger"
                      />
                    </div>
                    <div className="flex flex-col rounded form-row">
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
                        className="w-full px-2 py-1 my-1 text-xs rounded error bg-danger text-danger border-danger"
                      />
                    </div>
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full h-8 mt-10 duration-300 rounded bg-success hover:bg-successhover text-neutral"
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
