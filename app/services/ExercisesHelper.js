import axios from 'axios';
import CONFIG from '../config/config';
export default class ExercisesHelper{
    

    getFitnessCenters(){
        axios.get(CONFIG.base_url+'/fitnessCenters')
        .then((response) => {
            alert(response)
            return response.data._embedded.trainers
        })
        .catch((error) => {
            console.log(error)
        })
    }
}
