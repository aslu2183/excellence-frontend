import React from "react";
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import Box from '@mui/material/Box';
import PanelCard from "./PanelCard";
import Typography from '@mui/material/Typography';

function Panel({data, onAction}){
    if(data?.panels?.length <= 0){
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
                                onAction={onAction}>
                            </PanelCard>
                        </Box>   
                       
                    )
                })
            }
           
        </Box>
    )
}

export default Panel