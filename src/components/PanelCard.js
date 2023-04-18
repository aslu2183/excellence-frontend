import React from "react";
import Card from '@mui/material/Card'
import IconButton from '@mui/material/IconButton'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
import DotsVertical from 'mdi-material-ui/Delete'
import Typography from '@mui/material/Typography';
import { CardActions, useTheme } from "@mui/material";
import Button from '@mui/material/Button';
import TaskCard from "./TaskCard";


function PanelCard({data, onA}){
    const handleAction = (e) => {
        e.preventDefault()
        onAction(data._id)
    }
    const theme = useTheme()
    
    const tasks = Array.from(Array(1).keys()).map((item) => {
        return {
            name : `Task ${item}`,
            id   : item,
            slug : `Task-${item}`
        }
    })

    return(
        
        <Card>
            <CardHeader
                title = {data.name}
                titleTypographyProps={{color:theme.palette.common.white}}
                action={
                <IconButton size='small' aria-label='settings' className='card-more-options' sx={{ color: theme.palette.common.white }} onClick={handleAction}>
                    <DotsVertical sx={{fontSize:20}}/>
                </IconButton>
                }
                sx={{backgroundColor:theme.palette.primary.main,p:2}}
            />
            <CardContent sx={{ pt: theme => `${theme.spacing(2)} !important`, minHeight:50, maxHeight:600, overflowY:'auto', pl:3, pr:3,backgroundColor:theme.palette.primary.light }}>
                {
                    tasks.map((item) => {
                        return(
                            <TaskCard data={item} key={item.id}></TaskCard>
                        )
                    })
                }
            </CardContent>

            <CardActions sx={{pl:3,pb:3,pr:3}}>
                <Button size="small">Add Card</Button>
            </CardActions>
        </Card>
        
    )    
}

export default PanelCard