import React, { useState, useContext } from 'react'
import Router, { useRouter } from 'next/router'
import FileUploader from 'react-firebase-file-uploader'
import * as Yup from 'yup'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import { FirebaseContext } from '../firebase'

const initialValues = {
  email: '',
  name: '',
  title: '',
  facebook: '',
  instagram: ''
}

const sellerSchema = Yup.object().shape({
  email: Yup.string().email().required('Email is required'),
  name: Yup.string()
    .required('Name is required')
    .min(3, 'Name is too short - should be 3 chars minimum'),
  title: Yup.string()
    .required('Title is required')
    .min(5, 'Title is too short - should be 5 chars minimum'),
  facebook: Yup.string()
    .required('facebook is required')
    .matches(
      /((https?):\/\/)?(www.)?[a-z0-9]+(\.[a-z]{2,}){1,3}(#?\/?[a-zA-Z0-9#]+)*\/?(\?[a-zA-Z0-9-_]+=[a-zA-Z0-9-%]+&?)?$/,
      'Enter correct url!'
    ),
  instagram: Yup.string()
    .required('Instagram is required')
    .matches(
      /((https?):\/\/)?(www.)?[a-z0-9]+(\.[a-z]{2,}){1,3}(#?\/?[a-zA-Z0-9#]+)*\/?(\?[a-zA-Z0-9-_]+=[a-zA-Z0-9-%]+&?)?$/,
      'Enter correct url!'
    )
})

const NewSeller = () => {
  const [img, setImg] = useState('')
  const [uploading, setUploading] = useState(false)
  const [progress, setProgress] = useState(0)
  const [urlImg, setImgUrl] = useState('')
  const { user, firebase } = useContext(FirebaseContext)

  const handleUploadStart = () => {
    setProgress(0)
    setUploading(true)
  }

  const handleProgress = progress => setProgress({ progress })

  const handleUploadError = error => {
    setUploading(error)
    console.error(error)
  }

  const handleUploadSuccess = name => {
    setProgress(100)
    setUploading(false)
    setImg(name)
    firebase.storage
      .ref('sellers')
      .child(name)
      .getDownloadURL()
      .then(url => {
        console.log(url)
        setImgUrl(url)
      })
  }

  return (
    <>
      <Formik
        initialValues={initialValues}
        validationSchema={sellerSchema}
        onSubmit={async function createSeller(values, { resetForm }) {
          try {
            const { email, name, title, facebook, instagram } = values
            const NewSeller = {
              email,
              name,
              title,
              facebook,
              instagram,
              urlImg,
              created: Date.now(),
              products: []
            }
            await firebase.db.collection('sellers').add(NewSeller)
            resetForm({})
          } catch (error) {
            console.log(error.message)
          }
        }}
      >
        {formik => {
          const { errors, touched, isValid, dirty } = formik
          return (
            <div className="w-full h-full bg-primary h-screen">
              <div className="flex justify-center mb-6">
                <div className="flex flex-col items-center justify-center mt-8 rounded bg-secondary h-80 register-box sm:w-96">
                  <h1 className="mb-4 text-2xl italic text-neutral">
                    Add New Seller
                  </h1>
                  <Form className="w-full px-4 sm:px-8">
                    <div class="grid grid-cols-3 sm:grid-cols-1">
                      <div className="mr-4 sm:mr-0">
                        <div className="flex flex-col mb-2 rounded form-row">
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
                        <div className="flex flex-col mb-2 rounded form-row">
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
                      </div>

                      <div className="mr-4 sm:mr-0">
                        <div className="flex flex-col mb-2 rounded form-row">
                          <label htmlFor="title" className="text-neutral">
                            Title
                          </label>
                          <Field
                            type="title"
                            name="title"
                            id="title"
                            className={
                              errors.title && touched.title
                                ? 'rounded-alert'
                                : 'rounded'
                            }
                          />
                          <ErrorMessage
                            name="title"
                            component="span"
                            className="w-full px-2 py-1 my-1 text-xs rounded error bg-danger text-danger border-danger"
                          />
                        </div>
                        <div className="flex flex-col mb-2 rounded form-row">
                          <label htmlFor="facebook" className="text-neutral">
                            facebook
                          </label>
                          <Field
                            type="text"
                            name="facebook"
                            id="facebook"
                            className={
                              errors.facebook && touched.facebook
                                ? 'rounded-alert'
                                : 'rounded'
                            }
                          />
                          <ErrorMessage
                            name="facebook"
                            component="span"
                            className="w-full px-2 py-1 my-1 text-xs rounded error bg-danger text-danger border-danger"
                          />
                        </div>
                      </div>

                      <div className="mr-4 sm:mr-0">
                        <div className="flex flex-col mb-6 rounded form-row">
                          <label htmlFor="instagram" className="text-neutral">
                            Instagram
                          </label>
                          <Field
                            type="text"
                            name="instagram"
                            id="instagram"
                            className={
                              errors.instagram && touched.instagram
                                ? 'rounded-alert'
                                : 'rounded'
                            }
                          />
                          <ErrorMessage
                            name="instagram"
                            component="span"
                            className="w-full px-2 py-1 my-1 text-xs rounded error bg-danger text-danger border-danger"
                          />
                        </div>
                        <FileUploader
                          accept="image/*"
                          id="avatar"
                          name="avatar"
                          randomizeFilename
                          storageRef={firebase.storage.ref('sellers')}
                          onUploadStart={handleUploadStart}
                          onUploadError={handleUploadError}
                          onUploadSuccess={handleUploadSuccess}
                          onProgress={handleProgress}
                        />
                      </div>
                    </div>

                    <button
                      type="submit"
                      className="w-full h-8 mt-4 duration-300 rounded bg-success hover:bg-successhover text-neutral"
                      disabled={!(dirty && isValid)}
                    >
                      Create
                    </button>
                  </Form>
                </div>
              </div>
            </div>
          )
        }}
      </Formik>
    </>
  )
}

export default NewSeller
