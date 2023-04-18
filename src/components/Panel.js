import React from "react";
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import BoardCard from "./BoardCard";
import Box from '@mui/material/Box';

function Panel({data}){
    return (
        <div style={{width:'100%',whiteSpace: 'nowrap'}}>
            <Box sx={{overflow: 'auto',display:'flex',flexDirection:'row'}} component="div">
            {
                data.map((res) => {
                    return (
                        <div style={{width:300}} key={res.id}>
                           <BoardCard data={data}></BoardCard>
                        </div>   
                       
                    )
                })
            }
            </Box>
        </div>
    )
}

export default Panel