import redis from 'promise-redis';
const client = redis().createClient({
  host: process.env.REDIS_END,
  port: process.env.REDIS_PORT,
  password: process.env.REDIS_PASS
});

async function saveInCache(key, value){
  await client.set(key, value);
}

async function getFromCache(key){
  const result = await client.get(key);
  return result;
}

async function removeFromCache(key){
  await client.del(key);
}

export {
  saveInCache,
  getFromCache,
  removeFromCache
}

