import React, { useState, useEffect } from 'react';
import VacationAdmin from './VacationAdmin';
import { useSelector, useDispatch } from 'react-redux'
import {Form,Modal,Button,Nav } from 'react-bootstrap'
import { useForm } from 'react-hook-form'
import { LabelList,BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, Legend,Line } from 'recharts';
import allActions from "../allActions"
const VacationsAdmin = (props) => {
  const username = useSelector(state => state.username)
  const [vacations, setVacations] = useState([])
  const { register, handleSubmit} = useForm()
  const [show, setShow] = useState(false);
  const [showR, setShowR] = useState(false);
  const [reports,setReports]=useState([])
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const handleCloseR = () => setShowR(false);
  const handleShowR = () => setShowR(true);
  const dispatch = useDispatch()

     useEffect(() => {
       const checkUser = async()=>{    
         let data= await fetch("http://localhost:3000/users/login",{method:'GET',credentials:'include'}) 
         console.log(data);
         let userr= await data.json()
         if(data.status==200){
            const json= await fetch(`http://localhost:3000/users/login/${userr}`)
            const isAdmin= await json.json()
            console.log("loggedin");
            dispatch(allActions.user_actions.setUser([userr,isAdmin]))    
           if(isAdmin==0){
             props.history.push("/vacationsuser")
            } else{
              props.history.push("/vacationadmin")
           }
          }
        }
        checkUser();
        getVacations()
        getReports()   
    }, []);


    // Modal info for adding new vacation
    let onSubmit =async (data) => {
      console.log(data);
        if(data.desteny&&data.description&&data.picture&& data.start && data.ends && data.price){
            console.log(data);
            const json= await fetch("http://localhost:3000/vacations",{
              method:'POST',  
              headers: { 'Content-Type': 'application/json' },
              body:JSON.stringify(data)
            })
            if(json.status==200){
              console.log("yay");
            }else{
              console.log("yak");
            } 
          }else{
            alert("one of your fileds are empty" )
          }
        }
        // data for carchar
      
    const getVacations = async (userr) => {
        try {
          console.log(username);
            const json = await fetch(`http://localhost:3000/vacations/username/${userr}`, { method: 'GET', headers: { 'Content-Type': 'application/json' } })
            const data = await json.json()
            if (json.status == 200) {
                console.log("userpage connected");
                setVacations(data)
            } else {
                console.log("userpage is not connected");
            }
        } catch (err) {
            console.log(err);
        }
    }
    
    const getReports=async()=>{
      try{
        const json= await fetch("http://localhost:3000/followers",{method:'GET'})
        const res=await json.json()
        console.log(res[0].followers);
        if(res){
          setReports(res)
        
      }else{
        console.log("reports faild");
      }
    }catch (err){
      console.log(err);

    }
}

    // function for counting followers
       
    return (
        <div className="adminList" >
            <div className="titleUser">
                <span className="title1">V</span><span className="title2">A</span> <span className="title3">C</span> <span className="title4">A</span> <span className="title5">T</span> <span className="title6">I</span> <span className="title7">O</span> <span className="title8">N</span> <span className="title9">S</span>
            </div>
            <div className="addBtnRepBtn">
            <Button onClick={handleShow} className="buttonAdmin">add</Button>
            <div className="modalDiv">
          <Modal className="modalForAll" show={show} onHide={handleClose}>
            <div className="modalInsideForAll">

            <Modal.Header closeButton>
              <Modal.Title>new flight</Modal.Title>
            </Modal.Header>
            <Modal.Body><Form>
              <Form.Group controlId="formBasic">
                <div>
                  <Form.Label className="inputPos1" >desteny :</Form.Label>
                  <Form.Label className="inputPos2">description  :</Form.Label>
                </div>
                <Form.Control className="input2" type="input" placeholder="desteny" name="desteny" ref={register}/>
                <Form.Control className="input3" type="input" placeholder="description" name="description" ref={register}/>
              </Form.Group>
              <Form.Group controlId="formBasic">
                <Form.Label>picture</Form.Label>
                <Form.Control type="input" placeholder="Enter picture url"  name="picture" ref={register}/>
              </Form.Group>
              <Form.Group controlId="formBasicPassword">
                <Form.Label>flight start</Form.Label>
                <Form.Control type="date"  name="start" ref={register}/>
                <Form.Label>flight returns</Form.Label>
                <Form.Control type="date"  name="ends" ref={register}/>
              </Form.Group>
              <Form.Group controlId="formBasicEmail">
                <div>
                  <Form.Label>price :</Form.Label>
                  <Form.Control className="input2" type="input"  name="price" ref={register}/>

                </div>
              
              </Form.Group>
             
            </Form></Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleClose}>
                Close
          </Button>
              <Button type="submit" variant="primary" onClick={ handleSubmit(onSubmit)}>
              Save Changes
          </Button>
        </Modal.Footer>
            </div>
      </Modal>
      
     </div>   
            <Button onClick={handleShowR} className="buttonAdmin">reports</Button>
            <Modal className="modalForAll" size="lg" show={showR} onHide={handleCloseR}>
       <div className="modalInsideForAll">

        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body> 
           <BarChart width={600} height={250} data={reports}>
  <CartesianGrid strokeDasharray="4 4" />
  <XAxis dataKey="desteny" />
  <YAxis  />
  <Tooltip /> 
  <Legend />
  <Bar dataKey="followers" fill="#8884d8" />
</BarChart></Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseR}>
            Close
          </Button>
          <Button variant="primary" >
            Save Changes
          </Button>
        </Modal.Footer>
       </div>
      </Modal>
      </div>
            <div className="divSide">
                <span className="heyName">

                    hey {username[0]}
                </span>
                we hope you enjoy our site !
              <div>
                    <img src="https://cdn.pixabay.com/photo/2016/04/01/22/55/countries-1301799_960_720.png" className="imgDivSide" alt="jckf" />
                </div>
                
            </div>
            <div className="divSide2">
                <span className="heyName">
                    Liked the site ?
                </span>
                tell your friends about us !
                  <div>
                    <img src="https://cdn.pixabay.com/photo/2016/04/01/23/21/cooperation-1301850_960_720.png" className="imgDivSide" alt="jckf" />
                </div>
            </div>
        
                <div className="divSide3">
              <div>
                    <img src="https://cdn2.iconfinder.com/data/icons/geest-travel-kit/128/travel_journey-12-512.png" className="imgDivSide" alt="jckf" />
                </div>
                </div>
                <div className="divSide4">
              <div>
                    <img src="https://cdn2.iconfinder.com/data/icons/geest-travel-kit/128/travel_journey-16-512.png" className="imgDivSide" alt="jckf" />
                </div>
                </div>
            
            <div>
               
                {vacations.map(
                    (vacation =>

                        <VacationAdmin getVacations={getVacations} key={Math.random() * 100} vacation={vacation} />)


                )}

            </div>
        </div>
    );
}




export default VacationsAdmin;
