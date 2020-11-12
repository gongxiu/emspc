<template>
  <div class="login-container">
    <el-form ref="form" :rules="rules" :model="form" label-width="70px" class="login-form">
      <h2 class="login-title">EMS管理系统</h2>
      <el-form-item label="用户名" prop="username">
        <el-input v-model="form.username"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input v-model="form.password"></el-input>
      </el-form-item>
      <el-form-item label="验证码" prop="code">
        <div class="code">
          <el-input v-model="form.code"></el-input>
          <span></span>
        </div>
      </el-form-item>
      <div class="login-btn">
        <el-button type="primary" @click="submitForm('form')">登录</el-button>
      </div>
    </el-form>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        form: {
          username: "",
          password: "",
          code:''
        },
        rules: {
          username: [
            {required: true, message: "用户名不能为空", trigger: 'blur'},
          ],
          password: [
            {required: true, message: "密码不能为空", trigger: 'blur'},
            {min: 6, message: "密码大于六位", trigger: 'blur'}
          ],
          code: [
            {required: true, message: "验证码不能为空", trigger: 'blur'},
          ],
        }
      };
    },
    methods: {
      submitForm(formName) {
        this.$router.push({
          path:'/'
        })
        return;
        this.$refs[formName].validate(valid => {
          // console.log(valid) 验证通过为true，有一个不通过就是false
          if (valid) {
            // 通过的逻辑
          } else {
            console.log('验证失败');
            return false;
          }
        });
      }
    }
  };
</script>

<style scoped lang="scss">
  .login-form {
    width: 400px;
    /*margin: 160px auto; !* 上下间距160px，左右自动居中*!*/
    height: 450px;
    position: absolute;
    right: 240px;
    top: 50%;
    margin-top: -230px;
    background-color: rgba(0, 0,0,0.4); /* 透明背景色 */
    padding: 30px;
    border-radius: 20px; /* 圆角 */
  }

  /* 背景 */
  .login-container {
    position: absolute;
    width: 100%;
    height: 100%;
    background: url("../../assets/images/loginbg.jpg");
    background-size: 100% 100%;
  }

  /* 标题 */
  .login-title {
    color: #fff;
    text-align: center;
  }
  .code{
    display: flex;
    span{
      display: inline-block;
      width: 100px;
      border: 1px solid red;
    }
  }
  .login-btn{
    display: flex;justify-content: center;
    margin-top: 80px;
  }
</style>
