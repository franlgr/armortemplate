<template>
    <div>
     <FormKit type="select" label="What is your product category?" placeholder="Select a Category" name="category" :options="options" />
    </div>
</template>
<script>
export default {
    props: {
        options: {
            type: Array,
            required: true,
        },
    }
}
</script>