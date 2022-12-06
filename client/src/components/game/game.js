import React, { useState, useEffect } from "react";
import './game.css'
import po from '../../images/backg.png'
import { useNavigate } from 'react-router-dom'
import { Button as bb } from 'react-bootstrap'
import { Button as B, Item } from 'semantic-ui-react'
import { connect } from 'react-redux'
import { useLocation } from 'react-router-dom'
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import Button from "semantic-ui-react/dist/commonjs/elements/Button";
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import PublishedWithChangesIcon from '@mui/icons-material/PublishedWithChanges';
import Box from '@mui/material/Box';
import Stepper from 'react-stepper-horizontal';
import Rating from '@mui/material/Rating';
import StarIcon from '@mui/icons-material/Star';
import ImageMapper from 'react-img-mapper'
import Stepp from  '../Stepper/Stepper'
import {Link} from 'react-router-dom'

import FullScreenDialog from '../graph/graph'
import Instruction from "../instruction/instruction";

function mapStateToProps(state) {
  return {
    myLebels: state.lebelsReduser.myLebels,
    newLabel: state.lebelsReduser.new
  }
}


export default connect(mapStateToProps)(function Game(props) {
  const navigate = useNavigate()
  const location = useLocation()
  const { myLebels, newLabel } = props
  
  const [open, setOpen] = useState(false);//graph
  const handleClickOpen = () => {
    setOpen(true);
  };
  
  const [openb, setOpenb] = useState(false);//Instruction
  const handleClickOpenb = () => {
    
    setOpenb(true);
  };
  
  const [labelNow, setLabelNow] = useState('')
  let letterLabel= location.state.labelNow
  // const [keys, setkeys ]= useState(Object.keys(myLebels))//כל השלבים כולל החדש????
  let keys=Object.keys(myLebels)
  if (newLabel != '' && newLabel != keys[keys.length - 1]){keys.push(newLabel)}
  let lastLet = Object.keys(myLebels)[Object.keys(myLebels).length - 1];
  // const [lastLet, setlastLet]= useState()
  
  const [ook, setook] = useState(false)

  
  
  useEffect(async function () {   
      // lastLet = await Object.keys(myLebels)[Object.keys(myLebels).length - 1]
       if (letterLabel!=""){
     await setLabelNow(letterLabel)
    }
    else
    await setLabelNow(newLabel != '' ? newLabel : lastLet)
    

    console.log("labelNow2  "+labelNow);
  }, [])


  const steps = keys.map(item => {
    return { title: item + " שלב " }
  })
  
  console.log(myLebels);
  console.log("labelNow  "+labelNow);
  

  const [state, setState] = React.useState({
    top: false,
    left: false,

    bottom: false,
    right: false,
  });
  const labels = {
    0: 'Try Again',
    1: 'Ok',
    2: 'Good',
    3: 'Excellent',
  };
  const toggleDrawer = (anchor, open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };
  const clicked = (area, i, e) => {
    debugger
    if(i !=4 && newLabel==labelNow){
      alert("LearnLetter")
    }
   else{
    switch (i) {
      case 0:
        navigate("/LetterGame", { state: { labelNow: labelNow } });        
        break;
      case 1:
        navigate("/LetterNameGame", { state: { labelNow: labelNow } })       
        break;
      case 2:
        navigate("/LowerLettersGame", { state: { labelNow: labelNow } });
        break;
      case 3:
        navigate("/SoundwordsGame", { state: { labelNow: labelNow } });
        break;
      case 4:
        console.log("labelNow3  "+labelNow);
        
        navigate("/LearnLetter", { state: { labelNow: labelNow } })
        break;
      default:
    }
    }
  };
  // style={{ fontFamily: "system-ui" }}
  return (
    <>
    <div style={{height: '100vh'}} className="centerDiv" >



      <div className='container'>
                
                <div className='row'>
                    <div className='col-1'>
                    {/* <Link to={'/Graph'}>בדיקת ציונים</Link> */}
                    <Button variant="outlined" onClick={handleClickOpen}>
                    בדיקת ציונים
                    </Button>
                    </div>
                    <div className='col-1'>
                    {/* <Link to={'/Instruction'}>הוראות</Link> */}
                    <Button variant="outlined" onClick={handleClickOpenb}>
                    הוראות
                    </Button>
                    </div>
                    <div className='col-9'>

      <Stepp steps={steps} labels={keys} labelNow={labelNow} style={{ lineHeight: '0px !importent' }}></Stepp>
                    </div>
                     <div className='col-1'></div>
                  
                        
                    </div>
                    
                </div>

            
      
      {/* <div className='container' >
        <div className='row' >
          <div className= 'col-12'> */}

            {/*  */}


            {/* <h2>{labelNow}</h2> */}


        

      


 
            <React.Fragment>
              <Button id="changeLabel" onClick={toggleDrawer('right', true)}>שנה שלב</Button>
              <Drawer
                anchor={'right'}
                open={state['right']}
                onClose={toggleDrawer('right', false)}
              >
                {<Box
                  sx={{ width: 250 }}
                  role="presentation"
                  onClick={toggleDrawer('right', false)}
                  onKeyDown={toggleDrawer('right', false)}
                >
                  <List>
                    {keys.map((item, index) => (
                      <ListItem key={index} disablePadding onClick={() => setLabelNow(item)} >
                        <ListItemButton >
                          <ListItemIcon>
                            <PublishedWithChangesIcon />
                          </ListItemIcon>
                          <ListItemText primary={item} />
                        </ListItemButton>
                      </ListItem>
                    ))}
                  </List>
                  <Divider />
                </Box>}
              </Drawer>
            </React.Fragment>



            {/* <B onClick={navg4}> </B> 

            {/* <img src={po} className="ppo" width="1000" height="600" useMap="#imgMap"></img>
        <map name="imgMap">
          <area shape="circle" coords="40,400,500" onClick={navg3}></area>

        </map> */}
        <div className="containMap">

            <ImageMapper className="map"
              src={po}
              map={{
                name: "asdf",
                areas: [
                  {
                    id: 0,
                    active: true,
                    title: "BB(1-4)",
                    shape: "circle",
                    name: "BB(1-4)",
                    fillColor: "#eab54d4d",
                    strokeColor: "black",
                    coords: [
                      135,
                      543,
                      31
                    ]
                  },
                  {
                    id: 1,
                    active: true,
                    title: "BB(1-4)",
                    shape: "circle",
                    name: "BB(1-4)",
                    fillColor: "#eab54d4d",
                    strokeColor: "black",
                    coords: [
                      403,
                      333,
                      31
                    ]
                  },
                  {
                    id: 2,
                    active: true,
                    title: "BB(1-4)",
                    shape: "circle",
                    name: "BB(1-4)",
                    fillColor: "#eab54d4d",
                    strokeColor: "black",
                    coords: [
                      660,
                      405,
                      31
                    ]
                  },
                  {
                    id: 3,
                    active: true,
                    title: "BB(1-4)",
                    shape: "circle",
                    name: "BB(1-4)",
                    fillColor: "#eab54d4d",
                    strokeColor: "black",
                    coords: [
                      1000,
                      365,
                      31
                    ]
                  },
                  {
                    id: 4,
                    active: true,
                    title: "BB(1-4)",
                    shape: "poly",
                    name: "BB(1-4)",
                    fillColor: "#eab54d4d",
                    strokeColor: "black",
                    coords:[
                      934,413,
                      895,448,
                      934,485,
                      970,448
                    ],
                    polygon: [
                      [900,400],
                      [850,420],
                      [900,450],
                      [950,420]
                    ]
                  }
                ]
              }}
              stayMultiHighlighted
              onClick={clicked}
            />
            {myLebels[labelNow]!= undefined && myLebels[labelNow][1]!= undefined &&< Rating id="ratinga"
          name="text-feedback"
          value={labelNow!=newLabel? myLebels[labelNow][1] >= 30 ? 3 : myLebels[labelNow][1] >= 20 ? 2 : myLebels[labelNow][1] >= 10 ? 1 : 0:0}
          readOnly
          max={3}
          // precision={0.5}
          emptyIcon={<StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />}
        />}
         {myLebels[labelNow]!= undefined && myLebels[labelNow][1]!= undefined &&<Box className='rating'id='boxa' sx={{ ml: 2 }}>{labelNow!=newLabel?labels[myLebels[labelNow][1] >= 30 ? 3 : myLebels[labelNow][1] >= 20 ? 2 : myLebels[labelNow][1] >= 10 ? 1 : 0]:0}</Box>}


         {myLebels[labelNow]!= undefined && myLebels[labelNow][2]!= undefined &&<Rating id='ratingb'
          name="text-feedback"
          value={labelNow!=newLabel?  myLebels[labelNow][2] >= 30 ? 3 : myLebels[labelNow][2] >= 20 ? 2 : myLebels[labelNow][2] >= 10 ? 1 : 0:0}
          readOnly
          max={3}
          emptyIcon={<StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />}
        />}
        {myLebels[labelNow]!= undefined && myLebels[labelNow][2]!= undefined &&<Box className='rating' id='boxb' sx={{ ml: 2 }}>{labelNow!=newLabel?labels[myLebels[labelNow][2] >= 30 ? 3 : myLebels[labelNow][2] >= 20 ? 2 : myLebels[labelNow][2] >= 10 ? 1 : 0]:0}</Box>}
        {myLebels[labelNow]!= undefined && myLebels[labelNow][3]!= undefined &&<Rating id='ratingc'
          name="text-feedback"
          value={labelNow!=newLabel? myLebels[labelNow][3] >= 30 ? 3 : myLebels[labelNow][3] >= 20 ? 2 : myLebels[labelNow][3] >= 10 ? 1 : 0:0}
          readOnly
          max={3}
          emptyIcon={<StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />}
        />}
        {myLebels[labelNow]!= undefined && myLebels[labelNow][3]!= undefined &&<Box className='rating' id='boxc' sx={{ ml: 2 }}>{labelNow!=newLabel?labels[myLebels[labelNow][3] >= 30 ? 3 : myLebels[labelNow][3] >= 20 ? 2 : myLebels[labelNow][3] >= 10 ? 1 : 0]:0}</Box>}
        {myLebels[labelNow]!= undefined && myLebels[labelNow][4]!= undefined &&<Rating id='ratingd'
           name="text-feedback"
         value={labelNow!=newLabel? myLebels[labelNow][4] >= 30 ? 3 : myLebels[labelNow][4] >= 20 ? 2 : myLebels[labelNow][4] >= 10 ? 1 : 0:0}
           readOnly
           max={3}
           emptyIcon={<StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />}
        />}
        {myLebels[labelNow]!= undefined && myLebels[labelNow][4]!= undefined &&<Box className='rating' id='boxd' sx={{ ml: 2 }}>{labelNow!=newLabel?labels[myLebels[labelNow][4] >= 30 ? 3 : myLebels[labelNow][4] >= 20 ? 2 : myLebels[labelNow][4] >= 10 ? 1 : 0]:0}</Box>}

 




            
         </div>
         </div>
         {open && <FullScreenDialog open={open} setOpen={setOpen}></FullScreenDialog>}
         {openb && <Instruction open={openb} setOpen={setOpenb}></Instruction>}
         </>
    //   </div>
    // </div >
  )

})