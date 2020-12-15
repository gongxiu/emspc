
<template>
  <div>
    <el-select v-model="mineStatus" placeholder="请选择" multiple collapse-tags @change="selectChange">
      <el-option  :value="mineStatusValue" style="height: auto">
        <el-tree :data="props" show-checkbox node-key="id" ref="tree" highlight-current :props="defaultProps" @check-change="handleCheckChange"></el-tree>
      </el-option>
    </el-select>
  </div>
</template>
<script>
  export default {
    props:{
      /* 配置项 */
      props:{
        type: Object,
        default:()=>{
          return {
            value:'value',             // ID字段名
            label: 'title',         // 显示名称
            children: 'childrens'    // 子级字段名
          }
        }
      },
      /* 选项列表数据(树形结构的对象数组) */
      options:{
        type: Array,
        default: ()=>{ return [] }
      },
      /* 初始值 */
      value:{
        type: [Number,String],
        default: ()=>{ return null }
      },
      /* 可清空选项 */
      clearable:{
        type:Boolean,
        default:()=>{ return true }
      },
      /* 自动收起 */
      accordion:{
        type:Boolean,
        default:()=>{ return false }
      },
      // 多选框
      checkboxShow:{
        type:Boolean,
        default:()=>{ return false }
      },
      disabled:{
        type:Boolean,
        default:()=>{ return false }
      },
      placeholder:{
        type:String,
        default:()=>{return "检索关键字"}
      }
    },
    data() {
      return {
        mineStatus: "",
        mineStatusValue: [],
        defaultProps: {
          children: "children",
          label: "label"
        }
      };
    },
    methods: {
//select框值改变时候触发的事件
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
      }
    }
  };
</script>

<style scoped>
  .mask{
    width: 100%;
    height: 100%;
    position: fixed;
    top: 0;
    left: 0;
    opacity: 0;
  }
  .common-tree{
    overflow: auto;
  }
</style>

<style>
  .tree-select .el-select__tags .el-tag .el-tag__close{
    display: none;
  }
  .tree-select .el-select__tags .el-tag .el-icon-close{
    display: none;
  }
</style>
