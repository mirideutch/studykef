import React, { useRef, useState } from "react";
import axios from "axios";
import { connect } from "react-redux";
import { updateUser } from '../../redux/actions/usersAction'
import {updateLebels} from '../../redux/actions/lebelsAction'
import {useNavigate} from 'react-router-dom'
import FormLogin from '../login/login2'
import { Button, Form, Grid, Header, Image, Message, Segment } from 'semantic-ui-react'
import './entry.css'
import {Link} from 'react-router-dom'
// import Form from '../form/form';


function Entry(props) {

    const navigate = useNavigate()
    const { dispatch } = props
    const [user, setuser] = useState({})
    const nameRef = useRef()
    const passwordRef = useRef()
    const [name,setName]=useState()
    const [password,setPassword]=useState()
    let labelNow=""

    function check() {
        let y;
        debugger
        const headers = {
            "Content-Type": "application/json",
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
        };
        axios.get(`http://localhost:3030/user/getUser/${name}/${password}`)
            .then((res) => {
                
                if(res.data== "x")
                alert  ("diddddd")                 
                dispatch((updateLebels(res.data.status)))
                // y=res.data.user
                // y.age=getAge(y.userBirthDate)
                // return y
            // }).then((yy) => {
            //     dispatch(updateUser(yy))
            }).then(()=>{
                debugger
                navg()
            })
            .catch(err => console.log(err))//תגובה על שגיאה?
    }
    function getAge(dateString) {
        var today = new Date();
        var birthDate = new Date(dateString);
        var age = today.getFullYear() - birthDate.getFullYear();
        var m = today.getMonth() - birthDate.getMonth();
        if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
            age--;
        }
        return age;
    }

    
    function navg(){
        navigate("/Game", { state: { labelNow: labelNow } })
        
    }
    return (
        <div className="pic">


            {/* name
            <input ref={nameRef}></input>
            password
            <input ref={passwordRef}></input>
            <button onClick={check}>אישור</button> */}


            <Grid textAlign='center' style={{ height: '98vh' }} verticalAlign='middle'>
            <Grid.Column style={{ maxWidth: 450 }}>
                {/* <Header as='h2' color='teal' textAlign='center' className='Header'>
                    <Image src='https://react.semantic-ui.com/logo.png' /> Log-in to your account
                </Header> */}
                <Form size='large'>
                    <Segment stacked>
                        <Form.Input fluid icon='user' iconPosition='left' placeholder='שם משתמש' onChange={(e)=>setName(e.target.value)}/>
                        <Form.Input
                            fluid
                            icon='lock'
                            iconPosition='left'
                            placeholder='סיסמא'
                            type='password'
                            onChange={(e)=>setPassword(e.target.value)}
                            />
{/* onClick={save} */}

                        <Button onClick={check} color='teal' fluid size='large'>
                            התחברות
                        </Button>
                    </Segment>
                </Form>
                <Message>
                    חדש?
                     {/* <a href='#'>הרשמה</a> */}
                     <Link to={'/Form'}>הרשמה</Link>
                </Message>
            </Grid.Column>
        </Grid>
    
            {/* <FormLogin /> */}
        </div>

    )
}

export default connect()(Entry);