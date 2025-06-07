<template>
  <div class="jh-sidebar" data-cy="navbar">
    <!-- Logo Brand -->
    <div class="sidebar-brand" b-link to="/">
      <span class="logo-img"></span>
      <span class="navbar-title">MicroserviceGateway</span>
      <span class="navbar-version" style="display: none">{{ version }}</span>
    </div>

    <!-- Navigation Menu -->
    <nav class="sidebar-nav">
      <!-- Home -->
      <router-link to="/" exact class="nav-item">
        <font-awesome-icon icon="home" />
        <span>Home</span>
      </router-link>

      <!-- Entities Menu -->
      <div v-if="authenticated" class="nav-item-group">
        <div class="nav-item-header" @click="toggleSubmenu('entities')">
          <div class="nav-item-content">
            <font-awesome-icon icon="th-list" />
            <span>Entities</span>
          </div>
          <font-awesome-icon :icon="submenus.entities ? 'chevron-down' : 'chevron-right'" class="nav-arrow" />
        </div>
        <div class="nav-submenu" :class="{ expanded: submenus.entities }">
          <entities-menu></entities-menu>
        </div>
      </div>

      <!-- Administration Menu -->
      <div v-if="hasAnyAuthority('ROLE_ADMIN') && authenticated" class="nav-item-group">
        <div class="nav-item-header" @click="toggleSubmenu('admin')">
          <div class="nav-item-content">
            <font-awesome-icon icon="users-cog" />
            <span>Administration</span>
          </div>
          <font-awesome-icon :icon="submenus.admin ? 'chevron-down' : 'chevron-right'" class="nav-arrow" />
        </div>
        <div class="nav-submenu" :class="{ expanded: submenus.admin }">
          <router-link to="/admin/gateway" class="nav-subitem">
            <font-awesome-icon icon="road" />
            <span>Gateway</span>
          </router-link>
          <router-link to="/admin/metrics" class="nav-subitem">
            <font-awesome-icon icon="tachometer-alt" />
            <span>Metrics</span>
          </router-link>
          <router-link to="/admin/health" class="nav-subitem">
            <font-awesome-icon icon="heart" />
            <span>Health</span>
          </router-link>
          <router-link to="/admin/configuration" class="nav-subitem">
            <font-awesome-icon icon="cogs" />
            <span>Configuration</span>
          </router-link>
          <router-link to="/admin/logs" class="nav-subitem">
            <font-awesome-icon icon="tasks" />
            <span>Logs</span>
          </router-link>
          <router-link v-if="openAPIEnabled" to="/admin/docs" class="nav-subitem">
            <font-awesome-icon icon="book" />
            <span>API</span>
          </router-link>
        </div>
      </div>

      <!-- Account Menu -->
      <div class="nav-item-group">
        <div class="nav-item-header" @click="toggleSubmenu('account')">
          <div class="nav-item-content">
            <font-awesome-icon icon="user" />
            <span>Account</span>
          </div>
          <font-awesome-icon :icon="submenus.account ? 'chevron-down' : 'chevron-right'" class="nav-arrow" />
        </div>
        <div class="nav-submenu" :class="{ expanded: submenus.account }">
          <a v-if="authenticated" @click="logout()" class="nav-subitem" data-cy="logout">
            <font-awesome-icon icon="sign-out-alt" />
            <span>Sign out</span>
          </a>
          <a v-if="!authenticated" @click="login()" class="nav-subitem" data-cy="login">
            <font-awesome-icon icon="sign-in-alt" />
            <span>Sign in</span>
          </a>
        </div>
      </div>
    </nav>
  </div>
</template>

<script lang="ts" src="./jhi-navbar.component.ts"></script>

<style scoped>
/* ==========================================================================
    Sidebar Navigation
    ========================================================================== */
.jh-sidebar {
  background-color: #353d47;
  color: white;
  height: 100%;
  display: flex;
  flex-direction: column;
  width: 100%;
}

.sidebar-brand {
  padding: 20px 15px;
  border-bottom: 1px solid #444;
  display: flex;
  align-items: center;
  text-decoration: none;
  color: white;
}

.sidebar-brand:hover {
  color: white;
  text-decoration: none;
}

.navbar-title {
  color: white;
  font-weight: 500;
  font-size: 1.1em;
}

.navbar-version {
  font-size: 0.65em;
  color: #ccc;
  margin-left: 5px;
}

.sidebar-nav {
  flex: 1;
  padding: 10px 0;
}

.nav-item {
  display: flex;
  align-items: center;
  padding: 12px 20px;
  color: #ccc;
  text-decoration: none;
  transition: all 0.2s ease;
  border-left: 3px solid transparent;
}

.nav-item:hover {
  background-color: #444;
  color: white;
  text-decoration: none;
}

.nav-item.router-link-active {
  background-color: #28a745;
  color: white;
  border-left-color: #20c997;
}

.nav-item-group {
  margin-bottom: 5px;
}

.nav-item-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px 20px;
  color: #ccc;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
}

.nav-item-header:hover {
  background-color: #444;
  color: white;
}

.nav-item-content {
  display: flex;
  align-items: center;
}

.nav-arrow {
  font-size: 12px;
  transition: transform 0.2s ease;
  opacity: 0.7;
}

.nav-submenu {
  background-color: #2c3338;
  max-height: 0;
  overflow: hidden;
  transition: max-height 0.3s ease;
}

.nav-submenu.expanded {
  max-height: 500px;
}

.nav-subitem {
  display: flex;
  align-items: center;
  padding: 10px 20px 10px 40px;
  color: #bbb;
  text-decoration: none;
  transition: all 0.2s ease;
  cursor: pointer;
  border-left: 3px solid transparent;
}

.nav-subitem:hover {
  background-color: #444;
  color: white;
  text-decoration: none;
}

.nav-subitem.router-link-active {
  background-color: #17a2b8;
  color: white;
  border-left-color: #138496;
}

.nav-item svg,
.nav-item-content svg,
.nav-subitem svg {
  margin-right: 10px;
  width: 16px;
  min-width: 16px;
}

/* ==========================================================================
    Logo styles
    ========================================================================== */
.logo-img {
  height: 35px;
  width: 35px;
  background: url('/content/images/logo-jhipster.png') no-repeat center center;
  background-size: contain;
  filter: drop-shadow(0 0 0.05rem white);
  margin-right: 10px;
  flex-shrink: 0;
}

/* ==========================================================================
    Responsive
    ========================================================================== */
@media screen and (max-width: 768px) {
  .jh-sidebar {
    width: 100%;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 1000;
    transform: translateX(-100%);
    transition: transform 0.3s ease;
  }

  .jh-sidebar.open {
    transform: translateX(0);
  }
}
</style>
