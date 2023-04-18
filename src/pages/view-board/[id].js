import React, { useEffect, useState } from 'react';
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import Typography from '@mui/material/Typography'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
import { useRouter } from 'next/router'
import { Skeleton } from '@mui/material';
import Button from '@mui/material/Button';
import PlusIcon from 'mdi-material-ui/Plus';
import MainContainer from 'src/components/MainContainer';
import Panel from 'src/components/Panel';

function ViewBoard(){
    const router = useRouter()
    const [loading, setloading] = useState(true)
    const [title, settitle] = useState("")
    useEffect(() => {
        if(router.query.id){
            console.log("Call APis ")
            setloading(false)
            settitle(router.query.id.toUpperCase())
        }
    },[router])
    const data =  Array.from(Array(20).keys()).map((item) => {
        return {
            name : `Panel ${item}`,
            id   : item,
            slug : `panel-${item}`
        }
    })
    return(
        
        <MainContainer 
            title={loading ? <Skeleton width={500} height={30}></Skeleton> : title}
            actionButtonTitle="Create Panel"
            contentComponent={<Panel data={data}></Panel>}
            actionModalComponent={<Typography sx={{ p: 2 }}>Here Create Panel Form</Typography>}
            isloading={loading}>
        </MainContainer>
    )
}

export default ViewBoard