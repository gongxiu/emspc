<template>
  <div class="com-body">
    <el-form ref="ruleForm" :rules="rules" :model="form" label-width="120px" size="small">
      <el-row :gutter="10">
        <el-col :span="8">
          <el-form-item label="所属仓库：" prop="wareHouseId">
            <select-tree v-model="form.wareHouseId" size="small" placeholder="选择所属仓库" filterable :options="orgTree"
                         :props="defaultProps"/>
          </el-form-item>

        </el-col>
        <el-col :span="8">
          <el-form-item label="备件名称：" prop="name">
            <el-input
              v-model="form.name"
              :clearable="true"
              placeholder="请输入备件名称"
              style="width: 100%"
            />
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="备件编码：" prop="code">
            <el-input
              v-model="form.code"
              :clearable="true"
              placeholder="请输入备件编码"
              style="width: 100%"
            />
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="备件条码：" prop="barCode">
            <el-input
              v-model="form.barCode"
              :clearable="true"
              placeholder="请输入备件条码"
              style="width: 100%"
            />
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="备件类型：" prop="spareType">
            <el-select v-model="form.spareType" style="width: 100%" placeholder="选择备件类型" filterable>
              <el-option
                v-for="(item,index) in testCheck"
                :key="index"
                :value="item.id"
                :label="item.label"
              />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="生命类型：" prop="lifeType">
            <el-select v-model="form.lifeType" style="width: 100%" placeholder="选择生命类型" filterable>
              <el-option
                v-for="(item,index) in testCheck"
                :key="index"
                :value="item.id"
                :label="item.label"
              />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="剩余次数：" prop="many">
            <el-input
              v-model="form.many"
              :clearable="true"
              placeholder="请输入剩余次数"
              style="width: 100%"
            />
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="总次数：" prop="countNum">
            <el-input
              v-model="form.countNum"
              :clearable="true"
              placeholder="请输入总次数"
              style="width: 100%"
            />
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="截止时间：" prop="endTime">
            <el-date-picker
              v-model="form.endTime"
              type="datetime"
              style="width: 100%"
              placeholder="选择截止时间">
            </el-date-picker>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="是否重置：">
            <el-select v-model="form.czBoold" style="width: 100%" placeholder="选择是否重置" filterable>
              <el-option
                v-for="(item,index) in testCheck"
                :key="index"
                :value="item.id"
                :label="item.label"
              />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="重置次数：">
            <el-input
              v-model="form.countNum"
              :clearable="true"
              placeholder="请输入重置次数"
              style="width: 100%"
            />
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="供应商：" >
            <el-input
              v-model="form.supplier"
              :clearable="true"
              placeholder="请输入供应商"
              style="width: 100%"
            />
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="备件原值：" >
            <el-input
              v-model="form.originalValue"
              :clearable="true"
              placeholder="请输入资产原值"
              style="width: 100%"
            />
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="购置时间：" >
            <el-date-picker
              v-model="form.purchaseDate"
              type="datetime"
              style="width: 100%"
              placeholder="选择日期时间">
            </el-date-picker>
          </el-form-item>
        </el-col>

        <el-col :span="8">
          <el-form-item label="出厂日期：" >
            <el-date-picker
              v-model="form.exFactoryDate"
              type="datetime"
              style="width: 100%"
              placeholder="选择日期时间">
            </el-date-picker>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="生产日期：" >
            <el-date-picker
              v-model="form.productionDate"
              type="datetime"
              style="width: 100%"
              placeholder="选择日期时间">
            </el-date-picker>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
  </div>

</template>

<script>
  import Const from '@/utils/const'
  import selectTree from '@/components/selectTree/selecttree'
  export default {
    components:{
      selectTree
    },
    data(){
      return{
        emptyArr:[],
        orgTree: Const.orgTree,
        testCheck:Const.testCheck,
        defaultProps: {
          children: "children",
          label: "title"
        },

        form:{
          warehouseId:'',//仓库id
          name:'',//名称
          code:'',//编码
          barCode:'',//条码
          spareType:'',//备件类型
          lifeType:'',//生命类型
          many:'',//剩余次数
          countNum:'',//总次数
          endTime:'',//截止日期
          czBoold:'',//充重置
          czNum:'',//重置次数
          supplier:'',//供应商
          originalValue:'',//原值
          purchaseDate:'',//购置时间
          exFactoryDate:'',//出厂日期
          productionDate:'',//生产日期
        },
        rules:{
          warehouseId:[
            { required: true, message: '必填', trigger: 'change' }
          ],
          name:[
            { required: true, message: '必填', trigger: 'blur' }
          ],//名称
          code:[
            { required: true, message: '必填', trigger: 'blur' }
          ],//编码
          barCode:[
            { required: true, message: '必填', trigger: 'blur' }
          ],//条码
          spareType:[
            { required: true, message: '必填', trigger: 'change' }
          ],
          lifeType:[
            { required: true, message: '必填', trigger: 'change' }
          ],
          endTime:[
            { required: true, message: '必填', trigger: 'change' }
          ]
        }
      }
    }
  }
</script>

<style scoped>

</style>
