import React,{ useState } from "react";
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import Box from '@mui/material/Box';
import PanelCard from "./PanelCard";
import Typography from '@mui/material/Typography';
import TaskModal from "./TaskModal";
import Axios from "src/helpers/api";
import { DragDropContext, Droppable } from 'react-beautiful-dnd';



function Panel({data, onAction}){
    const [openModal, setopenModal ] = useState(false);
    const [modalData, setmodalData]  = useState({});
    const [panelData, setpanelData]  = useState(data)
    
    React.useEffect(() => {
        setpanelData(data)
    },[data])

    const openModalFn = (item={}) => {
        setmodalData(item)
        setopenModal(true)
    }
    
    const closeModalFn = () => {
        setopenModal(false)
    }

    const updateTask = (taskData) => {
        const reqData = taskData?.checklist?.map((item) => {
            delete item._id;
            
            return item
        })
        taskData['checklist'] = reqData
        Axios().post('/update-task',taskData)
        .then((res) => {
            const response = res.data
            const currentTask = panelData?.tasks?.find((item) => item._id.toString() == response.data._id.toString())
            if(currentTask){
                currentTask["longDescription"] = response.data.longDescription
                currentTask["checklist"] = response.data.checklist
                setpanelData(panelData)
            }
            else{
                setpanelData((prevState) => ({
                    ...prevState,
                    tasks : [
                        ...prevState.tasks,
                        {...response.data}
                    ]
                }))
            }
            closeModalFn()
        }).catch((error) => {
            console.log("Error ",error)
        })
    }

    const updatePanel = (data) => {
        const panelid = data[0].panelId
        const oldTasks = panelData?.tasks.filter((item) => item.panelId.toString() != panelid.toString())
        const newTasks = [...oldTasks,...data]
        
        setpanelData((prevState) => ({
            ...prevState,
            tasks : newTasks
        }))
    }

    if(panelData?.panels?.length <= 0){
        return (
            <Box sx={{display:'flex',alignItems:'center',flexDirection:'column'}}>
                <Typography variant="h5">No Panels Created Yet.</Typography>
                <Typography variant="h6">Create your first panel on the board</Typography>
            </Box>
        )
    }

    const handleOnDragEnd = (result) => {
        const { source, destination, draggableId } = result
        if(source.droppableId == destination.droppableId){
            const panelid = destination.droppableId.split("-")[1] 
            const panelTasks = [...panelData?.tasks.filter((item) => item.panelId.toString() == panelid.toString())]
            const [removed] = panelTasks.splice(source.index,1)
            panelTasks.splice(destination.index, 0, removed);
            const newTasks = panelTasks.map((item,index) => {
                return {
                    ...item,
                    position : panelTasks.length - index 
                }
            })
            const otherPanelTasks  = panelData?.tasks.filter((item) => item.panelId.toString() != panelid.toString())
            const updated_tasks    = [...otherPanelTasks,...newTasks]
            setpanelData((prevState) => ({
                ...prevState,
                tasks : updated_tasks
            }))
            Axios().post('/reorder-task',{
                tasks   : newTasks
            }).then((res) => {
                console.log("Moved Task ",res.data)
            }).catch((err) => {
                console.log("Error ",err)
            })
        }
        else{
            const taskid  = draggableId.split("-")[1]
            const panelid = destination.droppableId.split("-")[1] 
            const filterTask  = panelData?.tasks.filter((item) => item._id.toString() != taskid.toString())    
            const panelTasks  = panelData?.tasks.filter((item) => item.panelId.toString() == panelid.toString())
            const currentTask = panelData?.tasks.find((item) => item._id.toString() == taskid.toString())
            
            
            currentTask['panelId'] = panelid
            currentTask['position']= panelTasks.length + 1
            const updated_tasks = [...filterTask, { ...currentTask }]
            
            setpanelData((prevState) => ({
                ...prevState,
                tasks : updated_tasks
            }))

            Axios().post('/update-task',{
                panelId : currentTask['panelId'],
                position: currentTask['position'],
                taskId  : taskid
            }).then((res) => {
                console.log("Moved Task ",res.data)
            }).catch((err) => {
                console.log("Error ",err)
            })
        }   
    }
    
    return (
        <Box sx={{display:'flex',overflow:'auto'}}>
            <DragDropContext onDragEnd={handleOnDragEnd}>
            {
                panelData?.panels?.map((res,i) => {
                    const tasks = panelData?.tasks.filter((task) => task.panelId.toString() == res._id.toString())
                    tasks?.sort((a,b) => b.position - a.position)

                    const panelCardData = {
                        ...res,
                        tasks   : tasks,
                        boardId : data._id
                    }
                 
                    return (
                        <Droppable droppableId={`panel-${res._id}`} key={res._id}>
                            {(provided) => (
                                <div {...provided.droppableProps} ref={provided.innerRef}>
                                    <Box sx={{minWidth:280,mb:2,mr:3}}>
                                        <PanelCard 
                                            data={panelCardData} 
                                            onAction={onAction}
                                            openModal={openModalFn}
                                            updatePanelData={updatePanel}>
                                        </PanelCard>
                                    </Box>
                                </div>
                            )}
                        </Droppable>
                           
                       
                    )
                })
            }
            </DragDropContext>
            <TaskModal 
                open={openModal} 
                handleClose={closeModalFn} 
                task={modalData}
                handleSave={updateTask}></TaskModal>
        </Box>
    )
}

export default Panel