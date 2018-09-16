import axios from 'axios';
export default class TrainerService {
    url = "http://sf-servicesapp.screqvrs8e.us-east-2.elasticbeanstalk.com"

    getTrainers() {
        axios.get(this.url + '/trainers')
            .then((response) => {
                return response.data._embedded.trainers
            })
            .catch((error) => {
                console.log(error)
            })
    }
}