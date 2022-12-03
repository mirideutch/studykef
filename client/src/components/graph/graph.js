import React , {useEffect, useState} from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import ListItemText from '@mui/material/ListItemText';
import ListItem from '@mui/material/ListItem';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import CloseIcon from '@mui/icons-material/Close';
import Slide from '@mui/material/Slide';
import axios from "axios";
import { connect } from 'react-redux'
import {
  Chart as ChartJS,
  LinearScale,
  CategoryScale,
  BarElement,
  PointElement,
  LineElement,
  Legend,
  Tooltip,
  LineController,
  BarController,
} from 'chart.js';
import { Chart } from 'react-chartjs-2';

ChartJS.register(
  LinearScale,
  CategoryScale,
  BarElement,
  PointElement,
  LineElement,
  Legend,
  Tooltip,
  LineController,
  BarController
);
// import * as React from 'react';




function mapStateToProps(state) {
  return {        
    myLebels : state.lebelsReduser.myLebels,
    user : state.useReducer.user._id,
    birthDate : state.useReducer.user.userBirthDate,
  }
}


//export  default
const SS= connect(mapStateToProps)( function Graph(props){
  const {  myLebels, birthDate, user } = props
let labels = Object.keys(myLebels)
console.log("labels  ******"+labels);
const[avgData, setavgData]=useState()
const [myData, setmyData]= useState()
// let myData
const [ok , setok]= useState(false)
let re

useEffect(
  function g() {
    axios.get(`http://localhost:3030/exerciseUser/getAvgMark/${birthDate}/${user}/${labels} `).then(res => {
    
                                              
      setavgData(res.data.avg)
      setmyData(res.data.hism)
      setok(true)
      }).catch((err) => {
          console.log(err)
      })
  },
  []
)

const data = {
  labels,
  datasets: [
    {
      type: 'bar',
      label: 'הציונים שלי',
      backgroundColor: 'rgb(75, 192, 192)',
      data: myData ,
      borderColor: 'white',
      borderWidth: 2,
    },
    {
      type: 'bar' ,
      label: 'הממוצע בגילי',
      backgroundColor: 'rgb(53, 162, 235)',
      data: avgData,
    },
  ],
};



  return( <>
  {!ok && <b style={{textAlign:'center'}}>בטעינה...</b>}
  {ok && <Chart type='bar' data={data} style={{maxHeight:'90%'}}/>}
  </>)
})
export default function FullScreenDialog(props) {
  // const [open, setOpen] = React.useState(false);
const {setOpen ,open}= props
  // const handleClickOpen = () => {
  //   setOpen(true);
  // };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      {/* <Button variant="outlined" onClick={handleClickOpen}>
        Open full-screen dialog
      </Button> */}
      <Dialog
        fullScreen
        open={open}
        onClose={handleClose}
        // TransitionComponent={Transition}
      >
        <AppBar sx={{ position: 'relative' }}>
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              onClick={handleClose}
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>
            <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
              studyכיף
            </Typography>
            {/* <Button autoFocus color="inherit" onClick={handleClose}>
              סגור
            </Button> */}
          </Toolbar>
        </AppBar>
        {/* <List>
          <ListItem button>
            <ListItemText primary="Phone ringtone" secondary="Titania" />
          </ListItem>
          <Divider />
          <ListItem button>
            <ListItemText
              primary="Default notification ringtone"
              secondary="Tethys"
            />
          </ListItem>
        </List> */}
      {/* <Graph></Graph> */}
      <SS></SS>
      </Dialog>
    </div>
  );
}