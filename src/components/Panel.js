import React,{ useState } from "react";
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import Box from '@mui/material/Box';
import PanelCard from "./PanelCard";
import Typography from '@mui/material/Typography';
import TaskModal from "./TaskModal";

function Panel({data, onAction}){
    const [openModal, setopenModal ] = useState(false);
    const [modalData, setmodalData]  = useState({});
    if(data?.panels?.length <= 0){
        return (
            <Box sx={{display:'flex',alignItems:'center',flexDirection:'column'}}>
                <Typography variant="h5">No Panels Created Yet.</Typography>
                <Typography variant="h6">Create your first panel on the board</Typography>
            </Box>
        )
    }

    const openModalFn = (item={}) => {
        setopenModal(true)
    }
    
    const closeModalFn = () => {
        setopenModal(false)
    }
    return (
        <Box sx={{display:'flex',overflow:'auto'}}>
            
            {
                data?.panels?.map((res) => {
                    const tasks = data.tasks.filter((task) => task.panelId.toString() == res._id.toString())
                    tasks.sort((a,b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime())

                    const panelData = {
                        ...res,
                        tasks   : tasks,
                        boardId : data._id
                    }
                    
                    return (
                        <Box sx={{minWidth:280,mb:2,mr:3}} key={res._id}>
                            <PanelCard 
                                data={panelData} 
                                onAction={onAction}
                                openModal={openModalFn}>
                            </PanelCard>
                        </Box>   
                       
                    )
                })
            }
            <TaskModal open={openModal} handleClose={handleClose} task={data}></TaskModal>
        </Box>
    )
}

export default Panel