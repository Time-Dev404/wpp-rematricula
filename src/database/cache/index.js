import redis from 'promise-redis';
const client = redis().createClient();

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

