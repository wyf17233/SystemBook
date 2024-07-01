<template>
  <div class="main">
    <el-row>
      <el-col :span="12">
        <el-input
          v-model="searchVal"
          placeholder="请输入要搜索的关键字"
          class="input-with-select"
          @keyup.enter="enterSearch"
        >
        </el-input>
      </el-col>
      <el-col :span="12">
        <el-button type="primary" @click="load">查询</el-button>
        <el-button type="primary" @click="openAdd">新增</el-button>
      </el-col>
    </el-row>
    <el-table :data="tableData.datas" style="width: 100%">
      <el-table-column fixed type="index" width="50" />
      <el-table-column prop="BookName" label="书名" width="180" />
      <el-table-column prop="Author" label="作者" width="180" />
      <el-table-column prop="TypeName" label="类别" />
      <el-table-column prop="Remarks" label="备注" />
      <el-table-column fixed="right" label="操作">
        <template #default="scope">
          <el-button
            link
            type="primary"
            size="small"
            @click="handleEdit(scope.$index, scope.row)"
            >Edit</el-button
          >
          <el-button
            link
            type="danger"
            size="small"
            @click="handleDelete(scope.$index, scope.row)"
          >
            delete
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      class="el-page"
      v-model:current-page="page"
      v-model:page-size="limit"
      :disabled="false"
      layout="total, sizes, prev, pager, next, jumper"
      :total="tableData.total"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
    />
  </div>
  <!-- 向子组件传递数据 -->
  <add :isShow="isShow" :info="info" @closeAdd="closeAdd" @success="success"></add>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import add from "./components/add.vue";
import { getBooks, delBook } from "./api/index";
import { ElMessage } from "element-plus";

const searchVal = ref();
const tableData = ref([]);
const isShow = ref(false);
const info = ref({});
const page = ref(1);
const limit = ref(10);
const enterSearch = async () => {
  await load();
};
const load = async () => {
  let data = await getBooks(page.value, limit.value, searchVal.value);
  tableData.value = data;
};
const openAdd = () => {
  isShow.value = true;
};

const closeAdd = () => {
  isShow.value = false;
  info.value = {};
};
const success = async (msg:string)=>{
  isShow.value = false
  info.value = {}
  ElMessage({
    message: msg,
    type: "success",
    plain: true,
  });
  await load()
}

const handleEdit = (index: number, row: any) => {
  info.value = row;
  isShow.value = true;
};
const handleDelete = async (index: number, row: any) => {
  const msg = (await delBook(row.id)).data;
  ElMessage({
    message: msg,
    type: "success",
    plain: true,
  });
  await load();
};
const handleSizeChange = async (val: number) => {
  limit.value = val;
  await load();
};
const handleCurrentChange = async (val: number) => {
  page.value = val;
  await load();
};
onMounted(async () => {
  await load();
});
</script>

<style scoped>
.main {
  width: 60%;
  margin: 100px auto;
}
.el-button {
  margin-left: 12px;
}
.el-page {
  margin: 10px 80px;
}
</style>
