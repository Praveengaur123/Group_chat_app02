//const baseUrl='http://localhost:3030'


document.addEventListener('DOMContentLoaded',()=>{
    axios.get('http://localhost:3030/userName')
    .then(response=>{
        console.log('user Name',response.data)
        const members=response.data.user
        const dropdown=document.getElementById('membersName')
        
        members.forEach(member => {
            const Option=document.createElement('option')
            console.log(member.id)
            Option.value=member.id;
            Option.textContent=member.userName;
            dropdown.appendChild(Option)
        });
    })
    .catch(err=>{
        console.log("error from group backend",err)
    })
})
 
// handler of group form submit
document.getElementById('groupForm').addEventListener('submit',(event)=>{
    event.preventDefault()
    const groupName=document.getElementById('groupName').value.trim();
    const members=document.getElementById('membersName').selectedOptions;

    const memberIds=Array.from(members).map(opt=>opt.value)

    if (!groupName || memberIds.length === 0) {
        alert("Please enter group name and select members!");
        return;
      }
      const data={groupName,memberIds}
      const token=localStorage.getItem('token')
      axios.post('http://localhost:3030/createGroup',data,{headers:{'Authorization':token}})
      .then(response=>{
        alert("Group Created Successfully")
        document.getElementById('groupForm').reset();
      })
      .catch(err=>{
        console.log("Error while creating group",err)
      })
})