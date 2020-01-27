const setVacations=(user)=>{
    return{
        type:"SET_VACATIONS",
        payload:user
    }
}

const getVactations=()=>{
    return{
        type:"GET_VACATIONS"
    }
}

export default{
    setVacations,
    getVactations
}