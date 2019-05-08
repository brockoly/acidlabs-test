const redis = require('redis');

const client = redis.createClient({
  host: 'redis',
  port: 6379
});

client.on('connect', function () {
  console.log('Redis client connected');
});

client.on('error', function (err) {
  console.log('Something went wrong ' + err);
});

exports.set = (key, value) => {
  const v = JSON.stringify(value);
  client.set(key, v)
}

exports.get = (key) => {
  return new Promise((resolve, reject) => {
    client.get(key, (err, result) => {
      return resolve(JSON.parse(result));
    });
  });
}
