<template>
  <div class="container mt-4">
    <h2 class="mb-4">规范流程</h2>
    <div class="row">
      <div v-for="item in procedures" :key="item.id" class="col-md-6 col-lg-4 mb-4">
        <div class="card border-primary shadow-sm h-100">
          <div class="card-header" :class="{ 'bg-primary': item.isActive, 'bg-secondary': !item.isActive }">
            <h5 class="card-title mb-0 text-white">流程 #{{ item.id }}</h5>
          </div>
          <div class="card-body">
            <p class="card-text">{{ item.specification }}</p>
          </div>
          <div class="card-footer bg-transparent">
            <small class="text-muted">用户ID: {{ item.userUUID }}</small>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'UserStandardProcedures',
  data() {
    return {
      procedures: [
        {
          id: 1501,
          isActive: true,
          specification: '测试',
          userUUID: '4c973896-5761-41fc-8217-07c5d13a004b',
        },
        {
          id: 1502,
          isActive: true,
          specification: '测试',
          userUUID: '4c973896-5761-41fc-8217-07c5d13a004b',
        },
      ],
    };
  },
});
</script>

<style scoped>
.card {
  transition:
    transform 0.2s ease,
    box-shadow 0.2s ease;
  border-radius: 8px;
}

.card:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
}

.card-header {
  border-top-left-radius: 8px !important;
  border-top-right-radius: 8px !important;
}

.card-title {
  font-weight: 600;
}

.card-text {
  min-height: 60px;
}
</style>
