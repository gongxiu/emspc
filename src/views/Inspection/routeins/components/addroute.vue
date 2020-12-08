<template>
  <div class="com-body">
    <el-form ref="ruleForm" :rules="rules" :model="form" label-width="120px" size="small">
      <el-row :gutter="10">
        <el-col :span="24">
          <el-form-item label="路线编码：" prop="no">
            <el-input
              v-model="form.no"
              :clearable="true"
              placeholder="请输入路线编码"
              style="width: 100%"
            />
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-form-item label="路线名称：" prop="name">
            <el-input
              v-model="form.name"
              :clearable="true"
              placeholder="请输入路线名称"
              style="width: 100%"
            />
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-form-item label="所属机构：" prop="mechanismId">
            <select-tree v-model="form.mechanismId" :width="'100%'" :options="orgTree" :props="defaultProps"/>
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-form-item label="状态：" prop="status">
            <el-select v-model="form.status" style="width: 100%" placeholder="选择设备类型" filterable>
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
          <el-form-item label="备注：" >
            <el-input
              type="textarea"
              v-model="form.remark"
              :autosize="{ minRows: 4}"
              placeholder="请输入内容"
              style="width: 100%"
            />
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <div class="com-btn">
      <el-button type="" size="small" @click="$closFun('close')">取消</el-button>
      <el-button type="primary" size="small">确定</el-button>
    </div>
  </div>
</template>

<script>
  import Const from '@/utils/const'
  import selectTree from '@/components/selectTree/selecttree'
  export default {
    name: "addroute",
    components:{
      selectTree
    },
    data(){
      return{
        orgTree:Const.orgTree,
        testCheck:Const.testCheck,
        defaultProps: {
          children: "children",
          label: "title"
        },

        form:{
          mechanismId:'',//机构id
          name:'',//路线名称
          no:'',//路线编码
          status:'',//状态
          remark:''//备注
        },
        rules:{
          mechanismId:{ required: true, message: '必填', trigger: 'blur' },//机构id
          name:{ required: true, message: '必填', trigger: 'blur' },//路线名称
          no:{ required: true, message: '必填', trigger: 'blur' },//路线编码
          status:{ required: true, message: '必填', trigger: 'blur' },//状态
          remark:{ required: true, message: '必填', trigger: 'blur' }//备注
        },
      }
    }
  }
</script>

<style lang="scss" scoped>


</style>
