
// let currentGroupId=null
// load groups on page load
document.addEventListener('DOMContentLoaded',(event)=>{
    event.preventDefault()
    
    const token=localStorage.getItem('token')
    // getting the group name user is part of it
    axios.get('http://localhost:3030/getMyGroup',{headers:{'authorization':token}})
    .then(response=>{
        // console.log("getting groups names",response)
        const groupNames=response.data.groups
        // console.log(groupNames)
        const groupDiv=document.getElementById('groupContainer')
        const groupList=document.createElement('ol') // creating list for the group
        groupNames.forEach(groupData => {
            const list=document.createElement('li')
            list.textContent=groupData.groupName
            // console.log('list',list.textContent)
            
            // start chat button
            const groupChatBtn=document.createElement('button')
            groupChatBtn.innerText='Start Chat'
            
            list.appendChild(groupChatBtn)
            groupList.appendChild(list)
            groupDiv.appendChild(groupList);
            
            // group chat page with name
            groupChatBtn.addEventListener('click',()=>{
                const cGroupName=groupData.groupName
                const groupId=groupData.id
                
                window.location.href= `groupChat?groupId=${groupId}`; // moving to the group chat page
                                        
            })
        });
        
       
    })
    .catch(err=>{
        console.log("error while fetching group name",err)
    })
})


