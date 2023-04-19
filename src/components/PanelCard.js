import React,{useState} from "react";
import Card from '@mui/material/Card'
import IconButton from '@mui/material/IconButton'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
import DotsVertical from 'mdi-material-ui/Delete'
import Typography from '@mui/material/Typography';
import { CardActions, useTheme } from "@mui/material";
import Button from '@mui/material/Button';
import TaskCard from "./TaskCard";
import Axios from "src/helpers/api";


function PanelCard({data, onAction, openModal}){
    const handleAction = (e) => {
        e.preventDefault()
        onAction(data._id)
    }

    const [tasks, settasks] = useState(data.tasks)
    const theme = useTheme()
    

    const addNewCard = () => {
        const findNewEntry = tasks.find((item) => item._id == "new-entry")
        if(findNewEntry)
            return

        const item = {
            _id     : "new-entry",
            panelId : data._id,
            boardId : data.boardId,
            description : ""
        }
        tasks.splice(0,0,item)
        settasks((prevState) => [...prevState ])
    }

    const removeForm = () => {
        const newTasks = tasks.filter((item) => item._id != "new-entry")
        settasks(newTasks)
    }

    const saveTask = (desc) => {
        const item = {
            _id : `saved-entry-${tasks.length}`,
            panelId : data._id,
            boardId : data.boardId,
            description : desc.description,
            colors : {
                header : desc.headerColor,
                content: desc.contentColor
            },
            check_list: [],
            position:tasks.length
        }
        tasks.splice(0,1,item)
        settasks((prevState) => [...prevState ])
        const reqData = {...item}
        delete reqData._id
        Axios().post('/create-task',reqData)
        .then((res) => {
            const response = res.data
            const newId    = response.data.insertedId
            const newTasks = tasks.find((item) => item._id == `saved-entry-${tasks.length}`)
            newTasks['_id']= newId
            settasks(tasks)
        })
        .catch((error) => {
            console.log("Error ",error)
        })
    }
    
    const removeTask = (taskid) => {
        const newTasks = tasks.filter((item) => item._id.toString() != taskid.toString())
        settasks(newTasks)

        Axios().post('/delete-task',{id:taskid})
        .then((res) => {
            console.log("Res ",res.data)
        })
        .catch((error) => {
            console.log("Error ",error)
        })
    }
    
    
    return(
        
        <Card>
            <CardHeader
                title={<Typography variant="button" sx={{color:'common.white',fontWeight:'bold'}}>{data.name}</Typography>}
                action={
                <IconButton size='small' aria-label='settings' className='card-more-options' sx={{ color: theme.palette.common.white }} onClick={handleAction}>
                    <DotsVertical sx={{fontSize:20}}/>
                </IconButton>
                }
                sx={{backgroundColor:theme.palette.primary.main,p:2}}
            />
            <CardContent sx={{ pt: theme => `${theme.spacing(2)} !important`, minHeight:50, maxHeight:(document.body.clientHeight - 366), minHeight:(document.body.clientHeight - 366), overflowY:'auto', pl:3, pr:3}}>
                {
                    tasks.map((item) => {
                        return(
                            <TaskCard 
                                data={item} 
                                key={item._id}
                                removeForm={removeForm}
                                saveTask={saveTask}
                                removeTask={removeTask}
                                openModal={openModal}>
                            </TaskCard>
                        )
                    })
                }
            </CardContent>

            <CardActions sx={{pl:3,pb:3,pr:3}}>
                <Button size="small" onClick={addNewCard} sx={{fontWeight:'bold'}}>Add Card</Button>
            </CardActions>
        </Card>
        
    )    
}

export default PanelCard