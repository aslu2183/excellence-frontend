// ** MUI Imports
import React, { useEffect, useState } from 'react'
import Grid from '@mui/material/Grid'
import Axios from '../helpers/api'
import Board from 'src/components/Board'
import MainContainer from 'src/components/MainContainer'
import Typography from '@mui/material/Typography';


const Dashboard = () => {
  const [loading, setloading] = useState(true)
  useEffect(() => {
    Axios().get('/api',{})
    .then((res) => {
      setloading(false)
    }).catch((error) => {
      setloading(false)
    })
  },[])
  const data = [1,2,3,4,5].map((item) => {
        return {
            name : `Project ${item}`,
            id   : item,
            slug : `project-${item}`
        }
    })
  return (
    <MainContainer 
      title="Boards"
      actionButtonTitle="Create Board"
      contentComponent={<Board data={data}></Board>}
      actionModalComponent={<Typography sx={{ p: 2 }}>Here Create Board Form</Typography>}
      isloading={loading}>
    </MainContainer>
  )
}

export default Dashboard
