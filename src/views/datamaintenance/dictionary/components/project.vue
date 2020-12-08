<template>
  <div class="com-body">
    <el-form ref="ruleForm" :rules="rules" :model="form" label-width="120px" size="small">
      <el-row :gutter="10">
        <el-col :span="24">
          <el-form-item label="字典类别名称：" prop="name">
           <!-- <el-input
              v-model="form.name"
              :clearable="true"
              placeholder="请输入字典类别名称"
              style="width: 100%"
            />-->
            <el-select v-model="form.name" style="width: 100%" placeholder="字典类别名称" filterable>
              <el-option
                v-for="(item,index) in cateArr"
                :key="index"
                :value="item.id"
                :label="item.name"
              />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-form-item label="名称：" prop="proName" >
            <el-input
              v-model="form.proName"
              :clearable="true"
              placeholder="请输入名称"
              style="width: 100%"
            />
          </el-form-item>
        </el-col>

        <el-col :span="24">
          <el-form-item label="代码："  prop="code">
            <el-input
              v-model="form.code"
              :clearable="true"
              placeholder="请输入字典类别代码"
              style="width: 100%"
            />
          </el-form-item>
        </el-col>
        <el-col :span="24" prop="seqNo">
          <el-form-item label="序号：">
            <el-input
              v-model="form.seqNo"
              :clearable="true"
              placeholder="请输入序号"
              style="width: 100%"
              type="number"
            />
          </el-form-item>
        </el-col>
        <el-col :span="24" >
          <el-form-item label="值：" prop="val">
            <el-input
              v-model="form.val"
              :clearable="true"
              placeholder="请输入值"
              style="width: 100%"
            />
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-form-item label="描述：" >
            <el-input
              type="textarea"
              :autosize="{ minRows: 2, maxRows: 4}"
              placeholder="请输入内容"
              v-model="form.describe">
            </el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <div class="com-btn">
        <el-button type="" size="small" @click="$closFun('close')">取消</el-button>
        <el-button type="primary" size="small" @click="onSubmit">确定</el-button>
      </div>
    </el-form>
  </div>
</template>

<script>
  import {addNewItem,updateItem} from '@/api/dicitem'
  import {getByUrl} from '@/api/diccate'
  export default {
    name: "category",
    props:{
      data:{
        type:Object,
        default:null
      }
    },
    data(){
      return{
        cateArr:[],
        form:{
          name:'',//字典类别名称
          code:'',//代码
          val:'',//值
          proName:'',//名称
          describe:'',//描述
          seqNo:'',//序号

        },
        rules:{
          name:[
            { required: true, message: '必填', trigger: 'blur' }
          ],
          code:[
            { required: true, message: '必填', trigger: 'blur' }
          ],
          proName:[
            { required: true, message: '必填', trigger: 'blur' }
          ],
          val:[
            { required: true, message: '必填', trigger: 'blur' }
          ],
          describe:[
            { required: true, message: '必填', trigger: 'blur' }
          ],
          seqNo:[{ required: true, message: "必填", trigger: "blur" }],
        }
      }
    },
    mounted() {
      console.log(this.data)
      if(this.data){
        this.form={
          name:this.data.cateId,
            code:this.data.code,
            val:this.data.value,
            proName:this.data.name,//名称
            describe:this.data.remark,//描述
            seqNo:this.data.seqNo
        }
      }
      this.getCate()
    },
    methods:{
      getCate(){
        getByUrl({
        }).then((res) => {
          this.cateArr = res.data

        });
      },
      onSubmit(){
        console.log(123)
        this.$refs['ruleForm'].validate((valid) => {
          console.log(valid)
          if (valid) {
            if(!this.data){
              addNewItem({
                cateId:this.form.name,
                code:this.form.code,
                name:this.form.proName,
                remark:this.form.describe,
                value:this.form.val,
                seqNo:this.form.seqNo
              }).then(res=>{
                this.$emit('close')
                this.$message.success(res.msg)
              })
            }else {
              updateItem({
                id:this.data.id,
                cateId:this.form.name,
                code:this.form.code,
                name:this.form.proName,
                remark:this.form.describe,
                value:this.form.val,
                seqNo:this.form.seqNo
              }).then(res=>{
                this.$emit('close')
                this.$message.success(res.msg)
              })
            }
          }
        })

      }
    }
  }
</script>

<style scoped>

</style>
