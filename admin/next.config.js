// next.config.js
module.exports = {
    images: {
      remotePatterns: [
        {
          protocol: 'https',
          hostname: 'robohash.org',
          port: '',
          pathname: '/**',
        },
      ],
    },
  }
  
