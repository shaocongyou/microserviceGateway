<template>
  <div>
    <h2 id="page-heading" data-cy="StandardProceduresHeading">
      <span id="standard-procedures-heading">Standard Procedures</span>
      <div class="d-flex justify-content-end">
        <button class="btn btn-info mr-2" @click="handleSyncList" :disabled="isFetching">
          <font-awesome-icon icon="sync" :spin="isFetching"></font-awesome-icon> <span>Refresh list</span>
        </button>
        <router-link :to="{ name: 'StandardProceduresCreate' }" custom v-slot="{ navigate }">
          <button
            @click="navigate"
            id="jh-create-entity"
            data-cy="entityCreateButton"
            class="btn btn-primary jh-create-entity create-standard-procedures"
          >
            <font-awesome-icon icon="plus"></font-awesome-icon>
            <span>Create a new Standard Procedures</span>
          </button>
        </router-link>
      </div>
    </h2>
    <div class="row">
      <div class="col-sm-12">
        <form name="searchForm" class="form-inline" @submit.prevent="search(currentSearch)">
          <div class="input-group w-100 mt-3">
            <input
              type="text"
              class="form-control"
              name="currentSearch"
              id="currentSearch"
              placeholder="Search for Standard Procedures"
              v-model="currentSearch"
            />
            <button type="button" id="launch-search" class="btn btn-primary" @click="search(currentSearch)">
              <font-awesome-icon icon="search"></font-awesome-icon>
            </button>
            <button type="button" id="clear-search" class="btn btn-secondary" @click="clear()" v-if="currentSearch">
              <font-awesome-icon icon="trash"></font-awesome-icon>
            </button>
          </div>
        </form>
      </div>
    </div>
    <br />
    <div class="alert alert-warning" v-if="!isFetching && standardProcedures && standardProcedures.length === 0">
      <span>No Standard Procedures found</span>
    </div>
    <div class="table-responsive" v-if="standardProcedures && standardProcedures.length > 0">
      <table class="table table-striped" aria-describedby="standardProcedures">
        <thead>
          <tr>
            <th scope="row" @click="changeOrder('id')">
              <span>ID</span> <jhi-sort-indicator :current-order="propOrder" :reverse="reverse" :field-name="'id'"></jhi-sort-indicator>
            </th>
            <th scope="row" @click="changeOrder('isActive')">
              <span>Is Active</span>
              <jhi-sort-indicator :current-order="propOrder" :reverse="reverse" :field-name="'isActive'"></jhi-sort-indicator>
            </th>
            <th scope="row" @click="changeOrder('specification')">
              <span>Specification</span>
              <jhi-sort-indicator :current-order="propOrder" :reverse="reverse" :field-name="'specification'"></jhi-sort-indicator>
            </th>
            <th scope="row" @click="changeOrder('userLogin')">
              <span>User Login</span>
              <jhi-sort-indicator :current-order="propOrder" :reverse="reverse" :field-name="'userLogin'"></jhi-sort-indicator>
            </th>
            <th scope="row"></th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="standardProcedures in standardProcedures" :key="standardProcedures.id" data-cy="entityTable">
            <td>
              <router-link :to="{ name: 'StandardProceduresView', params: { standardProceduresId: standardProcedures.id } }">{{
                standardProcedures.id
              }}</router-link>
            </td>
            <td>{{ standardProcedures.isActive }}</td>
            <td>{{ standardProcedures.specification }}</td>
            <td>{{ standardProcedures.userLogin }}</td>
            <td class="text-right">
              <div class="btn-group">
                <router-link
                  :to="{ name: 'StandardProceduresView', params: { standardProceduresId: standardProcedures.id } }"
                  custom
                  v-slot="{ navigate }"
                >
                  <button @click="navigate" class="btn btn-info btn-sm details" data-cy="entityDetailsButton">
                    <font-awesome-icon icon="eye"></font-awesome-icon>
                    <span class="d-none d-md-inline">View</span>
                  </button>
                </router-link>
                <router-link
                  :to="{ name: 'StandardProceduresEdit', params: { standardProceduresId: standardProcedures.id } }"
                  custom
                  v-slot="{ navigate }"
                >
                  <button @click="navigate" class="btn btn-primary btn-sm edit" data-cy="entityEditButton">
                    <font-awesome-icon icon="pencil-alt"></font-awesome-icon>
                    <span class="d-none d-md-inline">Edit</span>
                  </button>
                </router-link>
                <b-button
                  @click="prepareRemove(standardProcedures)"
                  variant="danger"
                  class="btn btn-sm"
                  data-cy="entityDeleteButton"
                  v-b-modal.removeEntity
                >
                  <font-awesome-icon icon="times"></font-awesome-icon>
                  <span class="d-none d-md-inline">Delete</span>
                </b-button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <b-modal ref="removeEntity" id="removeEntity">
      <template #modal-title>
        <span id="microserviceGatewayApp.standardProcedures.delete.question" data-cy="standardProceduresDeleteDialogHeading"
          >Confirm delete operation</span
        >
      </template>
      <div class="modal-body">
        <p id="jhi-delete-standardProcedures-heading">Are you sure you want to delete Standard Procedures {{ removeId }}?</p>
      </div>
      <template #modal-footer>
        <div>
          <button type="button" class="btn btn-secondary" @click="closeDialog()">Cancel</button>
          <button
            type="button"
            class="btn btn-primary"
            id="jhi-confirm-delete-standardProcedures"
            data-cy="entityConfirmDeleteButton"
            @click="removeStandardProcedures()"
          >
            Delete
          </button>
        </div>
      </template>
    </b-modal>
    <div v-show="standardProcedures && standardProcedures.length > 0">
      <div class="row justify-content-center">
        <jhi-item-count :page="page" :total="queryCount" :itemsPerPage="itemsPerPage"></jhi-item-count>
      </div>
      <div class="row justify-content-center">
        <b-pagination size="md" :total-rows="totalItems" v-model="page" :per-page="itemsPerPage"></b-pagination>
      </div>
    </div>
  </div>
</template>

<script lang="ts" src="./standard-procedures.component.ts"></script>
