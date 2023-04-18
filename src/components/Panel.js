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
                    return (
                        <Box sx={{minWidth:280,mb:2,mr:3}} key={res._id}>
                           <PanelCard data={res} onAction={onAction}></PanelCard>
                        </Box>   
                       
                    )
                })
            }
           
        </Box>
    )
}

export default Panel