<template>
  <div class="com-body">
    <el-form ref="ruleForm" :model="form" label-width="120px" size="small">
      <el-row :gutter="10">
        <el-col :span="24">
          <el-form-item label="维修状态：">
            <el-select v-model="form.status" style="width: 100%" placeholder="选择维修状态" filterable>
              <el-option
                v-for="(item,index) in testCheck"
                :key="index"
                :value="item.id"
                :label="item.label"
              />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-form-item label="抄送人：" >
            <select-tree v-model="form.ccPerson" :options="orgTree" :props="defaultProps"/>
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-form-item label="故障原因：" >
            <el-input
              type="textarea"
              v-model="form.remark"
              :autosize="{ minRows: 2}"
              placeholder="请输入内容"
              style="width: 100%"
            />
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-form-item label="故障处理过程：" >
            <el-input
              type="textarea"
              v-model="form.processRemark"
              :autosize="{ minRows: 2}"
              placeholder="请输入内容"
              style="width: 100%"
            />
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
  import Const from "@/utils/const"
  import selectTree from '@/components/selectTree/selecttree'
  export default {
    name: "editmy",
    components:{
      selectTree
    },
    data() {
      return {
        orgTree:Const.orgTree,
        testCheck:Const.testCheck,
        defaultProps: {
          children: "children",
          label: "title"
        },
        form: {
          status: '',//维修状态
          ccPerson: '',//抄送人
          remark: '',//原因
          processRemark: '',//处理过程
        }
      }
    }
  }
</script>

<style scoped>

</style>
