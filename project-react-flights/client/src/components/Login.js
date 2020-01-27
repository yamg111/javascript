
import { Form, Button, Modal } from 'react-bootstrap'
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import allActions from "../allActions"
import { useForm } from 'react-hook-form'
const Login = (props) => {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false)
  const handleShow = () => setShow(true);
  const [usernames, setusernames] = useState([])
  const [username, setusername] = useState("")
  const [password, setpassword] = useState("")
  const dispatch = useDispatch()
  const { register, handleSubmit } = useForm()

  useEffect(() => {
    getAllUsers()
    const checkUser = async () => {
      let data = await fetch("http://localhost:3000/users/login", { method: 'GET', credentials: 'include' })
      console.log(data);
      let userr = await data.json()
      if (data.status == 200) {
        const json = await fetch(`http://localhost:3000/users/login/${userr}`)
        const isAdmin = await json.json()
        console.log("loggedin");
        dispatch(allActions.user_actions.setUser([userr, isAdmin]))
        if (isAdmin == 0) {
          
          props.history.push("/vacationsuser")
        } else {
          props.history.push("/vacationadmin")
        }
      }
    }
    
    checkUser();


  }, []);

// getting usernames for chacking for duplicated usernames 
const getAllUsers=async()=>{
  const json= await fetch("http://localhost:3000/users/usernames")
  const data= await json.json()
  console.log(data);
  setusernames(data)
}

   // data from form
   let onSubmit = async data => {
    if (data.f_name && data.l_name && data.username && data.password ) {
       const exist=usernames.some(user=>user.username==`${data.username}`)
      if(exist==true) {
         alert("username already exict")
       } else {
      const json = await fetch("http://localhost:3000/users/register", {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ data })
      })
      if (json.status == 200) {
        console.log("yay");
      } else {
        console.log("yak");
      }
    }
  }else{
    alert("you have some empty fileds")
  }
}


  const submitRequest = async () => {
    // set state
    let data = await fetch("http://localhost:3000/users/login", {
      method: "POST",
      credentials: "include",
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password })
    })
    // try to login
    if (data.status == 200) {
      const json = await fetch(`http://localhost:3000/users/login/${username}`)
      const isAdmin = await json.json()
      console.log("loggedin");
      dispatch(allActions.user_actions.setUser([username, isAdmin]))

      if (isAdmin == 0) {

        props.history.push("/vacationsuser")
      } else {
        props.history.push("/vacationadmin")
      }
    } else {
      alert("username or password does not exist ! please try again or register :)")
    }
    // redirect to vacations
  }


  // registration

  return (
    <div className="loginDiv">
      <div className="loginTitle">
        <h1>Welcome to my flights.com !</h1>
      </div>
      <div className="styling">

        <div className="formDiv">

          <Form>
            <div className="insideForm">

              <Form.Group controlId="formBasic">
                <Form.Label>username</Form.Label>
                <Form.Control onChange={(e) => { setusername(e.target.value) }} className="input1" type="text" placeholder="Enter username" />
              </Form.Group>
              <Form.Group controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control onChange={(e) => { setpassword(e.target.value) }} className="input1" type="password" placeholder="Password" />
              </Form.Group>
              <Form.Text className="text-muted">
                don't have an account ? press "Register" and let's get started !
    </Form.Text>
              <Button onClick={submitRequest} className="btnSub" variant="outline-primary" type="button">
                login
  </Button>
              <Button onClick={handleShow} className="btnSub" variant="outline-secondary" type="button">
                Register
  </Button>
            </div>
          </Form>
        </div>

        <Modal className="modalForAll" show={show} onHide={handleClose}>
          <div className="modalInsideForAll">
            <Modal.Header closeButton>
              <Modal.Title>Registration</Modal.Title>
            </Modal.Header>
            <Modal.Body><Form>
              <Form.Group controlId="formBasic">
                <div>
                  <Form.Label className="inputPos1" >First name :</Form.Label>
                  <Form.Label className="inputPos2">Last name  :</Form.Label>
                </div>
                <Form.Control className="input2" type="input" placeholder="first name" name="f_name" ref={register} />
                <Form.Control className="input3" type="input" placeholder="last name" name="l_name" ref={register} />
              </Form.Group>
              <Form.Group controlId="formBasic">
                <Form.Label>Username</Form.Label>
                <Form.Control type="input" placeholder="Enter username" name="username" ref={register} />
              </Form.Group>
              <Form.Group controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" placeholder="Password" name="password" ref={register} />
              </Form.Group>

            </Form></Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleClose}>
                Close
          </Button>
              <Button type="submit" variant="primary" onClick={handleSubmit(onSubmit)}>
                Save Changes
          </Button>
            </Modal.Footer>

          </div>
        </Modal>

      </div>
    </div>

  )
}





export default Login;


