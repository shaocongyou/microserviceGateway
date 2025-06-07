<template>
  <div>
    <router-link to="/standard-procedures" class="nav-subitem">
      <font-awesome-icon icon="asterisk" />
      <span>Standard Procedures</span>
    </router-link>
    <!-- jhipster-needle-add-entity-to-menu - JHipster will add entities to the menu here -->
  </div>
</template>

<script lang="ts" src="./entities-menu.component.ts"></script>

<style scoped>
.nav-subitem {
  display: flex;
  align-items: center;
  padding: 10px 20px 10px 40px;
  color: #bbb;
  text-decoration: none;
  transition: all 0.2s ease;
  cursor: pointer;
}

.nav-subitem:hover {
  background-color: #444;
  color: white;
  text-decoration: none;
}

.nav-subitem.router-link-active {
  background-color: #444;
  color: white;
  border-left: 3px solid #007bff;
}

.nav-subitem svg {
  margin-right: 10px;
  width: 16px;
  min-width: 16px;
}
</style>
