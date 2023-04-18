import React,{useState} from "react";
import Grid from '@mui/material/Grid'
import BoardCard from "./BoardCard";


function Board({data}){
    return (
        <Grid container sx={{justifyContent:'center'}}>
        {
            data.map((res) => {
                return (
                    <Grid item xs={12} md={3} m={1} key={res.id}>
                        <BoardCard data={res}></BoardCard>
                    </Grid>
                )
            })
        }
        </Grid>
    )
}

export default Board