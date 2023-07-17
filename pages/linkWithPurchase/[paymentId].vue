<script setup>
const user = useSupabaseUser();

watchEffect(async () => {
    if (user.value) {
        const route = useRoute();
        await useFetch(`http://localhost:3000/api/user/linkWithPurchase/${route.params.paymentId}`, { headers: useRequestHeaders(['cookie']) });

        await navigateTo('/', {
            replacs: true, //repleces this route by / route
        });
    }
});

const render = () => { }
</script>