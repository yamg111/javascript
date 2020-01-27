import React, { useState, useEffect } from 'react';
import VacationUser from './VacationUser';
import { useSelector,useDispatch } from 'react-redux'
import allActions from "../allActions"
const VacationsUser = (props) => {
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
    }, []);
    const username = useSelector(state => state.username)
    const [vacations, setVacations] = useState([])



    const getVacations = async () => {
        try {
            const json = await fetch(`http://localhost:3000/vacations/username/${username[0]}`, { method: 'GET', headers: { 'Content-Type': 'application/json' } })
            const data = await json.json()
            console.log(data);
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

    // function for counting followers



    return (
        <div className="userList" >
            <div className="titleUser">
                <span className="title1">V</span><span className="title2">A</span> <span className="title3">C</span> <span className="title4">A</span> <span className="title5">T</span> <span className="title6">I</span> <span className="title7">O</span> <span className="title8">N</span> <span className="title9">S</span>
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

                        <VacationUser getVacations={getVacations} key={Math.random() * 100} vacation={vacation} />)


                )}

            </div>
        </div>
    );
}

export default VacationsUser;
