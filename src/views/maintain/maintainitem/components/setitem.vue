<template>
  <div class="com-body">
    <el-form ref="ruleForm" :rules="rules" :model="form" label-width="120px" size="small">
      <el-row :gutter="10">
        <el-col :span="24">
          <el-form-item label="保养项：" >
            <el-select v-model="form.minItem" collapse-tags style="width: 100%"  multiple placeholder="请选择保养项">
              <el-option
                v-for="item in tempItem"
                :key="item.id"
                :label="item.name"
                :value="item.id">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-form-item label="执行人：" >
            <el-select v-model="form.executor" style="width: 100%"  placeholder="请选择执行人">
              <el-option
                v-for="item in userList"
                :key="item.id"
                :label="item.trueName"
                :value="item.id">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-form-item label="下次生效时间：" >
            <el-date-picker
              v-model="form.time"
              style="width: 100%;"
              type="datetime"
              placeholder="选择下次生效时间">
            </el-date-picker>
          </el-form-item>
        </el-col>
        <el-col :span="24">
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
      </el-row>
    </el-form>
    <div class="com-btn">
      <el-button type="" size="small" @click="$closFun('close')">取消</el-button>
      <el-button type="primary" size="small" @click="onSubmit">确定</el-button>
    </div>
  </div>
</template>

<script>
  import {getByUrlUpkeep} from '@/api/upkeep'
  export default {
    name: "setitem",
    props:{
      userList:{
        type:Array,
        default:[]
      }
    },
    data() {
      return {
        testCheck:[],
        tempItem:[],

        form:{
          minItem:'',//保养项
          executor:'',//执行人
          time:'',//下次生效时间
          consuming:'',//预计耗时
        },
        rules:{

        },

      }
    },
    mounted() {
      this.getKeepAll()
    },
    methods:{
      onSubmit(){

      },
      getKeepAll(){
        getByUrlUpkeep({

        }).then(res=>{
          this.tempItem = res.data
        })
      },
    }
  }
</script>

<style scoped>

</style>
