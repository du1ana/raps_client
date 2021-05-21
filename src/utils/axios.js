import axios from 'axios'

const instance = axios.create({
  baseURL: 'https://us-central1-test-l2sw.cloudfunctions.net/backend/'
})

export default instance
