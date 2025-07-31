// log out btn functionality
document.getElementById('logOutBtn').addEventListener('submit',(event)=>{
    event.preventDefault()
    axios.post('http://localhost:3030/logout')
    .then(response={
        
    })
})