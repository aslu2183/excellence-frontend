import React,{useState} from 'react'
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
import Popover from '@mui/material/Popover';
import Button from '@mui/material/Button';
import PlusIcon from 'mdi-material-ui/Plus';
import { Skeleton } from '@mui/material';
import { Box } from 'mdi-material-ui';
import Grid from '@mui/material/Grid'
import { useTheme } from "@mui/material";
import useMediaQuery from '@mui/material/useMediaQuery';
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'



function MainContainer({title,actionButtonTitle,contentComponent,actionModalComponent,isloading,closeModal}){
    const [anchorEl, setanchorEl] = useState(null)
    
    const handleActionForm = (event) => {
        setanchorEl(event.currentTarget);
    }
    
    const handleClose = () => {
        setanchorEl(null)
    }
    
    const open = Boolean(anchorEl)
    const id = open ? 'simple-popover' : undefined;

    const theme = useTheme()
    const matches = useMediaQuery(theme.breakpoints.down('sm'));
    

    return (
        <Card>
            <CardHeader
                title={<Typography variant="h5" sx={{color:'primary.main',fontWeight:'bold'}}>{title}</Typography>}
                titleTypographyProps={{ sx: { lineHeight: '1.2 !important', letterSpacing: '0.31px !important',color: theme.palette.primary.main }}}
                action={
                    matches ? <IconButton size='small' aria-label='add' className='card-more-options' sx={{ color: theme.palette.primary.main }} onClick={handleActionForm}>
                            <PlusIcon/>
                    </IconButton> :
                    <Button variant="outlined" aria-describedby={id} startIcon={<PlusIcon />} onClick={handleActionForm}>
                        {actionButtonTitle}
                    </Button>
                }
            />
            <CardContent sx={{ pt: theme => `${theme.spacing(2)} !important` }}>
                {
                    isloading ? <Grid container justifyContent={"center"} spacing={2}>
                        {
                            Array.from(Array(4).keys()).map((res) => {
                                return (
                                    <Grid item xs={12} md={3} key={res}>
                                        <Skeleton variant="rectangular" height={60}/>
                                    </Grid>    
                                )
                            })
                        }
                    </Grid>                      
                    : contentComponent
                }
            </CardContent>
            <Popover
                id={id}
                open={open}
                anchorEl={anchorEl}
                onClose={handleClose}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                }}>
                {actionModalComponent}
            </Popover>
        </Card>
    )
}

export default MainContainer