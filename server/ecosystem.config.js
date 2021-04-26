module.exports = {
  apps : [{
    script: 'server.js',
    watch: '.',
    instances: 4,
    env: {
      NODE_ENV: "production"
    }
  }],

  deploy : {
    production : {
      user : 'mobile',
      host : 'do',
      ref  : 'origin/master',
      repo : 'GIT_REPOSITORY',
      path : '~/neera/server',
      'pre-deploy-local': '',
      'post-deploy' : 'npm install && pm2 reload ecosystem.config.js --env production',
      'pre-setup': ''
    }
  }
};
