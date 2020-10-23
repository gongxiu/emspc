<template>
 <div >
  <el-menu :class="{active:sidebar.opened}" class="navbar" mode="horizontal">
   <div style="display: flex;">
     <div v-if="!sidebar.opened" style="padding-left: 10px !important;"
     ><img style="width: calc(36px);height: calc(22px)"  src="@/assets/images/showlogo.png"><span/></div>
     <div class="nav-left">
       <hamburger :toggle-click="toggleSideBar" :is-active="sidebar.opened" class="hamburger-container"/>
       <breadcrumb/>
     </div>
     <div class="nav-right">


       <el-dropdown class="avatar-container" trigger="click">
         <div class="avatar-wrapper">
           <!-- <img :src="avatar+'?imageView2/1/w/80/h/80'" class="user-avatar"> -->
           <!-- <img src="@/assets/images/userlogo.png" class="user-avatar"> -->
           <!-- <div style="display:flex;flex-direction:column;height:40px;padding-top:5px">
           <span style="color:#000;line-height:20px;text-align:center;height:20px">{{chargePeople != null
             ?chargePeople:' '}}</span>
             <span style="color:#000;line-height:20px;text-align:center;font-size:12px;"
                   v-if="roleName != null">{{roleName}}</span>
           </div> -->
           <i class="el-icon-caret-bottom"/>
         </div>
         <el-dropdown-menu slot="dropdown" class="user-dropdown">
           <!-- <div class="inlineBlock user-name">
            <span style="color:#000;line-height:20px;text-align:center;height:20px;font-size:14px;">{{chargePeople != null
              ?chargePeople:' '}}</span>
              <span style="color:#606266;line-height:20px;text-align:center;font-size:12px;"
                    v-if="roleName != null">{{roleName}}</span>
           </div>
           <router-link class="inlineBlock" to="/company/enterprise">
             <el-dropdown-item>
               <img class="navinfo1" src="@/assets/images/navinfo1.png" alt="">
               <span>企业钱包</span>
             </el-dropdown-item>
           </router-link>
           <router-link class="inlineBlock" to="/company/message">
             <el-dropdown-item>
              <img class="navinfo2" src="@/assets/images/navinfo2.png" alt="">
               <span>消息通知</span>
             </el-dropdown-item>
           </router-link>
           <div class="inlineBlock" @click="modify">
             <el-dropdown-item>
              <img class="navinfo3" src="@/assets/images/navinfo3.png" alt="">
               <span>修改密码</span>
             </el-dropdown-item>
           </div> -->
           <!-- <router-link class="inlineBlock" to="/company/basic">
             <el-dropdown-item>
               基本设置
             </el-dropdown-item>
           </router-link> -->
           <!-- <el-dropdown-item @click.native="logout">
            <img class="navinfo4" src="@/assets/images/navinfo4.png" alt="">
             <span>退出登录</span>
           </el-dropdown-item> -->
         </el-dropdown-menu>

       </el-dropdown>
     </div>
   </div>


  </el-menu>
  <el-dialog
      v-loading="loadingVisible"
      :visible.sync="addDialogVisible"
      :before-close="handleAddDialogClose"
      :center="true"
      title="修改密码"
      width="400px">
   <ChangPassWord v-if="addDialogVisible" @success="handleAddDialogClose"/>
  </el-dialog>
 </div>
</template>

<script>
 import {mapGetters} from 'vuex'
 import Breadcrumb from '@/components/Breadcrumb'
 import Hamburger from '@/components/Hamburger'
 import ChangPassWord from '@/views/layout/components/changepassword'

 export default {
  components: {
   Breadcrumb,
   Hamburger,
   ChangPassWord
  },
  data() {
   return {
    loadingVisible: false,
    addDialogVisible: false
   }
  },
  computed: {
   ...mapGetters([
    'sidebar',
    'avatar',
    'companyName',
    'verifyStatus',
    'roleName',
    'superiorId',
    'chargePeople'
   ])
  },
  mounted() {
  },
  methods: {
    toCzsc(){
      window.open('http://cargoods.ycyh56.com/czsc/')
    },
   modify() {
    this.addDialogVisible = true
   },
   toggleSideBar() {
    this.$store.dispatch('ToggleSideBar')
   },
   logout() {
    this.$store.dispatch('LogOut').then(() => {
     // this.$router.push({
     //   path:'/login'
     // })
     setTimeout(() => {
      location.reload()
     }, 1000) // 为了重新实例化vue-router对象 避免bug
    })

   },
   handleAddDialogClose() {
    this.addDialogVisible = false
   },
    toAuth(){
      this.$route.push({
        path:'/company/auth'
      })
    }
  }
 }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
 .navbar {
  /*min-width: 500px;*/
  position: fixed;
  z-index: 999;
  top: 0;
  left: 0;
  right: 0;
  height: 51px;
  line-height: 50px;
  border-radius: 0px !important;
  box-shadow: 0px 1px 10px rgba($color: #000000, $alpha: 0.1);
  transition: 0.5s left ease-out;
  // background:rgba(48,66,86,1);
  background: #fff;

  .hamburger-container {
   line-height: 63px;
   height: 50px;
   float: left;
   padding: 0 10px;
  }

  .screenfull {
   position: absolute;
   right: 90px;
   top: 16px;
   color: red;
  }

  .dashinfo {
   /*position: absolute;*/
   /*right: 110px;*/
   height: 50px;
    margin-left: 6px;
    padding: 0 16px;
    z-index: 99;
   img {
    width: 21px;
    height: 21px;
   }
  }

  .company {
   /*position: absolute;*/
   /*right: 210px;*/
   height: 50px;
   font-size: 16px;
   line-height: 50px;
   color: #000;
   top: 0;
   text-align: right;

  }

  .auth {
   /*position: absolute;*/
   height: 20px;
   /*top: 50%;*/
   padding: 0 8px;
    margin-left: 6px;
   line-height: 20px;
   display: inline-block;
   /*right: 146px;*/
   color: #FEE139;
   font-size: 12px;
   /*background: #151C2A;*/
   transform: skewX(-10deg);
    z-index: 99;
    /*vertical-align: middle;*/
   span {
    display: block;
    transform: skewX(10deg);
   }
  }

  .auth.authorized {
   background: #151c2a;
  }
   .auth.unauthorized{
     background: #7b7b7b;
     color: #eee;
   }
  .avatar-container {
    margin-left: 6px;
   height: 50px;
   display: inline-block;
   /*position: absolute;*/
   /*right: 30px;*/
    padding-right: 30px;
   .avatar-wrapper {
    // line-height: 48px;
    cursor: pointer;
    position: relative;

    .user-avatar {
     width: 40px;
     height: 40px;
     border-radius: 10px;
    }

    .el-icon-caret-bottom {
     position: absolute;
     right: -20px;
     top: 18px;
     font-size: 12px;
    }
   }
  }
 }

 .navbar.active {
  left: 210px;
 }
  .nav-right{
    /*position: absolute;*/
    width: 70%;
    height: 50px;
    line-height: 50px;
    top: 0px;
    display: flex;
    justify-content: flex-end;
    align-items: center;
  }
  .nav-left{
    /*position: absolute;*/
    width: 30%;
    min-width: 300px;
  }
  .el-tip{
    font-size: 22px;
    color: #6E6E6E;
  }
  .navbar  .el-tip-info{
    padding: 0 16px 0 0;
    display: flex;
    align-items: center;
    margin-bottom: -4px;
  }
  .user-dropdown{
    padding:0 !important;
    width:130px;
    .user-name{
      display:flex;
      flex-direction:column;
      justify-content: center;
      height:60px;
      padding-top:5px;
      background-color: #FFF7AB;
    .el-dropdown-menu{

    }
  }
  }
 .navinfo1{
   width: 15px;
   height: 15px;
   margin-right: 10px;
   vertical-align: middle;
 }
 .navinfo2{
   width: 16px;
   height: 18px;
   margin-right: 10px;
   vertical-align: middle;
 }
 .navinfo3{
   width: 14px;
   height: 17px;
   margin-right: 10px;
   vertical-align: middle;
 }
 .navinfo4{
   width: 18px;
   height: 15px;
   margin-right: 10px;
   vertical-align: middle;
 }
 span{
  vertical-align: middle;
 }
</style>

