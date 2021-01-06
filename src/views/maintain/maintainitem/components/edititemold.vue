<template>
  <div class="com-body">
    <el-form ref="ruleForm" :rules="rules" :model="form" label-width="120px" size="small">
      <el-row :gutter="10">
        <el-col :span="8">
          <el-form-item label="项目名称：" >
            <el-input
              v-model="form.name"
              :clearable="true"
              placeholder="请输入项目名称"
              style="width: 100%"
            />
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="项目编码：" >
            <el-input
              v-model="form.no"
              :clearable="true"
              placeholder="请输入项目编码"
              style="width: 100%"
            />
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="绑定设备：" >
            <el-select v-model="form.device" collapse-tags style="width: 100%"  multiple placeholder="请选择绑定设备">
              <el-option
                v-for="item in testCheck"
                :key="item.value"
                :label="item.label"
                :value="item.id">
              </el-option>
            </el-select>
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
        <el-col :span="8">
          <el-form-item label="保养频次类型：">
            <el-select v-model="form.frequencyType" style="width: 100%" placeholder="选择保养频次类型" filterable>
              <el-option
                v-for="(item,index) in testCheck"
                :key="index"
                :value="item.id"
                :label="item.label"
              />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="保养频次：" >
              <el-input
                v-model="form.frequency"
                :clearable="true"
                placeholder="请输入频次"
                style="width: 100%"
                type="number"
              />
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="起始时间：" >
            <el-date-picker
              v-model="form.startTime"
              style="width: 100%;"
              type="datetime"
              placeholder="选择起始时间">
            </el-date-picker>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="预计耗时：" >
            <el-input
              v-model="form.consumTime"
              :clearable="true"
              placeholder="请输入预计耗时"
              style="width: 100%"
              type="number"
            />
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-form-item label="项目要求：">
            <el-input
              type="textarea"
              :autosize="{ minRows: 4, maxRows: 4 }"
              placeholder="请输入内容"
              v-model="form.requirements"
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
              v-model="form.matters"
            >
            </el-input>
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-form-item label="描述：">
            <el-input
              type="textarea"
              :autosize="{ minRows: 4, maxRows: 4 }"
              placeholder="请输入内容"
              v-model="form.describe"
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
    name: "edititem",
    data() {
      return {
        testCheck:Const.testCheck,

        form:{
          name:'',//项目要求
          no:'',//项目编号
          device:'',//设备
          mainPeople:'',//保养人
          frequencyType:'',//频率类型
          frequency:'',//频率次数
          startTime:'',//开始时间
          consumTime:'',//耗时
          requirements:'',//项目要求
          matters:'',//注意事项
          describe:'',//描述
        },
        rules:{}
      }
    }
  }
</script>

<style scoped>

</style>
