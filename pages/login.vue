<template>
    <div class="w-full max-w-2xl h-9 space-y-10">
        <h1 class="text-5xl font-bold">Login to {{ course.title }}</h1>
        <button class="bg-blue-500 text-white font-bold py-2 px-4 rounded" @click="login">
            Login with Github
        </button>
    </div>
</template>
<script setup lang="ts">

const course = await useCourse();
const supabase = useSupabaseAuthClient();
//const user = useSupabaseUser();
//const { query } = useRoute();

// watchEffect(async () => {
    
//     if (user.value) {
//         console.log(query.redirectTo + '');
//         await navigateTo(query.redirectTo + '', {
//             replace: true,
//         });
//     }
// });

const login = async () => {
    //const redirectTo = `${window.location.origin}${query.redirectTo}`;
    //console.log({redirectTo});
    const { error } = await supabase.auth.signInWithOAuth({
        provider: 'github',
        //options: {redirectTo},
    });
    if (error) {
        console.error(error);
    }
};

</script>