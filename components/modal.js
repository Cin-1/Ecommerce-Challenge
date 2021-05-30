import React, { useState, useContext } from 'react'
import * as Yup from 'yup'
import Layout from '../components/layouts/layout'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import { FirebaseContext } from '../firebase'
import Router from 'next/router'
import FileUploader from 'react-firebase-file-uploader'
import { AiOutlineUserAdd } from 'react-icons/ai'

const initialValues = {
  product: '',
  description: ''
}

const ProductSchema = Yup.object().shape({
  product: Yup.string().required('product is required'),
  description: Yup.string().required('description is required')
})

export default function Modal({ person }) {
  const [showModal, setShowModal] = useState(false)
  const [userError, setUserError] = useState(false)
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
      .ref('products')
      .child(name)
      .getDownloadURL()
      .then(url => {
        console.log(url)
        setImgUrl(url)
      })
  }

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={ProductSchema}
      onSubmit={async function addProducts(values, { resetForm }) {
        try {
          const { product, description } = values
          const products = {
            user: person.id,
            product,
            description,
            urlImg
          }
          console.log(products)
          await firebase.db.collection('products').add(products)
          resetForm({})
        } catch (error) {
          console.log(error.message)
        }
      }}
    >
      {formik => {
        const { errors, touched, isValid, dirty } = formik
        return (
          <>
            <button
              className="h-8 py-3 text-sm duration-300 rounded bg-success hover:bg-successhover text-neutral"
              type="button"
              onClick={() => setShowModal(true)}
            >
              Add products
            </button>

            {showModal ? (
              <>
                <div className="fixed inset-0 z-50 flex items-center justify-center overflow-x-hidden overflow-y-auto outline-none focus:outline-none bg-neutral text-primary ">
                  <div className="relative w-auto max-w-3xl mx-auto my-6">
                    {/*content*/}
                    <div className="relative flex flex-col w-full bg-white border-0 rounded-lg shadow-lg outline-none focus:outline-none">
                      {/*header*/}
                      <div className="flex items-start justify-between p-5 border-b border-solid rounded-t border-blueGray-200">
                        <h3 className="text-3xl font-semibold">
                          Add product for {person.name}
                        </h3>
                        <button
                          className="float-right p-1 ml-auto text-3xl font-semibold leading-none text-black bg-transparent border-0 outline-none opacity-5 focus:outline-none"
                          onClick={() => setShowModal(false)}
                        >
                          <span className="block w-6 h-6 text-2xl text-black bg-transparent outline-none opacity-5 focus:outline-none">
                            ×
                          </span>
                        </button>
                      </div>
                      {/*body*/}
                      <Form className="w-full px-4 bg-primary">
                        <div className="flex flex-col mb-2 rounded form-row">
                          <label htmlFor="product" className="text-neutral">
                            Product
                          </label>
                          <Field
                            type="text"
                            name="product"
                            id="product"
                            className={
                              errors.product && touched.product
                                ? 'rounded-alert'
                                : 'rounded'
                            }
                          />
                          <div>
                            <ErrorMessage
                              name="product"
                              component="span"
                              className="flex flex-col w-full px-2 py-1 my-1 text-xs rounded form-row bg-danger text-danger border-danger"
                            />
                          </div>
                        </div>
                        <div className="flex flex-col mb-2 rounded form-row">
                          <label htmlFor="description" className="text-neutral">
                            Description
                          </label>
                          <Field
                            type="text"
                            name="description"
                            id="description"
                            className={
                              errors.description && touched.description
                                ? 'rounded-alert'
                                : 'rounded'
                            }
                          />
                          <div>
                            <ErrorMessage
                              name="description"
                              component="span"
                              className="flex flex-col w-full px-2 py-1 my-1 text-xs rounded form-row bg-danger text-danger border-danger"
                            />
                          </div>
                        </div>
                        <FileUploader
                          accept="image/*"
                          id="avatar"
                          name="avatar"
                          randomizeFilename
                          storageRef={firebase.storage.ref('products')}
                          onUploadStart={handleUploadStart}
                          onUploadError={handleUploadError}
                          onUploadSuccess={handleUploadSuccess}
                          onProgress={handleProgress}
                        />
                        {/*footer*/}
                        <div className="flex items-center justify-end p-6 border-t border-solid rounded-b border-blueGray-200">
                          <button
                            className="px-6 py-2 mb-1 mr-1 text-sm font-bold text-red-500 uppercase transition-all duration-150 ease-linear outline-none background-transparent focus:outline-none"
                            type="button"
                            onClick={() => setShowModal(false)}
                          >
                            Close
                          </button>
                          <button
                            type="submit"
                            className="w-full h-8 mt-4 duration-300 rounded bg-success hover:bg-successhover text-neutral"
                            disabled={!(dirty && isValid)}
                          >
                            Save Changes
                          </button>
                        </div>
                      </Form>
                    </div>
                  </div>
                </div>
                <div className="fixed inset-0 z-40 bg-black opacity-25"></div>
              </>
            ) : null}
          </>
        )
      }}
    </Formik>
  )
}
