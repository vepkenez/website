const metaDescription = 'https://www.hackforla.org/images/hacknight-women.jpg';
module.exports = {
  /*
   ** Headers of the page
   */
  head: {
    title: 'Hack for LA',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: metaDescription },
      {
        hid: 'ogDescription',
        property: 'og:description',
        content: metaDescription
      },
      {
        hid: 'image',
        property: 'og:image',
        content: 'https://www.hackforla.org/images/hacknight-women.jpg'
      }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      {
        rel: 'stylesheet',
        href: 'https://fonts.googleapis.com/css?family=Roboto:400,400i,700'
      }
    ]
  },
  css: ['~/assets/styles/main.scss'],
  plugins: ['~/plugins/vue-smooth-scroll'],
  /*
   ** Customize the progress bar color
   */
  loading: { color: '#fa114f' },
  /*
   ** Build configuration
   */
  build: {
    /*
     ** Run ESLint on save
     */
    extend(config) {
      const svgRule = config.module.rules.find(
        rule => rule.loader === 'url-loader'
      );

      svgRule.test = /\.(png|jpe?g|gif)$/;

      config.module.rules.push({
        test: /\.svg$/,
        loader: 'vue-svg-loader'
      });

      config.module.rules.push({
        test: /\.md$/,
        use: ['json-loader', 'yaml-frontmatter-loader']
      });
    }
  }
};
