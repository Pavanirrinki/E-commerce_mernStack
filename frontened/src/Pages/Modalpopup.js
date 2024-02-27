import * as React from 'react';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import { IoMdClose } from "react-icons/io";
import Box from '@mui/material/Box';
import Rating from '@mui/material/Rating';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import axios from 'axios';
import { API } from '../API/API';

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
  },
}));

export default function CustomizedDialogs({productdata}) {
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState(0);
  const [comments,setComments] = React.useState('')
  const userdata = localStorage.getItem("userdata");
  const parseduser = JSON.parse(userdata)
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setValue(0)
    setComments('')
    setOpen(false);
  };

const handleSubmit =() =>{
  if(comments !==''){
    axios.post(API+`comments/${productdata?._id}`,{postedBy:parseduser?.user._id,comment:comments,rating:value}).
    then((res)=>console.log(res.data)).catch((error)=>console.log(error.message))
  }
  console.log(value,comments)
    setValue(0)
    setComments('')
    handleClose()
}
console.log("data1234",productdata)
  return (
    <React.Fragment>
      <Button variant="text" onClick={handleClickOpen}>
        Rate NOW
      </Button>
      <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
      >
        <DialogTitle sx={{ mr: 7, p: 2 }} id="customized-dialog-title">
          Rating & Comments
        </DialogTitle>
        <IconButton
          aria-label="close"
          onClick={handleClose}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
        <IoMdClose />
        </IconButton>
        <DialogContent dividers>
        <Box
      sx={{
        '& > legend': { mt: 2 },
      }}
    >
      <Typography component="legend" gutterBottom sx={{marginTop:"0px"}}>Rate for Product</Typography>
      <Rating
        name="simple-controlled"
        value={value}
        onChange={(event, newValue) => {
          setValue(newValue);
        }}
        size='large'
      
      />
  </Box>
   </DialogContent>
   <DialogContent>
   <Typography component="legend" gutterBottom sx={{marginTop:"0px"}}>Review this Product</Typography>
   <TextField
          id="outlined-multiline-flexible"
          label="Description"
          multiline
          value={comments}
          onChange={(e)=>setComments(e.target.value)}
          fullWidth
        />
   </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleSubmit}>
            Save changes
          </Button>
        </DialogActions>
      </BootstrapDialog>
    </React.Fragment>
  );
}