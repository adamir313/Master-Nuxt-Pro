<template>
    <div v-if="user" class="rounded py-3 px-5 flex items-center space-x-3 bg-white">
        <img :src="profile" alt="" class="rounded-full w-12 h-12 border-2 border-blue-400">
        <div class="text-right">
            <div class="font-medium">{{ name }}</div>
            <button class="text-sm underline text-slate-500" @click="logout">Logout</button>
        </div>
    </div>
</template>

<script setup>
const user = useSupabaseUser();

const name = computed(() => user.value?.user_metadata.user_name);

const profile = computed(() => user.value?.user_metadata.avatar_url);

const { auth } = useSupabaseAuthClient();
const logout = async () => {
    const { error } = await auth.signOut();
    if (error) {
        console.error(error);
        return;
    }

    await navigateTo('/login');
};
</script>