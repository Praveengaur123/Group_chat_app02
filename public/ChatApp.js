const baseUrl='http://localhost:3030';

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

// chat button functionality and posting the chat
document.getElementById('sendChatBtn').addEventListener('click',(event)=>{
    event.preventDefault()
    const message=document.getElementById('messageBox').value
    const token=localStorage.getItem('token')
    console.log(message,token)
    axios.post(`${baseUrl}/sendChat`,{message},{headers:{'Authorization':token}})
    .then(response=>{
        // console.log("response from backend",response)
        showChat(response.data.chat)
    })
    .catch(err=>{
        console.log("error from backend",err)
    })
    document.getElementById('messageBox').value=''
    
})
// function to get chat from the database
function chatHistory(){
    const token=localStorage.getItem('token')
    // settin time interval to get new messages 
    setInterval(()=>{
    axios.get(`${baseUrl}/chatHistory`,{headers:{'Authorization':token}})
    .then(response=>{
        const chat=response.data.chat
        console.log(chat)
        const table=document.getElementById('chatBody')
        table.innerHTML='' //clear previous chat
        chat.forEach(ch=>{
           showChat(ch)
        })
    })
    .catch(err=>{
        console.log(err)
    })
    },1000)
     
}
// function for displaying chat
function showChat(c){
    const userName=localStorage.getItem('userEmail').split('@')[0]
    const displayName=c.userName===userName?'You' :c.userName;
    const table=document.getElementById('chatBody')
    // table.innerHTML='' //clear previous chat
    const row=document.createElement('tr')
    row.innerHTML=`
    <td>${displayName}:${c.chat}</td>`;
    table.appendChild(row)
}
// function for online user and for their chat
function showUserChat(u){
        const userEmail=localStorage.getItem('userEmail')
        const table=document.getElementById('userBody')
        const user=document.createElement('tr')
            const name=document.createElement('td')
            name.innerText=userEmail===u.userEmail?`You Joined`:`${u.userName} Joined`;
            user.appendChild(name)
            table.appendChild(user)
}