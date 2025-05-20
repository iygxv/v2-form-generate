<template>
  <app-content title="模板管理">
    <div class="table-search">
      <el-card class="operate-container" shadow="never">
        <el-form :inline="true" :model="apiParams" class="search-form">
          <el-form-item label="模板名称">
            <el-input
              v-model="apiParams.templateName"
              placeholder="请输入模板名称"
              clearable
              @keyup.enter.native="getTemplateList"
            />
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="getTemplateList">查询</el-button>
          </el-form-item>
        </el-form>
      </el-card>
    </div>

    <app-table :data="tableData" :columns="tableColumns">
      <template #handle="{ row }">
        <el-button type="text" size="medium" @click="handleEdit(row)">
          编辑
        </el-button>
      </template>
    </app-table>
  </app-content>
</template>

<script>
export default {
  name: "appMain",
  data() {
    return {
      apiParams: {
        templateName: "",
      },
      tableData: [],
      tableColumns: [
        {
          prop: "templateName",
          label: "模板名称",
        },
        {
          prop: "templateType",
          label: "模板类型",
        },
        {
          prop: "templateName",
          label: "模板名称",
        },
        {
          prop: "templateName",
          label: "模板名称",
        },
        {
          label: '操作',
          slot: 'handle'
        }
      ],
    };
  },
  created() {
    this.getTemplateList();
  },
  methods: {
    async getTemplateList() { 
      let data = [
        {
          templateName: "默认模板",
        },
        {
          templateName: "动态模板",
        },
        {
          templateName: "静态模板",
        },
      ]
      data = data.filter((item) => item.templateName.includes(this.apiParams.templateName));
      this.tableData = data;
    },
    handleEdit(row) {
      console.log(row);
    }
  },
};
</script>

<style lang="scss" scoped>
.operate-container {
  margin-bottom: 20px;
  .search-form {
    display: flex;
    align-items: center;
    .el-form-item {
      margin-bottom: 0;
    }
  }
}
</style>
