var Redis = require('ioredis');

var redis = new Redis({
    port: 6379,          // Redis port
    host: '127.0.0.1',   // Redis host
    family: 4,           // 4 (IPv4) or 6 (IPv6)
    password: '',
    db: 0
  })

redis.get("foo").then(res =>{
    if(res){
        redis.set('foo', res + 'a')
    }else{
        redis.set('foo', 'barb')
    }
})
