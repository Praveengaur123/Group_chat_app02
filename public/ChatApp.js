const baseUrl='http://localhost:3030'

// log out btn functionality
document.getElementById('logOutBtn').addEventListener('click',(event)=>{
    event.preventDefault()
    const token=localStorage.getItem('token')
    axios.get(`${baseUrl}/logout`,{headers:{'Authorization':token}})
    .then(response=>{
        localStorage.removeItem('token')
        localStorage.removeItem('userEmail')
        alert(response.data.message)
        window.location.href=response.data.redirectUrl
    })
    .catch(err=>{
        console.log(err.message)
    })
})

// page loaded when refreshed
document.addEventListener('DOMContentLoaded',(event)=>{
    event.preventDefault()
    const token=localStorage.getItem('token')
    if(token===null){
        window.location.href='/login'
    }
    // online user's
    axios.get(`${baseUrl}/showUser`,{headers:{'Authorization':token}})
    .then(response=>{
        const userArray=response.data.User
        userArray.forEach(u => {
            showUserChat(u)
        });
    })
    .catch(err=>{
        console.log(err)
    })
    chatHistory()
})
// function for online user and for their chat
function showUserChat(u){
        const userEmail=localStorage.getItem('userEmail')
        const table=document.getElementById('onlineSection')
        const user=document.createElement('tr')
            const name=document.createElement('td')
            if(userEmail===u.userEmail){
                name.innerText=`You Joined`
                // console.log(`hi ${u.userName}`)
            }
            else{
                 name.innerText=`${u.userName} Joined`
            }
            user.appendChild(name)
            table.appendChild(user)
}
// chat button functionality
const sendChatBtn=document.getElementById('sendChatBtn')

sendChatBtn.addEventListener('click',(event)=>{
    event.preventDefault()
    const message=document.getElementById('messageBox').value
    const token=localStorage.getItem('token')
    console.log(message,token)
    axios.post(`${baseUrl}/sendChat`,{message},{headers:{'Authorization':token}})
    .then(response=>{
        console.log("response from backend",response)
        showChat(response.data.chat)
    })
    .catch(err=>{
        console.log("error from backend",err)
    })
    document.getElementById('messageBox').value=''
    
})
function chatHistory(){
    const token=localStorage.getItem('token')
    axios.get(`${baseUrl}/chatHistory`,{headers:{'Authorization':token}})
    .then(response=>{
        const chat=response.data.chat
        console.log(chat)
        chat.forEach(ch=>{
           showChat(ch)
        })
    })
    .catch(err=>{
        console.log(err)
    })
}

function showChat(c){
    const table=document.getElementById('chatBody')
    const row=document.createElement('tr')
    row.innerHTML=`
    <td>${c.userName}:${c.chat}</td>`;
    table.appendChild(row)
}