import React from "react";
import Card from '@mui/material/Card'
import IconButton from '@mui/material/IconButton'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
import DotsVertical from 'mdi-material-ui/Delete'
import Link from 'next/link'
import Typography from '@mui/material/Typography';
import { useTheme } from "@mui/material";

function BoardCard({data, onAction}){
    const handleAction = (e) => {
        e.preventDefault()
        onAction(data._id)
    }
    const theme = useTheme()
    
    return(
        <Link href={`/view-board/${data.slug}`}>
            <Card style={{cursor:'pointer'}}>
                <CardHeader
                    action={
                    <IconButton size='small' aria-label='settings' className='card-more-options' sx={{ color: theme.palette.primary.main }} onClick={handleAction}>
                        <DotsVertical />
                    </IconButton>
                    }
                />
                <CardContent sx={{ pt: theme => `${theme.spacing(2)} !important` }}>
                    <Typography variant="h6" style={{cursor:'pointer'}}>
                        {data.name}
                    </Typography>
                </CardContent>
            </Card>
        </Link>
    )    
}

export default BoardCard