<template>
  <div 
    class="book-card"
    @click="favorite"
  >
    <div class="inner">
      <template v-if="existingFav">
        <svg class="heart" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><title>cards-heart</title><path d="M12,21.35L10.55,20.03C5.4,15.36 2,12.27 2,8.5C2,5.41 4.42,3 7.5,3C9.24,3 10.91,3.81 12,5.08C13.09,3.81 14.76,3 16.5,3C19.58,3 22,5.41 22,8.5C22,12.27 18.6,15.36 13.45,20.03L12,21.35Z" /></svg>
      </template>
      <template v-else>
        <svg v-if="faved" class="heart" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><title>cards-heart</title><path d="M12,21.35L10.55,20.03C5.4,15.36 2,12.27 2,8.5C2,5.41 4.42,3 7.5,3C9.24,3 10.91,3.81 12,5.08C13.09,3.81 14.76,3 16.5,3C19.58,3 22,5.41 22,8.5C22,12.27 18.6,15.36 13.45,20.03L12,21.35Z" /></svg>
      </template>
      <img :src="book.cover_url" />
    </div>
    <div class="info">
      <h5>{{ book.title }} by  {{ book.author }}</h5>
      <p>{{ book.description }}</p>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { Book } from '../types/api';
import { useApi } from '../store/useApi'

const props = defineProps<{
  book: Book
  favorite?: string
}>()

const api = useApi()
const faved = ref(false)
const existingFav = computed(() => {
  if (props.favorite) {
    return props.book.id.localeCompare(props.favorite) === 0
  }
})

function favorite() {
  faved.value = !faved.value

  if (faved.value) {
    api.createFavorite(api.user, props.book.id)
  } else {
    api.createFavorite(api.user, '')
  }
}
</script>

<style lang="scss">
.book-card {
  display: flex;
  flex-direction: column;
  width: 20rem;
  cursor: pointer;

  .inner {
    position: relative;

    .heart {
      display: flex;
      width: 2rem;
      height: 2rem;
      top: 0;
      right: 0;
      position: absolute;
      z-index: 999;
    }
  
    img {
      width: 20rem;
  
      &:hover {
        transform: scale(1.05) !important;
      }
    }
  }

  
  .info {
    justify-content: center;
    font-family: sans-serif;
    font-weight: 200;
    text-align: center;
  }
}


</style>