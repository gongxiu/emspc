<template>
  <div class="com-body">
    <div class="">
      <el-row :gutter="20">
        <el-col :span="24">
          <div class="label-wrap">
            <label>调拨时间：</label>
            <span>2020-12-10 10:12:09</span>
          </div>

        </el-col>
        <el-col :span="24">
          <div class="label-wrap">
            <label>调拨原因：</label>
            <span>我是测试数据</span>
          </div>
        </el-col>
        <el-col :span="24">
          <div class="aggregate-list">
            <div class="agg-left">设备集合：
            </div>
            <div class="agg-right">

              <el-scrollbar>
                <el-table
                  :data="list"
                  size="small"
                  stripe
                  :border="$bor()"
                  style="width: 100%">
                  <el-table-column
                    prop="name"
                    label="原机构"
                  >
                  </el-table-column>
                  <el-table-column
                    label="设备名称"
                  >
                  </el-table-column>
                  <el-table-column
                    label="调配到"
                  >
                  </el-table-column>
                </el-table>
              </el-scrollbar>

            </div>
          </div>
        </el-col>
        <el-col :span="24" style="margin-top: 20px;">
          <div class="aggregate-list">
            <div class="agg-left">审核流程：
            </div>
            <div class="agg-right">

              <div class="block">
                <!--<el-timeline>
                  <el-timeline-item
                    v-for="(activity, index) in activities"
                    :key="index"
                    :color="activity.status==1?'#1890ff':''"
                    :timestamp="activity.timestamp">
                    {{activity.content}}
                  </el-timeline-item>
                </el-timeline>-->
                <el-steps :active="1">
                  <el-step title="步骤 1" description="这是一段很长很长很长的描述性文字"></el-step>
                  <el-step title="步骤 2" description="这是一段很长很长很长的描述性文字"></el-step>
                  <el-step title="步骤 3" description="这段就没那么长了"></el-step>
                </el-steps>
              </div>
            </div>
          </div>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
  export default {
    name: "detailtra",
    data(){
      return{
        list:[
          {name:'我是测试数据'}
        ],
        activities: [{
          content: '活动按期开始',
          timestamp: '2018-04-15',
          status:1,
        }, {
          content: '通过审核',
          timestamp: '2018-04-13',
          status:1,
        }, {
          content: '创建成功',
          timestamp: '2018-04-11',
          status:0,
        }]
      }
    }
  }
</script>

<style lang="scss" scoped>
  .label-wrap{
    label{
      width: 120px;
      text-align: right;
    }
  }
  .aggregate-list {
    display: flex;
    .agg-left {
      width: 120px;
      text-align: right;
      display: inline-block;
      height: 32px;
      line-height: 32px;
      color: #999;
    }

    .agg-right {
      width: calc(100% - 120px);
    }
  }
</style>
