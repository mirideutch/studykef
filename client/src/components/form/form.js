
//אם אני שולחת פעמיים כי הראשון לא נכון הוא מתעדכן פעמיים
import React, { useEffect } from "react";
import { Form, Row, Button, InputGroup, Col } from 'react-bootstrap';
import { useState } from 'react';
import './form.css'
import { useRef } from "react";
import { connect } from 'react-redux'
import { updateUser } from "../../redux/actions/usersAction";
import { startGame } from '../../redux/actions/lebelsAction'
//import {}
import axios from "axios";

import { BrowserRouter, Link, Router, Route } from 'react-router-dom'
import ChooseLevel from '../chooseLebel/chooseLebel'
import { useNavigate } from 'react-router-dom'
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
// import {useNavigate} from 'react-router-dom'


//לא מסתדר לי החיבור לסטור
//export default 
// connect(()=>{})(
function QFormExample(props) {

  // let navigate = useNavigate
  const { dispatch } = props;
  // function update() {
  //   dispatch(updateUser({ user: newUser }))
  // }
  const navigate = useNavigate()
  const [userOk, setUserOk] = useState();

  const [validated, setValidated] = useState(false);
  
  // const [newUser, setNewUser] = useState({
  //   userFirstName: "a",
  //   userLastName: "b",
  //   userBirthDate: "c",
  //   passWord: "d",
  //   mail: "@",
  //   phone: "p"
  // })
  const name = useRef('')
  const lastName = useRef('')
  const email = useRef('')
  const age = useRef('')
  const password = useRef('')
  const checkPassword = useRef('')

  useEffect(async () => {
    await setOpen(true);
    await setTimeout(() => {
      setOpen(false);
      if (userOk == true)
        navg()
    }, 2000);

  }, [userOk])
  const handleSubmit = async (event) => {
    try {
      debugger
      console.log(validated)
      const form = event.currentTarget;
      if (form.checkValidity() === false) {//|| checkpass() === false) {
        await event.preventDefault();
        await event.stopPropagation();
      } else {
        await setValidated(true)
        if (/\S+@\S/.test(email.current.value)&&name.current.value != '' && lastName.current.value != '' && password.current.value != '' && email.current.value != '' && checkPassword.current.value != ''&&password.current.value.length>=4 ) {
          const user = {
            userFirstName: name.current.value,
            userLastName: lastName.current.value,
            userBirthDate: age.current.value,
            passWord: password.current.value,
            mail: email.current.value,
            phone: checkPassword.current.value
          }

          axios.post(`http://localhost:3030/user/createUser`, user).then(async res => {
            if (res.data.ok) {
              await setUserOk(true)
              
              await dispatch(updateUser(res.data.u))
              await dispatch(startGame(res.data.ok))
            }
            else {
              await setUserOk(false)
            }
          })


        }
        else {
          alert("נסה למלא שנית")
        }
      }
    }
    catch (err) {
      console.log(err);
      setUserOk(false)
    }

  };

  function navg() {
    navigate("/Game")

  }
  const current = new Date();
  const date = `${current.getFullYear()}-${current.getMonth() + 1}-${current.getDate()}`;

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  // function checkAge(e) {
  //   console.log(current>age.current.value);
  //   // const chooseDate=age.current.value
  //   // setValidAge(true)
  //     if(age.current.value!=undefined && current>age.current.value){//וגם אם הוא קטן מהיום אם יש תאריך
  //       setValidAge(true)

  //     }
  // }

  // function checkPass(e) {
  //   //   if(e.target.value>newDate())
  // }


  return (
    <>

      <Form  validated={validated} className="myForm" dir="rtl">


        {/* fname */}
        <Form.Group as={Col} md="6" controlId="validationCustom01">
          <Form.Label >שם פרטי</Form.Label>

          <Form.Control
            required
            type="text"
            placeholder="שמי"
            ref={name}
          />
          <Form.Control.Feedback type="invalid">
            הכנס את שמך
          </Form.Control.Feedback>
        </Form.Group>

        {/* lname */}
        <Form.Group as={Col} md="6" controlId="validationCustom02">
          <Form.Label>שם משפחה</Form.Label>

          <Form.Control
            required
            type="text"
            placeholder="משפחתי"
            ref={lastName}
          />

          <Form.Control.Feedback type="invalid">
            הכנס את שם משפחתך
          </Form.Control.Feedback>
        </Form.Group>

        {/* @ */}
        <Form.Group as={Col} md="6" controlId="formGridEmail">
          <Form.Label>אימייל</Form.Label>
          <InputGroup hasValidation>
            <InputGroup.Text id="inputGroupPrepend">@</InputGroup.Text>
            <Form.Control
              type="email"
              placeholder="כתובת המייל שלי"
              required
              ref={email}
            />
            <Form.Control.Feedback type="invalid">
              הכנס כתובת מייל
            </Form.Control.Feedback>
          </InputGroup>
        </Form.Group>

        {/* date */}
        <Form.Group as={Col} md="6" controlId="validationCustom03">
          <Form.Label>גיל</Form.Label>
          <Form.Control
            type="Date"
            max={new Date().toISOString().split("T")[0]}
            //  לעשות תאריך מקסימום
            // onChange={checkAge}
            placeholder="גיל"
            required
            ref={age}
          />
          {/* {!validAge && <Form.Control.Feedback type="invalid">
            תאריך שגוי
          </Form.Control.Feedback>} */}
          {<Form.Control.Feedback type="invalid">
            הכנס
          </Form.Control.Feedback>}
        </Form.Group>

        {/* pass */}
        <Form.Group as={Col} md="6" controlId="validationCustom04">
          <Form.Label>סיסמא</Form.Label>
          <Form.Control
            type="password"
            placeholder="הסיסמא"
            required
            ref={password}
            minLength='4'
            maxLength='8'
          />
          <Form.Control.Feedback type="invalid">
            בחר סיסמא בין 4 ל 8 תווים
          </Form.Control.Feedback>
        </Form.Group>


        {/* pass2 */}
        {/* <Form.Group as={Col} md="6" controlId="validationCustom05">
          <Form.Label>בדיקת סיסמא</Form.Label>
          <Form.Control
            type="password"
            placeholder="בודק סיסמא"
            required
            ref={checkPassword}
            minLength='4'
            maxLength='8'

          // onChange={checkPass}
          />
          {password.current.value!=checkPassword.current.value?
          <Form.Control.Feedback type="invalid">
            הסיסמא שגויה
          </Form.Control.Feedback>:''}
        </Form.Group> */}

        {/* onClick={send} */}

        <Button type="button" onClick={handleSubmit}>אישור</Button>
      </Form>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        {/* <DialogTitle id="alert-dialog-title">
          {"Use Google's location service?"}
        </DialogTitle> */}
        {userOk != null && <Stack sx={{ width: '100%' }} spacing={2}>
          {userOk ? <Alert severity="success">הצטרפת בהצלחה</Alert> :

            <Alert severity="error">משתמש קיים החלף שם או סיסמא</Alert>

          }
        </Stack>}
        {/* <DialogContent>
          <DialogContentText id="alert-dialog-description">
         
          </DialogContentText>
        </DialogContent> */}
      </Dialog>
    </>
  );
}
// )

export default connect()(QFormExample)