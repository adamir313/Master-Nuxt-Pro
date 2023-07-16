<template>
    <div>
        <Temp>
            <template #header="props">
                <h1>Here might be a page title {{ props.text }}{{ props.count }}</h1>
            </template>

            <p>Here might be default slot</p>

            <template #footer="props">
                <h1>Here might be a footer {{ props.mes }}</h1>
            </template>
        </Temp>
    </div>
</template>