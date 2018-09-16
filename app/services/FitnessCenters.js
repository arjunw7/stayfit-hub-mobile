import axios from 'axios';
export default class FitnessCentersService{
    url = "http://sf-servicesapp.screqvrs8e.us-east-2.elasticbeanstalk.com"

    getFitnessCenters(){
        axios.get(this.url+'/fitnessCenters')
        .then((response) => {
            alert(response)
            return response.data._embedded.trainers
        })
        .catch((error) => {
            console.log(error)
        })
    }
}
