<template>
  <div id="app">
    <!--    <ribbon></ribbon>-->
    <div id="app-layout">
      <div id="app-sidebar">
        <jhi-navbar></jhi-navbar>
      </div>
      <div id="app-content">
        <div class="container-fluid">
          <div class="card jh-card">
            <router-view></router-view>
          </div>
          <jhi-footer></jhi-footer>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" src="./app.component.ts"></script>

<style>
#app-layout {
  display: flex;
  height: 100vh;
}

#app-sidebar {
  width: 250px;
  background-color: #353d47;
  overflow-y: auto;
  flex-shrink: 0;
}

#app-content {
  flex: 1;
  overflow-y: auto;
  background-color: #f8f9fa;
}

.container-fluid {
  padding: 20px;
}
</style>
