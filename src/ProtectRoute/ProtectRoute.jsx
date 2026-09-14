import React from 'react'
import Login from '../Auth/Login/Login'
import { Navigate } from 'react-router-dom'

export default function ProtectRoute(props) {

    if(localStorage.getItem('token')){
      return   props.children
      
    }else{
       return <Navigate to='/login'/>
    }

}
