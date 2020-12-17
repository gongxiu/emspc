<template>
  <div class="com-body">
    <el-form ref="ruleForm" :rules="rules" :model="form" label-width="100px" size="small">
      <el-row :gutter="10">
        <el-col :span="24">
          <el-form-item label="组织机构：">
            <el-select v-model="mineStatus" placeholder="请选择" multiple style="width: 100%"
                       popper-class = "jobpadd"
                       @change="selectChange">
              <el-option  :value="mineStatusValue" style="height: auto">
                <el-tree :data="orgTree" show-checkbox node-key="value" check-strictly ref="tree" highlight-current
                         :props="defaultProps"
                         :default-checked-keys="defaultSelKey"
                         @check-change="handleCheckChange"></el-tree>
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-form-item label="姓名：" prop="name">
            <el-input
              v-model="form.name"
              :clearable="true"
              placeholder="请输入姓名"
              style="width: 100%"
            />
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-form-item label="账号：" prop="account">
            <el-input
              v-model="form.account"
              :clearable="true"
              placeholder="请输入账号"
              style="width: 100%"
            />
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-form-item label="密码：" prop="password">
            <el-input
              v-model="form.password"
              :clearable="true"
              placeholder="请输入密码"
              style="width: 100%"
            />
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-form-item label="岗位：" prop="jobs">
            <el-select v-model="form.jobs" style="width: 100%" multiple  placeholder="请选择岗位" filterable  >
              <el-option
                v-for="(item,index) in jobsArr"
                :key="index"
                :value="item.id"
                :label="item.name"
              />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-form-item label="岗位：">
            <div><el-radio v-model="form.gender" label="0">男</el-radio>
              <el-radio v-model="form.gender" label="1">女</el-radio></div>
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-form-item label="年龄：" prop="age">
            <el-input
              v-model="form.age"
              :clearable="true"
              placeholder="请输入年龄"
              style="width: 100%"
              type="number"
            />
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-form-item label="邮箱：" prop="email">
            <el-input
              v-model="form.email"
              :clearable="true"
              placeholder="请输入邮箱"
              style="width: 100%"
            />
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-form-item label="电话号码：" prop="phone">
            <el-input
              v-model="form.phone"
              :clearable="true"
              placeholder="请输入电话号码"
              style="width: 100%"
              maxLength="11"
            />
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-form-item label="其他账号：">
            <el-input
              v-model="form.otherAccount"
              :clearable="true"
              placeholder="请输入其他账号"
              style="width: 100%"
            />
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
  import treeSelect from '@/components/tree/treebox'
  import {addnewUser,updateUser,getbyIdUser} from '@/api/user'
  import {getByUrlJob} from '@/api/job'
  export default {
    name: "editperson",
    components:{
      treeSelect
    },
    props:{
      orgTree:{
        type:Array,
        default:null
      },
      data:{
        type:Object,
        default: null
      },
    },
    data(){
      return{
        mineStatus:'',
        mineStatusValue: [],
        defaultSelKey:[],
        jobsArr:[],
        defaultProps: {
          children: 'childrens',
          label: 'title',
          value:'value'
        },
        form:{
          mechanismName:'',//机构名称
          mechanismId:[],//父级机构
          name:'',//姓名
          account:'',//账号
          password:'',//密码
          jobs:[],//岗位
          gender:'0',//性别
          age:'',//年龄
          email:'',//邮箱
          phone:'',//电话号码
          otherAccount:'',//其他账号
        },
        rules: {
          name: [
            { required: true, message: '必填', trigger: 'blur' }
          ],
          mechanismId:[
            { required: true, message: '必填', trigger: 'change' }
          ],
          jobs:[
            { required: true, message: '必填', trigger: 'blur' }
          ],
          account:[
            { required: true, message: '必填', trigger: 'blur' }
          ],//账号
          password:[
            { required: true, message: '必填', trigger: 'blur' }
          ],//密码
          jobs:[
            { required: true, message: '必填', trigger: 'blur' }
          ],//岗位
          age:[
            { required: true, message: '必填', trigger: 'blur' }
          ],
          email:[
            { required: true, message: '必填', trigger: 'blur' }
          ],
          phone:[
            { required: true, message: '必填', trigger: 'blur' }
          ],
        },
      }
    },
    mounted() {
      console.log(123,this.data)
      if(this.data){
        this.getDetail()
      }
      this.getStation()

    },
    methods:{
      getDetail(){
        getbyIdUser(this.data.id).then(res=>{
            console.log(res)
          let info = res.data
          this.defaultSelKey = info.orgIds.map(String)
          this.form={
            // mechanismName:this.data,//机构名称
            mechanismId:info.orgIds.map(String),//父级机构
            name:info.trueName,//姓名
            account:info.account,//账号
            password:info.password,//密码
            jobs:info.jobIds.map(String),//岗位
            gender:info.gender,//性别
            age:info.age,//年龄
            email:info.email,//邮箱
            phone:info.mobilePhoneNum,//电话号码
            otherAccount:info.workPhoneNum,//其他账号
          }
          console.log(this.form)
        })
      },
//select框值改变时候触发的事件
      selectChange(e) {
        console.log(this.mineStatusValue)
        var arrNew = [];
        var dataLength = this.mineStatusValue.length;
        var eleng = e.length;
        for (let i = 0; i < dataLength; i++) {
          for (let j = 0; j < eleng; j++) {
            if (e[j] === this.mineStatusValue[i].label) {
              arrNew.push(this.mineStatusValue[i])
            }
          }
        }
        this.$refs.tree.setCheckedNodes(arrNew);//设置勾选的值
      },
      handleCheckChange() {
        let res = this.$refs.tree.getCheckedNodes(false, false); //这里两个true，1. 是否只是叶子节点 2. 是否包含半选节点（就是使得选择的时候不包含父节点）
        console.log(res)
        let arrLabel = [];
        let arr = [];
        res.forEach(item => {
          arrLabel.push(item.title);
          arr.push(item.value);
        });
        this.mineStatusValue = arr;
        this.mineStatus = arrLabel;
        this.form.mechanismId = arr
      },
      getStation(){
        getByUrlJob({
        }).then(res=>{
          this.jobsArr=res.data
        })
      },

      getValue(value){
        console.log(value)
      },
      onSubmit(){
        this.$refs['ruleForm'].validate((valid) => {
          if (valid) {
            if (this.data) {
              updateUser({
                id:this.data.id,
                ThirtPartyName:'',
                account:this.form.account,
                OrgIds:this.form.mechanismId,
                TrueName:this.form.name,
                password:this.form.password,
                JobIds:this.form.jobs,
                Gender:this.form.gender,
                age:this.form.age,
                Email:this.form.email,
                MobilePhoneNum:this.form.phone,
                WorkPhoneNum:this.form.otherAccount,
              }).then(res=>{
                console.log(res)
                this.$emit('closeUser')
                this.$message.success(res.msg)
              })
            } else {
              addnewUser({
                ThirtPartyName:'',
                account:this.form.account,
                OrgIds:this.form.mechanismId,
                TrueName:this.form.name,
                password:this.form.password,
                JobIds:this.form.jobs,
                Gender:this.form.gender,
                age:this.form.age,
                Email:this.form.email,
                MobilePhoneNum:this.form.phone,
                WorkPhoneNum:this.form.otherAccount,
              }).then(res=>{
                  console.log(res)
                this.$emit('closeUser')
                this.$message.success(res.msg)
              })
            }
          }
        })
      },
    }
  }
</script>

<style lang="scss" scoped>
  .el-select-other{
    width: 100%;
  }
  .jobpadd .el-scrollbar .el-scrollbar__view .el-select-dropdown__item{
    height: auto;
    max-height: 274px;
    padding:0px;
    overflow: hidden;
    overflow-y: auto;
  }
</style>
