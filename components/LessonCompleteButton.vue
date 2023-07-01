<template>
    <label for="checkbox" class="p-2 text-white rounded-sm inline-block font-semibold select-none"
    :class="[{'bg-green-500': modelValue}, { 'bg-gray-500': !modelValue}]">
        <input type="checkbox" id="checkbox" :value="modelValue"
        @input="$emit('update:modelValue', modelValue)"
        class="hidden">
        {{ modelValue ? 'Completed!' : 'Mark as complete'}}
    </label>
</template>

<script setup>
defineProps({
    modelValue:{
        type: Boolean,
        default: false,
    }
});

defineEmits(['update:modelValue']);

</script>