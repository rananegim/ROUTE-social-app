import React from 'react'
import { Navigate } from 'react-router-dom'
import Feed from '../Components/Feed/Feed'


export default function ProtectAuth({children}) {
   if(localStorage.getItem('token')){
        return  <Navigate to='/feed'/>
        
      }else{
         return children
      }

}
