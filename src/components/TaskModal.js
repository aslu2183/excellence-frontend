import React, { useState } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import { createTheme, ThemeProvider } from '@mui/material/styles'
import MUIRichTextEditor from "../library/mui-rte"
import { Typography } from '@mui/material';
import TextField from '@mui/material/TextField';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';



function TaskModal({open, handleClose, task, handleSave}){
    console.log("New Task ",task)
    const [check_list, setcheck_list] = useState([])
    const [richText, setrichText] = useState("")
    const [text, settext] = useState("")
    const [hasError, setHasError] = useState("")
    const [selectedId, setselectedId] = useState({})

    const myTheme = createTheme({
        overrides: {
            MUIRichTextEditor: {
                root: {
                    
                },
                editor: {
                    paddingLeft:10,
                    minHeight:250,
                    color:'black'
                }
            }
        }
    })

    React.useEffect(() => {
        if(open){
            setcheck_list(task?.checklist||[])
            setrichText(task?.longDescription||"")
            settext("")
            setHasError("")
        }
    },[open])


    React.useEffect(() => {
        const getCheckedList= check_list.find((item) => item._id.toString() == selectedId.id.toString())
        if(getCheckedList){
            getCheckedList["is_completed"] = selectedId.checked
            setcheck_list(check_list)
        }
    },[selectedId.id, selectedId.checked])

    const save = (data) => {
        setrichText(data);
        setHasError("");
    }

    const onChangeText = (event) => {
        settext(event.target.value)
    }
    
    const addItem = () => {
        if(!text){

            return false;
        }

        const item = {
            description : text,
            is_completed: false,
            _id : check_list.length + 1
        }
        settext("")
        setcheck_list((prevState) => [
            ...prevState,
            {...item}
        ])
        setHasError("")
    }

    const updateTaskDetails = () => {
        if(!richText && check_list.length == 0){
            setHasError("No data to update");

            return false;
        }
        handleSave({
            longDescription : richText,
            checklist : check_list,
            taskId    : task._id
        })
    }

    const onCheckBoxChange = (event) => {
        const check_list_id = event.target.value
        setselectedId({
            id : check_list_id,
            checked : event.target.checked
        })
    }
       
    return (
        <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth={true}>
            <DialogTitle sx={{fontWeight:'bold'}}>{task.description}</DialogTitle>
            <DialogContent>
                <Box sx={{border:'1px solid #000', borderRadius:2}}>
                    <ThemeProvider theme={myTheme}>
                        <MUIRichTextEditor
                            label="Type something here..."
                            onSave={save}
                            inlineToolbar={true}
                            value={richText}
                        />
                    </ThemeProvider>    
                </Box>

                <Box sx={{mt:5}}>
                    <Typography variant='h6' sx={{fontWeight:'bold'}}>CheckList</Typography>
                    <Box sx={{display:'flex',justifyContent:'space-between'}}>
                        <TextField
                            id="outlined-required"
                            placeholder="Type here ....."
                            fullWidth
                            sx={{mr:10}}
                            value={text}
                            onChange={onChangeText}
                            autoComplete='off'
                        />
                        <Button variant="contained" onClick={addItem}>Add</Button>
                    </Box>
                    <Box sx={{mt:2}}>
                        <FormGroup>
                            {
                                check_list?.map((item) => {
                                    console.log("Check List Item ",item)

                                    return (
                                        <FormControlLabel 
                                            control={<Checkbox onChange={onCheckBoxChange} value={item._id} checked={item.is_completed}/>} 
                                            label={item.description} 
                                            key={item._id}
                                        />
                                        
                                    )
                                })
                            }
                            
                        </FormGroup>    
                    </Box>
                </Box>
                
            </DialogContent>
            <DialogActions sx={{justifyContent:'space-between'}}>
                <Box>
                    <Typography variant='subtitle' sx={{color:'red'}}>{hasError ? hasError : ''}</Typography>
                </Box>
                <Box>    
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={updateTaskDetails}>Save</Button>
                </Box>    
            </DialogActions>
      </Dialog>
    )
}

export default TaskModal
