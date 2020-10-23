<template>
  <div class="forget-pass">
    <div class="wrap">
      <div class="body">
        <div class="forget-container">
          <h1>找回密码</h1>
          <el-steps
            :active="activeIndex"
            align-center
            style="margin-bottom:90px;"
          >
            <el-step title="信息验证" />
            <el-step title="修改密码" />
            <el-step title="完成修改" />
          </el-steps>
          <el-form
            ref="form"
            :rules="rules"
            :model="form"
          >
            <div
              v-loading="loadingVisible"
              v-if="activeIndex==1"
            >
              <el-form-item
                label=""
                prop="mobile"
                label-width=""
              >
                <el-input
                  v-model="form.mobile"
                  placeholder="手机号"
                  type="number"
                  oninput="if(value.length>1)value=value.slice(0,11)"
                />
              </el-form-item>
              <el-form-item
                label=""
                prop="mcode"
                label-width=""
              >
                <el-input
                  v-model="form.mcode"
                  placeholder="验证码"
                />
                <a
                  class="get-check-code-btn"
                  @click="getMcode"
                >{{ mcodeStr }}</a>
              </el-form-item>
              <el-form-item>
                <el-button
                  class="button"
                  style="width:100%;height:50px;"
                  @click.native.prevent="checkMobile"
                  type="primary"
                >
                  下一步
                </el-button>
              </el-form-item>
            </div>
            <div
              v-loading="loadingVisible"
              v-if="activeIndex==2"
            >
              <el-form-item
                label=""
                prop="passWord"
                label-width=""
              >
                <el-input
                  v-model="form.passWord"
                  type="password"
                  placeholder="登录密码 6位以上字母或数字"
                />
              </el-form-item>
              <el-form-item
                label=""
                prop="passWord2"
                label-width=""
              >
                <el-input
                  v-model="form.passWord2"
                  type="password"
                  placeholder="确认密码"
                />
              </el-form-item>
              <el-form-item>
                <el-button
                  class="button"
                  style="width:100%;height:50px;"
                  @click.native.prevent="resetPass"
                  type="primary"
                >
                  重置密码
                </el-button>
              </el-form-item>
            </div>
            <div
              v-loading="loadingVisible"
              v-if="activeIndex==3"
              style="color:#fff"
            >
              <div class="success">密码设置成功，开始体验</div>
              <el-button
                class="button"
                style="width:100%;height:50px;"
                @click.native.prevent="loginPass"
                type="primary"
              >
                登录
              </el-button>
            </div>
          </el-form>
        </div>
      </div>
      <div class="footer">
        <label>有车有货(深圳)科技有限公司</label>
        <span style="padding:0 20px;">Copyritght © 2018 有车有货 All Rights Reserve</span>
      </div>
    </div>
  </div>
</template>
<script>
import request from '@/utils/request'
import md5 from '@/utils/md5'
export default {
  name: 'ForgetPass',
  data() {
    const validateMobile = (rule, value, callback) => {
      if (value.toString().length !== 11) {
        callback(new Error('手机号为11位'))
      } else {
        callback()
      }
    }
    var validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'))
      } else if (value.length < 6) {
        callback(new Error('密码为6位以上字母或数字'))
      } else {
        if (this.form.passWord2 !== '') {
          this.$refs.form.validateField('passWord2')
        }
        callback()
      }
    }
    var validatePass2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'))
      } else if (value !== this.form.passWord) {
        callback(new Error('两次输入密码不一致!'))
      } else {
        callback()
      }
    }
    return {
      form: {
        mobile: '',
        mcode: '',
        passWord: '',
        passWord2: ''
      },
      mcodeStr: '获取验证码',
      mcodeStatus: 0,
      rules: {
        mobile: [{ required: true, validator: validateMobile, trigger: 'blur' }],
        mcode: [
          { required: true, message: '请填短信验证码', trigger: 'blur' }
        ],
        passWord: [{ validator: validatePass, trigger: 'blur' }],
        passWord2: [{ validator: validatePass2, trigger: 'blur' }]
      },
      loading: false,
      pwdType: 'password',
      activeIndex: 1,
      loadingVisible: false
    }
  },
  methods: {
    showPwd() {
      if (this.pwdType === 'password') {
        this.pwdType = ''
      } else {
        this.pwdType = 'password'
      }
    },
    checkMobile() {
      this.$refs.form.validate(valid => {
        if (valid) {
          this.loadingVisible = true
          request({
            url: 'user/checkFoRretrieve',
            method: 'post',
            params: {
              ...this.form
            }
          }).then(res => {
            this.loadingVisible = false
            this.activeIndex++
          }).catch(e => {
            this.loadingVisible = false
          })
        }
      })
    },
    resetPass() {
      this.$refs.form.validate(valid => {
        if (valid) {
          this.loadingVisible = true
          request({
            url: 'user/updateForRretrieve',
            method: 'post',
            params: {
              ...this.form,
              passWord: md5(this.form.passWord),
              passWord2: ''
            }
          }).then(res => {
            this.activeIndex++
            this.$message({
              message: '密码重置成功',
              type: 'success'
            })
            setTimeout(() => {
              this.$store.dispatch('Login', {
                username: this.form.mobile,
                password: this.form.passWord
              }).then(() => {

              }).catch(() => {
                this.loadingVisible = false
              })
            }, 1000)
          }).catch(e => {
            this.loadingVisible = false
          })
        }
      })
    },
    loginPass() {
      this.loadingVisible = false
      let userId = localStorage.getItem('companyUserId')
      if(userId == undefined){
         this.$router.push({ path: '/' })
      }else{
        this.$router.push({
           path: '/login',
           query:{
             userId:userId
           }
         })
      }

    },
    getMcode() {
      if (this.mcodeStatus === 0) {
        this.$refs.form.validateField('mobile', (valid) => {
          if (valid === '') {
            const a = parseInt(this.form.mobile.substring(3, 7))
            const b = a << 3 | a << 4 & a << 5
            const checkCode = this.form.mobile % b
            this.loadingVisible = true
            request({
              url: 'user/getCodeByMobile',
              method: 'get',
              params: {
                mobile: this.form.mobile,
                serviceName: 'retrieve',
                checkCode
              }
            }).then(res => {
              this.loadingVisible = false
              this.mcodeStatus = 1
              let i = 60
              this.mcodeStr = i + 's后获取'
              const interval = setInterval(() => {
                this.mcodeStr = --i + 's后获取'
                if (i <= 0) {
                  clearInterval(interval)
                  this.mcodeStatus = 0
                  this.mcodeStr = '重新获取'
                }
              }, 1000)
              this.$message({
                message: '验证码发送成功',
                type: 'success'
              })
            }).catch(e => {
              this.loadingVisible = false
            })
          }
        })
      }
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" >
.forget-pass {
  display: flex;
  flex-direction: column;
  min-height: 100%;
  .wrap {
    width: 100%;
    height: 100%;
    min-width: 900px;
    background: linear-gradient(to bottom, #2f323c, #13151c);
    flex: 1;
  }
  .footer {
    min-width: 900px;
    width: 100%;
    margin: 190px 0 56px 0;
    text-align: center;
    font-size: 16px;
    span {
      color: #979797;
      display: block;
      line-height: 22px;
      letter-spacing: 1px;
    }
    label {
      color: #d8d8d8;
      display: block;
      margin-bottom: 21px;
      line-height: 22px;
      letter-spacing: 2px;
    }
  }
  .body {
    margin: 0 auto;
    position: relative;
    padding: 100px 0;
    overflow: hidden;
  }
}
$bg: #2d3a4b;
$light_gray: #eee;
.forget-container {
  width: 520px;
  height: 470px;
  padding: 36px 53px 23px;
  // box-shadow: 0 4px 8px 0 rgba(0,0,0,.06);
  margin: 0 auto;
  border-radius: 8px;
  h1 {
    color: #ffffff;
    text-align: center;
    font-size: 20px;
    margin-bottom: 50px;
    font-weight: normal;
  }
  .el-step__icon.is-text {
    border: 1px solid;
  }
  .el-step.is-horizontal .el-step__line {
    height: 1px;
    overflow: hidden;
  }
  .el-step__icon-inner {
    font-size: 20px;
    font-weight: normal;
    color: #4a4a4a;
  }
  .el-steps--horizontal {
    margin-left: -54px;
    margin-right: -54px;
  }
  .el-step.is-horizontal .el-step__line {
    top: 17px;
  }
  .el-step__icon {
    width: 48px;
    height: 48px;
  }
  .el-step__head.is-process {
    color: #ccc;
  }
  .el-step__title.is-process {
    font-weight: normal;
    color: #ccc;
  }
  .get-check-code-btn {
    display: block;
    position: absolute;
    right: 8px;
    top: 8px;
    height: 28px;
    line-height: 28px;
    color: #999;
    padding: 2px 4px 2px 10px;
    box-sizing: border-box;
    border-left: 1px solid #999;
  }
  .el-form {
    padding: 0 88px;
  }
  .el-form-item__content {
    margin-bottom: 60px;
  }
  .el-input input {
    height: 44px;
    line-height: 44px;
  }
}
.button {
  border: 0;
  width: 340px;
  height: 44px;
  font-size: 18px;
  font-weight: bold;
  letter-spacing: 3px;
  color: #fff;
  border-radius: 5px;
  /*background: linear-gradient(to right, #88ec5d, #55bf2a);*/
}
.el-step__title.is-finish {
  color: #F8B300;
}
.el-input {
  border-radius: 6px;
}
.el-form-item__error {
  padding-top: 10px;
}
.success {
  text-align: center;
  margin-bottom: 100px;
  font-size: 20px;
  font-weight: normal;
}
.el-form {
  margin-left: 0px;
}
.el-loading-mask {
  width: 0;
  height: 0;
}
.el-loading-spinner .circular {
  width: 0;
  height: 0;
}

</style>
