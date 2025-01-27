import React from 'react'
import Layout from '../components/Layout'
import { Tabs , message } from 'antd'
import { useSelector , useDispatch} from 'react-redux'
import { hideLoading, showLoading } from '../redux/features/alertSlice'
import {useNavigate} from 'react-router-dom'
import axios from 'axios'
const NotificationPage = () => {
    const navigate = useNavigate()
    const dispatch =useDispatch()
    const {user}=useSelector(state=>state.user)
    
    const handleRead=async()=>{
try {
    dispatch(showLoading())
    const res=await axios.post('/api/v1/user/get-all-notification',{userId : user._id},{
        headers :{
            Authorization : `Bearer ${localStorage.getItem('token')}`
        }
    })
    dispatch(hideLoading())
    if(res.data.success){
        message.success(res.data.message)
    }
    else{
        message.error(res.data.message)
    }
} catch (error) {
    dispatch(hideLoading())
    console.log(error)
    message.error("Something went wrong")
}
    }
    const handledeleteRead=async()=>{
     try {
        dispatch(showLoading())
        const res=await axios.post('/api/v1/user/delete-all-notification',{userId : user._id},{
            headers :{
                Authorization : `Bearer ${localStorage.getItem('token')}`
            }
        })
        dispatch(hideLoading())
        if(res.data.success){
            message.success(res.data.message)
        }
        else{
            message.error(res.data.message)
        }


     } catch (error) {
        dispatch(hideLoading())
        console.log(error)
        message.error("Something went wrong")
     }
    }
  return (
    <Layout>
      <h4 className='p-3 text-center'>Notification page</h4>
      <Tabs>
        <Tabs.TabPane tab="Unread" key={0}>
            <div className='d-flex justify-content-end'>
            <h4 className='p-2' onClick={handleRead}>Mark All Read</h4>
            </div>
            {
                user?.notification.map(notificationMsg=>(
                    <div className='card'  style={{cursor : 'pointer'}}>
                        <div className='card-text' >{notificationMsg.message}</div>
                    </div>
                ))
            }
        </Tabs.TabPane>
        <Tabs.TabPane tab="read" key={1}>
            <div className='d-flex justify-content-end'>
            <h4 className='p-2 text-primary' style={{cursor : 'pointer'}} onClick={handledeleteRead}>Delete All Read</h4>
            </div>
            {
                user?.seennotification.map(notificationMsg=>(
                    <div className='card'  style={{cursor : 'pointer'}}>
                        <div className='card-text' >{notificationMsg.message}</div>
                    </div>
                ))
            }
        </Tabs.TabPane>
      </Tabs>
    </Layout>
  )
}

export default NotificationPage
