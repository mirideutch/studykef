//////מעודכן


import { useNavigate } from 'react-router-dom'
import axios from "axios";
import React, { useState, useEffect } from "react";
import Letters from "../letters/letters";
import {useLocation} from 'react-router-dom'
import { connect } from 'react-redux'
import Stepp from  '../Stepper/Stepper'
import {updateGame, insertLebel} from '../../redux/actions/lebelsAction'


import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

import AlertDialog from '../finishExercize'

function mapStateToProps(state) {
    return {
      myLebels: state.lebelsReduser.myLebels,
      fourLetter : state.lebelsReduser.fourLetter,
      letterLabel : state.lebelsReduser.now,
      user :state.useReducer.user._id
      
    }
  }

 function LettersSound(props) {

    const {myLebels, user, letterLabel, fourLetter}=props
    const game = 2
    let labelLetters = Object.keys(myLebels)
    const { dispatch } = props;
    const location=useLocation()
    const navigate = useNavigate()

    // let letterLabel= location.state.labelNow

    const objarraygame = Letters(letterLabel, labelLetters, fourLetter)

    const steps = labelLetters.map(item => {
        return { title: item + " שלב " }
      })

    const [x, setx] = useState(0)
    const [theLet, setTheLet] = useState(objarraygame[0].correctLetter)
    const [theOption, setTheOption] = useState(objarraygame[0].options)
    const [numCorront, setNumCorront] = useState(0)
    const [nice, setnice] = useState(0)
    const [bad, setbad] = useState(0)
    const [sounds, setsounds] = useState(null)

    const [isSucs, setisSucs] = useState(false)
    const [mark ,setmark] = useState(0)


    // const {open ,setOpen ,status ,label} = props
    const [openb, setOpenb] = useState(false);

  const handleClose = () => {
    setOpen(false);
    
    navigate("/Game")
  };
//   const handleCloseb = () => {
//     setOpenb(false);
//   };



    
    useEffect(async function () {
        labelLetters.push(letterLabel)
        if(labelLetters.length <4)
             labelLetters=await ['A','B','C','D']
        let res= await axios.get(`http://localhost:3030/letter/getSoundLetters/${labelLetters}`)
            console.log(res);
            await setsounds(res.data)
            
        (console.log(objarraygame+"         objarraygame"))


    }, [])


    useEffect(function () {
        setTheLet(objarraygame[x].correctLetter)
        setTheOption(objarraygame[x].options)

    }, [x])

    function check(item) {

        if (item == theLet) {
            alert("nice")
            setnice(nice + 1)

            if (item == letterLabel)
                setNumCorront(numCorront + 1)
        }
        else {
            alert("bad")
            setbad(bad + 1)
        }
        if (x < objarraygame.length - 1)
            setx(x + 1)
        else{
            alert("you finish")
            
            calcMark()
        }
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
       if(numCorront > 4)
        {
            // setisSucs(true)
            if(myLebels[letterLabel][game]==undefined)                
                {
                    let res = await axios.post(`http://localhost:3030/exerciseUser/addGame`, exerciseUser)
                    if (res.GOOD!='') { 
                        dispatch(insertLebel(res.GOOD))
                        setisFinishLabel(true)///////////////סימת שלב חוץ מסיום והצלחת המשחק
                    }
                }
            else        
                {let re= await axios.patch(`http://localhost:3030/exerciseUser/updateMark`, exerciseUser)}
            await dispatch(updateGame(exerciseUser))
            setisSucs(true)///סיום והצלחת המשחק
    
         } 
         else

            await setisSucs(false)//////////////////לא הצלחת
         setOpen(true);
         
    }

    const [open, setOpen] = useState(false);
    const [isFinishLabel, setisFinishLabel] = useState(false)

    return (

        <>
        <Stepp steps={steps} labels={labelLetters} labelNow={letterLabel} style={{ lineHeight: '0px !importent' }}></Stepp>
            <h1>{theLet}</h1>
            {sounds != null ? <audio src={`http://localhost:3030/audio/${sounds[theLet].soundLetter}`} controls autoPlay /> : ""}

            <div className='row rowofbuttens ' style={{ height: "20%" }}  >

                {theOption && theOption.length && theOption.map((item,index) => (
                    <div className='col-3'>
                        <button key={index} onClick={() => check(item)} className='but'>

                            <b>{item}</b>

                        </button>
                    </div>
                ))}</div>

                {/* {open && <AlertDialog open={open} setOpen={setOpen} status={status} label={letterLabel}></AlertDialog>} */}
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
            {! isSucs ? ":) סימת בהצלחה " : "חבל, נסה שנית" }
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>סגור</Button>
          
           
        </DialogActions>
      </Dialog>

      {/* <Dialog
        open={openb}
        onClose={handleCloseb}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"studyכיף"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {"your mark is:" }
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseb}>סגור</Button>
          
           
        </DialogActions>
      </Dialog> */}

        </>

    )
}
export default connect(mapStateToProps)(LettersSound)