// expose our config directly to our application using module.exports
module.exports = {

    'facebookAuth' : {
        'clientID'      : '439085192958278', // your App ID
        'clientSecret'  : '50c7552be3a2febc70b2d52ac92089a3', // your App Secret
        'callbackURL'   : 'http://localhost:3000/auth/facebook/callback',
         "profileFields": ['id', 'emails', 'name'] //This
    },

    'twitterAuth' : {
        'consumerKey'       : 'your-consumer-key-here',
        'consumerSecret'    : 'your-client-secret-here',
        'callbackURL'       : 'http://localhost:3000/auth/twitter/callback'
    },

    'googleAuth' : {
        'clientID'      : 'your-secret-clientID-here',
        'clientSecret'  : 'your-client-secret-here',
        'callbackURL'   : 'http://localhost:3000/auth/google/callback'
    }

};