<template>
  <NuxtPage />
</template>

<script lang="ts" setup>
import { useApi } from './store/useApi'
import { User } from './types/api'

const api = useApi()

onMounted(() => {
  api.poll()
})
</script>