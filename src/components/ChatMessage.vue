<script setup>
import {computed} from 'vue'
import { TrashIcon} from '@heroicons/vue/24/solid'
const props  = defineProps({
    message: {
        type: Object,
        required: true
    }
})

const emit = defineEmits(['delete'])
const formatDate = (date) => {
    let formattedDay = date.toLocaleDateString()
    let formattedTime = date.toLocaleTimeString('default', {hour: '2-digit', minute: '2-digit'}) //default pourrait être fr, en...
    return `${formattedDay} à ${formattedTime}`
}   
const formattedDate = computed(() => {
    const date = props.message.date 
    return formatDate(date)
})
</script>
<template>
    <div class="flex">
        <img class="h-7 w-7 rounded-full mr-5" :src="message.user.avatarUrl" alt="avatar">
        {{ message.user.username }}
        <span class="text-xs text-opacity-80 text-gray-300 ml-5 mt-1">
            {{ formattedDate }}
        </span>
        <button class="p-2 ml-2 rounded-full hover:bg-slate-500 " @click="emit('delete',message.id)"> <TrashIcon class="w-3 h-3"/> </button>
    </div>
    {{ message.text }}
</template>