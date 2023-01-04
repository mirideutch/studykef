import React, { useEffect, useState } from "react";
import Letters from "./letters";
import './play.css'
import sk from '../../images/bird.png'
import { connect } from 'react-redux'
import { updateUser } from "../../redux/actions/usersAction";//
import {useLocation} from 'react-router-dom'
import axios from "axios";
import {updateGame, insertLebel} from '../../redux/actions/lebelsAction'
import { useNavigate } from 'react-router-dom'
import Button from "semantic-ui-react/dist/commonjs/elements/Button";
import Stepper from 'react-stepper-horizontal';
import Stepp from  '../Stepper/Stepper'

// import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

import wrong from '../../audio/wrong.wav'
import success from '../../audio/success.wav'
import completionAlevel from '../../audio/completionAlevel.wav'


import AlertDialog from '../finishExercize'

function mapStateToProps(state) {
    return {
        myLebels: state.lebelsReduser.myLebels,
        fourLetter : state.lebelsReduser.fourLetter,
        letterLabel : state.lebelsReduser.now,
        user :state.useReducer.user._id
    }
  }

 function Play(props) {
    const {myLebels, user, letterLabel, fourLetter}= props
    const game = 1
    const { dispatch } = props;
    const location=useLocation()
    // let letterLabel= location.state.labelNow
    const navigate = useNavigate()
    let audioWrong =new Audio(wrong)
    let audioSuccess =new Audio(success)
    let audioCompletionAlevel =new Audio(completionAlevel)
    
    
   
    let labelLetters= Object.keys(myLebels)
    
    const steps = labelLetters.map(item => {
        return { title: item + " שלב " }
    })
    
    let objarraygame = Letters(letterLabel,labelLetters, fourLetter)//האוביקט / מערך של המשחק
     
    const [visible, setVisible] = useState(true);
    const [visibleOps, setVisibleOps] = useState(false);
    
    const [nice, setnice] = useState(0)
    const [bad, setbad] = useState(0)
    const [isSucs, setisSucs] = useState(false)
    const [mark ,setmark] = useState(0)

    const [x, setx] = useState(0)//מספר האות - התרגול
    const [theLet, setTheLet] = useState(objarraygame[0].correctLetter)//האות הנכונה
    const [theOption, setTheOption] = useState(objarraygame[0].options)//האפשרויות
    const [numCorront, setNumCorront] = useState(0)

    const [open, setOpen] = useState(false);
    const [isFinishLabel, setisFinishLabel] = useState(false)

    const handleClose = () => {
        setOpen(false);
        
        navigate("/Game")
      };

    useEffect( function(){
         setTimeout(() => {
            setVisible(false)
            setVisibleOps(true)
        }, 20000);
       
    },[])

   
    useEffect(function () {
        setTheLet(objarraygame[x].correctLetter)
        setTheOption(objarraygame[x].options)
        setVisible(true)
        setVisibleOps(false)
        setTimeout(() => {
            setVisible(false)
            setVisibleOps(true)
        }, 2000);
    }, [x])

    function goodAnswer(){
        audioSuccess.play()
        setnice(nice + 1)
    }

    function wrongAnswer(){
        audioWrong.play()
        setbad(bad + 1)
    }

    function check(item) {
        
        if (item == theLet) {
            // alert("nice")
            // setnice(nice + 1)
            goodAnswer()

            if (item == letterLabel)
                setNumCorront(numCorront + 1)
        }
        else {
            // alert("bad")
            // setbad(bad + 1)
            wrongAnswer()
        }
        if (x < objarraygame.length-1)
            setx(x + 1)
        else
            {
                // alert("you finish")
                audioCompletionAlevel.play(


                )
                calcMark()
                
            }
    }

    function f () {
        
        setVisibleOps(false)
        setVisible(true)
        setTimeout(() => {
            setVisibleOps(true)
            setVisible(false)

        }, 2000);

      
    }

       async function  calcMark() {
            let m = nice*3 - bad

            let exerciseUser={exerciseUser:
            {
                user:user,
                label:letterLabel,
                gameExercise:game,
                mark:m
            }}
           if(numCorront > 4){//אם היתה הצלחה           
                // setisSucs(true)
                if(myLebels[letterLabel][game]==undefined) {   //משחק חדש             
                   
                    let res = await axios.post(`http://localhost:3030/exerciseUser/addGame`, exerciseUser)
                    if (res.data.GOOD!="") { //לשלב הבא------------------------------""
                            
                        dispatch(insertLebel(res.data.GOOD))
                        setisFinishLabel(true)
                    }
                }
                else        //עדכון משחק קיים
                    {let re= await axios.patch(`http://localhost:3030/exerciseUser/updateMark`, exerciseUser)}
                await dispatch(updateGame(exerciseUser)) 
                await setisSucs(true)             
            } 
             else//במקרה של כשלון
               await setisSucs(false)
            await setOpen(true);       
        }


        // const [open, setOpen] = useState(false);
        // const handleClickOpen = () => {
        //     setOpen(true);
        //   };


    return (
        <div className="pict">

<Stepp steps={steps} labels={labelLetters} labelNow={letterLabel} style={{ lineHeight: '0px !importent' }}></Stepp>

            {/* <h1>{x}</h1>
            {numCorront}
            <h1>{objarraygame.length}</h1>
            <h1>{theLet}</h1> */}
            {/* <div style={{height:"20%"}}></div> */}
            <div className='container-fluid col-8 maindiv' style={{ border: "black 1px solid" }}>
            {/* / */}
            {/* <Button variant="outlined" onClick={handleClickOpen}>
        Open alert dialog
      </Button> */}
     {/* {open && <AlertDialog open={open} setOpen={setOpen} bad={bad} nice={nice} numCorront={numCorront} game={game} letterLabel={letterLabel}></AlertDialog>} */}
                
                {/* <button onClick={f} style={{margin:"2px"}} > Click Me</button> */}
                <br></br><br></br>
                {visible?<h1>{theLet}</h1>:<Button onClick={f} >שוב את האות</Button>}
                {/* <Button id="seeLetter" onClick={f} >שוב את האות</Button>
                
                <br></br><br></br>
                <h1>{visible == true && theLet}</h1> */}
                {/* <div className='row' style={{ height: "75%" }} ></div> */}
                <img src={sk} className="ballon"></img>
                <div className='row rowofbuttens ' style={{ height: "20%" }}  >

                    {theOption && theOption.length && visibleOps == true && theOption.map(item => (
                        <div className='col-3'>
                            <button key={item} onClick={() => check(item)} className='but'>

                                <b>{item}</b>

                            </button>
                        </div>
                    ))}</div>
            </div>
            {/* <h3>{objarraygame.length}</h3>
            <h1>nice: {nice}</h1>
            <h1>bad: {bad}</h1>
            <h2>numCorront:   {numCorront}</h2>
            {isSucs?"v":"x"} */}

<Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"studyכיף"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            { isSucs ? ":) סימת בהצלחה " : "חבל, נסה שנית" }
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>סגור</Button>
          
           
        </DialogActions>
      </Dialog>
      <div>

      </div>
        </div>
    )
}

export default connect(mapStateToProps)(Play)
