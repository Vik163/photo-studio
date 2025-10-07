import { Messages } from "../constants/messages";

export async function getDataCacheByName(url: string) {
  const cache = await caches.open("admin-cache");
  const res = await cache.match(url);
  if (res?.body) {
    const data = await res?.json();
    return data;
  }
}

export async function getDataCache(url: string) {
  const cache = await caches.open("admin-cache");
  const res = await cache.matchAll(url);
  const data = res?.map((item) => item.json());
  console.log("dat:", data);
  return data;
}

export async function addDataCache(url: string) {
  // const cache = await caches.open(nameCache);
  // const res = await cache.matchAll(url);
  // const data = res?.map((item) => item.json());
  // console.log("dat:", data);
  // return data;
}

export async function putDataCache(url: string) {
  const cacheMails = await caches.open("admin-cache");

  return fetch(url)
    .then((response) => {
      cacheMails.put(url, response).catch((error) => {
        console.error("Error adding data to cache:", error);
        return Messages.GET_ADMIN_MAIL_ERROR;
      });
    })
    .catch((error) => {
      console.error("Error fetching data:", error);
      return Messages.GET_ADMIN_MAIL_ERROR;
    });
}
