import React from 'react'
import Layout from '../components/Layout'
import { Col, Form, Input, Row ,TimePicker ,message } from 'antd'
import {useSelector,useDispatch} from 'react-redux'
import {useNavigate} from 'react-router-dom'
import { hideLoading, showLoading } from '../redux/features/alertSlice'
import axios from 'axios'
const ApplyDoctor = () => {
    const {user}= useSelector(state => state.user)
    const dispatch =useDispatch()
   const navigate =useNavigate()
    const handleFinish =async(values)=>{
 try {
    dispatch(showLoading()) 
    const res=await axios.post('/api/v1/user/apply-doctor',{...values,userId : user._id},{
        headers :{
            Authorization : `Bearer ${localStorage.getItem('token')}`
        }
    })
    dispatch(hideLoading()) 
    if(res.data.success){
        message.success(res.data.message)
        navigate('/')
    }
 } catch (error) {
    dispatch(hideLoading()) 
    console.log(error)
    message.error("something went wrong")

 }
    }
  return (
    <Layout>
      <h1 className='text-center'>Apply Doctor</h1>
     <Form layout='vertical' onFinish={handleFinish} className='m-3'>
     <h4 className=''>Personal Details</h4>
   <Row gutter={20}>
   
    <Col xs={24} md={24} lg={8}> 
    <Form.Item label="First Name" name="firstName" required rules={[{required : true}]}>
        <Input type="text" placeholder='Your First Name' />
    </Form.Item>
   
     </Col>
     <Col xs={24} md={24} lg={8}> 
    <Form.Item label="Last Name" name="lastName" required rules={[{required : true}]}>
        <Input type="text" placeholder='Your Last Name' />
    </Form.Item>
   
     </Col>
     <Col xs={24} md={24} lg={8}> 
    <Form.Item label="Phone Number" name="phone" required rules={[{required : true}]}>
        <Input type="text" placeholder='Your phone Name' />
    </Form.Item>
   
     </Col>
     <Col xs={24} md={24} lg={8}> 
    <Form.Item label="Email" name="email" required rules={[{required : true}]}>
        <Input type="text" placeholder='Your Email' />
    </Form.Item>
   
     </Col>
     <Col xs={24} md={24} lg={8}> 
    <Form.Item label="Website" name="website" >
        <Input type="text" placeholder='Your  website' />
    </Form.Item>
   
     </Col>
     <Col xs={24} md={24} lg={8}> 
    <Form.Item label="Address" name="address" required rules={[{required : true}]}>
        <Input type="text" placeholder='Your address' />
    </Form.Item>
   
     </Col>
   </Row>
   <h4 className=''>Professional Details</h4>
   <Row gutter={20}>
   
    <Col xs={24} md={24} lg={8}> 
    <Form.Item label="Specialization" name="specialization" required rules={[{required : true}]}>
        <Input type="text" placeholder='Your specialization' />
    </Form.Item>
   
     </Col>
     <Col xs={24} md={24} lg={8}> 
    <Form.Item label="Experience" name="experience" required rules={[{required : true}]}>
        <Input type="text" placeholder='Your experience' />
    </Form.Item>
   
     </Col>
     <Col xs={24} md={24} lg={8}> 
    <Form.Item label="Fee per Consaltation" name="feesPerCunsaltation" required rules={[{required : true}]}>
        <Input type="text" placeholder='Your fee per consaltation' />
    </Form.Item>
   
     </Col>
     <Col xs={24} md={24} lg={8}> 
    <Form.Item label="Timings" name="timings" required >
        <TimePicker.RangePicker format="HH:mm" />
    </Form.Item>
   
     </Col>
    
     <Col xs={24} md={24} lg={8}> </Col>
     <Col xs={24} md={24} lg={8}> <button className='btn btn-primary form-btn' type='submit'>Submit</button></Col>
   </Row>
 
     </Form>
    </Layout>
  )
}

export default ApplyDoctor
