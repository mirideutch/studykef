import React from "react";
import Stepper from 'react-stepper-horizontal';
import './Stepper.css'
import {Link} from 'react-router-dom'

export default function Stepp(props){

    return(
<>

{/* <Link to={'/Graph'}>בדיקת ציונים</Link> */}
        <Stepper style={{ lineHeight: '0px !importent' }}
        steps={props.steps}
        activeStep={props.labels.indexOf(props.labelNow)}
        activeColor="pink"
        activeBorderStyle="solid"
        activeBorderColor="green"
        completeColor="pink"
        defaultColor="pink"
        circleFontColor="red"
        defaultBarColor="black"
      
      >
      </Stepper>
      </>
    )
}
//steps={steps} labels={keys} labelNow={labelNow} 