<script setup>
import {ref} from 'vue'
import ChatMessage from '@/components/ChatMessage.vue'
const messageTexte = ref('')
const messageList = ref([])

const textarea = ref(null)
const addMessage = ()=>{
    messageList.value.push({
        id: Math.random().toString(32).slice(2),
        text:messageTexte.value,
        date: new Date(),
        user: {
            username:"Orianne",
            avatarUrl: "https://media.licdn.com/dms/image/D4E03AQFNQ8uGxF0TiQ/profile-displayphoto-shrink_800_800/0/1698869752227?e=2147483647&v=beta&t=kEyjn5VTsJyz56_7y4RAJWC-PkdLYTqFU91oaZVNsiI",
        }
    })
    messageTexte.value = ''
    textarea.value.focus()

}

const deleteMessage = (id) =>{
    messageList.value = messageList.value.filter((message) => message.id !== id)  
}
</script>

<template>
   <div v-for="(message, index) in messageList" class = "p-4" :key="index">
        <chat-message @delete="deleteMessage" :message="message"></chat-message>
    </div>
    <div class="flex align-center p-4"> 

        <textarea 
        ref="textarea"
        @keyup.enter.exact="addMessage"
        v-model="messageTexte" 
        name="message" 
        id="message"
        rows="1" class="text-black rounded-md">
        </textarea>

        <button @click="addMessage" class="p-2 bg-blue-600 rounded-md ml-3" >Envoyer

        </button>
     </div> 

</template>