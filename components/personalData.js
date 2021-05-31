import React, { useState } from 'react'
import * as Yup from 'yup'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import firebase from '../firebase'
import Router from 'next/router'

const initialValues = {
  email: '',
  name: '',
  lastname: '',
  adress: '',
  phonenumber: ''
}

const CheckoutSchema = Yup.object().shape({
  email: Yup.string().email().required('Email is required'),
  name: Yup.string()
    .required('Name is required')
    .min(3, 'Name is too short - should be 3 chars minimum'),
  lastname: Yup.string()
    .required('Lastname is required')
    .min(3, 'Lastname is too short - should be 3 chars minimum'),

  adress: Yup.string()
    .required('adress is required')
    .min(8, 'adress is too short - should be 8 chars minimum'),
  phonenumber: Yup.string()
    .required('phonenumber is required')
    .min(8, 'phonenumber is too short - should be 8 chars minimum')
})

const Checkout = () => {
  const [userError, setUserError] = useState(false)
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={CheckoutSchema}
      onSubmit={async function create(values) {
        try {
          await firebase.register(values.name, values.email, values.adress)
          Router.push('/')
        } catch (error) {
          setUserError(error.message)
        }
      }}
    >
      {formik => {
        const { errors, touched, isValid, dirty } = formik
        return (
          <div className="flex w-full h-full font-montserrat">
            <div className="flex flex-col mt-5 ml-5 rounded bg-secondary h-screen register-box sm:w-96 text-neutral">
              <div className="flex flex-row justify-between">
                <h2 className="mt-5 ml-4 text-lg">Personal Information</h2>
                <button
                  type="submit"
                  className="h-8 mt-5 mr-5 duration-300 rounded bg-success hover:bg-successhover text-neutral"
                  disabled={!(dirty && isValid)}
                >
                  Complete purchase
                </button>
              </div>
              <Form className="w-full px-4 sm:px-8">
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

                  <div>
                    <div className="flex flex-col rounded form-row">
                      <label htmlFor="adress" className="text-neutral">
                        adress
                      </label>
                      <Field
                        type="adress"
                        name="adress"
                        id="adress"
                        className={
                          errors.adress && touched.adress
                            ? 'rounded-alert'
                            : 'rounded'
                        }
                      />
                      <ErrorMessage
                        name="adress"
                        component="span"
                        className="w-full px-2 py-1 my-1 text-xs rounded error bg-danger text-danger border-danger"
                      />
                    </div>
                    <div className="flex flex-col rounded form-row">
                      <label htmlFor="phonenumber" className="text-neutral">
                        Phone Number
                      </label>
                      <Field
                        type="adress"
                        name="phonenumber"
                        id="phonenumber"
                        className={
                          errors.phonenumber && touched.phonenumber
                            ? 'rounded-alert'
                            : 'rounded'
                        }
                      />
                      <ErrorMessage
                        name="phonenumber"
                        component="span"
                        className="w-full px-2 py-1 my-1 text-xs rounded error bg-danger text-danger border-danger"
                      />
                    </div>
                  </div>
                  <div>
                    <h2 className="mt-5 text-lg">Payments Details</h2>
                    <div className="flex flex-col rounded form-row">
                      <label htmlFor="phonenumber" className="text-neutral">
                        Phone Number
                      </label>
                      <Field
                        type="adress"
                        name="phonenumber"
                        id="phonenumber"
                        className={
                          errors.phonenumber && touched.phonenumber
                            ? 'rounded-alert'
                            : 'rounded'
                        }
                      />
                      <ErrorMessage
                        name="phonenumber"
                        component="span"
                        className="w-full px-2 py-1 my-1 text-xs rounded error bg-danger text-danger border-danger"
                      />
                    </div>
                    <div className="flex flex-col rounded form-row">
                      <label htmlFor="phonenumber" className="text-neutral">
                        Phone Number
                      </label>
                      <Field
                        type="adress"
                        name="phonenumber"
                        id="phonenumber"
                        className={
                          errors.phonenumber && touched.phonenumber
                            ? 'rounded-alert'
                            : 'rounded'
                        }
                      />
                      <ErrorMessage
                        name="phonenumber"
                        component="span"
                        className="w-full px-2 py-1 my-1 text-xs rounded error bg-danger text-danger border-danger"
                      />
                    </div>
                  </div>
                </div>
              </Form>
            </div>
          </div>
        )
      }}
    </Formik>
  )
}
export default Checkout
