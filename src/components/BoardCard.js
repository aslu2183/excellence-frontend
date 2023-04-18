import React from "react";
import Card from '@mui/material/Card'
import IconButton from '@mui/material/IconButton'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
import DotsVertical from 'mdi-material-ui/DotsVertical'
import Link from 'next/link'
import Typography from '@mui/material/Typography';

function BoardCard({data}){
    const handleAction = (e) => {
        e.preventDefault()
        console.log("Check");
        // return false
    }
    return(
        <Link href={`/view-board/${data.slug}`}>
            <Card style={{cursor:'pointer'}}>
                <CardHeader
                    action={
                    <IconButton size='small' aria-label='settings' className='card-more-options' sx={{ color: 'text.secondary' }} onClick={handleAction}>
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