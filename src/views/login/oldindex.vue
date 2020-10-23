<template>
  <div class="login">
    <template v-if="isShowLogin">
      <div class="canvas-con">
        <canvas
            id='myCanvas'
            :width='width'
            :height='height'
        />
      </div>
      <!--      animated flash infinite-->
      <div style="position:relative;top: 0">

      </div>
      <div class="login-con">
        <!--<div class="anima1 " ref="animal">
          <img src="@/assets/images/anima1.png" alt="">
        </div>
        <div class="anima2" ref="animal">
          <img src="@/assets/images/anima2.png" alt="">
        </div>
        <div class="anima3" ref="animal">
          <img src="@/assets/images/anima3.png" alt="">
        </div>
        <div class="anima4" ref="animal">
          <img src="@/assets/images/anima4.png" alt="">
        </div>
        <div class="anima5" ref="animal">
          <img src="@/assets/images/anima5.png" alt="">
        </div>
        <div class="anima6" ref="animal">
          <img src="@/assets/images/anima6.png" alt="">
        </div>
        <div class="anima7" ref="animal">
          <img src="@/assets/images/anima7.png" alt="">
        </div>
-->
        <div class="login-left">
          <div class="login-img">
            <div class="login-logo">
              <img src="@/assets/images/logobg.png" alt="">
            </div>
          </div>
          <div class="login-code">
            <div class="code">
              <img src="@/assets/images/code1.png" alt="">
              <span>官方公众号</span>
            </div>
            <div class="code">
              <img src="@/assets/images/code3.png" alt="">
              <span>大黄狗管车端</span>
            </div>
            <!-- <div class="code">
              <img src="@/assets/images/code2.png" alt="">
              <span>大黄狗用车端</span>
            </div> -->

          </div>
        </div>
        <div class="login-right">
          <div class="login-select">
            <div
                class="select-lg"
                @click="selectType(1)"
                :class="loginSelect==1?'select-style':''"
            >登录</div>
            <div
                class="select-rg"
                @click="selectType(2)"
                :class="loginSelect==2?'select-style':''"
            >注册</div>
          </div>
          <div class="login-info" v-if="loginSelect == 1">
            <div class="company-name">{{title}}</div>
            <div class="login-container">
              <el-form
                  ref="loginForm"
                  :model="loginForm"
                  :rules="loginRules"
                  label-width="76px"
                  size="medium"
              >
                <div class="reg-flex1 mg-rg">
                  <el-form-item
                      label="账号"
                      prop="username"

                  >
                    <el-input
                        v-model="loginForm.username"
                        name="username"
                        type="text"
                        auto-complete="off"
                        placeholder="手机号"
                        maxlength="11"
                        class="form-style"
                    />
                  </el-form-item>

                </div>
                <div class="reg-flex1 mg-rg" style="margin-top: 20px">
                  <el-form-item
                      prop="password"
                      label="密码"

                  >
                    <el-input
                        :type="pwdType"
                        v-model="loginForm.password"
                        name="password"
                        auto-complete="off"
                        placeholder="密码"
                        @keyup.enter.native="handleLogin"
                        class="form-style"
                    />

                    <router-link to="forgetPass" class="forget-pass">忘记密码?</router-link>
                  </el-form-item>
                </div>
                <div style="height: 70px"></div>
                <div class="agreement-form">
                  <el-form-item prop="agreementSelect" label-width="10px" style="border:0;">
                    <el-checkbox prop="agreementSelect" v-model="loginForm.agreementSelect" label="true">已同意</el-checkbox>
                  </el-form-item>
                  <div  class="agreement" @click="dataVisible = true">大黄狗管车运营管理软件使用协议</div>
                </div>

                <div class="pd-fill">
                  <el-button
                      :loading="loading"
                      type="primary"
                      style="border:none;height:44px;width:100%; border-radius:30px;"
                      @click.native.prevent="handleLogin"
                  >登录</el-button>
                </div>
              </el-form>
            </div>
          </div>
          <div class="register-info" v-else>
            <div class="wrap">
              <div class="login-container">
                <el-form ref="form" :rules="rules" label-width="100px" :model="form" size="medium">
                  <div class="reg-flex1">
                    <el-form-item label="企业名称 " prop="companyName" >
                      <el-input
                          v-model="form.companyName"
                          maxlength="40"
                          class="form-style"
                          placeholder="企业名称,不超过40个字"
                      />
                    </el-form-item>
                  </div>
                  <div class="reg-flex1">
                    <el-form-item label="负责人" prop="chargePeople">
                      <el-input
                          v-model="form.chargePeople"
                          class="form-style"
                          placeholder="请输入本人真实姓名"
                      />
                    </el-form-item>
                  </div>
                  <div class="reg-flex1">
                    <el-form-item label="注册城市 " prop="cityCode">
                      <el-select
                          v-model="form.cityCode"
                          placeholder="注册城市，可输入城市名搜索"
                          filterable
                          class="form-style"
                      >
                        <el-option
                            v-for="(item,index) in cityList"
                            :key="index"
                            :value="item.code"
                            :label="item.city"
                        />
                      </el-select>
                    </el-form-item>
                  </div>
                  <div class="res-flex1">
                    <el-form-item label="手机号" prop="mobile">
                      <el-input
                          v-model="form.mobile"
                          placeholder="手机号"
                          class="form-style"
                          maxlength="11"
                      />
                    </el-form-item>
                  </div>
                  <div class="reg-flex1">
                    <el-form-item
                        label="手机验证码 "
                        prop="mcode"

                    >
                      <el-input
                          v-model="form.mcode"
                          placeholder="验证码"
                          class="form-style"
                          maxlength="6"
                          autocomplete="off"
                      />
                      <a
                          class="get-check-code-btn"
                          @click="getMcode"
                      >{{ mcodeStr }}</a>
                    </el-form-item>

                  </div>
                  <div class="reg-flex1">
                    <el-form-item
                        label="登录密码 "
                        prop="passWord"
                    >
                      <el-input
                          v-model="form.passWord"
                          type="password"
                          placeholder="登录密码 6位以上字母或数字"
                          class="form-style"
                          autocomplete="off"
                          readonly
                          onfocus="this.removeAttribute('readonly');"
                      />
                    </el-form-item>
                  </div>
                  <div class="reg-flex1">
                    <el-form-item
                        label="确认密码"
                        prop="passWord2"
                    >
                      <el-input
                          v-model="form.passWord2"
                          type="password"
                          placeholder="确认密码"
                          class="form-style"
                          autocomplete="off"
                          readonly
                          onfocus="this.removeAttribute('readonly');"
                      />
                    </el-form-item>
                  </div>
                  <div class="pd-fill">
                    <el-button
                        :loading="loading"
                        type="primary"
                        style="border:none;height:44px;width:calc(100%); border-radius:30px; margin-top:10px"
                        @click.native.prevent="handleRegister"
                    >注册</el-button>
                  </div>
                </el-form>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="footer1">
        <p>客服热线：4000-398-656 服务时间：周一至周日8:00-22:00</p>
        <p style="padding:20px 20px 0;color:#b7b7b7 ">Copyritght © 2018 大黄狗管车 All Rights Reserved 粤ICP备18087359号-1</p>

        <!--<div class="code  code-other">
          <p></p>
          <p></p>
        </div>-->
      </div>
    </template>
    <template v-else></template>
    <el-dialog
        :visible.sync="dataVisible"
        :before-close="handleDataClose"
        :center="true"
        title="大黄狗管车运营管理软件使用协议"
        top="5vh"
        width="1000px">
      <agreement v-if="dataVisible"  />
    </el-dialog>
  </div>
</template>
<script>
  import Cookies from 'js-cookie'
  import request from '@/utils/request'
  import { error } from 'util'
  import md5 from '@/utils/md5'
  import request2 from '@/utils/request2'
  import agreement from "./components/agreement"
  export default {
    name: 'Login',
    components:{
      agreement
    },
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
        loginForm: {
          username: '',
          password: '',
          agreementSelect: ['true'],
          userName: false
        },
        dataVisible:false,
        loginSelect: 1,
        userId: '',
        loginRules: {
          username: [
            { required: true, trigger: 'blur', message: '账号不能为空' }
          ],
          password: [
            { required: true, trigger: 'blur', message: '密码不能为空' }
          ],
          agreementSelect: [
            {
              type: 'array',
              required: true,
              message: '必须勾选协议',
              trigger: 'change'
            }
          ]
        },
        rules: {
          chargePeople: [
            {
              required: true,
              message: '请填注册人姓名',
              trigger: 'blur'
            }
          ],
          cityCode: [
            {
              required: true,
              message: '为了更好的为您提供服务，请填写注册城市',
              trigger: 'change'
            }
          ],
          mobile: [
            { required: true, validator: validateMobile, trigger: 'blur' }
          ],
          passWord: [
            {
              required: true,
              message: '请输入密码',
              trigger: 'blur'
            },
            {
              min: 6,
              max: 16,
              message: '长度在 6 到 16个字符'
            },
            {
              pattern: /^(\w){6,16}$/,
              message: '只能输入6-16个字母、数字、下划线'
            }
          ],
          passWord2: [{ validator: validatePass2, trigger: 'blur' }],
          companyName: [
            {
              required: true,
              message: '与营业执照一致',
              trigger: 'blur'
            }
          ],
          mcode: [{ required: true, message: '请填短信验证码', trigger: 'blur' }],
          agreement: [
            {
              type: 'array',
              required: true,
              message: '注册账号需要同意《大黄狗管车企业版服务协议》',
              trigger: 'change'
            }
          ]
        },
        loading: false,
        pwdType: 'password',
        src: '',
        title: '',
        isShowLogin: true,
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
        cityList: [],
        mcodeStr: '获取验证码',
        canvas: null,
        context: null,
        stars: [], //星星数组
        shadowColorList: [
          "#F7F7F7"
        ], //阴影颜色列表
        directionList: ["leftTop", "leftBottom", "rightTop", "rightBottom"], //星星运行方向
        fillTextArr:['销售管理','财务管理','定位锁车','分公司管理','租金催缴','项目管理','车队管理'],
        colorArr:['rgba(255,255,255, 0.24)','rgba(255,255,255, 0.3)','rgba(255,255,255, 0.4)'],
        fontSizeArr:['20px thin','30px thin','40px thin'],
        speed: 40, //星星运行速度
        last_star_created_time: new Date(), //上次重绘星星时间
        Ball: class Ball {
          constructor(radius) {
            this.x = 0;
            this.y = 0;
            this.radius = radius;
            this.color = "";
            this.direction = "";
            this.fillText="";
            this.font=""
          }

          draw(context) {
            context.save();
            context.translate(this.x - 200, this.y - 200);
            // context.lineWidth = this.lineWidth;
            var my_gradient = context.createLinearGradient(0, 0, 0, 8);
            my_gradient.addColorStop(0, this.color);
            context.fillStyle = my_gradient;
            context.beginPath();
            // context.arc(0, 0, this.radius, 0, Math.PI * 2, true);
            context.closePath();
            context.font = this.font
            context.shadowOffsetX = 0;
            context.shadowOffsetY = 0;
            context.shadowBlur = 10;
            context.fillText(this.fillText, 100, 200 )
            // context.fill();
            context.restore();

          }
        }, //工厂模式定义Ball类
        width: 1000,
        height: 300
      }
    },
    mounted() {
      console.log()

      this.loginForm.username = Cookies.get('username')
      const start = window.location.href.indexOf('=') + 1
      this.userId = window.location.href.substr(start, 14)
      let query = JSON.stringify(this.$route.query)
      if (query != '{}') {
        this.userId = this.$route.query.userId
        this.isShowLogin = true
        try {
          localStorage.setItem('companyUserId', this.userId)
        } catch (error) {}
        this.getLogoImg()
      }
      let user = JSON.parse(localStorage.getItem('user'))
      this.getCityList()
      this.setAnima()

      this.canvas = document.getElementById("myCanvas");
      this.context = this.canvas.getContext("2d");
      this.createStar(true);
      this.drawFrame();
    },
    methods: {
      setAnima(){
        /*let anima1 = document.getElementById('anima1');;
        anima1.classList.add('animated');
        anima1.classList.add('flash');
        anima1.classList.add('infinite');*/
      },
      selectType(index) {
        this.loginSelect = index
      },
      showPwd() {
        if (this.pwdType === 'password') {
          this.pwdType = ''
        } else {
          this.pwdType = 'password'
        }
      },
      handleLogin() {
        this.$refs.loginForm.validate(valid => {
          if (valid) {
            this.loading = true
            this.$store
                .dispatch('Login', this.loginForm)
                .then(() => {
                  this.loading = false
                  Cookies.set('username', this.loginForm.username, { expires: 30 })
                  this.$router.push({ path: '/' })
                  if (this.loginForm.userName) {
                    let user = {
                      userName: this.loginForm.username,
                      passWord: this.loginForm.password
                    }
                  } else {
                  }
                })
                .catch(() => {
                  this.loading = false
                })
          } else {
            return false
          }
        })
      },
      getLogoImg() {
        request({
          url: 'user/getCompanyUserDetailed',
          method: 'post',
          params: {
            userId: this.userId
          }
        })
            .then(res => {
              if (res.data !== null) {
                this.title = res.data.companyName
                this.src = res.data.logoImger
              } else {
                this.src = ''
              }
            })
            .catch(() => {})
      },
      getCityList() {
        request({
          url: 'tender/getCityCodeList',
          method: 'get'
        }).then(res => {
          this.cityList = res.data
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
      resetReg(){
        this.form= {
          chargePeople: '',
          cityCode: '',
          mobile: '',
          passWord: '',
          passWord2: '',
          companyName: '',
          mcode: '',
          agreement: []
        }
      },
      handleRegister() {
        this.$refs.form.validate(valid => {
          if (valid) {
            this.loadingVisible = true
            request({
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
                this.loginSelect  = 1
                this.resetReg()
              }).catch(() => {
                this.loadingVisible = false
              })
            }).catch(e => {
              this.loadingVisible = false
            })
          }
        })
      },
      handleDataClose(){
        this.dataVisible = false
      },
      //重复动画
      drawFrame() {
        let animation = requestAnimationFrame(this.drawFrame);
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);

        this.createStar(false);
        this.stars.forEach(this.moveStar);
      },
      //展示所有的星星
      createStar(params) {
        let now = new Date();
        if (params) {
          //初始化星星
          for (var i = 0; i < 7; i++) {
            const radius = Math.random() * 3 + 20;
            let star = new this.Ball(radius);
            // star.x = Math.random() * this.canvas.width + 1;
            star.x = (Math.random() * this.canvas.width) + 100;
            star.y = (Math.random() * this.canvas.height) + 100;
            star.color = this.colorArr[
                Math.floor(Math.random() * this.colorArr.length)
                ];
            star.shadowColor = this.shadowColorList[
                Math.floor(Math.random() * this.shadowColorList.length)
                ];
            star.direction = this.directionList[
                Math.floor(Math.random() * this.directionList.length)
                ];
            star.font=this.fontSizeArr[
                Math.floor(Math.random() * this.fontSizeArr.length)
                ];
            star.fillText = this.fillTextArr[i]
            this.stars.push(star);
          }
        } else if (!params && now - this.last_star_created_time > 3000) {
          //每隔3秒重绘修改颜色其中30个球阴影颜色
          /*for (var i = 0; i < 7; i++) {
            this.stars[i].shadowColor = this.shadowColorList[
                Math.floor(Math.random() * this.shadowColorList.length)
                ];
          }
          this.last_star_created_time = now;*/
        }
      },
      //移动
      moveStar(star, index) {
        if (star.y - this.canvas.height > 0) {
          //触底
          if (Math.floor(Math.random() * 2) === 1) {
            star.direction = "leftTop";
          } else {
            star.direction = "rightTop";
          }
        }else if (star.y < 0) {
          //触顶
          if (Math.floor(Math.random() * 2) === 1) {
            star.direction = "rightBottom";
          } else {
            star.direction = "leftBottom";
          }
        } else if (star.x< 2) {
          //左边
          if (Math.floor(Math.random() * 2) === 1) {
            star.direction = "rightTop";
          } else {
            star.direction = "rightBottom";
          }
        } else if (star.x - this.canvas.width > 0) {
          //右边
          if (Math.floor(Math.random() * 2) === 1) {
            star.direction = "leftBottom";
          } else {
            star.direction = "leftTop";
          }
        }
        if (star.direction === "leftTop") {
          star.y -= star.radius / this.speed;
          star.x -= star.radius / this.speed;
        }else if (star.direction === "rightBottom") {
          star.y += star.radius / this.speed;
          star.x += star.radius / this.speed;
        } else if (star.direction === "leftBottom") {
          star.y += star.radius / this.speed;
          star.x -= star.radius / this.speed;
        } else if (star.direction === "rightTop") {
          star.y -= star.radius / this.speed;
          star.x += star.radius / this.speed;
        }
        star.draw(this.context);
      }
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss">
  @font-face {
    font-family: 'thin';
    src: url('../../icons/font/RuiZiZhenYanTiMianFeiShangYong-2.ttf');
  }
  .login {
    /*background: red;*/
    display: flex;
    flex-direction: column;
    /*position: relative;*/
    width: 100vw;
    /*height: 100vh;*/
    min-width: 1200px;
    min-height: 100%;
    min-height: 600px;
    overflow: auto;
    background: url('../../assets/images/loginbg.jpg') no-repeat 100% 100%;
    background-size: 100% 100%;
    .header {
      min-width: 900px;
      width: 100%;
      margin: 0 auto;
      /*background-color: #4a4c5a;*/
      .logo-wrap {
        padding: 15px 50px;
        font-size: 0;
        img {
          height: 40px;
          margin-left: 0;
        }
        h3 {
          display: inline-block;
          font-size: 26px;
          vertical-align: middle;
          font-weight: normal;
          color: #51aa38;
        }
      }
    }
    .footer1 {
      min-width: 900px;
      width: 100%;
      padding:20px 0;
      height: 96px;
      margin: 0 auto;
      color: #FBFBFB;
      text-align: center;
      box-sizing: border-box;
    }
    // .wrap{
    //   height: 650px;
    //   margin:0 auto;
    //   background:url("~@/assets/images/login-background.jpg") center center;
    // }
    .login-con {
      /*position: absolute;*/
      display: flex;
      justify-content: center;
      /*justify-content:flex-end;*/
      /*background: #EBEBEB;*/
      height: calc(100vh - 96px);
      min-height: 600px;
      min-width: calc(1200px);
      right: 15%;
      padding-top: 10%;
      box-sizing: border-box;
      z-index: 99;
      .login-left {
        /*position: relative;*/
        // background: #fff;
        /*min-width:700px ;*/
        height: 460px;
        padding-right: 58px;
        padding-top: 130px;
        color: #fff;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        .login-compont {
          /*position: absolute;*/
          z-index: 1;
          color: #fff;
          font-size: 27px;
          left: 120px;
          top: 150px;
        }
        .login-img {
          background-size: 100% 100%;
        }
        .login-logo{
          img{
            width: calc(381px * 1.5);
            height: calc(140px);
          }
        }
        .login-code{
          padding-top: 20px;
          display: flex;
          justify-content: space-between;
          padding-left: 30px;
          .code{
            display: flex;
            flex-direction: column;
            align-items: center;
            /*background: #fff;*/
            color: #fff;
            padding:3px;
            font-size: 16px;
            img{
              width:140px;
              height: 140px;
            }
            span{
              display: inline-block;
              padding-top: 4px;
            }
          }
          .code-other{
            background: none;
            color: #fff;
            align-items: flex-start;
            display: flex;
            justify-content: center;
            height: 6vw;
            p:nth-child(1){
              margin-bottom: 10px;
            }
          }
        }
      }
      .login-right {
        display: flex;
        background: #fff;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: space-between;
        /*width: 320px;*/
        height: 460px;
        padding:16px 14px;
        box-shadow:1px 2px 2px rgba(4,12,255,0.39);
        border-radius:12px;
        .login-select {
          background: #EDEDEE;
          width: 150px;
          height: 34px;
          display: flex;
          border-radius: 30px;
          cursor: pointer;
          > div {
            width: 70px;
            line-height: 34px;
            color: #999999;
            font-size: 16px;
            text-align: center;
          }
          .select-style {
            width: 80px;
            /*background:linear-gradient(180deg,rgba(254,225,57,1) 0%,rgba(248,179,0,1) 100%);*/
            background:#FFE700;
            border-radius: 30px;
            color: #161616;
          }
        }
        .company-name {
          color: #000000;
          font-size: 20px;
          text-align: center;
          padding: 40px 0;
          /*height: 30px;*/
        }
        .compont-login {
          display: flex;
          justify-content: center;
          flex-direction: column;
          img {
            margin: 0 auto;
            width: 200px;
            height: 200px;
          }
        }
      }
    }
    .wrap {
      width: 100%;
      // min-width: 900px;
      /*background: #f3f5f8;*/
      // flex: 1;
    }
    .body {
      // width: 42%;
      /*margin: 0 auto;*/
      /*position: relative;*/
      // padding: 103px 0;
      /*overflow: hidden;*/
    }
  }
  .login-info {
    /*width: 360px;*/
    .el-form-item {
      margin-bottom: 20px !important;
    }
    .el-form-item:last-child {
      margin-bottom: 0 !important;
    }
    .agreement-form {
      margin-top: 20px;
      display: flex;
      align-items: center;
      justify-content: center;
      .el-form-item {
        margin-bottom: 0 !important;
      }
    }
  }
  .register-info {
    .get-check-code-btn {
      display: block;
      position: absolute;
      right: 30px;
      top: 3px;
      height: 28px;
      line-height: 28px;
      color: #999;
      padding: 2px 4px 2px 10px;
      box-sizing: border-box;
      border-left: 1px solid #999;
    }
    .reg-flex1 {
      width: 300px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      height: 50px;;
    }
  }
  $bg: #2d3a4b;
  $light_gray: #eee;

  /* reset element-ui css */
  .login-container {
    width: 100%;
    .el-input {
      display: inline-block;
      height: 40px;
      width: 240px;
      border: 0px;
      input {
        background: transparent;
        border: 0px;
        -webkit-appearance: none;
        border-radius: 0px;
        padding: 12px 5px 12px 0px;
        height: 40px;
      }
    }
    .el-form-item {
      border: 1px solid #999;
      border-radius: 2px;
      color: #454545;
      margin-bottom: 0;
      .forget-pass {
        position: absolute;
        right: 0;
        top: 100%;
        color: #666;
      }
    }
    .agreement {
      color: #F8B300;
      /*padding: 20px 0;*/
      cursor: pointer;
    }
    .el-form-item:last-child {
      border: none;
    }
    .register {
      display: inline-block;
      border: none;
      height: 44px;
      width: 40%;
      border-radius: 30px;
      background-color: #51aa38;
      color: #fff;
      text-align: center;
      line-height: 44px;
      margin-left: 20px;
    }
    .to-register {
      text-align: center;
      color: #666;
      span {
        color: #51aa38;
      }
    }
  }
  $bg: #2d3a4b;
  $dark_gray: #889aa4;
  $light_gray: #eee;
  .login-info {
  }
  .login-container {
    /*float: right;*/
    border-radius: 5px;

    .login-form {
      /*width: 310px;*/
      /*padding-left: 50px;
      padding-top: 30px;*/
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      height: 100%;

      .title {
        color: #333;
      }
    }
    .tips {
      font-size: 14px;
      color: #fff;
      margin-bottom: 10px;
      span {
        &:first-of-type {
          margin-right: 16px;
        }
      }
    }
    .svg-container {
      padding: 0px 5px 0px 15px;
      color: #999;
      vertical-align: middle;
      line-height: 1px;
      width: 20px;
      display: inline-block;
      &_login {
        font-size: 20px;
      }
    }
    .title {
      font-size: 20px;
      font-weight: normal;
      color: #fff;
      margin: 0px auto 30px auto;
      text-align: center;
    }
    .show-pwd {
      position: absolute;
      right: 10px;
      top: 0px;
      font-size: 16px;
      color: $dark_gray;
      cursor: pointer;
      user-select: none;
    }
    .mg-rg{
      margin-right: 24px;
    }
    .form-style{
      border-top:0;
      border-right:0;
      border-left:0;
      border-bottom:1px solid #BEBEBE;
      border-radius:0
    }
    .pd-fill{
      padding: 0 30px;
    }
  }
  .anima1{
    position: absolute;
    left: 32%;
    top: 200px;
    width: calc(220px / 2 * 1.5);
    height: calc(69px / 2 * 1.5);
    /*background: url('../../assets/images/opertion1.png') no-repeat 100% 100%;
    background-size: 100% 100%;*/
    img{
      width: 100%;
    }
  }
  .animated.flash{
    animation-delay: 1003s;
    animation-duration:10s;
  }
  .anima2{
    position: absolute;
    /*left: calc(280px / 2 * 1.5 );*/
    left: 18%;
    top: calc(33px / 2 * 1.5);
    width: calc(112px / 2 * 1.5);
    height: calc(36px / 2 * 1.5);
    /*background: url('../../assets/images/opertion1.png') no-repeat 100% 100%;
    background-size: 100% 100%;*/
    img{
      width: 100%;
    }
  }
  .anima3{
    position: absolute;
    left: 26%;
    top: calc(92px / 2 * 1.5);
    width: calc(132px / 2 * 1.5);
    height: calc(42px / 2 * 1.5);
    /*background: url('../../assets/images/opertion1.png') no-repeat 100% 100%;
    background-size: 100% 100%;*/
    img{
      width: 100%;
    }
  }
  .anima4{
    position: absolute;
    left: 36%;
    top: calc(137px / 2 * 1.5);
    width: calc(200px / 2 * 1.5);
    height: calc(50px / 2 * 1.5);
    /*background: url('../../assets/images/opertion1.png') no-repeat 100% 100%;
    background-size: 100% 100%;*/
    img{
      width: 100%;
    }
  }
  .anima5{
    position: absolute;
    left:60%;
    top: calc(69px / 2 * 1.5);
    width: calc(160px / 2 * 1.5);
    height: calc(50px / 2 * 1.5);
    /*background: url('../../assets/images/opertion1.png') no-repeat 100% 100%;
    background-size: 100% 100%;*/
    img{
      width: 100%;
    }
  }
  .anima6{
    position: absolute;
    left: 15%;
    top: calc(198px / 2 * 1.5);
    width: calc(96px / 2 * 1.5);
    height: calc(30px / 2 * 1.5);
    /*background: url('../../assets/images/opertion1.png') no-repeat 100% 100%;
    background-size: 100% 100%;*/
    img{
      width: 100%;
    }
  }
  .anima7{
    position: absolute;
    left: 45%;
    top: calc(208px / 2 * 1.5);
    width: calc(172px / 2 * 1.5);
    height: calc(54px / 2 * 1.5);
    /*background: url('../../assets/images/opertion1.png') no-repeat 100% 100%;
    background-size: 100% 100%;*/
    img{
      width: 100%;
    }
  }
  .canvas-con{
    position: absolute;
    /*width: 600px;*/
    /*height: 300px;*/
    z-index: 99;
    left: 50%;
    margin-left: -500px;
  }
</style>
