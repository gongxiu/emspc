<template>
  <div class="register">
    <div class="wrap">
      <div class="body">
        <div class="register-container">
          <div class="title">
            <h1>欢迎注册大黄狗管车企业账号</h1>
            <p class="to-login">已有账号？<span>
              <router-link to="login">去登录</router-link>
            </span></p>
          </div>
          <div class="content colfff">
            <p>请填写基本信息</p>
            <el-form
              v-loading="loadingVisible"
              ref="form"
              :rules="rules"
              :model="form"
              size="medium"
            >
              <el-form-item
                label="企业名称 "
                prop="companyName"
                label-width="120px"
              >
                <el-input
                  v-model="form.companyName"
                  maxlength="40"
                  style="width:349px;"
                  placeholder="企业名称,不超过40个字"
                />
              </el-form-item>
              <el-form-item
                label="负责人"
                prop="chargePeople"
                label-width="120px"
              >
                <el-input
                  v-model="form.chargePeople"
                  style="width:349px;"
                  placeholder="请输入本人真实姓名"
                />
              </el-form-item>
              <el-form-item
                label="注册城市 "
                prop="cityCode"
                label-width="120px"
              >
                <el-select
                  v-model="form.cityCode"
                  style="width:349px; color:#4A4A4A;"
                  placeholder="注册城市，可输入城市名搜索"
                  filterable
                >
                  <el-option
                    v-for="(item,index) in cityList"
                    :key="index"
                    :value="item.code"
                    :label="item.city"
                  />
                </el-select>
              </el-form-item>
              <el-form-item
                label="手机号"
                prop="mobile"
                label-width="120px"
              >
                <el-input
                  v-model="form.mobile"
                  placeholder="手机号"
                  style="width:349px;"
                  maxlength="11"
                />
              </el-form-item>
              <el-form-item
                label="手机验证码 "
                prop="mcode"
                label-width="120px"
              >
                <el-input
                  v-model="form.mcode"
                  placeholder="验证码"
                  style="width:349px;"
                />
                <a
                  class="get-check-code-btn"
                  @click="getMcode"
                >{{ mcodeStr }}</a>
              </el-form-item>
              <el-form-item
                label="登录密码 "
                prop="passWord"
                label-width="120px"
              >
                <el-input
                  v-model="form.passWord"
                  type="password"
                  placeholder="登录密码 6位以上字母或数字"
                  style="width:349px;"
                />
              </el-form-item>
              <el-form-item
                label=""
                prop="passWord2"
                label-width="120px"
              >
                <el-input
                  v-model="form.passWord2"
                  type="password"
                  placeholder="确认密码"
                  style="width:349px;"
                />
              </el-form-item>

              <el-form-item
                label=""
                prop="agreement"
                style="height:20px;"
                label-width="120px"
              >
                <el-checkbox-group
                  v-model="form.agreement"
                  style="height:20px; "
                >
                  <el-checkbox
                    :checked="true"
                    label=""
                    name="type"
                  />
                </el-checkbox-group>
                <div class="agreement">我已同意<label>《大黄狗管车企业版服务协议》</label></div>
              </el-form-item>
              <el-form-item>
                <el-button
                  class="button"
                  @click.native.prevent="handleRegister"
                >
                  同意协议并注册
                </el-button>
              </el-form-item>
            </el-form>
          </div>
        </div>
      </div>
      <div class="footer">
        <label>有车有货(深圳)科技有限公司</label>
        <span style="padding:0 20px;">Copyritght © 2018 大黄狗管车 All Rights Reserve</span>
      </div>
    </div>

  </div>
</template>
<script>
import request from '@/utils/request'
import request2 from '@/utils/request2'
import md5 from '@/utils/md5'
export default {
  name: 'Register',
  data() {
    const validateMobile = (rule, value, callback) => {
      if (value.toString().length !== 11) {
        callback(new Error('手机号为11位'))
      } else {
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
        chargePeople: '',
        cityCode: '',
        mobile: '',
        passWord: '',
        passWord2: '',
        companyName: '',
        mcode: '',
        agreement: []
      },
      checked: true,
      rules: {
        chargePeople: [{
          required: true, message: '请填注册人姓名', trigger: 'blur'
        }],
        cityCode: [
          { required: true, message: '为了更好的为您提供服务，请填写注册城市', trigger: 'change' }
        ],
        mobile: [{ required: true, validator: validateMobile, trigger: 'blur' }],
        passWord: [{
          required: true,
          message: '请输入密码',
          trigger: 'blur'
        }, {
          min: 6,
          max: 16,
          message: '长度在 6 到 16个字符'
        }, {
          pattern: /^(\w){6,16}$/,
          message: '只能输入6-16个字母、数字、下划线'
        }],
        passWord2: [{ validator: validatePass2, trigger: 'blur' }],
        companyName: [
          { required: true, message: '请填写企业名称，不超过40字，推荐填写完整企业名称', trigger: 'blur' }
        ],
        mcode: [
          { required: true, message: '请填短信验证码', trigger: 'blur' }
        ],
        agreement: [
          { type: 'array', required: true, message: '注册账号需要同意《大黄狗管车企业版服务协议》', trigger: 'change' }
        ]
      },
      mcodeStr: '获取验证码',
      mcodeStatus: 0,
      loadingVisible: false,
      cityList: []
    }
  },
  mounted() {
    this.getCityList()
    this.getLocation()
  },
  methods: {
    showPwd() {
      if (this.pwdType === 'password') {
        this.pwdType = ''
      } else {
        this.pwdType = 'password'
      }
    },
    handleRegister() {
      this.$refs.form.validate(valid => {
        if (valid) {
          this.loadingVisible = true
          request1({
            url: 'user/doAddCompanyUser',
            method: 'post',
            params: {
              ...this.form,
              passWord: md5(this.form.passWord),
              passWord2: '',
              agreement: ''
            }
          }).then(res => {
            this.loadingVisible = false
            this.$message({
              message: '注册成功',
              type: 'success'
            })
            this.$store.dispatch('Login', {
              username: this.form.mobile,
              password: this.form.passWord
            }).then(() => {
              this.loadingVisible = false
              this.$router.push({ path: '/' })
            }).catch(() => {
              this.loadingVisible = false
            })
          }).catch(e => {
            this.loadingVisible = false
          })
        }
      })
    },
    getMcode() {
      this.$refs.form.validateField('mobile', (valid) => {
        if (valid === '') {
          const a = parseInt(this.form.mobile.substring(3, 7))
          const b = a << 3 | a << 4 & a << 5
          const checkCode = this.form.mobile % b
          this.loadingVisible = true
          request({
            url: 'user/getMobileCode',
            method: 'get',
            params: {
              mobile: this.form.mobile,
              checkCode: checkCode,
              serviceName: 'regist'
            }
          }).then(res => {
            this.loadingVisible = false
            // this.mcodeStatus = 1
            let i = 60
            this.mcodeStr = i + 's后获取'
            const interval = setInterval(() => {
              this.mcodeStr = --i + 's后获取'
              if (i <= 0) {
                clearInterval(interval)
                // this.mcodeStatus = 0
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
    },
    getCityList() {
      request({
        url: 'tender/getCityCodeList',
        method: 'get'
      }).then(res => {
        this.cityList = res.data
      })
    },
    getLocation() {
      // request2({
      //   url: 'driver/getLocalCityCode',
      //   method: 'get'
      // }).then(res => {
      //   if (res.data.city) {
      //     this.form.cityCode = parseInt(res.data.cityCode)
      //   }
      // })
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.register {
  display: flex;
  flex-direction: column;
  min-height: 100%;

  .footer {
    min-width: 900px;
    width: 100%;
    position: relative;
    bottom: 52px;
    margin: 0 auto;
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
  // .wrap{
  //   height: 650px;
  //   margin:0 auto;
  //   background:url("~@/assets/images/login-background.jpg") center center;
  // }
  .wrap {
    width: 100%;
    min-width: 900px;
    background: linear-gradient(to bottom, #2f323c, #13151c);
    flex: 1;
    position: absolute;
  }
  .body {
    margin: 0 auto;
    position: relative;
    overflow: hidden;
  }
  .register-container {
    width: 980px;
    margin: 0 auto;
    color: #fff;
    height: 950px;
    margin-top: 100px;
    .to-login {
      text-align: center;
      color: #51aa38;
      float: right;
      height: 73px;
      line-height: 73px;
      position: absolute;
      right: 30px;
      font-size: 14px;
      top: -17px;
      span {
        color: #51aa38;
      }
    }
    .title {
      position: relative;
      h1 {
        font-weight: normal;
        font-size: 20px;
        height: 50px;
        line-height: 37px;
        margin: 0 30px;
        color: #fff;
        border-bottom: solid 1px #ddd;
      }
    }
    .content {
      font-size: 20px;
      color: #fff;
      padding: 30px;
      width: 480px;
      margin: 0 auto;
      p {
        margin-bottom: 20px;
        text-align: center;
        color: #fff;
        font-size: 16px;
      }
    }
  }
  .el-form-item .el-input input {
    border: 1px solid #ccc;
    border-radius: 5px;
  }
  .el-form-item {
    padding-bottom: 17px;
  }
  .agreement {
    position: absolute;
    left: 20px;
    height: 30px;
    line-height: 30px;
    top: 0;
    // label{
    //   color:#88EC5D ;
    // }
  }
  .get-check-code-btn {
    display: block;
    position: absolute;
    right: 76px;
    top: 3px;
    height: 28px;
    line-height: 28px;
    color: #999;
    padding: 2px 4px 2px 10px;
    box-sizing: border-box;
    border-left: 1px solid #999;
  }
  .button {
    border: 0;
    margin-left: 120px;
    width: 340px;
    height: 44px;
    font-size: 18px;
    font-weight: bold;
    letter-spacing: 3px;
    color: #fff;
    border-radius: 5px;
    background:linear-gradient(180deg,#fee139,#f8b300);
  }
}
.el-form-item__label {
  color: #ddd;
}
.el-form-item__error {
  padding-top: 10px;
  //  margin-left: 120px;
}
.el-form {
  margin-left: -54px;
}
.el-loading-mask {
  width: 0;
  height: 0;
}
/deep/ .colfff .el-form .el-form-item  label.el-form-item__label {
  color: #fff;
}
</style>
