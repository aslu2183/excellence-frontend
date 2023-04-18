// ** MUI Imports
import React, { useEffect, useState } from 'react'
import Grid from '@mui/material/Grid'
import Axios from '../helpers/api'
import Board from 'src/components/Board'
import MainContainer from 'src/components/MainContainer'
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import LoadingButton from '@mui/lab/LoadingButton';
import PlusIcon from 'mdi-material-ui/Plus';


const Dashboard = () => {
  const [loading, setloading] = useState(true)
  const [buttonLoader, setbuttonLoader] = useState(false)
  const [data, setData] = useState([])
  

  useEffect(() => {
    Axios().get('/list-board',{})
    .then((res) => {
      const response = res.data;
      setloading(false)
      setData(response.data)
    }).catch((error) => {
      setloading(false)
    })
  },[])
  
  const AddFormComponent = ({onSubmit,isloading}) => {
    const textRef = React.useRef(null)
    const [error,seterror] = useState("")

    const onSubmitHandler = (e) => {
      e.preventDefault();
      const boardName = textRef.current.value
      if(!boardName){
        seterror("Name Required");

        return false;
      }
      onSubmit(boardName)
    }

    return(
      <Box sx={{p:5}}>
        <Box
          component="form"
          noValidate
          sx={{
            '& .MuiTextField-root': { m: 1, width:300 },
            border:'1px solid'
          }}
          autoComplete="off"
          onSubmit={onSubmitHandler}>
          <div style={{marginBottom:10}}>
            <TextField
              error={error ? true : false}
              id="outlined-error"
              label="Name"
              placeholder="Board Name"
              inputRef={textRef}
            />
          </div>
          <div>
            <LoadingButton
              loading={isloading}
              loadingPosition="start"
              type="submit"
              startIcon={<PlusIcon />}
              variant="outlined">
              Add Board
            </LoadingButton>
          </div>
        </Box>
      </Box>  
    )
  } 
  
  const saveBoard = (data) => {
    Axios().post('/create-board',{name:data})
    .then((res) => {
      const response = res.data
      setData((prevState) => ([
        ...prevState,
        {...response.data}
      ]))
      setbuttonLoader(false)
    }).catch((error) => {
      console.log("error ",error)
      setbuttonLoader(false)
    });
  }

  const deleteBoard = (boardId) => {
    Axios().post('/delete-board',{id:boardId})
    .then((res) => {
      console.log("Res ",res)
      const newData = data.filter((item) => item._id.toString() !== boardId.toString())
      setData(newData)
    }).catch((error) => {
      console.log("error ",error)
      
    });
  }
  
  return (
    <MainContainer 
      title="Boards"
      actionButtonTitle="Create Board"
      contentComponent={<Board data={data} onAction={deleteBoard}></Board>}
      actionModalComponent={<AddFormComponent onSubmit={saveBoard} isloading={buttonLoader}></AddFormComponent>}
      isloading={loading}>
    </MainContainer>
  )
}

export default Dashboard
