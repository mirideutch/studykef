import React from "react";
import { Button } from "react-bootstrap";

export default function Continue(){

    return(
        <div className='container-fluid'>
            <div className='row' >
                <Button variant="dark">המשך</Button>
            </div>
            <br></br> 
            <div className='row' > 
                <Button variant="dark">אפס</Button>
            </div>             
        </div>
    )
}