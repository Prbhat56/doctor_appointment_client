import React from 'react'
import { useSelector } from 'react-redux'
import { Link , useLocation ,useNavigate } from 'react-router-dom'
import { userMenu , adminMenu} from '../data/data'
import '../styles/Layout.css'
import {message ,Badge} from 'antd'
const Layout = ({children}) => {
  const navigate =useNavigate()
    const {user} = useSelector(state => state.user)
    const location =useLocation()
    const hl =()=>{
      localStorage.clear()
      message.success('Logout Sucessful')
      navigate('/login')
    }
    const doctorMenu =[
      {
          name : 'Home',
          path : '/',
          icon : 'fa-solid fa-house'
      },
      {
          name : 'Appointments',
          path : '/doctor-appointments',
          icon : 'fa-solid fa-list'
      },
      {
          name : 'Profile',
          path : `/doctor/profile/${user?._id}`,
          icon : 'fa-solid fa-user'
      },
     
  ]
const sideBarMenu = user?.isAdmin ? adminMenu : user?.isDoctor ? doctorMenu : userMenu
  return (
    <>
      <div className='main'>
      <div className='layout'>
     <div className='sidebar'>
      <div className='logo'><h6>Doc App</h6></div>
      <hr/>
      <div className='menu'>{sideBarMenu.map(menu =>{
        const isActive= location.pathname === menu.path
        return (
            <>
            <div className={`menu-item ${isActive && "active"}`}>
                <i className={menu.icon}></i>
                <Link to={menu.path}>{menu.name}</Link>

            </div>
            </>
        )
      })}
        <div className={`menu-item `} onClick={hl}>
                <i className='fa-solid fa-right-from-bracket'></i>
                <Link to="/login">Logout</Link>

            </div>
      </div>
     </div>
     <div className='content'>
     <div className='header'>
      <div className='header-content' style={{cursor : 'pointer'}}>
      <Badge count={user && user.notification.length} onClick={()=>{navigate('/notification') }}>
      <i class="fa-solid fa-bell"></i>
    </Badge>
      
      <Link to='/profile'>{user?.name}</Link>
      </div>
     </div>
     <div className='body'>{children}</div>
     </div>
      </div>
      </div>
    </>
  )
}

export default Layout
