import axios from 'axios';


export default axios.create({
    baseURL: 'https://carigarabay-wqdv.online/api/',
    headers: {
        'Content-Type': 'application/json',
    },
});