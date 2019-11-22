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
  bio: 'Jr. SW DEVELOPER',
  bioShow: true,

  // addtional
  googleAnalyticsTrackingId: 'UA-131751338-1',
  disqusShortname: 'ju3un',
  googleAdsensePublisherId: 'ca-pub-2439367689968740'
};

/********************************************** */

if (process.env.NODE_ENV === 'development') {
  config.googleAnalyticsTrackingId = 'UA-131751338-1';
  config.disqusShortname = 'ju3un';
  config.googleAdsensePublisherId = 'ca-pub-2439367689968740';
}

module.exports = config;
