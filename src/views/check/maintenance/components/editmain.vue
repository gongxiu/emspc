<template>
  <div class="com-body">
    <el-form ref="ruleForm" :rules="rules" :model="form" label-width="120px" size="small">
      <el-row :gutter="10">
        <el-col :span="8">
          <el-form-item label="所在机构：" >
            <select-tree v-model="form.mechanismId" :options="orgTree" :props="defaultProps"/>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="设备：" prop="device">
            <el-select v-model="form.device" style="width: 100%" placeholder="选择设备类型" filterable>
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
          <el-form-item label="故障类别：">
            <el-select v-model="form.faultType" style="width: 100%" placeholder="选择设备类型" filterable>
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
          <el-form-item label="故障时间：" prop="faultTime">
            <el-date-picker
              v-model="form.faultTime"
              type="datetime"
              style="width: 100%;"
              placeholder="选择故障时间">
            </el-date-picker>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="开始处理时间：" prop="startProceTime">
            <el-date-picker
              v-model="form.startProceTime"
              style="width: 100%;"
              type="datetime"
              placeholder="选择开始处理时间">
            </el-date-picker>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="结束处理时间：" prop="endProceTime">
            <el-date-picker
              v-model="form.endProceTime"
              style="width: 100%;"
              type="datetime"
              placeholder="选择结束处理时间">
            </el-date-picker>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="维修类型：">
            <el-select v-model="form.mainteType" style="width: 100%" placeholder="选择维修类型" filterable>
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
          <el-form-item label="处理人：" prop="handle" >
            <select-tree v-model="form.handle" :options="orgTree" :props="defaultProps"/>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="抄送人：" >
            <select-tree v-model="form.ccPerson" :options="orgTree" :props="defaultProps"/>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="维修商家：">
            <el-select v-model="form.business" style="width: 100%" placeholder="选择维修商家" filterable>
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
          <el-form-item label="委外师傅：" >
            <el-input
              v-model="form.outSourName"
              :clearable="true"
              placeholder="请输入委外师傅"
              style="width: 100%"
            />
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="委外师傅电话：" >
            <el-input
              v-model="form.outSourPhone"
              :clearable="true"
              placeholder="委外师傅电话"
              style="width: 100%"
            />
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-form-item label="故障原因：" >
            <el-input
              type="textarea"
              v-model="form.remark"
              :autosize="{ minRows: 4}"
              placeholder="请输入内容"
              style="width: 100%"
            />
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-form-item label="上传故障图片：" >
            <div v-if="form.photo.length>0">
              <el-image
                         :src="form.photo" style="width: 100px; height: 100px;margin-right: 10px"
                         fit="contain"></el-image>
            </div>
            <el-image v-else :src="require('@/assets/images/emptyimg.png')" style="width:100px" fit="contain"
                       height="100px" alt="" />
            <el-upload
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
      <div class="com-btn">
        <el-button type="" size="small" @click="$closFun('close')">取消</el-button>
        <el-button type="primary" size="small">确定</el-button>
      </div>
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
    name: "editmain",
    data(){
      return{
        orgTree:Const.orgTree,
        testCheck:Const.testCheck,
        defaultProps: {
          children: "children",
          label: "title"
        },
        form:{
          mechanismId:'',//组织机构
          device:'',//设备
          faultType:'',//故障类别
          faultTime:'',//故障时间
          startProceTime:'',//开始处理时间
          endProceTime:'',//结束处理时间
          mainteType:'',//维修类型
          handle:'',//处理人
          ccPerson:'',//抄送人
          business:'',//维修商家
          outSourName:'',//委外师傅
          outSourPhone:'',//委外师傅电话
          remark:'',//原因
          photo:[],
        },
        rules:{
          device:[
            { required: true, message: '必填', trigger: 'blur' }
          ],
          faultTime:[
            { required: true, message: '必填', trigger: 'blur' }
          ],
          startProceTime:[
            { required: true, message: '必填', trigger: 'blur' }
          ],
          endProceTime:[
            { required: true, message: '必填', trigger: 'blur' }
          ] ,
          handle:[
            { required: true, message: '必填', trigger: 'blur' }
          ],
          ccPerson:[
            { required: true, message: '必填', trigger: 'blur' }
          ],
        }
      }
    },
    methods:{
      handleAvatarSuccess(res, file) {
        this.form.photo.push(res.data.url);
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
    }
  }
</script>

<style scoped>

</style>
