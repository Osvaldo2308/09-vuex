
import axios from "axios";


const authApi = axios.create({
      baseURL: 'https://identitytoolkit.googleapis.com/v1/accounts',
      params:{
            key: 'AIzaSyDhtzkyjapLvXvbFm4zDL3Gjum7TkOuhBk'
      }
})

//console.log(process.env.NODE_ENV) //TEST durante testing

export default authApi