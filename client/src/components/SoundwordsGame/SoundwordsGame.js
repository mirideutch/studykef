import axios from "axios";
// import React, { useState, useEffect } from 'react';
import React, { useState, useEffect } from "react";
// import './play.css'
import { connect } from 'react-redux'
import Letters from "../letters/letters";
import {useLocation} from 'react-router-dom'
import Stepp from  '../Stepper/Stepper'
import {updateGame, insertLebel} from '../../redux/actions/lebelsAction'
import { useNavigate } from 'react-router-dom'


import wrong from '../../audio/wrong.wav'
import success from '../../audio/success.wav'
import completionAlevel from '../../audio/completionAlevel.wav'

function mapStateToProps(state) {
    return {
      myLebels: state.lebelsReduser.myLebels,
      fourLetter : state.lebelsReduser.fourLetter,
      letterLabel : state.lebelsReduser.now,
      user :state.useReducer.user._id
      
      
    }
  }


function SoundwordWithImageword(props) {

    // const { letterLabel } = props;//בהמשך צריך להביא אותו מהסטור
    // const labelLetters = ["A", "B", "C", "D", "E", "F", "G", "H"]//בהמשך צריך להביא אותו מהסטור
    // const labelLetters = ["A", "B", "C", "D", "E"]//בהמשך צריך להביא אותו מהסטור
    const navigate = useNavigate()
    const {myLebels, user, letterLabel, fourLetter}=props
    const game = 4
    const { dispatch } = props;
    let labelLetters = Object.keys(myLebels)

    const location=useLocation()


    // let letterLabel= location.state.labelNow

    const objarraygame = Letters(letterLabel, labelLetters, fourLetter)

    const steps = labelLetters.map(item => {
        return { title: item + " שלב " }
      })


      let audioWrong =new Audio(wrong)
      let audioSuccess =new Audio(success)
      let audioCompletionAlevel =new Audio(completionAlevel)
      const [responce, setResponce]= useState('')
      const [visibleRes, setVisibleRes]=useState(false)
      

    const [x, setx] = useState(0)
    const [theLet, setTheLet] = useState(objarraygame[0].correctLetter)
    const [theOption, setTheOption] = useState(objarraygame[0].options)
    const [numCorront, setNumCorront] = useState(0)
    const [nice, setnice] = useState(0)
    const [bad, setbad] = useState(0)
    const [data, setdata] = useState(null)
    const [t,setT]=useState(0)

    const [isSucs, setisSucs] = useState(false)
    const [mark ,setmark] = useState(0)


    const [open, setOpen] = useState(false);
    const [isFinishLabel, setisFinishLabel] = useState(false)

    useEffect(function () {
        labelLetters.push(letterLabel)
        if(labelLetters.length <4)
             labelLetters= ['A','B','C','D']
        axios.get(`http://localhost:3030/letter/getSoundwordWithImageword/${labelLetters}`).then(res => {
            console.log(res.data);
            setdata(res.data)

        }).then(console.log(data))


    }, [])


    useEffect(function () {
        setTheLet(objarraygame[x].correctLetter)
        let size = data ? data[objarraygame[x].correctLetter].wordsLetter.length - 1 : ""
        setT(Math.floor(Math.random() * (size)+1))  //const x = Math.floor(Math.random() * (max - min + 1)) + min הגרלת מספר בטווח
        console.log(t);
        setTheOption(objarraygame[x].options)

    }, [x])

    // function check(item) {

    //     if (item == theLet) {
    //         alert("nice")
    //         setnice(nice + 1)

    //         if (item == letterLabel)
    //             setNumCorront(numCorront + 1)
    //     }
    //     else {
    //         alert("bad")
    //         setbad(bad + 1)
    //     }
    //     if (x < objarraygame.length - 1)
    //         setx(x + 1)
    //     else
    //        { alert("you finish")
    //         calcMark()}
    // }
    function goodAnswer(){
        audioSuccess.play()
        setnice(nice + 1)
        setResponce('מצוין!!!')
        setVisibleRes(true)
        setTimeout(() => {
            setVisibleRes(false)
            continueGame()
        }, 2000);
    }

    function wrongAnswer(){
        audioWrong.play()
        setbad(bad + 1)
        setResponce('חבל')
        setVisibleRes(true)
        setTimeout(() => {
            setVisibleRes(false)
            continueGame()
        }, 2000);
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
    }
    function continueGame(){
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
                if (res.data.GOOD!='') { 
                    dispatch(insertLebel(res.data.GOOD))
                    setisFinishLabel(true)
                }
            }
            else        
                {let re= await axios.patch(`http://localhost:3030/exerciseUser/updateMark`, exerciseUser)}
            await dispatch(updateGame(exerciseUser))
            await setisSucs(true)    
    
        } 
        else//במקרה של כשלון
            await setisSucs(false)
        await setOpen(true);  
        alert("your mark is  "+{m}+"  "+{setisSucs})   
         navigate("/Game")          

    }


    return (

        
        <div style={{backgroundColor:'#72bddb'}}>
        <Stepp steps={steps} labels={labelLetters} labelNow={letterLabel} style={{ lineHeight: '0px !importent' }}></Stepp>
            <h1>{theLet}</h1>
            {data && <audio src={`http://localhost:3030/audio/${data[theLet].wordsLetter[t].wordSound}`} controls autoPlay />}
            {data && <img src={`http://localhost:3030/images/${data[theLet].wordsLetter[t].wordImage}`} width={300}></img>}
            <div className='row rowofbuttens ' style={{ height: "20%" }}  >

                {theOption && theOption.length && theOption.map(item => (
                    <div className='col-3'>
                        <button key={item} onClick={() => check(item)} className='but'>

                            <b>{item}</b>

                        </button>
                    </div>
                ))}</div>
{visibleRes && <h1>{responce}</h1>}
        </div>

    )
}

export default connect(mapStateToProps)(SoundwordWithImageword)