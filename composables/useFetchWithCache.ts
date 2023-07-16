import { StorageSerializers } from "@vueuse/core";

export default async <T>(url: string) => {

    // const runtimeConfig = useRuntimeConfig();
    // const baseUrl = runtimeConfig.public.urlBase;
    // const fullUrl = baseUrl + url;

    //For cahce
    const cached = useSessionStorage<T>(
        url, null, {
        serializer: StorageSerializers.object,
    }
    );

    if (!cached.value) {

        const { data, error } = await useFetch<T>(url, {
            headers: useRequestHeaders(['cookie']),
        });

        if (error.value) {
            console.log(error.value.message);
            throw createError({
                ...error.value,
                statusMessage: `Could not fetch data from ${url}`
            });
        }
        cached.value = data.value as T;
    }
    else {
        console.log(`Getting value from cache for ${url}`);
    }
    return cached;
}