import axios from 'axios'

const instance = axios.create({
	timeout: 60 * 1000
})



export default instance
