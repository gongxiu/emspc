<template>
  <div class="com-body">
    <el-form ref="ruleForm" :rules="rules" :model="form" label-width="120px" size="small">
      <el-row :gutter="10">
        <el-col :span="24">
          <el-form-item label="保养项目：" >
            <el-select v-model="form.mainItem" collapse-tags style="width: 100%"  multiple placeholder="请选择保养项目">
              <el-option
                v-for="item in testCheck"
                :key="item.value"
                :label="item.label"
                :value="item.id">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-form-item label="状态：" >
            <el-select v-model="form.status" style="width: 100%"  placeholder="请选择状态">
              <el-option
                v-for="item in testCheck"
                :key="item.value"
                :label="item.label"
                :value="item.id">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-form-item label="执行结果：">
            <el-input
              type="textarea"
              :autosize="{ minRows: 4, maxRows: 4 }"
              placeholder="请输入内容"
              v-model="form.matters"
            >
            </el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <div class="com-btn">
        <el-button type="" size="small" @click="$closFun('close')">取消</el-button>
        <el-button type="primary" size="small">确定</el-button>
      </div>
    </el-form>
  </div>
</template>

<script>
  import Const from '@/utils/const'
  export default {
    name: "editexecu",
    data(){
      return{
        testCheck:Const.testCheck,

        form:{
          mainItem:'',//保养项目
          status:'',//状态
          result:'',//结构
        },
        rules:{

        }
      }
    }
  }
</script>

<style scoped>

</style>
