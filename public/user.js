const baseUrl='http://localhost:3030';

//  sign up form request with alert of dup entry
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
    console.log("user Data from frontend",userData)
    axios.post(`${baseUrl}/newUser`,userData)
    .then(response=>{
        console.log(response)
        alert(response.data.message)
    })
    .catch(err=>{
        if(err.response.status==409){
            alert(err.response.data.message)
        }
        else{
        console.log(err)
        alert('Something went wrong')
        }
    })
    signUpForm.reset()
})