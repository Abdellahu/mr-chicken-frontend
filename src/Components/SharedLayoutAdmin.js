import React from 'react'
import AdminHeader from './Admin/AdminHeader'
import { Outlet } from 'react-router'

function SharedLayoutAdmin() {
  return (
    <>
       <AdminHeader />
       <Outlet /> 
    </>
  )
}

export default SharedLayoutAdmin