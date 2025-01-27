import React ,{useState ,useEffect} from 'react'
import Layout from '../../components/Layout'
import axios from 'axios'
import { Table } from 'antd'
const Users = () => {
    const [users ,setUsers]=useState([])
    const getUsers=async()=>{
     try {
        const res=await axios.get('https://doctor-appointment-server-as6t.onrender.com/api/v1/admin/getAllPatients',{
            headers :{
                Authorization : `Bearer ${localStorage.getItem('token')}`
            }
        })
        if(res.data.success){
            setUsers(res.data.data)
        }
     } catch (error) {
        console.log(error)
     }
    }
    useEffect(()=>{
       getUsers()
    },[])
    const columns=[
    {
        title : 'Name',
        dataIndex : 'name',
       
    },
    {
        title : 'Email',
        dataIndex : 'email',
       
    },

  
    {
        title : 'Actions',
        dataIndex : 'actions',   
        render : (text , record)=>(
            <div className='d-flex'>
           <button className='btn btn-danger'>Block</button>
            </div>
        ),
    }

    ]
  return (
    <Layout>
      <h1 className='m-2 text-center'>Patients List</h1>
      <Table columns={columns} dataSource={users} />
    </Layout>
  )
}

export default Users
