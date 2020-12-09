<template>
  <div class="com-body">
    <el-form ref="ruleForm" :rules="rules" :model="form" label-width="120px" size="small">
      <el-row :gutter="10">
        <el-col :span="8">
          <el-form-item label="配件名称：" prop="name">
            <el-input
              v-model="form.name"
              :clearable="true"
              placeholder="请输入配件名称"
              style="width: 100%"
            />
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="配件编码：" prop="code">
            <el-input
              v-model="form.code"
              :clearable="true"
              placeholder="请输入配件编码"
              style="width: 100%"
            />
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="配件条码：" prop="barCode">
            <el-input
              v-model="form.barCode"
              :clearable="true"
              placeholder="请输入配件条码"
              style="width: 100%"
            />
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="所属设备：" >
            <el-select v-model="form.device" style="width: 100%" placeholder="选择所属设备" filterable>
              <el-option
                v-for="(item,index) in deviceList"
                :key="index"
                :value="item.id"
                :label="item.label"
              />
            </el-select>
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
          <el-form-item label="出厂编号：" >
            <el-input
              v-model="form.number"
              :clearable="true"
              placeholder="请输入出厂编号"
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
              placeholder="选择日期时间">
            </el-date-picker>
          </el-form-item>
        </el-col>

        <el-col :span="8">
          <el-form-item label="出厂日期：" >
            <el-date-picker
              v-model="form.exFactoryDate"
              type="datetime"
              placeholder="选择日期时间">
            </el-date-picker>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="生产日期：" >
            <el-date-picker
              v-model="form.productionDate"
              type="datetime"
              placeholder="选择日期时间">
            </el-date-picker>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="保修时间：" >
            <el-date-picker
              v-model="form.guaranteeDate"
              type="datetime"
              placeholder="选择日期时间">
            </el-date-picker>
          </el-form-item>
        </el-col>

        <el-col :span="8">
          <el-form-item label="投产日期：" >
            <el-date-picker
              v-model="form.PutIntoDate"
              type="datetime"
              placeholder="选择日期时间">
            </el-date-picker>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="配件封面：">
            <el-image  v-if="form.photo"
                       :src="form.photo" style="width: 150px; height: 150px"
                       fit="contain"></el-image>
            <el-image  v-else :src="require('@/assets/images/emptyimg.png')" width="150px" fit="contain"
                       height="150px" alt="" />
            <el-upload
              :on-success="handleAvatarSuccess"
              :before-upload="beforeAvatarUpload"
              :on-error="handleAvatarError"
              :action="baseApi+'/backend/rescue/upload'"
              :show-file-list="false"
              class="upload"
              data="{type:'business'}"
              accept="image/png, image/jpeg"
              multiple
            >
              <el-button size="small">点击上传</el-button>
            </el-upload>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <div class="com-btn">
      <el-button type="" size="small" @click="$closFun('close')">取消</el-button>
      <el-button type="primary" size="small" @click="submit">确定</el-button>
    </div>
  </div>
</template>

<script>
  import Const from '@/utils/const'
  import selectTree from '@/components/selectTree/selecttree'
  import { getbycatename } from '@/api/diccate';
  import { addNewEqu } from '@/api/equipment';
  import { getByUrlEqu } from '@/api/equipment';
  export default {
    name: "index",
    components:{
      selectTree
    },
    data(){
      return{
        loadingVisible:false,
        emptyArr:[],
        dataTest: Const.testData,
        mineStatusValue:'',
        defaultProps: {
          children: "children",
          label: "label"
        },
        /**可选所属设备列表 */
        deviceList: [],
        testCheck:Const.testCheck,
        form:{
          name:'',//名称
          code:'',//编码
          barCode:'',//条码
          device:'',//所属设备
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
          status:'',//配件状态
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
      this.getData();
    },
    methods:{
      handleAvatarSuccess(res, file) {
        this.form.photo = res.data.url;
        this.loadingVisible = false;
      },
      beforeAvatarUpload(file) {
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
      getDeviceSelectOptions(res) {
        const outList = []
        if (res.length > 0) {
            for (const item of res) {
              outList.push({
                id: item.id,
                label: item.parentId
              })
            }
        }
        return outList;
      },
      async getData() {
        const { data: device_res } = await getByUrlEqu({
          EquipCate: 0
        });
        this.deviceList = this.getDeviceSelectOptions(device_res);
      },
      /**
       * 新增设备提交
       */
      submit() {
        // todo 校验
        const meta = {
              "BarCode": this.form.barCode,
              "Brand": this.form.brand,
              "BuyTime": this.form.purchaseDate,
              "Code": this.form.code,
              "EquipCate": 1,
              "EquipType": '',
              "FactoryNumber": this.form.number,
              "FactoryTime": this.form.exFactoryDate,
              "ImgUrl": '',
              "MainParameter": this.form.parameter,
              "Manufacturer":this.form.manufacturer,
              "Name": this.form.name,
              "OrgId": '',
              "OriginalPrice": parseInt(this.form.originalValue, 10),
              "ParentId":'',
              "ProductionTime": this.form.productionDate,
              "PutProductionTime": this.form.PutIntoDate,
              "Specifications": this.form.model,
              "SupplierId": this.form.supplier,
              "UnitPrice": this.form.unitPrice,
              "WarrantyTime": this.form.guaranteeDate,
        }
        addNewEqu(meta);
        this.$emit('close');
      }
    }
  }
</script>

<style scoped>

</style>
