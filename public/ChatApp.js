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
    // stored chats in local storage
    const storedChats=JSON.parse(localStorage.getItem('chats'))||[]
    storedChats.forEach(ch=>showChat(ch))
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
    // fetch only new chats
    chatHistory()
})

// chat button functionality and posting the chat
document.getElementById('sendChatBtn').addEventListener('click',(event)=>{
    event.preventDefault()
    const message=document.getElementById('messageBox').value
    const token=localStorage.getItem('token')
    axios.post(`${baseUrl}/sendChat`,{message},{headers:{'Authorization':token}})
    .then(response=>{
        console.log("response from backend",response)

        // fetching user name and chat from response
        const userName=response.data.chat.userName 
        const chat=response.data.chat.chat

        // save chat to local storage only 10
        saveChatToLocal(chat);

        // storing in local storage
        localStorage.setItem('userName',userName)
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

    const storedChats=JSON.parse(localStorage.getItem('chats'))||[];
    const lastId=storedChats.lenght>0?storedChats[storedChats.lenght-1].id:0;

    // setting time interval to get new messages on real time
    //  setInterval(()=>{
    axios.get(`${baseUrl}/chatHistory?lastId=${lastId}`,{headers:{'Authorization':token}})
    .then(response=>{
        const chat=response.data.chat
        console.log(chat)
        const table=document.getElementById('chatBody')
        table.innerHTML='' //clear previous chat
        chat.forEach(ch=>{
            saveChatToLocal(ch);
           showChat(ch);
        })
    })
    .catch(err=>{
        console.log(err)
    })
    //  },1000)
     
}

// save chat to local storage (only last 10)
function saveChatToLocal(chat){
    let chats =JSON.parse(localStorage.getItem('chats'))||[]
    chats.push(chat)
    if(chat.length>10){
        chats=chats.slice(-10)
    }
    localStorage.setItem('chats', JSON.stringify(chats));
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
