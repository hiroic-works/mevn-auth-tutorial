import { defineStore } from 'pinia';
import axios from 'axios';
import dayjs from 'dayjs';
import { VITE_API_URL } from '@/config/env';
import { getStorage, setStorage, removeStorage } from '@/helper/storage';
export const useAuthStore = defineStore({
  id: 'auth',
  state: () => ({
    // uid: null,
    token: getStorage('token') || null,
    error: null,
  }),
  getters: {
    isLoggedIn: (state) => state.token !== null,
  },
  actions: {
    // メールでサインイン
    async signin(email, password) {
      try {
        const res = await axios.post(
          `${VITE_API_URL}/api/users/login`,
          {
            email,
            password,
          },
          {
            headers: { 'Content-Type': 'application/json' },
          }
        );
        const data = {
          // uid: res.data._id,
          token: res.data.token,
        };
        this.$patch(data);
        // localstorageにトークンを保存。※第三引数にYYYY-MM-DD HH:mm:ssで有効期限を決めれる
        setStorage('token', data.token, dayjs().add(1, 'd').format()); // 1日間保存
      } catch (error) {
        this.$reset();
        this.$patch({
          error,
        });
      }
    },
    // メールでサインアップ
    async signup(name, email, password) {
      try {
        const res = await axios.post(
          `${VITE_API_URL}/api/users`,
          {
            name,
            email,
            password,
          },
          {
            headers: { 'Content-Type': 'application/json' },
          }
        );
        const data = {
          // uid: res.data._id,
          token: res.data.token,
        };
        this.$patch(data);
        // localstorageにトークンを保存。※第三引数にYYYY-MM-DD HH:mm:ssで有効期限を決めれる
        setStorage('token', data.token, dayjs().add(1, 'd').format()); // 1日間保存
      } catch (error) {
        this.$reset();
        this.$patch({
          error,
        });
      }
    },
    // サインアウト
    signout() {
      // localstorageのトークンを破棄してからリセット
      removeStorage('token');
      this.$reset();
    },
  },
});
