<template>
  <div class="container mt-4">
    <h2 class="mb-4">规范流程</h2>
    <div class="row">
      <div v-for="item in procedures" :key="item.id" class="col-md-6 col-lg-4 mb-4">
        <div class="card border-primary shadow-sm h-100" @click="openModal(item)" style="cursor: pointer">
          <div class="card-header" :class="{ 'bg-primary': item.isActive, 'bg-secondary': !item.isActive }">
            <h5 class="card-title mb-0 text-white">流程详情</h5>
          </div>
          <div class="card-body">
            <p class="card-text">{{ item.specification }}</p>
          </div>
          <div class="card-footer bg-transparent">
            <!-- 用户ID已隐藏 -->
          </div>
        </div>
      </div>
    </div>

    <!-- 模态框 -->
    <div v-if="showModal" class="modal fade show" tabindex="-1" style="display: block" @click="closeModal">
      <div class="modal-dialog modal-lg" @click.stop>
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">
              <i class="fas fa-cog me-2"></i>
              流程详情
            </h5>
            <button type="button" class="btn-close" @click="closeModal"></button>
          </div>
          <div class="modal-body">
            <form v-if="selectedProcedure">
              <div class="row">
                <div class="col-md-12">
                  <div class="mb-3">
                    <label class="form-label">状态</label>
                    <select class="form-select" v-model="editData.isActive">
                      <option :value="true">激活</option>
                      <option :value="false">禁用</option>
                    </select>
                  </div>
                </div>
              </div>

              <div class="mb-3">
                <label class="form-label">规范说明</label>
                <textarea class="form-control" rows="4" v-model="editData.specification" placeholder="请输入规范说明..."> </textarea>
              </div>
            </form>
          </div>
          <div class="modal-footer d-flex justify-content-between">
            <button type="button" class="btn btn-danger" @click="deleteProcedure">
              <i class="fas fa-trash me-1"></i>
              删除
            </button>
            <div>
              <button type="button" class="btn btn-secondary me-2" @click="closeModal">
                <i class="fas fa-times me-1"></i>
                取消
              </button>
              <button type="button" class="btn btn-primary" @click="saveProcedure">
                <i class="fas fa-save me-1"></i>
                保存
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 模态框背景遮罩 -->
    <div v-if="showModal" class="modal-backdrop fade show"></div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

interface Procedure {
  id: number;
  isActive: boolean;
  specification: string;
  createdAt?: string;
  updatedAt?: string;
}

export default defineComponent({
  name: 'UserStandardProcedures',
  data() {
    return {
      procedures: [
        {
          id: 1501,
          isActive: true,
          specification: '测试',
        },
        {
          id: 1502,
          isActive: true,
          specification: '测试',
        },
      ] as Procedure[],
      showModal: false,
      selectedProcedure: null as Procedure | null,
      editData: {
        isActive: true,
        specification: '',
      },
    };
  },
  methods: {
    openModal(procedure: Procedure) {
      this.selectedProcedure = procedure;
      this.editData = {
        isActive: procedure.isActive,
        specification: procedure.specification,
      };
      this.showModal = true;
      // 防止页面滚动
      document.body.style.overflow = 'hidden';
    },

    closeModal() {
      this.showModal = false;
      this.selectedProcedure = null;
      this.editData = {
        isActive: true,
        specification: '',
      };
      // 恢复页面滚动
      document.body.style.overflow = 'auto';
    },

    saveProcedure() {
      if (this.selectedProcedure) {
        // 更新数据
        const index = this.procedures.findIndex(p => p.id === this.selectedProcedure!.id);
        if (index !== -1) {
          this.procedures[index] = {
            ...this.procedures[index],
            isActive: this.editData.isActive,
            specification: this.editData.specification,

            updatedAt: new Date().toLocaleString('zh-CN'),
          };
        }

        // 这里可以添加API调用来保存到服务器
        console.log('保存流程数据:', this.editData);

        // 显示成功提示（可选）
        alert('保存成功！');

        this.closeModal();
      }
    },

    deleteProcedure() {
      if (this.selectedProcedure && confirm('确定要删除这个流程吗？此操作不可撤销！')) {
        // 从数组中移除
        this.procedures = this.procedures.filter(p => p.id !== this.selectedProcedure!.id);

        // 这里可以添加API调用来删除服务器数据
        console.log('删除流程:', this.selectedProcedure.id);

        // 显示成功提示（可选）
        alert('删除成功！');

        this.closeModal();
      }
    },
  },

  // 组件销毁时清理
  unmounted() {
    document.body.style.overflow = 'auto';
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

/* 模态框样式 */
.modal {
  z-index: 1050;
}

.modal-backdrop {
  z-index: 1040;
}

.modal-content {
  border-radius: 12px;
  border: none;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
}

.modal-header {
  background: linear-gradient(135deg, #007bff, #0056b3);
  color: white;
  border-bottom: none;
  border-top-left-radius: 12px;
  border-top-right-radius: 12px;
}

.modal-header .btn-close {
  filter: invert(1);
}

.modal-body {
  padding: 2rem;
}

.modal-footer {
  border-top: 1px solid #e9ecef;
  padding: 1rem 2rem;
}

.form-label {
  font-weight: 600;
  color: #495057;
  margin-bottom: 0.5rem;
}

.form-control,
.form-select {
  border-radius: 8px;
  border: 1px solid #ced4da;
  transition:
    border-color 0.15s ease-in-out,
    box-shadow 0.15s ease-in-out;
}

.form-control:focus,
.form-select:focus {
  border-color: #007bff;
  box-shadow: 0 0 0 0.2rem rgba(0, 123, 255, 0.25);
}

.btn {
  border-radius: 8px;
  font-weight: 500;
  padding: 0.5rem 1.2rem;
  transition: all 0.2s ease;
}

.btn:hover {
  transform: translateY(-1px);
}

.btn-primary {
  background: linear-gradient(135deg, #007bff, #0056b3);
  border: none;
}

.btn-secondary {
  background: linear-gradient(135deg, #6c757d, #545b62);
  border: none;
}
</style>
