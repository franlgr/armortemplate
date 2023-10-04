<template>
  <div>
    {{ text }}
    <MdEditor
      htmlPreview
      language="en-US"
      :toggleHtmlPreview="true"
      :toolbars="[
        // 'code',
        // 'link',
        // 'image',
        // 'table',
        // 'mermaid',
        // 'katex',
        // '-',
        // 'revoke',
        // 'next',
        // 'save',
        // '=',
        'pageFullscreen',
        'fullscreen',
        'preview',
        'htmlPreview',
        'catalog',
        'github',
      ]"
      width="auto"
      :tabWidth="1"
      noMermaid
      :sanitize="sanitize"
      theme="white"
      v-model="text"
    />
  </div>
</template>

<script>
  import { ref } from 'vue';
  import { MdEditor } from 'md-editor-v3';
  import 'md-editor-v3/lib/style.css';

  export default {
    components: {
      MdEditor,
    },
    setup() {
      const text = ref('# Hello Editor');

      const updateText = (newText) => {
        text.value = newText;
      };

      return {
        text,
        updateText,
      };
    },
  };
</script>
