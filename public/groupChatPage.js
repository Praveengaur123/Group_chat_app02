// function for group chat page
let currentGroupId=null

document.addEventListener('DOMContentLoaded',(event)=>{
    event.preventDefault()
    const params= new URLSearchParams(window.location.search)
    const groupId=params.get('groupId')
    if(!groupId){
        console.log("No group Selected");
        return;
    }
    groupChat(groupId)

    // click on send button and call the sendMessage function
    document.getElementById('sendBtn').addEventListener('click',sendMessage)

})

// getting the group id after opening the group
function groupChat(Id){
    console.log("group chat page loaded")
    const token=localStorage.getItem('token')
    if(!token) window.location.href='/login';
    axios.get(`http://localhost:3030/getMyGroup/${Id}`,{headers:{'Authorization':token}})
                .then(response=>{
                    const groupData=response.data.groupData
                    
                    // console.log("group data",groupData)
                    
                    currentGroupId=groupData.id

                    const div=document.getElementById('memberContainer')
                    const heading=document.getElementById('groupName')
                    heading.textContent=`${groupData.groupName}`
                                      
                    
                                    
                // document.getElementById('chatTitle').textContent=`Chat-${groupData.groupName}`;
                getMembers(currentGroupId) // getting members
                // console.log('Group Id',currentGroupId)
                loadMessage(currentGroupId) // calling function for loading group message
                })
                .catch(err=>console.log(err))
                
}

// fetch member for a selected group
function getMembers(groupId){
    const token=localStorage.getItem('token')
    axios.get(`http://localhost:3030/groups/${groupId}/members`,{
        headers:{'Authorization':token}
    })
    .then(response=>{ // response for the members
        const members=response.data.members
        // console.log('members of the group',groupId,members)
        renderMembers(members) // calling rendring function 
    })
    .catch(err=>{
        console.log('error fetching members',err)

    })
}
// render member in ul
function renderMembers(members){
    const memberList=document.getElementById('memberList')
    memberList.innerHTML='' //clear previous list
    members.forEach(member=>{
        const li=document.createElement('li')
        li.textContent=member.userName
        memberList.appendChild(li)
    })

}
// load group chat message
function loadMessage(groupId){
    const token=localStorage.getItem('token')
    console.log("Loading group message")
    axios.get(`http://localhost:3030/groups/${groupId}/message`,{headers:{'Authorization':token}})
    .then(response=>{
        const message=response.data.message
        // console.log("message",message)
        const chatBox=document.getElementById('chatBox')
        chatBox.innerText='' //clear previous 
        message.forEach(msg => {
            const p=document.createElement('div')
            p.innerHTML=`<b>${msg.userName}</b>:${msg.chat}`;
            
            // show images
            if(msg.fileUrl){
                const fileName=msg.fileUrl.split('/').pop().split('.')
                if(msg.fileUrl.match(/\.(jpg|png|jpeg|gif)$/)) 
                    {
                    p.innerHTML+=`<br>
                    <img src="http://localhost:3030${msg.fileUrl}" width="150"><br>
                    <b>${fileName}</b>`
                    }
                    // show video
                if(msg.fileUrl.match(/\.(mp4|webm)$/))  {
                    div.innerHTML += `<br>
                    <video width="200" controls>
                    <source src="http://localhost:3030${msg.fileUrl}">
                    </video><br>
                    <b>${fileName}</b>`
                }
                // show file
                if(msg.fileUrl.match(/\.(pdf)$/)){
                    p.innerHTML+=`<br>
                    <b>${fileName}</b>
                    <a href="http://localhost:3030${msg.fileUrl}" target="_blank">
                    Download File
                    </a>
                    `
                }
                 else{
                    p.innerHTML+=`<br>
                    <a href="http://localhost:3030${msg.fileUrl}" target="_blank">
                    Download File
                    </a>
                    `
                }
            }
            chatBox.appendChild(p)
        });
    })
    .catch(err=>{
        console.log('error loading message',err)
        
    })
}
// send a new message
function sendMessage(){
    const token = localStorage.getItem('token')
    // console.log(token)
    const input = document.getElementById('chatInput');
    const message=input.value.trim()
    const file=document.getElementById('fileInput').files[0] // sending file pdf, image, video
    const formData= new FormData()
    formData.append('chat',message)
    if(file){
        formData.append('file',file)
    }

    if(!currentGroupId||!message) return;
    
    axios.post(`http://localhost:3030/groups/${currentGroupId}/message`,formData,
        {headers:{
            'Authorization':token,
            "Content-type":"multipart/form-data"
        
        }})
        .then(response=>{
            // console.log("kite")
            if(input)input.value='';
            if(file)file.value='';
            loadMessage(currentGroupId) // reload message
        })
        .catch(err=>{
            console.log('error sending message in group',err)

        })
}

