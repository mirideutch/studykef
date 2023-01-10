import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import React from 'react';
// import { Button } from 'react-bootstrap'
import { Button as B } from 'semantic-ui-react'

import FormLogin from './login2'
import './login.css'
import Formm from '../form/form';
import Letters from '../letters/letters';
import Upload from './image'
import Seg from './seg'

import logoStudyKef from '../../images/logoStudyKef.png'

// import { Button, Divider, Form, Grid, Segment } from 'semantic-ui-react'


import { useNavigate } from 'react-router-dom'

export default function Login() {
  const navigate = useNavigate()


  function navg1() {
    navigate("Form")

  }
  function navg2() {
    navigate("Entry")

  }
  // function navg3() {
  //   navigate("PlayLetters")

  // }
  function navg4() {
    navigate("ChooseLebel")

  }
  function navg5() {
    navigate("Game")

  }
  // function navg6() {
  //   navigate("LearnLetter")

  // }
  // function navg7() {
  //   navigate("LettersSound")

  // }
  // function navg8() {
  //   navigate("LowerLetters")

  // }
  // function navg9() {
  //   navigate("SoundwordWithImageword")

  // }
  return (
    <div className="pic">



  
    <Stack spacing={4} direction="row" className='buttens'>
      
      <Button variant="outlined" size="large" onClick={navg1} sx={{fontSize: 24}}>הרשמה</Button>
      <Button variant="contained" size="large" onClick={navg2} sx={{fontSize: 24}}>כניסה</Button>
    </Stack>
    <img src={logoStudyKef} className="logo"></img>


{/* <FormLogin /> */}
      

      {/* <Button className='login_button' variant="outline-primary" onClick={navg1}><b>הרשמה</b></Button>{' '}
      <Button className='login_button' variant="outline-primary" onClick={navg2}><b>כניסה</b></Button>{' '} */}
      {/* <Button className='login_button' variant="outline-primary" onClick={navg3}><b>אות</b></Button>{' '} */}
      {/* <Button className='login_button' variant="outline-primary" onClick={navg4}><b>בחירת שלב</b></Button>{' '}
      <Button className='login_button' variant="outline-primary" onClick={navg5}><b>בחר משחק</b></Button>{' '} */}
      {/* <Upload></Upload> */}

      {/* <Segment placeholder>
    <Grid columns={2} relaxed='very' stackable>
      <Grid.Column>
        <Form>
          <Form.Input
            icon='user'
            iconPosition='left'
            label='Username'
            placeholder='Username'
          />
          <Form.Input
            icon='lock'
            iconPosition='left'
            label='Password'
            type='password'
          />

          <Button content='Login' primary />
        </Form>
      </Grid.Column>

      <Grid.Column verticalAlign='middle'>
        <Button content='Sign up' icon='signup' size='big' />
      </Grid.Column>
    </Grid>

    <Divider vertical>Or</Divider>
  </Segment> */}

      {/* <Button className='login_button' variant="outline-primary" onClick={navg6}><b>תמונה</b></Button>{' '}
      <Button className='login_button' variant="outline-primary" onClick={navg7}><b>לימוד אות</b></Button>{' '}
      <Button className='login_button' variant="outline-primary" onClick={navg8}><b>אותיות קטנות</b></Button>{' '}
      <Button className='login_button' variant="outline-primary" onClick={navg9}><b>תמונות ושמע</b></Button>{' '} */}
      {/* <Seg></Seg> */}
    </div>

  )
}
