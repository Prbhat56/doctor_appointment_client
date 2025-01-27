import React ,{useState , useEffect} from 'react'
import Layout from '../../components/Layout'
import axios from 'axios'
import moment from 'moment'
import { message, Table } from 'antd'

const DoctorAppointments = () => {
    const [appointment ,setAppointments] =useState([])
const getAppointment =async()=>{
try {
    const res= await axios.get('https://doctor-appointment-server-as6t.onrender.com/api/v1/doctor/doctor-appointments',{
        headers :{
            Authorization : `Bearer ${localStorage.getItem('token')}`
        }
    })
    if(res.data.success){
        setAppointments(res.data.data)
    }
} catch (error) {
    console.log(error)
}
}
useEffect(()=>{
getAppointment()
},[])
const handleStatus=async(record , status)=>{
try {
    const res =await axios.post('/api/v1/doctor/update-status',{appointmentsId : record._id , status},{
        headers :{
            Authorization : `Bearer ${localStorage.getItem('token')}`
        }   
    })
    if(res.data.success){
        message.success(res.data.message)
        getAppointment()
    }
} catch (error) {
    console.log(error)
    message.error("Some thing went wrong")
}
}
    const columns=[
        {
            title : 'Id',
            dataIndex : '_id',
        },
        // {
        //     title : 'Name',
        //     dataIndex : 'name',
        //     render : (text , record)=>(
        //        <span>{record.doctorId.firstName} {record.doctorId.lastName}</span>
        //      ),
        // },
        // {
        //     title : 'Phone',
        //     dataIndex : 'phone',
        //     render : (text , record)=>(
        //        <span>{record.doctorId.phone}</span>
        //      ),
        // },
        {
            title : 'Date & Time',
            dataIndex : 'date',
            render : (text , record)=>(
               <span>{moment(record.date).format('DD-MM-YYYY')} &nbsp;
               {moment(record.time).format('HH:mm')}</span>
             ),
        },
        {
            title : 'Status',
            dataIndex : 'status',
        },
        {
            title : 'Actions',
            dataIndex : 'actions',
            render : (text , record)=>(
             <div className='d-flex'>
                {
                    record.status === 'pending' && (
                        <div className='d-flex'>
                          <button className='btn btn-success' onClick={()=>handleStatus(record ,'approved')}>Approve</button>
                          <button className='btn btn-danger ms-2' onClick={()=>handleStatus(record ,'reject')}>Reject</button>
                        </div>

                    )
                }
             </div>
              ),
        }
    ]
  return (
    <Layout>
    <h1> Appointments List</h1> 
    <Table columns={columns} dataSource={appointment}/>
    </Layout>
  )
}

export default DoctorAppointments
