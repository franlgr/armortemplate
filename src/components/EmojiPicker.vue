<template>
    <VuemojiPicker @emojiClick="handleEmojiClick" />
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { VuemojiPicker, EmojiClickEventDetail } from 'vuemoji-picker'

export default defineComponent({
    components: { VuemojiPicker },
    setup() {
        const handleEmojiClick = (detail: EmojiClickEventDetail) => {}

        return {
            handleEmojiClick
        }
    }
})
</script>