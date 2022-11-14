
import axios from "axios";
import React, { useState, useEffect ,useRef} from 'react';
import { connect } from 'react-redux'
import {learndNew} from '../../redux/actions/lebelsAction'
import {useLocation} from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
// import { motion } from "framer-motion"
import './learnLetter.css'

function mapStateToProps(state) {
    return {        
        newLabel : state.lebelsReduser.new
    }
  }


export default connect(mapStateToProps)(function LearnLetter(props){
    const location=useLocation()
    const navigate = useNavigate()
    let letterL= location.state.labelNow
  
   

    const {  newLabel } = props //?
    const { dispatch } = props;
    const [imageUppercase, setimageUppercase] = useState('')
    const [imageLowercase, setimageLowercase] = useState('')
    const [soundLetter, setsoundLetter] = useState('')
    const [word, setword] = useState('')
    const [wordSound, setwordSound] = useState('')
    const [wordImage, setwordImage] = useState('')
    const [upperWord, setupperWord] = useState('') 
    const [word2, setword2] = useState('')
    const [wordSound2, setwordSound2] = useState('')
    const [wordImage2, setwordImage2] = useState('')
    const [upperWord2, setupperWord2] = useState('') 
    
    
    const audioLetterRef = useRef()//////מעודכן
    const audioWord1rRef = useRef()
    const audioWord2rRef = useRef()


    useEffect(
        function g() {
                  
            axios.get(`http://localhost:3030/letter/getLetter/${letterL}`, {}).then(res => {
               
                setimageUppercase(res.data.imageUppercase)
                setimageLowercase(res.data.imageLowercase)
                setsoundLetter(res.data.soundLetter)                
                setword(res.data.wordsLetter[0].word)
                setwordSound(res.data.wordsLetter[0].wordSound)
                setwordImage(res.data.wordsLetter[0].wordImage) 
                setword2(res.data.wordsLetter[1].word)
                setwordSound2(res.data.wordsLetter[1].wordSound)
                setwordImage2(res.data.wordsLetter[1].wordImage)                                
            }).then(()=>{
                setupperWord(word.toUpperCase())
                setupperWord2(word2.toUpperCase())
            }).catch((err) => {
                console.log(err)
            })
        },
        []
    )

    
        function finish(){
            if(letterL == newLabel)
             dispatch(learndNew())
             navg()
        }
        function navg() {
            navigate("/Game" , { state: { labelNow: letterL }})
        
          }



        

    return (
        <>   
           
                     
            {<audio ref={audioLetterRef} src={`http://localhost:3030/audio/${soundLetter}`} controls style={{display :"none"}} />}         
         {<audio ref={audioWord1rRef} src={`http://localhost:3030/audio/${wordSound}`}controls  style={{display :"none"}} />}          
         {<audio ref={audioWord2rRef} src={`http://localhost:3030/audio/${wordSound2}`}controls  style={{display :"none"}} />} 


         <div className='container-fluid col-10 contlearn' style={{ border: "black 1px solid" }}>
         <div className='row'  >
            <div className='container-fluid col-5'>
                {<img onClick={()=>{audioLetterRef.current.play()}} src={`http://localhost:3030/images/${imageUppercase}`}  className="imgup"></img>}
            </div>
            <div className='container-fluid col-3'>
                {<img onClick={()=>{audioLetterRef.current.play()}} src={`http://localhost:3030/images/${imageLowercase}`} className="imglow"></img>}                     
            </div>
            <div className='container-fluid col-2'>
            <div className='row' style={{ height: "50%" }}  >
                <div className='container-fluid col-6'>
                {<img onClick={()=>{audioWord1rRef.current.play()}} src={`http://localhost:3030/images/${wordImage}`} style={{ width: 100, height: 100 }}></img>}
                </div>
                
                <div className='container-fluid col-6'>
                    <div className='row' style={{ height: "50%" }}  >{upperWord}</div>
                    <div className='row'  style={{ height: "50%" }} >{word}</div>
                </div>
            </div>
            <div className='row' style={{ height: "50%" }}  >
            <div className='container-fluid col-6'>
            {<img onClick={()=>{audioWord2rRef.current.play()}}  src={`http://localhost:3030/images/${wordImage2}`} style={{ width: 100, height: 100 }}></img>}  
                </div>
                <div className='container-fluid col-6'>
                    <div className='row' style={{ height: "50%" }}  >{upperWord2}</div>
                    <div className='row' style={{ height: "50%" }}  >{word2}</div>
                </div>
            </div>
            </div>
         </div>
         </div>
         <button onClick={finish}>סיים</button>  



        </>
    )
})






