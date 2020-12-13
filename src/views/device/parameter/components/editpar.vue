<template>
  <div class="com-body">
    <el-form ref="ruleForm" :rules="rules" :model="form" label-width="120px" size="small">
      <el-row :gutter="10">
        <el-col :span="8">
          <el-form-item label="设备名称：" prop="name">
            <el-input
              v-model="form.name"
              :clearable="true"
              placeholder="请输入设备名称"
              style="width: 100%"
            />
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="设备编号：" prop="code">
            <el-input
              v-model="form.code"
              :clearable="true"
              placeholder="请输入设备编号"
              style="width: 100%"
            />
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="设备条码：" prop="barCode">
            <el-input
              v-model="form.barCode"
              :clearable="true"
              placeholder="请输入设备条码"
              style="width: 100%"
            />
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="设备类型：" >
            <el-select v-model="form.type" style="width: 100%" placeholder="选择设备类型" filterable>
              <el-option
                v-for="(item,index) in deviceTypeArr"
                :key="index"
                :value="item.cateId"
                :label="item.name"
              />
            </el-select>
          </el-form-item>

        </el-col>
        <el-col :span="8">
          <el-form-item label="使用机构：" >
            <select-tree v-model="form.mechanism" node-key="value" :options="orgTree" :props="defaultProps"/>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="制造厂商：" >
            <el-input
              v-model="form.manufacturer"
              :clearable="true"
              placeholder="请输入制造厂商"
              style="width: 100%"
            />
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="规格型号：" >
            <el-input
              v-model="form.model"
              :clearable="true"
              placeholder="请输入规格型号"
              style="width: 100%"
            />
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="主要技术参数：" >
            <el-input
              v-model="form.parameter"
              :clearable="true"
              placeholder="请输入主要技术参数"
              style="width: 100%"
            />
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="品牌：" >
            <el-input
              v-model="form.brand"
              :clearable="true"
              placeholder="请输入品牌"
              style="width: 100%"
            />
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="编号：" >
            <el-input
              v-model="form.number"
              :clearable="true"
              placeholder="请输入编号"
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
          <el-form-item label="单价：" >
            <el-input
              v-model="form.unitPrice"
              :clearable="true"
              placeholder="请输入单价"
              style="width: 100%"
            />
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="资产原值：" >
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
        <el-col :span="8">
          <el-form-item label="保修时间：" >
            <el-date-picker
              v-model="form.guaranteeDate"
              type="datetime"
              style="width: 100%"
              placeholder="选择日期时间">
            </el-date-picker>
          </el-form-item>
        </el-col>

        <el-col :span="8">
          <el-form-item label="投产日期：" >
            <el-date-picker
              v-model="form.PutIntoDate"
              type="datetime"
              style="width: 100%"
              placeholder="选择日期时间">
            </el-date-picker>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="设备状态：" >
            <el-select v-model="form.status" style="width: 100%" placeholder="选择设备状态" filterable>
              <el-option
                v-for="(item,index) in deviceStatus"
                :key="index"
                :value="item.key"
                :label="item.value"
              />
            </el-select>
          </el-form-item>

        </el-col>
        <el-col :span="8">
          <el-form-item label="配件封面：">
            <div>
              <el-image  v-if="form.photo"
                         :src="form.photo" style="width: 100px;height: 100px"
                         fit="contain"></el-image>
              <el-image  v-else :src="require('@/assets/images/emptyimg.png')" width="100px" fit="contain"
                         height="100px" alt="" />
              <el-upload
                :on-success="handleAvatarSuccess"
                :before-upload="beforeAvatarUpload"
                :on-error="handleAvatarError"
                :action="baseAPI+'upload'"
                :show-file-list="false"
                class="upload"
                accept="image/png,image/jpeg"
                multiple
              >
                <el-button size="small">点击上传</el-button>
              </el-upload>
            </div>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <div class="com-btn">
      <el-button type="" size="small" @click="$closFun('close')">取消</el-button>
      <el-button type="primary" size="small" @click="onSubmit">确定</el-button>
    </div>
  </div>
</template>

<script>
  import Const from '@/utils/const'
  import selectTree from '@/components/selectTree/selecttree'
  import {addNewEqu,} from '@/api/equipment'
  import {geteQuipstatusList,getOrgTree, getByCateName} from "@/api/data"
  export default {
    name: "index",
    components:{
      selectTree
    },
    props:{
      data:{
        default:null,
        type:Object,
      }
    },
    data(){
      return{

        baseAPI:process.env.BASE_API,
        emptyArr:[],
        orgTree: Const.orgTree,
        mineStatusValue:'',
        defaultProps: {
          children: "children",
          label: "title"
        },

        deviceStatus:[],
        deviceTypeArr:[],
        /**使用机构 */
        useAgencyList: [],

        testCheck:Const.testCheck,
        form:{
          name:'',//名称
          code:'',//编码
          barCode:'',//条码
          type:'',//类型
          mechanism:'',//机构
          manufacturer:'',//厂商
          model:'',//型号
          parameter:'',//参数
          brand:'',//品牌
          number:'',//编号
          supplier:'',//供应商
          unitPrice:'',//单价
          originalValue:'',//原值
          purchaseDate:'',//购置时间
          exFactoryDate:'',//出厂日期
          productionDate:'',//生产日期
          guaranteeDate:'',//保修日期
          PutIntoDate:'',//投产日期
          status:0,//设备状态
          photo:'',//照片
        },
        rules:{
          name:[
            { required: true, message: '必填', trigger: 'blur' }
          ],//名称
          code:[
            { required: true, message: '必填', trigger: 'blur' }
          ],//编码
          barCode:[
            { required: true, message: '必填', trigger: 'blur' }
          ],//条码
          type:[
            { required: true, message: '必填', trigger: 'change' }
          ],//类型
          mechanism:[
            { required: true, message: '必填', trigger: 'change' }
          ],//机构
          manufacturer:[
            { required: true, message: '必填', trigger: 'blur' }
          ],//厂商
          model:[
            { required: true, message: '必填', trigger: 'blur' }
          ],//型号
          parameter:[
            { required: true, message: '必填', trigger: 'blur' }
          ],//参数
          brand:[
            { required: true, message: '必填', trigger: 'blur' }
          ],//品牌
          number:[
            { required: true, message: '必填', trigger: 'blur' }
          ],//编号
          supplier:[
            { required: true, message: '必填', trigger: 'blur' }
          ],//供应商
          unitPrice:[
            { required: true, message: '必填', trigger: 'blur' }
          ],//单价
          originalValue:[
            { required: true, message: '必填', trigger: 'blur' }
          ],//原值
          purchaseDate:[
            { required: true, message: '必填', trigger: 'blur' }
          ],//购置时间
          exFactoryDate:[
            { required: true, message: '必填', trigger: 'blur' }
          ],//出厂时间
          productionDate:[
            { required: true, message: '必填', trigger: 'blur' }
          ],//生产时间
          guaranteeDate:[
            { required: true, message: '必填', trigger: 'blur' }
          ],//保修时间
          PutIntoDate:[
            { required: true, message: '必填', trigger: 'blur' }
          ],//投产时间
          status:[
            { required: true, message: '必填', trigger: 'blur' }
          ],//状态
        }
      }
    },
    created() {
      this.getEquStatus()
      this.getOrgData()
      this.getDevName();
      this.getUseAgency();
    },
    methods:{
      getEquStatus(){
        geteQuipstatusList({

        }).then(res=>{
          this.deviceStatus = res.data
        })
      },
      getDevName(){
        console.log(1234)
        getByCateName('设备类别').then(res=>{
          console.log(res)
          this.deviceTypeArr = res.data
        })
      },
      /**使用机构 */
      getUseAgency() {
        getByCateName('使用机构').then(res => {
          this.useAgencyList = res.data;
        })
      },

      getOrgData(){
        getOrgTree({

        }).then(res=>{
          console.log(res)
          this.orgTree = res.data
          console.log(this.orgTree )
        })
      },

      handleAvatarSuccess(res, file) {
        console.log()
        this.form.photo = this.$hostUrl()+res.data;
        this.loadingVisible = false;
      },
      beforeAvatarUpload(file) {
        console.log(file)
        return this.$onlyImg(file.type);
      },
      handleAvatarError() {
        this.loadingVisible = false;
        this.$message({
          message: "图片上传失败",
          type: "error"
        });
      },
      selectChange(e){
        var arrNew = [];
        var dataLength = this.mineStatusValue.length;
        var eleng = e.length;
        for(let i = 0; i< dataLength ;i++){
          for(let j = 0; j < eleng; j++){
            if(e[j] === this.mineStatusValue[i].label){
              arrNew.push(this.mineStatusValue[i])
            }
          }
        }
        this.$refs.tree.setCheckedNodes(arrNew);//设置勾选的值
      },
      handleCheckChange() {
        let res = this.$refs.tree.getCheckedNodes(true, true); //这里两个true，1. 是否只是叶子节点 2. 是否包含半选节点（就是使得选择的时候不包含父节点）
        let arrLabel = [];
        let arr = [];
        res.forEach(item => {
          arrLabel.push(item.label);
          arr.push(item);
        });
        this.mineStatusValue = arr;
        this.mineStatus = arrLabel;
        console.log('arr:'+JSON.stringify(arr))
        console.log('arrLabel:'+arrLabel)
      },
      onSubmit(){

        this.$refs.ruleForm.validate((valid) => {
          if (valid) {
            if(this.data){

            }else {
                //缺少设备状态status:''
              addNewEqu({
                "BarCode":this.form.barCode,
                "Brand":this.data.brand,
                "BuyTime":this.form.purchaseDate,
                "Code":this.form.code,
                "EquipCate":0,//"0设备1配件"
                "EquipType":this.form.type,
                "FactoryNumber":this.form.number,
                "FactoryTime":this.form.exFactoryDate,
                "ImgUrl":this.form.photo,
                "MainParameter":this.form.parameter,
                "Manufacturer":this.form.manufacturer,
                "Name":this.form.name,
                "OrgId":this.form.mechanism,
                "OriginalPrice":this.form.originalValue,
                "ParentId":"",
                "ProductionTime":this.form.productionDate,
                "PutProductionTime":this.form.PutIntoDate,
                "Specifications":this.form.model,
                "SupplierId":this.form.supplier,
                "UnitPrice":this.form.unitPrice,
                "WarrantyTime":this.form.guaranteeDate,
                Status:this.form.Status
              }).then((res)=>{

              })
            }
          }
        })
      }
    }
  }
</script>

<style lang="scss" scoped>
.el-image{
  width: 100px;
}
</style>
