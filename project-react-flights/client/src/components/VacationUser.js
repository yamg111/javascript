
import {useSelector } from 'react-redux'
import React, { useState,useEffect } from 'react';
import {Button,Card } from 'react-bootstrap'
import moment from 'moment';
import 'moment-timezone';
const VacationUser = (props) => {
  const username = useSelector(state=>state.username)
  const [follow,setFollow]=useState(false) 
  const[str,setStr]=useState("")
    const vacation_id=props.vacation.id
    
    useEffect(() => {
      getFollowers(props.vacation.id)
    }, []);
    
    const getFollowers=async()=>{
      //if currenct vacation is with follow by user
      
      const json= await fetch(`http://localhost:3000/followers/${username[0]}/${props.vacation.id}`)  
      const data= await json.json()
      console.log(data);
      if(data==0){
        setFollow(false)
        setStr("follow")
      }else{
        setFollow(true)
        setStr("unfollow")
      }
      
    }
    
    

    let checked=()=>{
      //  chacking if user is following
      if(follow){
        setStr("follow")
      }else{
        setStr("unfollow")
      }
      console.log(str)
    }
    
       
     let newFollow=async()=>{
       const json= await fetch(`http://localhost:3000/followers/${username[0]}/${props.vacation.id}`,{
         method:"POST",
         headers: {'Content-Type':'application/json'}
        })
        checked()
        props.getVacations()
      }

      let deleteFollow=async()=>{
        const json= await fetch(`http://localhost:3000/followers/${username[0]}/${props.vacation.id}`,{method:"DELETE"})
        if(json.status==200){
        }else{
          console.log("didnt work");
        }
        checked()
        props.getVacations()
      } 
      
    return (
        <div >
           
            <Card className="userCard" id ={props.vacation.id}>
                    
                    <Card.Img className="imgCard" variant="top" src={props.vacation.picture}/>
                    <Card.Title className="cardTitle">{props.vacation.desteny}</Card.Title>
                    <Card.Body>
                    <Card.Text>
                   <span className="cardText"> description: </span><span className="informationCard"> {props.vacation.description}</span>
                    </Card.Text>
                    <Card.Text>
                    <span className="cardText">flight date and time: </span><span className="informationCard"> {moment(props.vacation.start).format("DD/MM/YYYY").toString()}</span>
                    </Card.Text>
                    <Card.Text>
                      <span className="cardText">flight returns: </span><span className="informationCard"> {moment(props.vacation.ends).format("DD/MM/YYYY").toString()}</span>
                    </Card.Text>                   
                    <Button className="buttonFollow" variant="primary" onClick={(e)=>{
                      if(e.target.innerHTML=="follow"){
                        newFollow()
                      }else{
                        deleteFollow()
                      }
                      setFollow(!follow)}
                    }>{str}</Button>
  </Card.Body>
</Card>
                    
        </div>
    );
}

export default VacationUser;
