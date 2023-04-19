import React,{useRef, useState} from "react";
import Card from '@mui/material/Card'
import IconButton from '@mui/material/IconButton'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
import PlaylistCheck from 'mdi-material-ui/PlaylistCheck'
import Typography from '@mui/material/Typography';
import { CardActions } from "@mui/material";
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import CloseIcon from 'mdi-material-ui/Close'
import DeleteIcon from 'mdi-material-ui/Delete'
import moment from 'moment';


function TaskCard({data, removeForm, saveTask, removeTask}){

    const richTextRef = useRef(null)
    const [hasError, setHasError] = useState(false)
    
    const handleCheckList = (e) => {
        e.preventDefault()
    }

    const addNewCard = () => {
        const description = richTextRef.current.value
        if(!description){
            setHasError(true);
            
            return false;
        }
        saveTask(description)
    }

    const handleAction = () => {
        removeTask(data._id)
    }
    

    return(
        <Card sx={{mb:5, maxWidth:280,cursor:'pointer'}}>
            {
                data._id == 'new-entry' ? null 
                :
                <CardHeader
                    title={<Typography variant="subtitle2" sx={{color:'common.white',fontWeight:'bold'}}>{moment(data.updatedAt).format('LLL')}</Typography>}
                    action={
                    <IconButton size='small' aria-label='settings' className='card-more-options' sx={{ color: 'common.white' }} onClick={handleAction}>
                        <DeleteIcon  sx={{fontSize:15}}/>
                    </IconButton>
                    }
                    sx={{backgroundColor:'primary.main',px:2,py:1}}
                />
            }    
            <CardContent sx={{ pt: theme => `${theme.spacing(2)} !important`, minHeight:50, fontSize:'10px !important' }}>
                {
                    data._id == 'new-entry' ? 
                    <Box sx={{display:'flex'}}>
                        <TextField
                            error={hasError}
                            id="outlined-multiline-static"
                            multiline
                            rows={4}
                            placeholder="Description here"
                            sx={{flex:1}}
                            inputRef={richTextRef}
                        />
                    </Box>    
                    : <Typography variant="body2" sx={{color:'common.black'}}>
                        {data.description}
                    </Typography>
                }
            </CardContent>

            {
                data._id == 'new-entry' ? 
                <CardActions sx={{pl:5,pb:3,pr:5,justifyContent:'space-between'}}>
                    <Button size="small" variant="contained" onClick={addNewCard}>Save Card</Button>
                    <IconButton size='small' aria-label='settings' className='card-more-options' sx={{ color: 'primary.main' }} onClick={removeForm}>
                        <CloseIcon />
                    </IconButton>
                </CardActions>
                : 
                <CardActions sx={{pl:3,pb:2,pr:3}}>
                    <IconButton size='small' aria-label='settings' className='card-more-options' sx={{ color: 'primary.main' }} onClick={handleCheckList}>
                        <PlaylistCheck />
                    </IconButton>
                </CardActions>
            }

            {/* <CardActions sx={{pl:3,pb:3,pr:3}}>
                <Button size="small">Add Card</Button>
            </CardActions> */}
        </Card>
        
    )    
}

export default TaskCard