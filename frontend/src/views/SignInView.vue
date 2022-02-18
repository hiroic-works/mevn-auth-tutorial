<template>
  <div class="container mx-auto my-8">
    <h1 class="text-4xl text-center mb-4 font-bold">サインイン</h1>
    <div class="bg-white shadow-md rounded px-8 py-8 mb-4 flex flex-col">
      <div class="mb-4">
        <label class="block  text-grey-darker text-sm font-bold mb-2" for="email">
          メールアドレス
        </label>
        <input
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
          class="shadow appearance-none border border-red rounded w-full py-2 px-3 text-grey-darker mb-3"
          id="password"
          type="password"
          placeholder="******************"
        />
        <!-- <p class="text-red text-xs italic">パスワードを入力してください</p> -->
      </div>
      <div class="flex items-center justify-between">
        <button
          class="bg-blue-500 hover:bg-blue-dark text-white font-bold py-2 px-4 rounded"
          type="button"
        >
          サインイン
        </button>
        <a
          class="inline-block align-baseline font-bold text-sm text-blue hover:text-blue-darker"
          href="#"
        >
          パスワードを忘れた場合
        </a>
      </div>
    </div>
  </div>
</template>

<script setup></script>

<style scoped></style>
