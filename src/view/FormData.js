import { ErrorMessage, Field, Formik, Form } from 'formik';
import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import * as Yup from "yup"
import { getposts, updateData } from "../redux/feature/dataSlice";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

function FormData({ show, toggleModel, person }) {
  const { posts } = useSelector((state) => state.data);



    //pass value in form 
  const dispatch = useDispatch();
  useEffect(() => { dispatch(getposts()); }, []);
  const initialValues = {
    name: person.name,
    email: person.email,
    phoneno: person.phone,
    website: person.website,
  }



     //validation using yup

  const valiadationschema = Yup.object({
    name: Yup.string().required("Required"),
    email: Yup.string().email("invalid formate").required("Required"),
    phoneno: Yup.string().required("Required"),
    website: Yup.string().required("Required"),
  })


    //update form data

  const handleSubmit = (values) => {
    const requestData = { id: person.id, ...values }
    dispatch(updateData(requestData))
    toggleModel()
  }
  return (

    <div>
      <div className="modal show"
        style={{ display: 'block', position: 'initial' }}>
        <Modal show={show} onHide={toggleModel}>
          <Modal.Header closeButton>
            <Modal.Title>Basic Model</Modal.Title>
          </Modal.Header>

          <Modal.Body className='p-0'>
            <Formik
              enableReinitialize initialValues={initialValues}
              validationSchema={valiadationschema}
              onSubmit={handleSubmit} >
              {({ values, handleSubmit, }) => (<Form key={posts.id} onSubmit={handleSubmit}>


                <div className='formcontent m-4'>
                  <div className='formField'>
                    <span className='text-danger'>*</span> <label htmlFor="name">Name:</label>
                    <Field type="name" name="name" />
                    <ErrorMessage name="name" />
                  </div>



                  <div className='formField'>
                    <span className='text-danger'>*</span><label htmlFor="email">Email:</label>
                    <Field type="email" name="email" />
                    <ErrorMessage name="email" component="div" />
                  </div>



                  <div className='formField'>
                    <span className='text-danger'>*</span> <label htmlFor="phoneno">Phoneno:</label>
                    <Field type="phoneno" name="phoneno" />
                    <ErrorMessage name="phoneno" />
                  </div>



                  <div className='formField'>
                    <span className='text-danger'>*</span> <label htmlFor="Website">Website:</label>
                    <Field type="text" name="website" />
                    <ErrorMessage name="Website" />
                  </div>




                </div>
                            {/* footer section of like and cancle  */}
                <Modal.Footer>
                  <Button variant="outline-primary" onClick={toggleModel}>Cancle</Button>
                  <Button type='submit' onClick={handleSubmit}>Ok</Button>
                </Modal.Footer>
              </Form>
              )}

            </Formik>
          </Modal.Body>
        </Modal>
      </div>
    </div>
  )
}
export default FormData