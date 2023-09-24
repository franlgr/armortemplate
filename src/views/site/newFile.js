export default (await import('vue')).defineComponent({
  name: 'HomeView',
  layout: 'DefaultLayout',
  data() {
    return {
      imagenDeFondo: '@/assets/background.jpg',
    };
  },
  components: {
    // HelloWorld,
    SiteHeader,
  },
  data() {
    return {
      settings: {
        dots: true,
        focusOnSelect: false,
        autoplay: true,
        infinite: true,
        speed: 300,
        slidesToShow: 1,
        slidesToScroll: 1,
        touchThreshold: 1,
      },
    };
  },
});
