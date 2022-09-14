import axios from "axios";
// import React, { useState, useEffect } from 'react';
import React, { useState, useEffect } from "react";
// import './play.css'
// import '../letters/play'
import Letters from "../letters/letters";
import {useLocation} from 'react-router-dom'
import { connect } from 'react-redux'
import Stepp from  '../Stepper/Stepper'
import {updateGame, insertLebel} from '../../redux/actions/lebelsAction'

function mapStateToProps(state) {
    return {
      myLebels: state.lebelsReduser.myLebels,
      user :state.useReducer.user._id
      
    }
  }

 function LettersSound(props) {

    // const { letterLabel } = props;//בהמשך צריך להביא אותו מהסטור
    // const labelLetters = ["A", "B", "C", "D", "E", "F", "G", "H"]//בהמשך צריך להביא אותו מהסטור
    // const labelLetters = ["A", "B", "C", "D", "E"]//בהמשך צריך להביא אותו מהסטור
    
    
    const {myLebels, user}=props
    const game = 2
    let labelLetters = Object.keys(myLebels)
    const { dispatch } = props;
    const location=useLocation()


    let letterLabel= location.state.labelNow

    const objarraygame = Letters(letterLabel, labelLetters)

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

    // useEffect(function () {
    //     labelLetters.push(letterLabel)
    //     axios.get(`http://localhost:3030/letter/getSoundLetters/${labelLetters}`).then(res => {
    //         console.log(res);
    //         setsounds(res.data)
            
    //     }).then(console.log(objarraygame+"         objarraygame"))


    // }, [])
    useEffect(async function () {
        labelLetters.push(letterLabel)
        if(labelLetters.length <4)
             labelLetters=await ['A','B','C','D']
        let res= await axios.get(`http://localhost:3030/letter/getSoundLetters/${labelLetters}`)
            console.log(res);
            setsounds(res.data)
            
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
            setisSucs(true)
            if(myLebels[letterLabel][game]==undefined)                
                {
                    let res = await axios.post(`http://localhost:3030/exerciseUser/addGame`, exerciseUser)
                    if (res.GOOD!='') { 
                        dispatch(insertLebel(res.GOOD))
                    }
                }
            else        
                {let re= await axios.patch(`http://localhost:3030/exerciseUser/updateMark`, exerciseUser)}
            await dispatch(updateGame(exerciseUser))
      
    
         } 

    }


    return (

        <>
        <Stepp steps={steps} labels={labelLetters} labelNow={letterLabel} style={{ lineHeight: '0px !importent' }}></Stepp>
            <h1>{theLet}</h1>
            {sounds != null ? <audio src={`http://localhost:3030/audio/${sounds[theLet].soundLetter}`} controls autoPlay /> : ""}

            <div className='row rowofbuttens ' style={{ height: "20%" }}  >

                {theOption && theOption.length && theOption.map(item => (
                    <div className='col-3'>
                        <button key={item} onClick={() => check(item)} className='but'>

                            <b>{item}</b>

                        </button>
                    </div>
                ))}</div>

        </>

    )
}
export default connect(mapStateToProps)(LettersSound)