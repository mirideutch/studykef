import axios from "axios";
import React, { useState, useEffect, useRef } from 'react';
import { connect } from 'react-redux'
import { learndNew } from '../../redux/actions/lebelsAction'
import { useLocation } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
// import { motion } from "framer-motion"
import './learnLetter.css'

function mapStateToProps(state) {
    return {
        newLabel: state.lebelsReduser.new,
        letterL: state.lebelsReduser.now

    }
}


export default connect(mapStateToProps)(function LearnLetter(props) {
            // const location = useLocation()
            const navigate = useNavigate()
            // let letterL = location.state.labelNow



            const { newLabel , letterL} = props //?
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

            const [ress, setRes] =useState({})
            const audioLetterRef = useRef() //////מעודכן
            const audioWord1rRef = useRef()
            const audioWord2rRef = useRef()

            const [arrword, setarrword]= useState([])

            useEffect(
               ()=> {
                const as =async ()=>{
                    try{
                let r=  await axios.get(`http://localhost:3030/letter/getLetter/${letterL}`)
                 setRes(r.data)  
                 setimageUppercase(r.data.imageUppercase)
                        setimageLowercase(r.data.imageLowercase)
                        setsoundLetter(r.data.soundLetter)
                        setword(r.data.wordsLetter[0].word)
                        setwordSound(r.data.wordsLetter[0].wordSound)
                        setwordImage(r.data.wordsLetter[0].wordImage)
                        setword2(r.data.wordsLetter[1].word)
                        setwordSound2(r.data.wordsLetter[1].wordSound)
                        setwordImage2(r.data.wordsLetter[1].wordImage)

                        // setimageUppercase(res.data.imageUppercase)
                        // setimageLowercase(res.data.imageLowercase)
                        // setsoundLetter(res.data.soundLetter)
                        // setword(res.data.wordsLetter[0].word)
                        // setwordSound(res.data.wordsLetter[0].wordSound)
                        // setwordImage(res.data.wordsLetter[0].wordImage)
                        // setword2(res.data.wordsLetter[1].word)
                        // setwordSound2(res.data.wordsLetter[1].wordSound)
                        // setwordImage2(res.data.wordsLetter[1].wordImage)
                    // }).then(() => {
                    //     setupperWord(word.toUpperCase())
                    //     setupperWord2(word2.toUpperCase())
                    }catch(err ){
                        console.log(err+"my err(((")
                    }}
                    as()
                }
                
                , []
            )


            // useEffect(()=>{
            //         setimageUppercase(ress.imageUppercase)
            //             setimageLowercase(ress.imageLowercase)
            //             setsoundLetter(ress.soundLetter)

            //             setarrword(ress.wordsLetter)

            //             // setword(ress.wordsLetter[0].word)
            //             // setwordSound(ress.wordsLetter[0].wordSound)
            //             // setwordImage(ress.wordsLetter[0].wordImage)
            //             // setword2(ress.wordsLetter[1].word)
            //             // setwordSound2(ress.wordsLetter[1].wordSound)
            //             // setwordImage2(ress.wordsLetter[1].wordImage)
            // },[ress])


            // useEffect(
            //   async  function g() {
            //     try{

            //         let ress =await axios.get(`http://localhost:3030/letter/getLetter/${letterL}`)
                        
            //         await setimageUppercase(ress.data.imageUppercase)
            //         await setimageLowercase(ress.data.imageLowercase)
            //         await setsoundLetter(ress.data.soundLetter)
            //         await setword(ress.data.wordsLetter[0].word)
            //         await setwordSound(ress.data.wordsLetter[0].wordSound)
            //         await setwordImage(ress.data.wordsLetter[0].wordImage)
            //         await setword2(ress.data.wordsLetter[1].word)
            //         await setwordSound2(ress.data.wordsLetter[1].wordSound)
            //         await setwordImage2(ress.data.wordsLetter[1].wordImage)
                    
            //         await setupperWord(word.toUpperCase())
            //         await  setupperWord2(word2.toUpperCase())
            //     }
            //         catch(err){
            //             console.log(err)
            //         }
            //     }, []
            // )

            // useEffect(
            //      () =>{

            //         axios.get(`http://localhost:3030/letter/getLetter/${letterL}`).then(res => {

            //             setimageUppercase(res.data.imageUppercase)
            //             return res
            //     }).then(res=>{
            //         setimageLowercase(res.data.imageLowercase)
            //         return res
            //     }).then(res=>{
            //         setsoundLetter(res.data.soundLetter)
            //         return res
            //     }).then(res=>{
            //         setword(res.data.wordsLetter[0].word)
            //         return res
            //     }).then(res=>{
            //         setwordSound(res.data.wordsLetter[0].wordSound)
            //         return res
            //     }).then(res=>{
            //         setwordImage(res.data.wordsLetter[0].wordImage)
            //         return res
            //     }).then(res=>{
            //         setword2(res.data.wordsLetter[1].word)
            //         return res
            //     }).then(res=>{
            //         setwordSound2(res.data.wordsLetter[1].wordSound)
            //         return res
            //     }).then(res=>{
            //         setwordImage2(res.data.wordsLetter[1].wordImage)
            //         return res
            //     }).catch((err) => {
            //             console.log("err-----------------"+err)
            //         })
            //     }, []
            // )


            function finish() {
                if (letterL == newLabel)
                    dispatch(learndNew())
                navg()
            }

            function navg() {
                navigate("/Game")//, { state: { labelNow: letterL } }

            }





            return ( 
                <>
                    


                    {soundLetter!='' && <audio ref ={ audioLetterRef } src = { `http://localhost:3030/audio/${soundLetter}`} controls style = {{ display: "none" }}/>} 
        
                    {audioWord1rRef!='' && <audio ref = { audioWord1rRef }src = { `http://localhost:3030/audio/${wordSound}` }controls style = {{ display: "none" } }/>}  
         
                    {audioWord2rRef!='' && <audio ref = { audioWord2rRef }src = { `http://localhost:3030/audio/${wordSound2}` }controls style = {{ display: "none" } }/>}
                                
                                
                                    
                                 


                                
                <div className = 'container-fluid col-10 contlearn' style = {{ border: "black 1px solid" } } >
                               
                    <div className = 'row' >
                                    
                        <div className = 'container-fluid col-5' >
                            {imageUppercase!='' && <img onClick = {() => { audioLetterRef.current.play() } }src = { `http://localhost:3030/images/${imageUppercase}` }className = "imgup" style={{position: "fixed", left:"10px"}} ></img>}
                                     
                        </div> 

                        <div className = 'container-fluid col-3' > 
                            {imageLowercase!='' && <img onClick = {() => { audioLetterRef.current.play() } }src = { `http://localhost:3030/images/${imageLowercase}` }className = "imglow" ></img>} 
                                                                 
                         </div>

                         <div className = 'container-fluid col-2' >
                                            
                            <div className = 'row'style = {{ height: "50%" } } >
                                            {/* </div> */}
                                                
                                            
                                <div className = 'container-fluid col-6' > 
                                    {wordImage!='' && <img onClick = {() => { audioWord1rRef.current.play() } }src = { `http://localhost:3030/images/${wordImage}` }style = {{ width: 100, height: 100 } } ></img>} 
                                                
                                 </div>

                                                
                                <div className = 'container-fluid col-6' >
                                                
                                    <div className = 'row'style = {{ height: "50%" } } > { upperWord } </div> 
                                                
                                                    
                                    <div className = 'row'style = {{ height: "50%" } } > { word } </div>
                                                
                                                     
                                </div> 
                            </div> 
                                 <div className = 'row'style = {{ height: "50%" } } >
                                           
                                    <div className = 'container-fluid col-6' >
                                         {wordImage2!='' && <img onClick = {() => { audioWord2rRef.current.play() } }src = { `http://localhost:3030/images/${wordImage2}` }style = {{ width: 100, height: 100 } } ></img>}
                                    </div> 
                                    <div className = 'container-fluid col-6' >
                                                    
                                        <div className = 'row'style = {{ height: "50%" } } > { upperWord2 } </div> 
                                                     
                                        <div className = 'row'style = {{ height: "50%" } } > { word2 } </div>
                                                    
                                    </div> 
                                </div> 
                            </div> 
                        </div> 
                    </div>
                                                    
                    <button style = {{ position: "fixed" } } onClick = { finish } > סיים </button>

                                                   
                    </>
                
                    )
                })