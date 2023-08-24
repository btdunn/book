<template>
  <template v-if="books.length > 0">
    <header>
      <h1>Books</h1>
    </header>
    <div class="books-container">
      <BookCard
        v-for="(book, index) in books"
        :key="index"
        :book="book"
      />
    </div>
  </template>
</template>

<script lang="ts" setup>
import { useApi } from '../store/useApi'

const api = useApi()
const books = ref(api.books)
</script>

<style lang="scss">
header {
  display: flex;
  width: 100%;
  height: 5rem;
  justify-content: center;

  h1 {
    font-family: sans-serif;
  }
}


.books-container {
  display: grid;
  grid-template-columns: auto auto auto;
  row-gap: 0.5rem;
  column-gap: 0.5rem;
  height: 500px;
  padding: 3rem 3rem;
  overflow-y: auto;
}

</style>
