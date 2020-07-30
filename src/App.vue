<template>
  <div id="app">
    <div class="center"><h1>ChatRoom</h1></div>
    <chatRoom messages=""/>
    <br/>
    <div>
    </div>
  </div>
</template>

<script>
import chatRoom from './components/chatRoom'
import {provideDatabase} from '@/hooks/database' 

export default {
  name: 'App',
  setup(){
    provideDatabase();
  },
  components: {
    chatRoom,

  }
}
</script>

<style>
#app {
  font-family: 'fira code'; 
  background: rgb(134, 134, 134);
}

h1 {
  color: #dddddd;
}
</style>
