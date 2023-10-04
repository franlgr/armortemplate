<script>
  //   import InlineEditor from '@ckeditor/ckeditor5-build-inline';
  import CKEditor from '@ckeditor/ckeditor5-vue';

  export default {
    name: 'app',
    components: {
      ckeditor: CKEditor.component,
    },
    data() {
      return {
        // editor: InlineEditor,
        editorData: '<p>Hello from CKEditor 5!</p>',
        editorConfig: {
          toolbar: ['bold', 'italic', 'link'],
        },
      };
    },
    methods: {
      onReady(editor) {
        console.log('CKEditor5 Vue Component is ready to use!', editor);
      },
      onChange(data) {
        console.log(data);
      },
    },
  };
</script>
