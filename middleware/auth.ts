export default defineNuxtRouteMiddleware((to, from) => {
    const user = useSupabaseUser();

    if (user.value || to.params.chapterId === 'c1') {
        return;
    }
    
    return navigateTo(`/login?redirectTo="${to.path}"`);
});