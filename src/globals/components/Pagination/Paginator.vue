<script setup lang="ts">
import { defineProps } from 'vue'
import type { PaginateResponse } from '../../config/axios'

interface Props {
  model: PaginateResponse<any>
}

defineProps<Props>()
</script>

<template>
  <el-pagination
    :total="model.count"
    :page-count="model.total_pages"
    :hide-on-single-page="model.total_pages <= 1"
    layout="prev, pager, next"
  />
</template>
