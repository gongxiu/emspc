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
      label: '二级 2-1'
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
  defaultProps: {
    children: 'children',
    label: 'label'
  },
  importFile:{
    personnel:'https://cargoods.ycyh56.com/images/others/%E8%BD%A6%E8%BE%86%E4%BF%A1%E6%81%AF%E6%89%B9%E9%87%8F%E5%AF%BC%E5%85%A5.xlsx',//人员
   status:''//岗位
  }
}
