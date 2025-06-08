<template>
  <div class="row justify-content-center">
    <div class="col-8">
      <form name="editForm" novalidate @submit.prevent="save()">
        <h2 id="microserviceGatewayApp.standardProcedures.home.createOrEditLabel" data-cy="StandardProceduresCreateUpdateHeading">
          Create or edit a Standard Procedures
        </h2>
        <div>
          <div class="form-group" v-if="standardProcedures.id">
            <label for="id">ID</label>
            <input type="text" class="form-control" id="id" name="id" v-model="standardProcedures.id" readonly />
          </div>
          <div class="form-group">
            <label class="form-control-label" for="standard-procedures-isActive">Is Active</label>
            <input
              type="checkbox"
              class="form-check"
              name="isActive"
              id="standard-procedures-isActive"
              data-cy="isActive"
              :class="{ valid: !v$.isActive.$invalid, invalid: v$.isActive.$invalid }"
              v-model="v$.isActive.$model"
              required
            />
            <div v-if="v$.isActive.$anyDirty && v$.isActive.$invalid">
              <small class="form-text text-danger" v-for="error of v$.isActive.$errors" :key="error.$uid">{{ error.$message }}</small>
            </div>
          </div>
          <div class="form-group">
            <label class="form-control-label" for="standard-procedures-specification">Specification</label>
            <textarea
              class="form-control"
              name="specification"
              id="standard-procedures-specification"
              data-cy="specification"
              :class="{ valid: !v$.specification.$invalid, invalid: v$.specification.$invalid }"
              v-model="v$.specification.$model"
              required
            ></textarea>
            <div v-if="v$.specification.$anyDirty && v$.specification.$invalid">
              <small class="form-text text-danger" v-for="error of v$.specification.$errors" :key="error.$uid">{{ error.$message }}</small>
            </div>
          </div>
          <div class="form-group">
            <label class="form-control-label" for="standard-procedures-userUUID">User UUID</label>
            <input
              type="text"
              class="form-control"
              name="userUUID"
              id="standard-procedures-userUUID"
              data-cy="userUUID"
              :class="{ valid: !v$.userUUID.$invalid, invalid: v$.userUUID.$invalid }"
              v-model="v$.userUUID.$model"
              required
            />
            <div v-if="v$.userUUID.$anyDirty && v$.userUUID.$invalid">
              <small class="form-text text-danger" v-for="error of v$.userUUID.$errors" :key="error.$uid">{{ error.$message }}</small>
            </div>
          </div>
        </div>
        <div>
          <button type="button" id="cancel-save" data-cy="entityCreateCancelButton" class="btn btn-secondary" @click="previousState()">
            <font-awesome-icon icon="ban"></font-awesome-icon>&nbsp;<span>Cancel</span>
          </button>
          <button
            type="submit"
            id="save-entity"
            data-cy="entityCreateSaveButton"
            :disabled="v$.$invalid || isSaving"
            class="btn btn-primary"
          >
            <font-awesome-icon icon="save"></font-awesome-icon>&nbsp;<span>Save</span>
          </button>
        </div>
      </form>
    </div>
  </div>
</template>
<script lang="ts" src="./standard-procedures-update.component.ts"></script>
