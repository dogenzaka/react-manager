'use strict';

var express = require('express');
var app = express();
var path = require('path');
var data = require('./data');
var _ = require('lodash');
var bodyParser = require('body-parser');
var passport = require('passport');
var crypto = require('crypto');

var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
var GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
var GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET;
var GOOGLE_CALLBACK_URL = process.env.GOOGLE_CALLBACK_URL;
var tokenStrage = [];

app.use(bodyParser.json());

app.use(function(req, res, next) {
  res.set('Access-Control-Allow-Origin', '*');
  next();
});

passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(obj, done) {
  done(null, obj);
});

/*
passport.use(new GoogleStrategy({
    clientID: GOOGLE_CLIENT_ID,
    clientSecret: GOOGLE_CLIENT_SECRET,
    callbackURL: GOOGLE_CALLBACK_URL
  },
  function(accessToken, refreshToken, profile, done) {
    // asynchronous verification, for effect...
    process.nextTick(function () {

      var sha1 = crypto.createHash('sha1');
      sha1.update(accessToken);
      var tokenHash = sha1.digest('hex');
      tokenStrage.push(tokenHash);
      profile.tokenHash = tokenHash;
      return done(null, profile);
    });
  }
));
*/

app.use(passport.initialize());
app.use(passport.session());

var specs = {
  user: {
    id: 'user',
    schema: {
      type: 'object',
      properties: {
        userId: { type: 'string', maxLength: 100, minLength: 1 },
        firstName: { type: 'string', maxLength: 100, minLength: 1 },
        lastName: { type: 'string', maxLength: 100, minLength: 1 },
        gender: { type: 'string', enum: ['male','female']},
        email: { type: 'string', style: 'long' },
        phone: 'string',
        createdAt: { type: 'string', format: 'date' },
      },
      primaryKey: ['userId'],
      required: ['userId','firstName','lastName']
    },

    features: {
      list: {
        fields: [
          { id: 'userId', style: { width: '120px' }},
          'firstName',
          'lastName',
          'email',
          'phone',
          { id: 'createdAt', format: 'short-date' },
          {
            id: 'userIcon',
            preview: {
              type: 'image',
              url: 'https://s3-ap-northeast-1.amazonaws.com/entm-vod/encoded/takusuta/{id}.png'
            }
          },
          { id: 'createdAt', type: 'date', format: 'short' }
        ]
      },
      download: true,
      upload: true
    }
  },

  company: {
    id: 'company',
    schema: {
      type: 'object',
      properties: {
        companyId: { type: 'string', maxLength: 100, minLength: 1 },
        name: { type: 'string', maxLength: 100, minLength: 1 },
        phrase: 'string',
        country: 'string',
        address: {
          type: 'object',
          properties: {
            zipCode: 'string',
            city: 'string',
            streetAddress: 'string'
          }
        }
      },
      primaryKey: ['companyId'],
      required: ['companyId', 'name']
    },

    features: {
      list: {
        fields: [
          'companyId',
          'name',
          {
            id:'country',
            filter: {
              items: ['Japan','Nepal','India']
            }
          },
          'address.city',
          {
            id: 'video',
            preview: {
              type: 'video',
              url: 'https://s3-ap-northeast-1.amazonaws.com/entm-vod/encoded/takusuta/{id}.m3u8'
            }
          }
        ]
      },
      previews: [
      ],
      search: {
        schema: {
          type: 'object',
          properties: {
            companyId: { type: 'string' },
            country: {
              type: 'string',
              enum: ['Japan','Nepal','India']
            },
            zipCode: 'number',
            city: 'string',
            streetAddress: 'string'
          }
        }
      }
    }
  }
};

app.get('/config', function(req, res) {

  res.json({

    site: {
      title: 'Example App'
    },

    entities: _.values(specs),

    i18n: {
      en: {
        company: 'Company',
        companyId: 'Company ID',
        phrase: 'Phrase',
        country: 'Country',
        zipCode: 'Zip code',
        city: 'City',
        streetAddress: 'Street Address',
        user: 'User',
        userId: 'User ID',
        firstName: 'First Name',
        lastName: 'Last Name',
        email: 'E-Mail',
        phone: 'Phone',
        createdAt: 'CreatedAt',
        userIcon: 'User Icon',
        vod: 'VOD',
        dimentions: 'Dimentions',
        width: 'Width',
        height: 'Height',
        duration: 'Duration',
        image: 'Image',
        video: 'Video'
      },
      ja: {
        company: '会社',
        companyId: '会社ID',
        phrase: 'フレーズ',
        country: '国',
        zipCode: '郵便番号',
        city: '都市',
        streetAddress: '住所',
        user: 'ユーザー',
        userId: 'ユーザーID',
        firstName: '名',
        lastName: '姓',
        email: 'メールアドレス',
        phone: '電話番号',
        createdAt: '作成日',
        userIcon: 'ユーザーアイコン',
        vod: 'VOD',
        dimentions: '大きさ',
        width: '幅',
        height: '高さ',
        duration: '保存期間',
        image: 'イメージ',
        video: 'ビデオ'
      }
    },

    auth: [
      {
        name: 'google',
        type: 'oauth2',
        url: '/oauth/google'
      }
    ]

  });

});

app.get('/oauth/google',
  passport.authenticate('google', { scope: [
    //'https://www.googleapis.com/auth/plus.login',
    'https://www.googleapis.com/auth/plus.profile.emails.read'
  ]})
);

/*
app.get('/auth/google',
  passport.authenticate('google', { scope: [
    'https://www.googleapis.com/auth/userinfo.profile'
  ]}),
  function(req, res){
    // The request will be redirected to Google for authentication, so this
    // function will not be called.
  }
);
*/

app.get('/oauth/google/callback',
  passport.authenticate('google', {
    failureRedirect: '/login'
  }),
  function(req, res) {
    res.redirect('/#/?token=' + req.user.tokenHash);
  }
);

app.get('/logout', function(req, res){
  req.logout();
  res.status(200).end();
});

// pick value for specific keys as array
var pick = function(obj, keys) {
  var items = [];
  _.each(keys, function(key) {
    items.push(obj[key]);
  });
  return items;
};

// find item in list
var find = function(kind, keys) {
  var spec = specs[kind];
  var primaryKey = spec.schema.primaryKey;
  var list = data[kind];
  if (list) {
    return _.find(list, function(item) {
      return _.isEqual(pick(item, primaryKey), keys);
    });
  }
  return;
};

var search = function(kind, q){

  // your search method here
  var list  = data[kind];
  return list;

};

var filter = function(kind, q){

  var list = data[kind];
  if(list){
    return _.where(list, q);
  }
  return [];
};

var remove = function(kind, keys) {
  var list = data[kind];
  var item = find(kind, keys);
  if (list && item) {
    list.splice(list.indexOf(item), 1);
  }
  return;
};

app.get('/entity/:kind', function(req, res) {

  var kind = req.params.kind;
  var limit = Number(req.query.limit) || 20;
  var offset = Number(req.query.offset) || 0;

  var spec = specs[kind];

  var token = req.header('X-XSRF-TOKEN');
  if(!token || tokenStrage.indexOf(token) < 0){
    return res.status(401).end();
  }

  if (!spec) {
    return res.status(404).end();
  }

  var slice;
  if(limit === -1){
    slice = data[kind];
  }else{
    slice = data[kind].slice(offset, limit+offset);
  }
  res.json({
    list: slice
  });
});

app.get('/entity/:kind/:keys', function(req, res) {
  var kind = req.params.kind;
  var keys = req.params.keys.split(',');
  var item = find(kind, keys);
  if (item) {
    res.json(item);
  } else {
    res.status(404).end();
  }
});

app.put('/entity/:kind/:keys', function(req, res) {
  var kind = req.params.kind;
  var keys = req.params.keys.split(',');
  var item = find(kind, keys);
  var list = data[kind];

  if (!list) {
    res.status(404).end();
    return;
  }

  if (item) {
    list[list.indexOf(item)] = req.body;
    res.status(204).end();
  } else {
    list.push(req.body);
    res.status(201).end();
  }

});

app.put('/entity/:kind/:keys/:field', function(req, res) {
  var kind = req.params.kind;
  var keys = req.params.keys.split(',');
  var field = req.params.field;
  var item = find(kind, keys);
  if (item) {
    item[field] = req.body.value;
    res.status(200).end();
  } else {
    res.status(404).end();
  }
});

app.delete('/entity/:kind/:keys', function(req, res) {
  var kind = req.params.kind;
  var keys = req.params.keys.split(',');
  var item = find(kind, keys);
  if (item) {
    remove(kind, keys);
    res.status(200).end();
  } else {
    res.status(404).end();
  }
});

app.get('/search/entity/:kind', function(req, res) {

  var kind = req.params.kind;
  var limit = Number(req.query.limit) || 20;
  var offset = Number(req.query.offset) || 0;
  var q = JSON.parse(req.query.query);
  var items = search(kind,q);

  var spec = specs[kind];
  if (!spec) {
    return res.status(404).end();
  }

  var slice;
  if(limit === -1){
    slice = items;
  }else{
    slice = items.slice(offset, limit+offset);
  }
  res.json({
    list: slice
  });
});

app.get('/filter/entity/:kind', function(req, res) {

  var kind = req.params.kind;
  var limit = Number(req.query.limit) || 20;
  var offset = Number(req.query.offset) || 0;
  var q = JSON.parse(req.query.query);
  var items = filter(kind,q);

  var spec = specs[kind];
  if (!spec) {
    return res.status(404).end();
  }

  var slice;
  if(limit === -1){
    slice = items;
  }else{
    slice = items.slice(offset, limit+offset);
  }
  res.json({
    list: slice
  });
});

app.use(express.static(path.resolve(__dirname,'..','build')));

module.exports = app;
