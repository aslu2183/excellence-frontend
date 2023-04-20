import React,{ useState } from "react";
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import Box from '@mui/material/Box';
import PanelCard from "./PanelCard";
import Typography from '@mui/material/Typography';
import TaskModal from "./TaskModal";
import Axios from "src/helpers/api";



function Panel({data, onAction}){
    const [openModal, setopenModal ] = useState(false);
    const [modalData, setmodalData]  = useState({});
    const [panelData, setpanelData]  = useState(data)
    
    React.useEffect(() => {
        setpanelData(data)
    },[data])

    const openModalFn = (item={}) => {
        setmodalData(item)
        setopenModal(true)
    }
    
    const closeModalFn = () => {
        setopenModal(false)
    }

    const updateTask = (taskData) => {
        const reqData = taskData?.checklist?.map((item) => {
            delete item._id;
            
            return item
        })
        taskData['checklist'] = reqData
        Axios().post('/update-task',taskData)
        .then((res) => {
            const response = res.data
            const currentTask = panelData?.tasks?.find((item) => item._id.toString() == response.data._id.toString())
            if(currentTask){
                currentTask["longDescription"] = response.data.longDescription
                currentTask["checklist"] = response.data.checklist
                setpanelData(panelData)
            }
            else{
                setpanelData((prevState) => ({
                    ...prevState,
                    tasks : [
                        ...prevState.tasks,
                        {...response.data}
                    ]
                }))
            }
            closeModalFn()
        }).catch((error) => {
            console.log("Error ",error)
        })
    }
    
    const updatePanel = (tasks) => {
        setpanelData((prevState) => ({
            ...prevState,
            tasks : tasks
        }))
    }

    if(panelData?.panels?.length <= 0){
        return (
            <Box sx={{display:'flex',alignItems:'center',flexDirection:'column'}}>
                <Typography variant="h5">No Panels Created Yet.</Typography>
                <Typography variant="h6">Create your first panel on the board</Typography>
            </Box>
        )
    }
    
    return (
        <Box sx={{display:'flex',overflow:'auto'}}>
            
            {
                panelData?.panels?.map((res) => {
                    const tasks = panelData?.tasks.filter((task) => task.panelId.toString() == res._id.toString())
                    tasks?.sort((a,b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime())

                    const panelCardData = {
                        ...res,
                        tasks   : tasks,
                        boardId : data._id
                    }
                    
                    return (
                        <Box sx={{minWidth:280,mb:2,mr:3}} key={res._id}>
                            <PanelCard 
                                data={panelCardData} 
                                onAction={onAction}
                                openModal={openModalFn}
                                updatePanelData={updatePanel}>
                            </PanelCard>
                        </Box>   
                       
                    )
                })
            }
            <TaskModal 
                open={openModal} 
                handleClose={closeModalFn} 
                task={modalData}
                handleSave={updateTask}></TaskModal>
        </Box>
    )
}

export default Panel