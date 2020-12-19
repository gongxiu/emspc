<template>
  <div class="login-container">
    <el-form ref="form" :rules="rules" :model="form" label-width="70px" class="login-form" autoComplete="off" >
      <h2 class="login-title">EMS管理系统</h2>
      <el-form-item label="账号" prop="username" >
        <el-input v-model="form.username" autoComplete="off" tabindex="1" ref="username"  placeholder="请输入账号"></el-input>
      </el-form-item>
      <el-tooltip v-model="capsTooltip" content="Caps lock is On" placement="right" manual>
        <el-form-item label="密码" prop="password">
          <el-input
           v-model="form.password"
           :key="passwordType"
           ref="password"
           :type="passwordType"
           placeholder="请输入密码"
           name="password"
           tabindex="2"
           autoComplete="off"
           @keyup.native="checkCapslock"
           @blur="capsTooltip = false"></el-input>
           <span class="show-pwd" @click="showPwd">
            <svg-icon :icon-class="passwordType === 'password' ? 'eye' : 'eye-open'"/>
          </span>
        </el-form-item>

      </el-tooltip>

      <el-form-item label="验证码" >
        <div class="code">
          <el-input v-model="form.code" placeholder="请输入验证码"></el-input>
          <span></span>
        </div>
      </el-form-item>
      <div class="login-btn">
        <el-button type="primary" @click="submitForm('form')" :loading="loading">登录</el-button>
      </div>
    </el-form>
  </div>
</template>
<script>
  import {getrsapubkey,rsalogin} from '@/api/login'
  import md5 from '@/utils/md5'
  export default {
    data() {
      return {
        pubkey:'',
        passwordType: 'password',
        capsTooltip: false,
        loading:false,
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
    mounted() {
      this.getRs()
    },
    methods: {
      showPwd() {
        if (this.passwordType === 'password') {
          this.passwordType = ''
        } else {
          this.passwordType = 'password'
        }
        this.$nextTick(() => {
          this.$refs.password.focus()
        })
      },
      checkCapslock(e) {
        const { key } = e
        this.capsTooltip = key && key.length === 1 && (key >= 'A' && key <= 'Z')
      },
      getRs(){
        getrsapubkey().then(res=>{
          this.pubkey =res.data
        })
      },
      submitForm(formName) {
        /*this.$router.push({
          path:'/'
        })
        return;*/

        this.$refs[formName].validate(valid => {
          if (valid) {
            this.loading = true
            this.$jsEncrypt.setPublicKey(this.pubkey)
            console.log(this.$jsEncrypt.setPublicKey(this.pubkey))
            let loginInfo = {
              appId:'2167a4cb-466e-4efc-9679-880b0ec76dc6',
              account:this.form.username,
              password:md5(this.form.password),
              validCode:this.form.code,
              time:Math.round(new Date().getTime() / 1000),
              enStr:this.$jsEncrypt.encrypt(JSON.stringify({
                appId:'2167a4cb-466e-4efc-9679-880b0ec76dc6',
                account:this.form.username,
                password:md5(this.form.password),
                validCode:this.form.code,
                time:Math.round(new Date().getTime() / 1000),
              })),
            }
            this.$store.dispatch('Login', loginInfo)
              .then(() => {
                this.loading = false
                this.$router.push({ path: '/' })

              })
              .catch(() => {
                this.loading = false
              })
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
      /* border: 1px solid red; */
    }
  }
  .login-btn{
    display: flex;justify-content: center;
    margin-top: 80px;
  }
  .show-pwd {
     position: absolute;
     right: 10px;
     top: 0px;
     font-size: 16px;
     /* color: $dark_gray; */
     cursor: pointer;
     user-select: none;
    }
</style>
