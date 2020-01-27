import {useSelector} from 'react-redux'
import React, { useState,useEffect } from 'react';
import {Form,Modal,Button,Card } from 'react-bootstrap'
import moment from 'moment';
import 'moment-timezone';
import { useForm } from 'react-hook-form'

const VacationAdmin = (props) => {
    const username = useSelector(state=>state.username) 
      const vacation_id=props.vacation.id
       const vacation =props.vacation
      const [show, setShow] = useState(false);
const handleClose = () => setShow(false);
      const handleShow = () => setShow(true);
      const { register, handleSubmit} = useForm()

      let onSubmit =async data => {
        if(data){
            console.log(data);
            const json= await fetch(`http://localhost:3000/vacations/${vacation_id}`,{
              method:'PUT',  
              headers: { 'Content-Type': 'application/json' },
              body:JSON.stringify(data)
            })
            if(json.status==200){
              console.log("yay");
            }else{
              console.log("yak");
            } 
          }
        }
    
    // const [chacked,setChacked]=useState(("follow"):("unfollow"))
      
      useEffect(() => {
       
      }, []);
    

      const deleteVC=async()=>{
          const js= await fetch(`http://localhost:3000/followers/${vacation_id}`,{method:"DELETE"})
          if(js.status==200){

              const json= await fetch(`http://localhost:3000/vacations/${vacation_id}`,{method:"DELETE"})
              if(json.status==200){
                  console.log("deleted !");
                }
        }
      }
      const updateVC=async()=>{
          const json=await fetch(`http://localhost:3000/vacations/${vacation_id}`,{method:"put", headers: { 'Content-Type': 'application/json' },
        body:""
        })
        if(json.status==200){
            console.log("updated");
        }    
      }
      
  
      return (
          <div >
          
              <Card className="userCard" id ={props.vacation.id}>
                      
                      <Card.Img className="imgCard" variant="top" src={props.vacation.picture}/>
                      <Card.Title className="cardTitle">{props.vacation.desteny}</Card.Title>
                     <span>
                     <img onClick={handleShow} className="btnEddit" src="https://image.flaticon.com/icons/png/512/1160/1160758.png"/>
              {/* modal eddit starts------------------------------------------------------ */}
                     
                     <Modal className="modalForAll"  show={show} onHide={handleClose} animation={false}>
                     <div className="modalInsideForAll">

                     <Modal.Header closeButton>
                       <Modal.Title>Updating Modal </Modal.Title>
                   </Modal.Header>
                   <Modal.Body>
                   <Form>
              <Form.Group controlId="formBasic">
                <div>
                  <Form.Label className="inputPos1">desteny :</Form.Label>
                  <Form.Label className="inputPos2">description  :</Form.Label>
                </div>
                <Form.Control name="desteny" ref={register} className="input2" type="input" defaultValue={vacation.desteny}/>
                <Form.Control name="description" ref={register} className="input3" type="input" defaultValue={vacation.description} />
              </Form.Group>
              <Form.Group controlId="formBasic">
                <Form.Label>picture:</Form.Label>
                <Form.Control name="picture" ref={register} type="input"defaultValue={vacation.picture} />
              </Form.Group>
              <Form.Group controlId="formBasicPassword">
                <Form.Label>flight date</Form.Label>
                
               <input name="start" ref={register} type="date"  value={moment(props.vacation.ends).format("YYYY-MM-DD").toString()}/>
               
              </Form.Group>
              <Form.Group controlId="formBasicPassword">
                <Form.Label>flight date returns</Form.Label>
                
             <input name="ends" ref={register}  type="date" value={moment(props.vacation.ends).format("YYYY-MM-DD")} /> 
              </Form.Group>
              <Form.Group controlId="formBasic">
                <div>
                  <Form.Label>price :</Form.Label>
                  <Form.Control className="input2" type="input"  name="price" ref={register}  defaultValue={vacation.price}/>

                </div>
              </Form.Group>
            </Form>
                   </Modal.Body>
        <Modal.Footer>
          <Button  variant="primary" onClick={handleSubmit(onSubmit)}>
            Save Changes
          </Button>
          <Button  variant="primary" onClick={props.handleClose}>
            Close
          </Button>
        </Modal.Footer>
                     </div>
      </Modal>
                      <img className="btnEddit" src="https://image.flaticon.com/icons/png/512/1621/premium/1621152.png" onClick={deleteVC}/>
                      </span>
                      <Card.Body>
                      <Card.Text>
                     <span className="cardText"> description: </span><span className="informationCard"> {props.vacation.description}</span>
                      </Card.Text>
                      <Card.Text>
                      <span className="cardText">flight date: </span><span className="informationCard"> {moment(props.vacation.start).format("DD/MM/YYYY").toString()}</span>
                      </Card.Text>
                      <Card.Text>
                        <span className="cardText">flight returns: </span><span className="informationCard"> {moment(props.vacation.ends).format("DD/MM/YYYY").toString()}</span>
                      </Card.Text>                   
            
    </Card.Body>
  </Card>
                      
          </div>
      );
}

export default VacationAdmin;
