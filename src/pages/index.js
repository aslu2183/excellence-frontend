// ** MUI Imports
import React, { useEffect, useState } from 'react'
import Grid from '@mui/material/Grid'
import Axios from '../helpers/api'


const Dashboard = () => {
  useEffect(() => {
    Axios().get('/api',{})
    .then((res) => {

    }).catch((error) => {

    })
  },[])
  
  return (
    <div>{process.env.NEXT_PUBLIC_API_URL}</div>
  )
}

export default Dashboard
