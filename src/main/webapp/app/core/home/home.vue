<template>
  <div class="home row">
    <div class="col-md-3">
      <span class="hipster img-fluid rounded"></span>
    </div>
    <div class="col-md-9">
      <h1 class="display-4">Welcome, Java Hipster!</h1>
      <p class="lead">This is your homepage</p>

      <div>
        <div class="alert alert-success" v-if="authenticated">
          <span v-if="username">You are logged in as user "{{ username }}".</span>
        </div>

        <div class="alert alert-warning" v-if="!authenticated">
          <span>If you want to </span>
          <a class="alert-link" @click="login()">sign in</a
          ><span
            >, you can try the default accounts:<br />- Administrator (login="admin" and password="admin") <br />- User (login="user" and
            password="user").</span
          >
        </div>
      </div>

      <p>If you have any question on JHipster:</p>

      <ul>
        <li><a href="https://www.jhipster.tech/" target="_blank" rel="noopener noreferrer">JHipster homepage</a></li>
        <li>
          <a href="https://stackoverflow.com/tags/jhipster/info" target="_blank" rel="noopener noreferrer">JHipster on Stack Overflow</a>
        </li>
        <li>
          <a href="https://github.com/jhipster/generator-jhipster/issues?state=open" target="_blank" rel="noopener noreferrer"
            >JHipster bug tracker</a
          >
        </li>
        <li>
          <a href="https://gitter.im/jhipster/generator-jhipster" target="_blank" rel="noopener noreferrer">JHipster public chat room</a>
        </li>
        <li>
          <a href="https://twitter.com/jhipster" target="_blank" rel="noopener noreferrer">follow @jhipster on Twitter</a>
        </li>
      </ul>

      <p>
        <span>If you like JHipster, don't forget to give us a star on</span>
        <a href="https://github.com/jhipster/generator-jhipster" target="_blank" rel="noopener noreferrer">GitHub</a>!
      </p>
    </div>
  </div>
</template>

<script lang="ts" src="./home.component.ts"></script>
