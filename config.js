let config = {
  title: `JUVORITES`,
  author: 'Ju3un',
  description: "Ju3un's blog",
  siteUrl: 'https://ju3un.github.io',

  // header config
  titleLogo: () => {
    return require('./src/images/profile.png');
  },
  titleLogoShow: true,
  bio: 'Jr. C++ DEVELOPER',
  bioShow: true,

  // addtional
  googleAnalyticsTrackingId: 'UA-103592668-4',
  disqusShortname: 'dev-ju3un-blog',
};

/********************************************** */

if (process.env.NODE_ENV === 'development') {
  config.googleAnalyticsTrackingId = '';
  config.disqusShortname = '';
}

module.exports = config;
