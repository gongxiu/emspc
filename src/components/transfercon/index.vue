<template>
  <div class="com-body">
    <el-transfer
      style="text-align: left; display: inline-block"
      v-model="value"
      filterable
      :left-default-checked="[]"
      :right-default-checked="[]"
      :titles="['待分配用户', '已分配用户']"
      :format="{
        noChecked: '${total}',
        hasChecked: '${checked}/${total}'
      }"
      @change="handleChange"
      :data="data">
      <span slot-scope="{ option }">{{ option.label }}</span>
    </el-transfer>
    <div class="com-btn">
      <el-button type="" size="small" @click="$closFun('close')">取消</el-button>
      <el-button type="primary" size="small" @click="onSubmit">确定</el-button>
    </div>
  </div>
</template>
<script>
  import {getInJobUsers,getNoInJobUsers,setJobUsers} from '@/api/job'
  import {queryToOrganizationUser,queryNoToOrganizationUser} from '@/api/organization'
  export default {
    props:{
      id:{
        type: [String,Number],
        default: ''
      },
      type:{ //1、机构 2、岗位
        type: [String,Number],
        default: ''
      }
    },
    data() {

      return {
        data: [],
        value: [],
        arr : [],
        noSelectList:[],
        selectList:[],
        teacherListTransferProps:{
          key: 'id',
          label: 'trueName'
        },
      };
    },
    mounted() {
      console.log(this.type)
      this.getNoUserData()
    },
    methods: {
      onSubmit(){
        let id = []
        this.arr.map((item,index)=>{
          this.value.map(item1=>{
            if(item1 == index){
              id.push(item.id)
            }
          })
        })
        setJobUsers(this.id, id).then(res=>{

        })

      },
      handleChange(value, direction, movedKeys) {
        console.log(value, direction, movedKeys);
      },
      getNoUserData(){
        if(this.type == 1){
          queryToOrganizationUser({id:this.id}).then(res=>{
            this.selectList = res.data
            this.data = this.selectList
          })
          queryNoToOrganizationUser({id:this.id}).then(res=>{
            this.noSelectList = res.data
            this.data =this.noSelectList

          })
        }else if(this.type == 2){
          getInJobUsers(this.id).then(res=>{
            this.selectList = res.data
            // this.data = this.selectList
            getNoInJobUsers(this.id).then(res1=>{
              this.noSelectList = res1.data
              this.arr =[...this.noSelectList,...this.selectList]
              this.selectList.map((item,index)=>{
                this.value.push(index)
              })
              this.arr.map((item,index)=>{
                this.data.push({
                  key: index,
                  label:item.trueName,
                })
              })


            })
          })

        }

      }
    }
  };
</script>
<style lang="scss" scoped>
  .transfer-footer {
    margin-left: 20px;
    padding: 6px 5px;

  }
</style>
