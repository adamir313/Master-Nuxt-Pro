export default defineNuxtRouteMiddleware(async (to, from) => {

    const user = useSupabaseUser();

    const { data: hasAccess } = await useFetch('http://localhost:3000/api/user/hasAccess', {
        headers: useRequestHeaders(['cookie']),
    });

    if (hasAccess.value || to.params.chapterId === 'c1') {
        return;
    }
    else if (user.value && !hasAccess.value) {
        const client = useSupabaseClient();
        await client.auth.signOut();
    }

    return navigateTo(`/login?redirectTo="${to.path}"`);
});