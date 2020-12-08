<template>
  <div class="com-body">
    <el-form
      ref="ruleForm"
      :rules="rules"
      :model="form"
      label-width="120px"
      size="small"
    >
      <el-row :gutter="10">
        <el-col :span="24">
          <el-form-item label="名称：" prop="name">
            <el-input
              v-model="form.name"
              :clearable="true"
              placeholder="请输入名称"
              style="width: 100%"
            />
          </el-form-item>
        </el-col>
        <el-col :span="24" >
          <el-form-item label="编码：" prop="code">
            <el-input
              v-model="form.code"
              :clearable="true"
              placeholder="请输入编码"
              style="width: 100%"
            />
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-form-item label="所属仓库："  prop="wareHouseId">
            <select-tree v-model="form.wareHouseId" size="small" placeholder="选择所属仓库" filterable :options="orgTree"
                         :props="defaultProps"/>
          </el-form-item>

        </el-col>
        <el-col :span="24">
          <el-form-item label="描述：" prop="describe">
            <el-input
              type="textarea"
              :autosize="{ minRows: 2, maxRows: 4 }"
              placeholder="请输入内容"
              v-model="form.describe"
            >
            </el-input>
          </el-form-item>
        </el-col>

      </el-row>
      <div class="com-btn">
        <el-button type="" size="small" @click="$closFun('close')"
        >取消</el-button
        >
        <el-button type="primary" size="small" @click="onSubmit()"
        >确定</el-button
        >
      </div>
    </el-form>
  </div>
</template>

<script>
  import Const from '@/utils/const'
  import selectTree from '@/components/selectTree/selecttree'
  export default {
    components:{
      selectTree
    },
    props:{
      data:{
        type:Object,
        default:null
      }
    },
    data() {
      return {
        testCheck:Const.testCheck,
        orgTree: Const.orgTree,
        defaultProps: {
          children: "children",
          label: "title"
        },
        form: {
          name: "", //名称
          code: "", //编码
          wareHouseId:'',//仓库id
          describe: "", //描述
        },
        rules: {
          name: [{ required: true, message: "必填", trigger: "blur" }],
          code: [{ required: true, message: "必填", trigger: "blur" }],
          wareHouseId:[{ required: true, message: "必填", trigger: "blur" }],
          describe: [{ required: true, message: "必填", trigger: "blur" }],
        },
      };
    },
    mounted() {
    },
    methods: {
      onSubmit(){

      }
    },
  };
</script>

<style scoped>
</style>
