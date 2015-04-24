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
var LocalStrategy = require('passport-local').Strategy;

var userStorage = {};

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

/**
 * Local authentication
 */
passport.use(new LocalStrategy(function(username, password, done) {
  if (username === 'admin' && password === 'password') {
    var sha1 = crypto.createHash('sha1');
    sha1.update(username = '_' + password + '_salt12345');
    var token = sha1.digest('hex');
    var user = { id: 'admin', name: 'admin', email: '', token: token };
    userStorage[token] = user;
    done(null, user);
  } else {
    done(null, false, { message: 'Invalid password' });
  }
}));

/**
 * Google Authentication
 */
if (process.env.GOOGLE_CLIENT_ID) {
  passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: process.env.GOOGLE_REDIRECT_URI
  }, function(accessToken, refreshToken, profile, done) {
    // asynchronous verification, for effect...
    process.nextTick(function () {
      var token = crypto.createHash('sha1').update(accessToken).digest('hex');
      var photo = profile.photos[0].value;
      photo = photo.replace(/sz\=50/,'sz=120');
      var user = {
        id: profile.id,
        name: profile.displayName,
        token: token,
        photo: photo,
      };
      userStorage[token] = user;
      return done(null, user);
    });
  }));
}

app.get('/auth', function(req, res) {
  res.json({
    strategies: [{
      name: 'Local',
      type: 'password'
    },{
      name: 'Google',
      type: 'google',
      clientId: process.env.GOOGLE_CLIENT_ID,
      redirectUri: process.env.GOOGLE_REDIRECT_URI,
      scope: ''
      //scope: 'https://www.googleapis.com/auth/plus.login'
    }]
  });
});


var requireAuth = function(req, res, next) {
  var token = req.get('x-rm-token');
  if (!token) {
    res.status(401).end();
    return;
  }
  var user = userStorage[token];
  if (!user) {
    res.status(401).end();
    return;
  }
  req.user = user;
  next();
};

app.use(passport.initialize());
// Login with token header
app.use(function(req, res, next) {
  var token = req.get('x-rm-token');
  if (token) {
    req.user = userStorage[token];
  }
  next();
});

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
          'userId',
          'firstName',
          'lastName',
          { id: 'email', style: { flex: 6 }},
          'phone',
          { id: 'createdAt', format: 'short-date' },
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
  },
};

app.get('/config', requireAuth, function(req, res) {

  res.json({

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
        video: 'Video',
        site: {
          title: 'Example App',
        },
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
        video: 'ビデオ',
        site: {
          title: 'サンプルアプリ',
        },
      }
    },

  });

});

app.get('/oauth/google',
  passport.authenticate('google', {
    scope: [
      //'https://www.googleapis.com/auth/plus.login',
      'https://www.googleapis.com/auth/plus.profile.emails.read',
      'https://www.googleapis.com/auth/userinfo.profile'
    ].join(' ')
  })
);

app.get('/oauth/google/callback',
  passport.authenticate('google', {
    failureRedirect: '/login'
  }),
  function(req, res) {
    res.redirect('/#/login/token/' + req.user.token);
  }
);

app.post('/login',
  passport.authenticate('local'),
  function(req, res) {
    res.json({ token: req.user.token });
  });

app.get('/user', requireAuth, function(req, res) {
  res.json({
    id: req.user.id,
    name: req.user.name,
    photo: req.user.photo,
  });
});

app.get('/logout', function(req, res) {
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

app.get('/entity/:kind', requireAuth, function(req, res) {

  var kind = req.params.kind;
  var limit = Number(req.query.limit) || 20;
  var offset = Number(req.query.offset) || 0;

  var spec = specs[kind];

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

app.get('/entity/:kind/:keys', requireAuth, function(req, res) {
  var kind = req.params.kind;
  var keys = req.params.keys.split(',');
  var item = find(kind, keys);
  if (item) {
    res.json(item);
  } else {
    res.status(404).end();
  }
});

app.put('/entity/:kind/:keys', requireAuth, function(req, res) {
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

app.put('/entity/:kind/:keys/:field', requireAuth, function(req, res) {
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

app.delete('/entity/:kind/:keys', requireAuth, function(req, res) {
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

app.get('/search/entity/:kind', requireAuth, function(req, res) {

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

app.get('/filter/entity/:kind', requireAuth, function(req, res) {

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
