<template>
  <div class="container">
   
    <div class="center">
      <input type="text" class="input username" placeholder="Username" v-model="userName" @keyup.enter="handleSetName">
    </div>

   <div class="chatWindow overflow-y-auto">
     <ul >
       <li :class="userName === message.username ? 'me' : 'them'" v-for="message in messages" :key="message.id">
         <span class="user">{{message.username}}</span> 
         <br>
         {{message.text}}
         <br><span class="dateTime user">{{formatDistance(message.created_at, Date.now(), {addSuffix: true} )}}</span>
         </li>
       <!-- <li class="me"><span class="user">User2: </span> Message2</li> -->
       <!-- <li class="them"><span class="user">User1: </span> Message3</li> -->
     </ul>
    </div> 
      
  
    <!-- <div :key="chat.id" v-for="chat in chats">
     <chatItem/>
    </div> -->
    
    <chatItem/>
    <div class="center">
      <input type="text" class="input" placeholder="Enter message" v-model="userMessage" @keyup.enter="handleMessageSend">
      <span class="sendButton">-></span>
    </div>

    


  </div>
</template>

<script>
import {onMounted, ref} from 'vue'
import chatItem from './chatItem'
import {formatDistance} from 'date-fns'

import {useDatabase} from '@/hooks/database'

export default {
  setup(){
    const db = useDatabase();
    
    const messages = ref({})
    const userMessage = ref('')

    const userName = ref( localStorage.getItem('username') || 'Anon')

    const handleMessageSend = () => {
        const now =  Date.now();
        
        const newDocumentForDb = {text: userMessage.value.trim(), created_at: now, username: userName}

        db.insert(newDocumentForDb)

        db.find({}).sort({created_at: 1}).exec((err, res) =>{
          messages.value = res
        })
        userMessage.value = ''
      }

    const handleSetName = () => {
      localStorage.setItem('username', userName.value)
    }


     onMounted( ()=>{
       db.find({}).sort({created_at: 1}).exec((err, res) =>{
        messages.value = res
      })
    })
    
    return {messages, userMessage, handleMessageSend, formatDistance, userName, handleSetName}
  },
  components:{
      chatItem,
  }
}
</script>

<style lang="scss">
.chatWindow {
  list-style-type: none;
  border: #ccc solid 2px;
  padding: 5px;
  margin: 1.4rem;
  background: darkgray;
  border-radius: 5px;
  max-height: 80vh;
  

  li{
    border: #ccc solid 2px;
    margin: 5px 5px 20px 5px;
    padding-left:1.1rem;
    padding-top: 5px;
    background: #ebeaea;
    border-radius: 5px;
    width: 300px;
    display: block;
    clear: both; 
  }
}
.center {
  display: flex;
  justify-content: center;
}

.input {
  width: 300px;
  border: none;
  border: #ccc solid 2px;
  border-radius: 10px;
  background: none;
  color: white;
  font-size: 16px;
  padding-left: 3px;

}
.input:focus {
  outline: 0;
    border-bottom: rgb(219, 219, 219) solid 2px;

}

.user{
  font-weight: bold;
}
.sendButton {
  margin: 5px;
  padding: 2px 5px;
  cursor: pointer;
  background: #f4f4f4;
  border-radius: 50%;
}
.them{
  // display: flex;
  // justify-content: initial; 
  
}
.me{
  // display: flex;
  // align-content: flex-end;
  float:right;
}

.dateTime {
  padding-bottom: 1px;
  padding-right: 1px;
  margin-right: 10px;
  margin-bottom: 3px;
  font-size: 10px;
  display: flex;
  justify-content:flex-end;
  color: rgb(170, 170, 170);
}

.username {
  margin-top: 5px;
  color: #f4f4f4;
  width: 100px;
  float: left;
  text-align: center;
  
}

// .border {
//   border: #ccc solid 2px;
//   border-radius: 10px;
// }


</style>