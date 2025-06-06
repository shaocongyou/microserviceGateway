<template>
  <div class="row justify-content-center">
    <div class="col-8">
      <div v-if="standardProcedures">
        <h2 class="jh-entity-heading" data-cy="standardProceduresDetailsHeading">
          <span>Standard Procedures</span> {{ standardProcedures.id }}
        </h2>
        <dl class="row jh-entity-details">
          <dt>
            <span>Is Active</span>
          </dt>
          <dd>
            <span>{{ standardProcedures.isActive }}</span>
          </dd>
          <dt>
            <span>Specification</span>
          </dt>
          <dd>
            <span>{{ standardProcedures.specification }}</span>
          </dd>
          <dt>
            <span>User Login</span>
          </dt>
          <dd>
            <span>{{ standardProcedures.userLogin }}</span>
          </dd>
        </dl>
        <button type="submit" @click.prevent="previousState()" class="btn btn-info" data-cy="entityDetailsBackButton">
          <font-awesome-icon icon="arrow-left"></font-awesome-icon>&nbsp;<span>Back</span>
        </button>
        <router-link
          v-if="standardProcedures.id"
          :to="{ name: 'StandardProceduresEdit', params: { standardProceduresId: standardProcedures.id } }"
          custom
          v-slot="{ navigate }"
        >
          <button @click="navigate" class="btn btn-primary">
            <font-awesome-icon icon="pencil-alt"></font-awesome-icon>&nbsp;<span>Edit</span>
          </button>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script lang="ts" src="./standard-procedures-details.component.ts"></script>
