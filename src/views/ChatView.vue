<script setup>
import { onMounted, ref } from 'vue'
import ChatMessage from '@/components/ChatMessage.vue'
import AppNavbar from '@/components/AppNavbar.vue'
import { useUserStore } from '@/stores/user'
import { storeToRefs } from 'pinia'
import { messageList,insertMessage, fetchMessages, subscribeToMessages, deleteMessage } from '@/api/messages'

const { user } = storeToRefs(useUserStore())
const messageTexte = ref('')

subscribeToMessages()

onMounted(async () => {
  await fetchMessages()
  scrollToBottom()
})
const textarea = ref(null)

const addMessage = async () => {
  await insertMessage(messageTexte.value, user.value.id)

  messageTexte.value = ''
  textarea.value.focus()
}

const messageContainer = ref(null)

const scrollToBottom = () => {
  messageContainer.value.scrollTop = messageContainer.value.scrollHeight
}

</script>

<template>
  <div class="flex flex-col h-full overflow-hidden">
    <AppNavbar />
    <div class="overflow-auto grow" ref="messageContainer">
      <div v-for="(message, index) in messageList" class="p-4" :key="index">
        <chat-message @delete="deleteMessage" :message="message"></chat-message>
      </div>
    </div>
    <div class="flex align-center p-4">
      <textarea
        ref="textarea"
        @keyup.enter.exact="addMessage"
        v-model="messageTexte"
        name="message"
        id="message"
        rows="1"
        class="text-black rounded-md"
      >
      </textarea>

      <button @click="addMessage" class="p-2 bg-blue-600 rounded-md ml-3">Envoyer</button>
    </div>
  </div>
</template>
