<template>
  <div class="com-body">
    <el-form ref="ruleForm" :rules="rules" :model="form" label-width="100px" size="small">
      <el-row :gutter="10">
        <el-col :span="8">
          <el-form-item label="项目名称：" prop="name">
            <el-input
              v-model="form.name"
              :clearable="true"
              placeholder="请输入项目名称"
              style="width: 100%"
            />
          </el-form-item>

        </el-col>
        <el-col :span="8">
          <el-form-item label="项目编码：" prop="proNo">
            <el-input
              v-model="form.proNo"
              :clearable="true"
              placeholder="请输入项目编码"
              style="width: 100%"
            />
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="保养人：" >
            <el-select v-model="form.mainPeople" collapse-tags style="width: 100%"  multiple placeholder="请选择保养人">
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
          <el-form-item label="项目要求：">
            <el-input
              type="textarea"
              :autosize="{ minRows: 4, maxRows: 4 }"
              placeholder="请输入内容"
              v-model="form.proReq"
            >
            </el-input>
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-form-item label="注意事项：">
            <el-input
              type="textarea"
              :autosize="{ minRows: 4, maxRows: 4 }"
              placeholder="请输入内容"
              v-model="form.matterItem"
            >
            </el-input>
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-form-item label="检查危险点：">
            <el-input
              type="textarea"
              :autosize="{ minRows: 4, maxRows: 4 }"
              placeholder="请输入内容"
              v-model="form.detectPoints"
            >
            </el-input>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
  </div>
</template>

<script>
  import Const from '@/utils/const'
  export default {
    name: "editIns",
    data(){
      return{
        testCheck:Const.testCheck,
        form:{
          proName:'',//项目名称
          proNo:'',//项目编码
          device:'',//绑定设备
          proReq:'',//项目要求
          matterItem:'',//注意事项
          detectPoints:'',//检测危险点
        },
        rules:{

        }
      }
    }
  }
</script>

<style lang="scss" scoped>

</style>
