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


function mapStateToProps(state) {
    return {
        myLebels: state.lebelsReduser.myLebels,
        
        // labelNow : state.lebelsReduser.now,
        user :state.useReducer.user._id
    }
  }

 function Play(props) {
    const {myLebels, user}=props
    const game = 1
    const { dispatch } = props;
    const location=useLocation()
    let letterLabel= location.state.labelNow
    const navigate = useNavigate()

    // const { letterLabel } = props;//האות של השלב//בהמשך צריך להביא אותו מהסטור
    // const labelLetters = ['A','B','C','D','E','F','G','H']//כל האותיות שנלמדו//בהמשך צריך להביא אותו מהסטור
    const labelLetters= Object.keys(myLebels)

    const steps = labelLetters.map(item => {
        return { title: item + " שלב " }
      })
    
    const objarraygame = Letters(letterLabel,labelLetters)//האוביקט / מערך של המשחק
    const [visible, setVisible] = useState(true);
    const [visibleOps, setVisibleOps] = useState(false);


    const [x, setx] = useState(0)//מספר האות - התרגול
    const [theLet, setTheLet] = useState(objarraygame[0].correctLetter)//האות הנכונה
    const [theOption, setTheOption] = useState(objarraygame[0].options)//האפשרויות
    const [numCorront, setNumCorront] = useState(0)
    const [nice, setnice] = useState(0)
    const [bad, setbad] = useState(0)
    const [isSucs, setisSucs] = useState(false)
    const [mark ,setmark] = useState(0)

    useEffect(function(){
        console.log(objarraygame);
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

    function check(item) {
        // if (item==theLet) {
        //     alert("nice")
        //     if(item==letterLabel)
        //         setNumCorront(numCorront+1)
        //     if(x<objarraygame.length)
        //         setx(x+1)
        //     else
        //         alert("you finish")
        // }
        // else
        //     alert("bad")

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
        if (x < objarraygame.length-1)
            setx(x + 1)
        else
            {
                alert("you finish")
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
                // let flag=true
                // for (let index = 0; index < 4; index++) {
                //     if(myLebels[letterLabel][index]==undefined)
                //         flag=false                   
                // }
                // if(flag){
    
                //     let nLetter= await axios.get(`http://localhost:3030/letter/getNextLetter/${letterLabel}`)
                //     await dispatch (insertLebel(nLetter))
                // }
             } 
             else
                alert("לא עברת את המשחק - תרגל שוב את האות ")
             navigate("/Game")
        }

    return (
        <div className="pict">

<Stepp steps={steps} labels={labelLetters} labelNow={letterLabel} style={{ lineHeight: '0px !importent' }}></Stepp>

            {/* <h1>{x}</h1>
            {numCorront}
            <h1>{objarraygame.length}</h1>
            <h1>{theLet}</h1> */}
            {/* <div style={{height:"20%"}}></div> */}
            <div className='container-fluid col-8 maindiv' style={{ border: "black 1px solid" }}>
                {/* <button onClick={f} style={{margin:"2px"}} > Click Me</button> */}
                <Button id="seeLetter" onClick={f} >שנה שלב</Button>
                <br></br><br></br>
                <h1>{visible == true && theLet}</h1>
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
        </div>
    )
}

export default connect(mapStateToProps)(Play)
