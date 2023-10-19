<script>
import axios from 'axios';

export default {

  data() {
    return {
      countries: ['us', 'ar', 'ca', 'fr', 'gb'],
      currentCountryIndex: 0,
      latestNews: null
    }
  },

  mounted() {
    this.fetchNewsAndCreatePost();

    setInterval(() => {
      this.fetchNewsAndCreatePost();
    }, 1000 * 60 * 60 * 24);
  },

  methods: {

    async fetchNewsAndCreatePost() {
      try {
        await this.fetchLatestNews();
        await this.createBlogPost();
      } catch (err) {
        console.error(err);
      }
    },

    async fetchLatestNews() {
      const country = this.countries[this.currentCountryIndex];

      const response = await axios.get('https://newsapi.org/v2/top-headlines', {
        params: {
          country: country,
          apiKey: 'f30ac8b0d41549f1ac9cd4657146773c'
        }
      });

      this.latestNews = response.data.articles[0];

      this.currentCountryIndex++;
      if (this.currentCountryIndex >= this.countries.length) {
        this.currentCountryIndex = 0;
      }
    },

            //   title: this.formData.title,
            //   content: this.editorData,
            //   ubication: this.formData.ubication,
            //   th: this.fechaActual,
            //   images: this.images,
            //   imgUser: this.getUser.image,
            //   user: this.getUser,
            //   user_id: this.getUser._id,
            //   category: this.newBlog.category,
            //   category_id: this.newBlog.category._id,
            //   metaData: this.metaData,

    async createBlogPost() {
      if (this.latestNews) {
        try {
          await axios.post('/api/blogs', {
            title: this.latestNews.title,
            content: this.latestNews.content+ ' Publicado en: '+ this.latestNews.url,
            // author: this.latestNews.author,
            metadata:{
                title:'',
                content: '',
                img:this.latestNews.urlToImage

            },
            // url: this.latestNews.url,
            images: this.latestNews.urlToImage,
            // publishedAt: this.latestNews.publishedAt
          });
          console.log('Blog post created!');
        } catch (error) {
          console.error(error);
        }
      }
    }

  }

}
</script>