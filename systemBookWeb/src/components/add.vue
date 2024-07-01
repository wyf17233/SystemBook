<template>
  <el-dialog
    v-model="dialogFormVisible"
    title="增改图书"
    width="30%"
    draggable
    :before-close="($event) => closeAdd(ruleFormRef)"
  >
    <el-form :model="form" label-width="60px" ref="ruleFormRef" :rules="rules">
      <el-form-item label="书名" prop="BookName">
        <el-input v-model="form.BookName" />
      </el-form-item>
      <el-form-item label="作者" prop="Author">
        <el-input v-model="form.Author" />
      </el-form-item>
      <el-form-item label="类别" prop="TypeName">
        <el-input v-model="form.TypeName" />
      </el-form-item>
      <el-form-item label="备注" prop="Remarks">
        <el-input v-model="form.Remarks" />
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="($event) => closeAdd(ruleFormRef)">Cancel</el-button>
        <el-button type="primary" @click="($event) => save(ruleFormRef)"
          >Confirm</el-button
        >
      </span>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
import { ref, computed, reactive, watch, onUpdated, onDeactivated } from "vue";
import { FormInstance, FormRules } from "element-plus";
import { addBook, updateBook } from "../api/index";
//从父组件传递过来的值
const props = defineProps({
  isShow: Boolean,
  info: Object,
});
const dialogFormVisible = computed(() => props.isShow);
const form = ref({
  id: 0,
  BookName: "",
  Author: "",
  TypeName: "",
  Remarks: "",
});
const ruleFormRef = ref<FormInstance>();
const rules = reactive<FormRules>({
  BookName: [{ required: true, message: "请输入书名", trigger: "blur" }],
  Author: [{ required: true, message: "请输入作者", trigger: "blur" }],
  TypeName: [{ required: true, message: "请输入类别", trigger: "blur" }],
});
const emits = defineEmits(["closeAdd", "success"]);
const closeAdd = (formEl: FormInstance | undefined) => {
  if (!formEl) {
    return;
  }
  formEl.resetFields();
  emits("closeAdd");
};
const save = (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  formEl.validate(async (valid) => {
    if (valid) {
      let { id, ...obj } = form.value;
      //有id为修改
      if (form.value.id !== 0) {
        const result = await updateBook(id, obj);
        if (result.data[0]) {
          emits("success", "修改成功");
        }
        //无id为添加
      } else {
        await addBook(obj).then(resp=>{
          if(resp.data){
            emits("success","添加成功")
          }
        })
      }
    } else {
      console.log("error submit!");
    }
  });
};

onUpdated(() => {
  form.value = {
    id: props.info.id ? props.info.id : 0,
    BookName: props.info.BookName ? props.info.BookName : "",
    Author: props.info.Author ? props.info.Author : "",
    TypeName: props.info.TypeName ? props.info.TypeName : "",
    Remarks: props.info.Remarks ? props.info.Remarks : "",
  };
});
watch(props.info, (newInfo) => {
  if (newInfo) {
    form.value = {
      Id: newInfo.Id,
      BookName: newInfo.BookName,
      Author: newInfo.Author,
      TypeName: newInfo.TypeName,
      Remarks: newInfo.Remarks,
    };
  }
});
</script>

<style>
</style>