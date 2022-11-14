import React, { useState } from "react";
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

function mapStateToProps(state) {
  return {
    myLebels: state.lebelsReduser.myLebels,
    newLabel: state.lebelsReduser.new
  }
}


export default connect(mapStateToProps)(function Game(props) {
  const navigate = useNavigate()
  const { myLebels, newLabel } = props
  const location = useLocation()
  let letterLabel

  const lastLet = Object.keys(myLebels)[Object.keys(myLebels).length - 1]
  const [labelNow, setLabelNow] = useState(newLabel != '' ? newLabel : lastLet)//האחרון/החדש 

  const keys = Object.keys(myLebels)//כל השלבים כולל החדש
  if (newLabel != '' && newLabel != keys[keys.length - 1]) { keys.push(newLabel) }

  const steps = keys.map(item => {
    return { title: item + " שלב " }
  })
  // if(location.state.labelNow!=undefined)
  //   letterLabel= location.state.label
  // else
  // letterLabel=labelNow

  // function navg3() {
  //   navigate("/LetterGame", { state: { labelNow: labelNow } })

  // }

  function navg6() {
    navigate("/LearnLetter", { state: { labelNow: labelNow } })

  // }
  // function navg7() {
  //   navigate("/LetterNameGame", { state: { labelNow: labelNow } })

  // }
  // function navg8() {
  //   navigate("/LowerLettersGame", { state: { labelNow: labelNow } })

  // }
  // function navg9() {
  //   navigate("/SoundwordsGame", { state: { labelNow: labelNow } })

  // }
  // function navg4() {
  //   navigate("/ChooseLebel")

  }
  console.log(myLebels);
  console.log(labelNow);
  

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
      
      default:
    }

  };
  // style={{ fontFamily: "system-ui" }}
  return (
    <div style={{height: '100vh'}} className="centerDiv" >



      <div className='container'>
                
                <div className='row'>
                    <div className='col-1'>
                    <Link to={'/Graph'}>בדיקת ציונים</Link>

                    </div>
                    <div className='col-1'>
                    <Link to={'/Instruction'}>הוראות</Link>

                    </div>
                    <div className='col-9'>

      <Stepp steps={steps} labels={keys} labelNow={labelNow} style={{ lineHeight: '0px !importent' }}></Stepp>
                    </div>
                     <div className='col-1'></div>
                  
                       <Button onClick={navg6}>למידה</Button> 
                    </div>
                    
                </div>

            
      
      {/* <div className='container' >
        <div className='row' >
          <div className= 'col-12'> */}

            {/*  */}


            {/* <h2>{labelNow}</h2> */}


        {/* <Button className='login_button' variant="outline-primary" onClick={navg3} disabled={labelNow == newLabel ? true : false} ><b>אות</b></Button>{' '} */}
        {/* <Button className='login_button' variant="outline-primary" onClick={navg7} disabled={labelNow == newLabel ? true : false} ><b>שם אות</b></Button>{' '} */}
        {/* <Button className='login_button' variant="outline-primary" onClick={navg6}><b>לימוד אות</b></Button>{' '} */}
        {/* <Button className='login_button' variant="outline-primary" onClick={navg8} disabled={labelNow == newLabel ? true : false} ><b>אותיות קטנות</b></Button> */}
        {/* <Button className='login_button' variant="outline-primary" onClick={navg9} disabled={labelNow == newLabel ? true : false} ><b>צליל אות - מילה</b></Button>{' '} */}



        {/* <Rating className='rating'
          name="text-feedback"
          value={myLebels[labelNow][1] >= 30 ? 3 : myLebels[labelNow][1] >= 20 ? 2 : myLebels[labelNow][1] >= 10 ? 1 : 0}
          readOnly
          max={3}
          // precision={0.5}
          emptyIcon={<StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />}
        />
        <Box className='rating' sx={{ ml: 2 }}>{labels[myLebels[labelNow][1] >= 30 ? 3 : myLebels[labelNow][1] >= 20 ? 2 : myLebels[labelNow][1] >= 10 ? 1 : 0]}</Box>


        <Rating className='rating'
          name="text-feedback"
          value={myLebels[labelNow][2] >= 30 ? 3 : myLebels[labelNow][2] >= 20 ? 2 : myLebels[labelNow][2] >= 10 ? 1 : 0}
          readOnly
          max={3}
          emptyIcon={<StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />}
        />
        <Box className='rating' sx={{ ml: 2 }}>{labels[myLebels[labelNow][2] >= 30 ? 3 : myLebels[labelNow][2] >= 20 ? 2 : myLebels[labelNow][2] >= 10 ? 1 : 0]}</Box>
 */}



        {/* <Rating className='rating'
          name="text-feedback"
          value={myLebels[labelNow][3] >= 30 ? 3 : myLebels[labelNow][3] >= 20 ? 2 : myLebels[labelNow][3] >= 10 ? 1 : 0}
          readOnly
          max={3}
          emptyIcon={<StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />}
        />
        <Box className='rating' sx={{ ml: 2 }}>{labels[myLebels[labelNow][3] >= 30 ? 3 : myLebels[labelNow][3] >= 20 ? 2 : myLebels[labelNow][3] >= 10 ? 1 : 0]}</Box> */}


        {/* {myLebels[letterLabel][4]?
            <Rating className='rating'
           name="text-feedback"
         value={myLebels[labelNow][4] >= 30 ? 3 : myLebels[labelNow][4] >= 20 ? 2 : myLebels[labelNow][4] >= 10 ? 1 : 0}
           readOnly
           max={3}
           emptyIcon={<StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />}
        />
         :''}
             <Box className='rating' sx={{ ml: 2 }}>{labels[myLebels[labelNow][4] >= 30 ? 3 : myLebels[labelNow][4] >= 20 ? 2 : myLebels[labelNow][4] >= 10 ? 1 : 0]}</Box> */}
            




 
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
                  }
                ]
              }}
              stayMultiHighlighted
              onClick={clicked}
            />
            <Rating id="ratinga"
          name="text-feedback"
          value={labelNow!=newLabel? myLebels[labelNow][1] >= 30 ? 3 : myLebels[labelNow][1] >= 20 ? 2 : myLebels[labelNow][1] >= 10 ? 1 : 0:0}
          readOnly
          max={3}
          // precision={0.5}
          emptyIcon={<StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />}
        />
         <Box className='rating'id='boxa' sx={{ ml: 2 }}>{labelNow!=newLabel?labels[myLebels[labelNow][1] >= 30 ? 3 : myLebels[labelNow][1] >= 20 ? 2 : myLebels[labelNow][1] >= 10 ? 1 : 0]:0}</Box>


         <Rating id='ratingb'
          name="text-feedback"
          value={labelNow!=newLabel?  myLebels[labelNow][2] >= 30 ? 3 : myLebels[labelNow][2] >= 20 ? 2 : myLebels[labelNow][2] >= 10 ? 1 : 0:0}
          readOnly
          max={3}
          emptyIcon={<StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />}
        />
        <Box className='rating' id='boxb' sx={{ ml: 2 }}>{labelNow!=newLabel?labels[myLebels[labelNow][2] >= 30 ? 3 : myLebels[labelNow][2] >= 20 ? 2 : myLebels[labelNow][2] >= 10 ? 1 : 0]:0}</Box>
         <Rating id='ratingc'
          name="text-feedback"
          value={labelNow!=newLabel? myLebels[labelNow][3] >= 30 ? 3 : myLebels[labelNow][3] >= 20 ? 2 : myLebels[labelNow][3] >= 10 ? 1 : 0:0}
          readOnly
          max={3}
          emptyIcon={<StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />}
        />
        <Box className='rating' id='boxc' sx={{ ml: 2 }}>{labelNow!=newLabel?labels[myLebels[labelNow][3] >= 30 ? 3 : myLebels[labelNow][3] >= 20 ? 2 : myLebels[labelNow][3] >= 10 ? 1 : 0]:0}</Box>
        <Rating id='ratingd'
           name="text-feedback"
         value={labelNow!=newLabel? myLebels[labelNow][4] >= 30 ? 3 : myLebels[labelNow][4] >= 20 ? 2 : myLebels[labelNow][4] >= 10 ? 1 : 0:0}
           readOnly
           max={3}
           emptyIcon={<StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />}
        />
        <Box className='rating' id='boxd' sx={{ ml: 2 }}>{labelNow!=newLabel?labels[myLebels[labelNow][4] >= 30 ? 3 : myLebels[labelNow][4] >= 20 ? 2 : myLebels[labelNow][4] >= 10 ? 1 : 0]:0}</Box>

 




            
         </div>
         </div>
    //   </div>
    // </div >
  )

})