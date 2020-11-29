<template>
  <div class="com-body">
    <el-form ref="ruleForm" :rules="rules" :model="form" label-width="120px" size="small">
      <el-row :gutter="10">

        <el-col :span="8">
          <el-form-item label="所属机构">
            <select-tree  placeholder="请选择" v-model="form.institutionsId" :size="'small'"
                          :options="dataTest"
                          :props="defaultProps"/>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="使用路线">
            <el-select v-model="form.route"  size="small" style="width: 100%;" placeholder="请选择使用路线" filterable>
              <el-option v-for="(item,index) in testCheck" :key="index" :value="item.id"
                         :label="item.label" />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="任务名称：">
            <el-input
              v-model="form.applyTitle"
              :clearable="true"
              placeholder="请输入任务名称"
              style="width: 100%"
            />
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="执行人">
            <el-select v-model="form.route"  size="small" style="width: 100%;" placeholder="请选择使用路线" filterable>
              <el-option v-for="(item,index) in testCheck" :key="index" :value="item.id"
                         :label="item.label" />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="抄送人">
            <el-select v-model="form.ccPeople"  multiple collapse-tags size="small" style="width: 100%;" placeholder="请选择抄送人"
                       filterable>
              <el-option v-for="(item,index) in testCheck" :key="index" :value="item.id"
                         :label="item.label" />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="状态">
            <el-select v-model="form.status"  size="small" style="width: 100%;" placeholder="请选择状态" filterable>
              <el-option v-for="(item,index) in testCheck" :key="index" :value="item.id"
                         :label="item.label" />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="频次类别">
            <el-select v-model="form.frequencyType"  size="small" style="width: 100%;" placeholder="请选择频次类别" filterable>
              <el-option v-for="(item,index) in testCheck" :key="index" :value="item.id"
                         :label="item.label" />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="频次：">
            <el-input
              v-model="form.frequency"
              :clearable="true"
              placeholder="请输入频次"
              style="width: 100%"
            />
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="生效时间：" >
            <el-date-picker
              v-model="form.effectiveTime"
              style="width: 100%;"
              type="datetime"
              placeholder="选择生效时间">
            </el-date-picker>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="预计耗时：">
            <el-input
              v-model="form.consuming"
              :clearable="true"
              placeholder="请输入预计耗时"
              style="width: 100%"
            />
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
    name: "editconfig",
    components:{
      selectTree
    },
    data(){
      return{
        testCheck:Const.testCheck,
        dataTest:Const.testData,
        defaultProps: {
          children: "children",
          label: "label"
        },
        form:{
          institutionsId:'',//机构id
          route:'',//路线
          name:'',//名称
          executor:'',//执行人
          ccPeople:'',//抄送人
          status:'',//状态
          frequencyType:'',//频次类别
          frequency:'',//频次
          effectiveTime:'',//生效日期
          consuming:'',//耗时
          describe:'',//描述

        },
        rules:{}
      }
    }
  }
</script>

<style scoped>

</style>
