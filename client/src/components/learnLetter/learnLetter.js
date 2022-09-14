
import axios from "axios";
import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux'
import {learndNew} from '../../redux/actions/lebelsAction'
import {useLocation} from 'react-router-dom'
import { useNavigate } from 'react-router-dom'


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
    // const [dat, setdata] = useState({})
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
    
    useEffect(
        function g() {
                  
            axios.get(`http://localhost:3030/letter/getLetter/${letterL}`, {}).then(res => {
                // setdata(res.data);
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
            navigate("/Game")
        
          }

    return (
        <>   
letter <br></br>
imageUppercase {imageUppercase}<br></br>
imageLowercase {imageLowercase}<br></br>
soundLetter  {soundLetter}<br></br>learnLetter
word  {word}<br></br>
wordSound  {wordSound}<br></br>
wordImage  {wordImage}<br></br>
            {<img src={`http://localhost:3030/images/${imageUppercase}`}></img>}
            {<img src={`http://localhost:3030/images/${imageLowercase}`}></img>}                     
            {/* {<audio src={`http://localhost:3030/audio/${soundLetter}`} controls autoPlay />}          */}
         <h1>{word} </h1>
         <h2> {upperWord}</h2>  
         {<img src={`http://localhost:3030/images/${wordImage}`}></img>}            
         {/* {<audio src={`http://localhost:3030/audio/${wordSound}`}controls autoPlay  />}   */}

         <h1>{word2} </h1>
         <h2> {upperWord2}</h2>  
         {<img src={`http://localhost:3030/images/${wordImage2}`}></img>}            
         {/* {<audio src={`http://localhost:3030/audio/${wordSound2}`}controls autoPlay  />}  */}
         <button onClick={finish}>סיים</button>             
        </>
    )
})






