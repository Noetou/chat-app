<script setup>
import { useUserStore } from '@/stores/user'
import { storeToRefs } from 'pinia';
import {supabase} from  '@/supabase'
import {useRouter} from 'vue-router'
import { ref } from 'vue';

const router = useRouter()
const {user} =  storeToRefs(useUserStore());

const loading = ref(false)

const logout = async () => {
    loading.value = true
    await supabase.auth.signOut()
    router.push({name: 'login'})
}
</script>

<template>
    <header class="flex p-3 items-align">
        <div v-if="user"> Username : {{ user.username }}</div>
        <button :loading="loading" @click="logout" class="p-2 ml-auto outline rounded">
            <span v-if="loading"> ... </span>
            <span v-else> Se déconnecter  </span>
        </button>
    </header>
</template>