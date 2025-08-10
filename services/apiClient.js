const  axios =require('axios');

const apiClient=axios.create({
    baseUrl:'http://localhost:3030',
});

module.exports=apiClient;