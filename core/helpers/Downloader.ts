import axios from "axios";
import _ from "lodash";


const ENDPOINT = process.env.REACT_APP_BASE_URL;
const token = localStorage.get('token')

const Download = (name:string, address:string) => {
    axios({
        method: 'POST',
        url: ENDPOINT + 'document/downloadFile',
        withCredentials: true,
        headers: {authorization: 'Bearer ' + token},
        data: {
            address: address
        },
        responseType: 'blob'
    }).then(response => {
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement('a');
        link.href = url;
        link.download = name + '.' + _.last(address.split('.'))
        link.click();
    });

};

export default Download