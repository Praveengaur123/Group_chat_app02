const baseUrl='http://localhost:3030';

const logInCred=document.getElementById('login')
logInCred.addEventListener('submit',(event)=>{
    event.preventDefault()
    const userEmail=document.getElementById('userEmail').value
    const userPassword=document.getElementById('userPassword').value
    const userCred={ userEmail, userPassword }
    console.log('userCred',userCred)
    axios.post(`${baseUrl}/userlogin`,userCred)
    .then(response=>{
        console.log(response)
        localStorage.setItem('token',response.data.token)
        localStorage.setItem('userEmail',userEmail)
        if(response.data.token==null) alert('error:jwt is null');
        else {
            alert(response.data.message)
            window.location.href=response.data.redirectUrl;
        }
    })
    .catch(err=>{
        console.log(err)
        alert(err.response.data.message)
    })
    logInCred.reset()
})