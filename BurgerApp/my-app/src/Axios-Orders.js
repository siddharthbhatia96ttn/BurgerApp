import axios from 'axios';

const instance=axios.create({
  baseURL:'https://react-my-burger-91338.firebaseio.com/'
});

export default instance;
