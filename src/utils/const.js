export default {
  testData: [{
    id: 1,
    label: '一级 1',
    children: [{
      id: 4,
      label: '二级 1-1',
      children: [{
        id: 9,
        label: '三级 1-1-1'
      }, {
        id: 10,
        label: '三级 1-1-2'
      }]
    }]
  }, {
    id: 2,
    label: '一级 2',
    children: [{
      id: 5,
      label: '二级啊大大萨达多撒飒飒的卡斯达卡时间段艾萨克极速对决阿克苏大家啊可视对讲 2-1'
    }, {
      id: 6,
      label: '二级 2-2'
    }]
  }, {
    id: 3,
    label: '一级 3',
    children: [{
      id: 7,
      label: '二级 3-1'
    }, {
      id: 8,
      label: '二级 3-2',
      children: [{
        id: 11,
        label: '三级 3-2-1'
      }, {
        id: 12,
        label: '三级 3-2-2'
      }, {
        id: 13,
        label: '三级 3-2-3'
      }]
    }]
  }],
  testCheck: [
    {
      id:1,
      check:false,
      label:'张三',
    },
    {
      id:2,
      check:true,
      label:'张三',
    },
    {
      id:3,
      check:false,
      label:'张三',
    },{
      id:4,
      check:false,
      label:'张三',
    },
    {
      id:5,
      check:false,
      label:'张三',
    },
    {
      id:6,
      check:false,
      label:'张六',
    },
    {
      id:7,
      check:false,
      label:'张七',
    },
    {
      id:8,
      check:false,
      label:'张八',
    },
    {
      id:9,
      check:false,
      label:'张九',
    },
    {
      id:10,
      check:false,
      label:'张十',
    },
  ],
  defaultProps: {
    children: 'children',
    label: 'label'
  },
  importFile: {
    personnel: 'https://cargoods.ycyh56.com/images/others/%E8%BD%A6%E8%BE%86%E4%BF%A1%E6%81%AF%E6%89%B9%E9%87%8F%E5%AF%BC%E5%85%A5.xlsx',//人员
    station: '',//岗位
    modular: '',//角色
    role: '',//模块
    oper: '',//操作
    interface: '',//接口
    parameter:'',//设备台账
    accessories:'',//设备配件
    document:'',//文档
  }
}
