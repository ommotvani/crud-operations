import { ErrorMessage, Field, Formik, Form } from 'formik';
import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import * as Yup from "yup"
import { getposts,updateData} from "../redux/feature/dataSlice";
import { Button, Modal } from 'antd';


function FormData({ open, toggleModel, person }) {
  const { posts } = useSelector((state) => state.data);


  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getposts());
  }, []);

  const initialValues = {
    name: person.name,
    email: person.email,
    phoneno: person.phone,
    website: person.website,
  }

  

  const valiadationschema = Yup.object({
    name: Yup.string().required("Required"),
    email: Yup.string().email("invalid formate").required("Required"),
    phoneno: Yup.number().min(10
    ).max(12).required("Required"),
    website: Yup.string().url().nullable(),
  })
  const handleOk = () => {
    handleSubmit()
  };
  // const handleCancel = () => {
    
  // };
  const editModel = (element) => {
    console.log(element.target.value)
  }

 const handleSubmit = (values)=>{
  const requestData= {id:person.id,...values}
  dispatch(updateData(requestData))
  toggleModel()
 }

  return (
    <Modal
      title=""
      centered
      open={open}
      onOk={handleOk}
      onCancel={toggleModel}
      width={500}
      footer={[
        <Button key="back" onClick={toggleModel}>
          Cancel
        </Button>,
        <Button key="submit" type="submit" onClick={handleOk}>
          Submit
        </Button>,
        
      ]}
    >
      <div>
        <Formik
        enableReinitialize
          initialValues={initialValues}
          // validationSchema={valiadationschema}
          onSubmit={handleSubmit}
        >
          {({
            values,
            handleSubmit,
          }) => (
            <Form key={posts.id} onSubmit={handleSubmit}>
              <div>
                <label htmlFor="name">Name:</label>
                <Field type="name" name="name" />
                <ErrorMessage name="name" />
              </div>

              <div>
                <label htmlFor="email">Email:</label>
                <Field type="email" name="email" />
                <ErrorMessage name="email" component="div" />
              </div>
              <div>
                <label htmlFor="phoneno">Phoneno:</label>
                <Field type="phoneno" name="phoneno" />
                <ErrorMessage name="phoneno" />
              </div>
              <div>
                <label htmlFor="Website">Website:</label>
                <Field type="website" name="website" />
                <ErrorMessage name="Website" />

              </div>
                <Button type='submit' onClick={handleSubmit}>save</Button>
            </Form>
          )}
        </Formik>
      </div>
    </Modal>

  )
}

export default FormData
