import React from "react";
import Card from '@mui/material/Card'
import IconButton from '@mui/material/IconButton'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
import DotsVertical from 'mdi-material-ui/DotsVertical'
import Typography from '@mui/material/Typography';
import { CardActions, useTheme } from "@mui/material";
import Button from '@mui/material/Button';


function TaskCard({data}){
    const handleAction = (e) => {
        e.preventDefault()
        console.log("Check");
    }
    const theme = useTheme()
    
    return(
        <Card sx={{mb:5}}>
            {/* <CardHeader
                action={
                <IconButton size='small' aria-label='settings' className='card-more-options' sx={{ color: 'text.secondary' }} onClick={handleAction}>
                    <DotsVertical />
                </IconButton>
                }
                sx={{backgroundColor:theme.palette.primary.main,p:1}}
            /> */}
            <CardContent sx={{ pt: theme => `${theme.spacing(2)} !important`, minHeight:50 }}>
                <Typography variant="h6" style={{cursor:'pointer'}}>
                    Task Description
                </Typography>
            </CardContent>

            {/* <CardActions sx={{pl:3,pb:3,pr:3}}>
                <Button size="small">Add Card</Button>
            </CardActions> */}
        </Card>
        
    )    
}

export default TaskCard