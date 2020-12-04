<template>
  <div class="com-body">
    <el-row :gutter="20">
      <el-col :span="8">
        <div class="label-wrap">
          <label>任务名称：</label>
          <span>测试</span>
        </div>
      </el-col>
      <el-col :span="8">
        <div class="label-wrap">
          <label>计划开始时间：</label>
          <span>测试</span>
        </div>
      </el-col>
      <el-col :span="8">
        <div class="label-wrap">
          <label>计划结束时间：</label>
          <span>测试</span>
        </div>
      </el-col>
      <el-col :span="8">
        <div class="label-wrap">
          <label>检查人：</label>
          <span>测试</span>
        </div>
      </el-col>
      <el-col :span="8">
        <div class="label-wrap">
          <label>实际开始时间：</label>
          <span>测试</span>
        </div>
      </el-col>
      <el-col :span="8">
        <div class="label-wrap">
          <label>实际结束时间：</label>
          <span>测试</span>
        </div>
      </el-col>
      <el-col :span="24">
        <div class="label-wrap">
          <label>任务描述：</label>
          <span>测试</span>
        </div>
      </el-col>
      <el-col :span="24">
        <div class="label-wrap">
          <label>检查结果：</label>
          <span>测试</span>
        </div>
      </el-col>
    </el-row>
    <div class="com-step">
      <div class="step-li" v-for="item in 5">
        <i class="el-icon-youjiantou" v-if="item != 1" style="font-size: 60px;color: #999"></i>
        <div class="li-con" @click="openDetail">
          <div>燃油机</div>
          <div>awdadasdasdas</div>
        </div>
      </div>
    </div>
    <el-dialog
      :visible.sync="detailConVisible"
      :before-close="$closeVis('detailConVisible')"
      :center="true"
      title="查看设备点巡检情况"
      top="5vh"
      :modal="false"
      :close-on-click-modal="$closeModel()"
      width="900px"
    >
      <div v-if="detailConVisible" class="com-body">
        <el-timeline>
          <el-timeline-item timestamp="2018/4/12" placement="top">
            <el-card>
              <h4>更新 Github 模板</h4>
              <p>王小虎 提交于 2018/4/12 20:46</p>
            </el-card>
          </el-timeline-item>
          <el-timeline-item timestamp="2018/4/3" placement="top">
            <el-card>
              <h4>更新 Github 模板</h4>
              <p>王小虎 提交于 2018/4/3 20:46</p>
            </el-card>
          </el-timeline-item>
          <el-timeline-item timestamp="2018/4/2" placement="top">
            <el-card>
              <h4>更新 Github 模板</h4>
              <p>王小虎 提交于 2018/4/2 20:46</p>
            </el-card>
          </el-timeline-item>
        </el-timeline>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  export default {
    name: "detailtask",
    data(){
      return{
        detailConVisible:false,
      }
    },
    methods:{
      openDetail(){
        this.detailConVisible=true
      }
    }
  }
</script>

<style lang="scss" scoped>
  .com-step {
    display: flex;
    flex-wrap: wrap;
    padding-top: 20px;
    border-top: 1px solid #dfe6ec;
    .step-li {
      display: flex;
      justify-content: space-between;
      cursor: pointer;
      margin-bottom: 20px;

      .li-con {
        display: flex;
        flex-direction: column;
        justify-content: space-around;
        width: 120px;
        height: 60px;
        text-align: center;
        background: #F8B300;
        overflow: hidden;
      }
    }
  }

  .com-step {

  }
</style>
