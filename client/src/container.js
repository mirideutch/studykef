import React from 'react'
import './container.css'

export default function Container(){
    return(
        <>
            <div className='container-fluid'>
                <div className='row' style={{height:"30vh"}}>
                    <div className='col'></div>
                </div>
                <div className='row-fluid'>
                    <div className='col-9'>
                        <div className='container-fluid'>
                            <div className='row' style={{height:"30vh"}}>
                                <div className='col-3'></div>
                                <div className='col-3'></div>
                                <div className='col-3'></div>
                            </div>
                            <div className='row' style={{height:"30vh"}}>
                                <div className='col-4'></div>
                                <div className='col-5'></div>
                            </div>
                        </div>
                    </div>
                    <div className='col-3'></div>
                </div>

            </div>
        </>
    )
}