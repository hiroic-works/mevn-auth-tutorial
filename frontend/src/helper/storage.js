import dayjs from 'dayjs';

/**
 * localStorageをセット
 *
 * @param      {string}  key     keyを指定。
 * @param      {string,object}  value   値を指定
 * @param      {string}  expire  YYYY-MM-DD HH:mm:ssで有効期限を指定
 */
const setStorage = (key, value, expire) => {
  let data;
  if (expire !== undefined) {
    data = {
      expire: expire,
      value: value,
    };
  } else {
    data = value;
  }
  localStorage.setItem(key, JSON.stringify(data));
};
/**
 * 指定したlocalStorage取得
 * @param  {string} key キー指定
 * @return {string,object}     storageナシの場合null
 */
const getStorage = (key) => {
  let storage = localStorage[key];
  if (storage === undefined) {
    return undefined;
  }
  storage = JSON.parse(storage);
  // 有効期限の有無
  if (storage.expire) {
    const now = dayjs();
    const expire = dayjs(storage.expire);

    // 現在時刻が指定日に達するまで保持
    if (now.isBefore(expire)) {
      return storage.value;
    } else {
      removeStorage(key);
      return null;
    }
  } else {
    return storage;
  }
};
/**
 * 指定したlocalStorage削除
 * @param  {string} key キー指定
 */
const removeStorage = (key) => {
  localStorage.removeItem(key);
};
export { setStorage, getStorage, removeStorage };
