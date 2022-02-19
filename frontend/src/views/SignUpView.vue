<script setup>
import { useAuthStore } from '@/stores/useAuth';
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const auth = useAuthStore();
const router = useRouter();

const name = ref('');
const email = ref('');
const password = ref('');

const encodeHTML = (s) => {
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
};

const signup = async () => {
  if (!name.value || !email.value || !password.value) {
    alert('未記入の入力必須項目があります');
    return;
  }

  // TODO: ホントはもっとバリデーションする

  // 念のためテキスト入力項目はエスケープ
  const escapeName = encodeHTML(name.value)

  // use pinia サインアップ
  await auth.signup(escapeName, email.value, password.value);
  // エラーがなければトップページにリダイレクト
  if (!auth.error) {
    alert('サインアップしました');
    router.push('/');
  } else {
    alert('サインアップ出来ませんでした');
  }
};
</script>
<template>
  <div class="container mx-auto my-8">
    <h1 class="text-4xl text-center mb-4 font-bold">サインアップ</h1>
    <div class="bg-white shadow-md rounded px-8 py-8 mb-4 flex flex-col">
      <div class="mb-4">
        <label class="block text-grey-darker text-sm font-bold mb-2" for="name">
          ニックネーム
        </label>
        <input
          v-model="name"
          class="shadow appearance-none border rounded w-full py-2 px-3 text-grey-darker"
          id="name"
          type="text"
          placeholder="name"
          autocomplete="off"
        />
        <!-- <p class="text-red text-xs italic">ニックネームを入力してください</p> -->
      </div>
      <div class="mb-4">
        <label
          class="block text-grey-darker text-sm font-bold mb-2"
          for="email"
        >
          メールアドレス
        </label>
        <input
          v-model="email"
          class="shadow appearance-none border rounded w-full py-2 px-3 text-grey-darker"
          id="email"
          type="email"
          placeholder="email"
          autocomplete="off"
        />
        <!-- <p class="text-red text-xs italic">メールアドレスを入力してください</p> -->
      </div>
      <div class="mb-6">
        <label
          class="block text-grey-darker text-sm font-bold mb-2"
          for="password"
        >
          パスワード
        </label>
        <input
          v-model="password"
          class="shadow appearance-none border border-red rounded w-full py-2 px-3 text-grey-darker mb-3"
          id="password"
          type="password"
          placeholder="******************"
        />
        <!-- <p class="text-red text-xs italic">パスワードを入力してください</p> -->
      </div>
      <div class="flex items-center justify-between">
        <button
          @click="signup"
          class="bg-blue-500 hover:bg-blue-dark text-white font-bold py-2 px-4 rounded"
          type="button"
        >
          サインアップ
        </button>
      </div>
    </div>
  </div>
</template>
