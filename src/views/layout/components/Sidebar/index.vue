<template>
  <el-scrollbar wrap-class="scrollbar-wrapper">
    <!-- <h3><img src="@/assets/images/logo.png"></h3> -->
    <logo v-if="showLogo" :collapse="isCollapse" />
    <!-- :show-timeout="200"
      :default-active="$route.path"
      :collapse="isCollapse"
      :unique-opened="true"
      mode="vertical"
      background-color="#fff"
      text-color="#333333"
      active-text-color="#409EFF"
      :collapse-transition="false" -->
    <el-menu
      :default-active="activeMenu"
      :collapse="isCollapse"
      :background-color="variables.menuBg"
      :text-color="variables.menuText"
      :unique-opened="false"
      :active-text-color="variables.menuActiveText"
      :collapse-transition="false"
      mode="vertical"
    >
      <sidebar-item v-for="(route,index) in permission_routers" :key="index" :index="index" :item="route" :base-path="route.path"/>
    </el-menu>
    <h4 style="color:#8e8e8e">版本号：1.3.14</h4>
  </el-scrollbar>
</template>

<script>
import { mapGetters } from 'vuex'
import SidebarItem from './SidebarItem'
import Logo from './Logo'
import variables from '@/styles/variables.scss'
export default {
  components: { SidebarItem,Logo },
  computed: {
    ...mapGetters([
      'permission_routers',
      'sidebar'
    ]),
    isCollapse() {
      return !this.sidebar.opened
    },
    showLogo() {
      console.log(this.$store.state.settings.sidebarLogo)
      return true
    },
    variables() {
      return variables
    },
    activeMenu() {
      const route = this.$route
      const { meta, path } = route
      // if set path, the sidebar will highlight the path you set
      if (meta.activeMenu) {
        return meta.activeMenu
      }
      return path
    },
  },
  mounted() {
  }
  
}
</script>
<style lang="scss" scoped>
.scrollbar-wrapper{
  h3{
    img{
      /*width:90%;*/
      height: 48px;
    }
    font-size:15px;
    height:50px;
    line-height: 52px;
    font-weight: normal;
    position: fixed;
    z-index: 998;
    width:180px;
    // background-color: #304156;
    background: #fff;
    color:#fff;
    text-align: center;
  }
  .el-menu{
    box-sizing: border-box;
    /* padding-top:70px;
    padding-bottom: 30px; */
    /*margin-bottom: 30px;*/
    //  background: #fff !important;
  }
  h4{
    height:20px;
    line-height: 20px;
    font-weight: normal;
    position: fixed;
    bottom: 0;
    z-index: 998;
    width:180px;
    // background-color: #304156;
    /* background: #fff; */
    /*text-align: center;*/
    font-size: 14px;
    padding: 0 0 0px 10px
  }
}
</style>

