import { connect } from 'react-redux'
import React from 'react'
import { Button } from 'react-bootstrap'
import  './chooseLebel.css'
import { useNavigate } from 'react-router-dom'

function mapStateToProps(state) {
    return {
        myLebels: state.lebelsReduser.myLebels,
        newLebel : state.lebelsReduser.new
    }
}

export default connect(mapStateToProps)(function ChooseLebel(props) {
    debugger
    const {myLebels, newLebel } = props
    const navigate = useNavigate()
    
    console.log(myLebels);
    // const labels=myLebels.keys();
    const keys =Object.keys(myLebels)
    if(newLebel!='' && newLebel!=keys[keys.length-1])
        {keys.push(newLebel)}
    
    
    console.log(keys);

    function navg(item) {
        navigate("/Game" )   
    }
    
    return (
        
        <div className='container-fluid pictu'>
            
            <div className='row '>
             <h1 >בחר את השלב</h1>
            <div className='row ' >
                <div className='container-fluid divr'>
                <div className='row ' >
            {keys.map((item, index) =>
                <div className='col-lg-4 col-md-6 col-sm-6 col-xs-10 col ' >                
                    <Button className='choose_butten mybutten' variant="outline-primary" key={index} onClick={navg}> {item} </Button>
                </div>
            )} 
            {/* {for(var letter in myLebels){
                <div className='col-lg-4 col-md-6 col-sm-6 col-xs-10 col ' >                
                <Button className='choose_butten mybutten' variant="outline-primary" key={index}> {item.key} </Button>
            </div>
            }} */}
            </div>           
            </div>
            </div>
        </div>
        </div>
    )
})