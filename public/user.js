const baseUrl='http://localhost:3030'


const signUpForm=document.getElementById('signUpForm')
signUpForm.addEventListener('submit',(event)=>{
    event.preventDefault()
    const userName=document.getElementById('userName').value
    const userEmail=document.getElementById('userEmail').value
    const userPhone=document.getElementById('userPhone').value
    const userPassword=document.getElementById('userPassword').value
    const userData={
        userName,userEmail,userPhone,userPassword
    }
    console.log("user Data from frontend")
    axios.post(`${baseUrl}/signup`,userData)
    .then(response=>{
        console.log(response)
    })
    .catch(err=>{
        console.log(err)
    })
})