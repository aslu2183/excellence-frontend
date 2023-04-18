import React, { useEffect, useState } from 'react';
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import Typography from '@mui/material/Typography'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
import { useRouter } from 'next/router'
import { Skeleton } from '@mui/material';
import Button from '@mui/material/Button';
import PlusIcon from 'mdi-material-ui/Plus';
import MainContainer from 'src/components/MainContainer';
import Panel from 'src/components/Panel';
import Axios from '../../helpers/api'
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import LoadingButton from '@mui/lab/LoadingButton';

function ViewBoard(){
    const router = useRouter()
    const [loading, setloading] = useState(true)
    const [title, settitle] = useState("")
    const [details, setDetails] = useState({})
    const [buttonLoader, setbuttonLoader] = useState(false)

    useEffect(() => {
        if(router.query.id){
            Axios().post('/get-board-details',{slug:router.query.id})
            .then((res) => {
                const response = res.data
                settitle(response.data.name)
                setDetails(response.data)
                setloading(false)
            })
            .catch((error) => {
                console.log("Error ",error)
                setloading(false)
            })
        }
    },[router])

    const savePanel = (data) => {
        const params = {
            id : details._id,
            panel : {
                name : data
            }
        }
        Axios().post('/create-panel',params)
        .then((res) => {
          const response = res.data
          setDetails((prevState) => ({
            ...prevState,
            panels : [...response.data.panels]
          }))
          setbuttonLoader(false)
        }).catch((error) => {
          console.log("error ",error)
          setbuttonLoader(false)
        });
    }

    const deletePanel = (panelId) => {
        const newData = details.panels.filter((item) => item._id.toString() !== panelId.toString())
        setDetails((prevState) => ({
            ...prevState,
            panels : newData
        }))
        Axios().post('/delete-panel',{panels:newData,boardId:details._id})
        .then((res) => {
            console.log("Response ",res)
        }).catch((err) => {
            console.log("Error")
        })
    }
    
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
              }}
              autoComplete="off"
              onSubmit={onSubmitHandler}>
              <div style={{marginBottom:10}}>
                <TextField
                  error={error ? true : false}
                  id="outlined-error"
                  label="Name"
                  placeholder="Panel Name"
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
                  Add Panel
                </LoadingButton>
              </div>
            </Box>
          </Box>  
        )
    } 
    
    return(
        
        <MainContainer 
            title={loading ? <Skeleton width={500} height={30}></Skeleton> : title}
            actionButtonTitle="Create Panel"
            contentComponent={<Panel data={details} onAction={deletePanel}></Panel>}
            actionModalComponent={<AddFormComponent onSubmit={savePanel} isloading={buttonLoader}></AddFormComponent>}
            isloading={loading}>
        </MainContainer>
    )
}

export default ViewBoard