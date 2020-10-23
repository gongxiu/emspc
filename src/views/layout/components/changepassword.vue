
<template>
  <div>
    <el-form ref="form" :rules="addRules" :model="form" label-width="80px" size="small" >
      <el-form-item label="旧密码" prop="oldPassword" label-width="100px">
        <el-input
          :type="pwdType"
          v-model="form.oldPassword"
          name="password"
          auto-complete="off"
          placeholder="请输入旧密码"
        />
      </el-form-item>
      <el-form-item label="新密码" prop="newPassword" label-width="100px">
        <el-input
          :type="pwdType"
          v-model="form.newPassword"
          name="password"
          auto-complete="off"
          placeholder="请输入新密码"
        />
      </el-form-item>
      <el-form-item label="确认新密码" prop="rePassword" label-width="100px">
        <el-input
          :type="pwdType"
          v-model="form.rePassword"
          name="password"
          auto-complete="off"
          placeholder="请确认新密码"
        />
      </el-form-item>
      <div class="btn-con">
        <el-button type="primary" @click="submitForm()">确认修改</el-button>
      </div>
    </el-form>
    
  </div>
</template>
<script>
import request3 from '@/utils/request3'
import md5 from '@/utils/md5'
export default {
  data(){
    return{
      pwdType: 'password',
      form:{
        oldPassword:'',
        newPassword:'',
        rePassword:'',
      },
      addRules: {
        oldPassword: [
          { required: true, message: '必填', trigger: 'blur' }
        ],
        newPassword: [
          { required: true, message: '必填', trigger: 'blur' }
        ],
        rePassword: [
          { required: true, message: '必填', trigger: 'blur' }
        ]
      },

    }
    
  },
  mounted(){

  },
  methods:{
    submitForm(){
      this.$refs.form.validate((valid) => {
        request3({
          url: 'user/changepwd',
          method: 'post',
          params: {
            oldPassword:md5(this.form.oldPassword),
            newPassword: md5(this.form.newPassword),
            rePassword: md5(this.form.rePassword),
          }
        }).then(res => {
          if(res.status == 200){
            this.$message.success(res.msg)
            this.$emit('success')
          }else{
            this.$message.error(res.msg)
          }
        })
      })
    }
  }
}
</script>
<style >
.input-con{
  margin-bottom: 30px
}
.btn-con{
  display: flex;
  justify-content: center;
}
</style>