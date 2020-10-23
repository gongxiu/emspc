export default {
  orderStatus: [
    {
      text: '等待接单',
      value: 0
    },
    {
      text: '服务中',
      value: 1
    },
    {
      text: '待支付',
      value: 2
    },
    {
      text: '已支付',
      value: 3
    },
    {
      text: '已完成',
      value: 4
    },

    {
      text: '已取消',
      value: 5
    }
  ],
  driverStatus: [
    {
      text: '休息中',
      value: 0,
      class: 'info'
    },
    {
      text: '抢单中',
      value: 1,
      class: 'padding'
    },
    {
      text: '工作中',
      value: 2,
      class: 'success'
    }
  ],
  verifyStatus: [
    {
      text: '未提交',
      value: 0,
      class: 'info'
    },
    {
      text: '待审核',
      value: 1,
      class: 'danger'
    },
    {
      text: '通过',
      value: 2,
      class: 'success'
    },
    {
      text: '不通过',
      value: 3,
      class: 'info'
    }
  ],
  onlyverifyStatus: [
    {
      text: '未提交',
      value: 0,
      class: 'info'
    }
  ],
  depositStatus: [
    {
      text: '未缴纳',
      value: 0,
      class: 'info'
    },
    {
      text: '押金不足',
      value: 1,
      class: 'danger'
    },
    {
      text: '押金足额',
      value: 2,
      class: 'success'
    },
    {
      text: '押金冻结',
      value: 3,
      class: 'danger'
    }
  ],
  driverType: [
    {
      text: '自营',
      value: 0,
      class: 'info'
    },
    {
      text: '兼职',
      value: 1,
      class: 'danger'
    },
    {
      text: '加盟',
      value: 2,
      class: 'success'
    }
  ],
  plateNumColor: [
    {
      text: '蓝色',
      value: 0,
      class: 'info'
    },
    {
      text: '绿色',
      value: 1,
      class: 'danger'
    },
    {
      text: '黄色',
      value: 2,
      class: 'success'
    }
  ],
  crStatus: [
    {
      text: '待激活',
      value: 0,
      class: 'danger'
    },
    {
      text: '使用中',
      value: 1,
      class: 'success'
    },
    {
      text: '已过期',
      value: 2,
      class: 'info'
    }
  ],
  useType: [
    {
      text: '普通',
      value: 0,
      class: 'info'
    },
    {
      text: '用户注册',
      value: 1,
      class: 'info'
    },
    {
      text: '司机邀请',
      value: 2,
      class: 'info'
    }
  ],
  crType: [
    {
      text: '现金券',
      value: 0,
      class: 'danger'
    },
    {
      text: '满减券',
      value: 1,
      class: 'success'
    }
  ],
  refundStatus: [
    {
      text: '待处理',
      value: 0,
      class: 'danger'
    },
    {
      text: '提现成功',
      value: 1,
      class: 'info'
    },
    {
      text: '提现失败',
      value: 2,
      class: 'info'
    },
    {
      text: '用户取消',
      value: 3,
      class: 'info'
    }
  ],
  accountType: [
    {
      text: '订单收入',
      value: 0,
      class: 'danger'
    },
    {
      text: '提现支出',
      value: 1,
      class: 'info'
    },
    {
      text: '系统奖励',
      value: 2,
      class: 'info'
    },
    {
      text: '系统惩罚',
      value: 3,
      class: 'info'
    }
  ],
  openType: [
    {
      text: '打开原生页面',
      value: 0,
      class: 'danger'
    },
    {
      text: '打开网页',
      value: 1,
      class: 'info'
    }
  ],
  messageType: [
    {
      text: '司机和用户',
      value: 0,
      class: 'danger'
    },
    {
      text: '全部用户',
      value: 1,
      class: 'info'
    },
    {
      text: '全部司机',
      value: 2,
      class: 'info'
    },
    {
      text: '单个司机',
      value: 3,
      class: 'info'
    }
  ],
  tenderStatus: [
    {
      text: '待发布',
      value: 0,
      class: 'warning'
    },
    {
      text: '招标中',
      value: 1,
      class: 'padding'
    },
    {
      text: '进行中',
      value: 2,
      class: 'padding'
    },
    {
      text: '项目结束',
      value: 3,
      class: 'success'
    }
  ],
  toStatus: [
    {
      text: '未发布',
      value: 0,
      class: 'warning'
    },
    {
      text: '待确认',
      value: 1,
      class: 'danger'
    },
    {
      text: '已完成',
      value: 6,
      class: 'success'
    },
    {
      text: '已拒绝',
      value: 2,
      class: 'danger'
    },
    {
      text: '已确认',
      value: 4,
      class: 'success'
    },
    {
      text: '配送中',
      value: 5,
      class: 'danger'
    },
    {
      text: '已改派',
      value: 3,
      class: 'info'
    }
  ],
  tenderType: [
    {
      text: '公开项目',
      value: 0,
      class: 'warning'
    },
    {
      text: '内部项目',
      value: 1,
      class: 'danger'
    }
  ],
  timeStatue: [
    {
      text: '今天',
      value: 0
    },
    {
      text: '最近一周',
      value: 1
    },
    {
      text: '最近一个月',
      value: 2
    },
    {
      text: '最近三个月',
      value: 3
    }
  ],
  orderStatu: [
    {
      text: '未推送',
      value: 0,
      class: 'danger'
    },
    {
      text: '未确认',
      value: 1,
      class: 'danger'
    },
    {
      text: '已拒绝',
      value: 2,
      class: 'danger'
    },
    {
      text: '已改派',
      value: 3,
      class: 'padding'
    },
    {
      text: '已确认',
      value: 4,
      class: 'success'
    },
    {
      text: '配送中',
      value: 5,
      class: 'padding'
    },
    {
      text: '已完成',
      value: 6,
      class: 'success'
    }
  ],
  energyType: [
    {
      text: '新能源',
      value: 0
    },
    {
      text: '燃油',
      value: 1
    }
  ],
  carType: [
    {
      text: '普厢',
      value: 0
    },
    {
      text: '冷藏车',
      value: 1
    }
  ],
  accountTypeList: [
    {
      text: '按趟',
      value: 0
    },
    {
      text: '按日',
      value: 1
    },
    {
      text: '按周',
      value: 2
    },
    {
      text: '按月',
      value: 3
    }
  ],
  routeType: [
    {
      text: '单地址',
      value: 0
    },
    {
      text: '多地址',
      value: 1
    }
  ],
  carList: [
    {
      text: '摩的骑士',
      cmId: 1
    },
    {
      text: '小面包车',
      cmId: 2
    },
    {
      text: '大面包车',
      cmId: 3
    },
    {
      text: '小货车',
      cmId: 4
    },
    {
      text: '轻卡车',
      cmId: 5
    },

    {
      text: '重卡车',
      cmId: 6
    }
  ],
  customerStatus: [
    {
      text: '待跟进',
      value: 1,
      class: 'warning'
    },
    {
      text: '已签约',
      value: 2,
      class: 'success'
    },
  ],
  quickContractStatus: [
    {
      text: '待提交',
      value: 1,
      class: 'warning'
    },
    {
      text: '待审核',
      value: 2,
      class: 'warning'
    },
    {
      text: '已审核',
      value: 3,
      class: 'success'
    },
    /*    {
          text: '已审核',
          value: 7,
          class: 'success'
        },*/
    {
      text: '待续签 ',
      value: 4,
      class: 'warning'
    },
    {
      text: '已续签',
      value: 5,
      class: 'success'
    },
    {
      text: '已逾期',
      value: 6,
      class: 'danger'
    },
    {
      text: '结算中',
      value: 8,
      class: 'padding'
    },
    {
      text: '已完成',
      value: 9,
      class: 'success'
    },
  ],
  quickContractType: [
    {
      text: '空置',
      value: 0,
      class: 'warning'
    },
    {
      text: '纯租车',
      value: 1,
      class: 'info'
    },
    {
      text: '以租代购',
      value: 2,
      class: 'danger'
    },
    {
      text: '全款购车',
      value: 3,
      class: 'success'
    },
    {
      text: '车辆挂靠',
      value: 4,
      class: 'success'
    },
  ],
  quickContractType1: [
    {
      text: '空置',
      value: 0,
      class: 'warning'
    },
    {
      text: '纯租车',
      value: 1,
      class: 'info'
    },
    {
      text: '以租代购',
      value: 2,
      class: 'danger'
    },
    {
      text: '全款购车',
      value: 3,
      class: 'success'
    },
    {
      text: '车辆挂靠',
      value: 4,
      class: 'success'
    },
  ],
  quickContractType2: [
    {
      text: '纯租车',
      value: 1,
      class: 'info'
    },
    {
      text: '以租代购',
      value: 2,
      class: 'danger'
    },
    {
      text: '全款购车',
      value: 3,
      class: 'success'
    },
    {
      text: '车辆挂靠',
      value: 4,
      class: 'success'
    },
  ],
  customerType: [
    {
      text: '重点跟进',
      value: 'A'
    },
    {
      text: '持续跟进',
      value: 'B'
    },
    {
      text: '阶段跟进',
      value: 'C'
    },
    {
      text: '无效客户',
      value: 'D'
    }
  ],

  carClass: [
    {
      text: '小面包车',
      value: 755278219265
    },
    {
      text: '大面包车',
      value: 755278219266
    },
    {
      text: ' 轻卡车',
      value: 755278219267
    },
    {
      text: '重卡车',
      value: 755278219268
    },
    {
      text: ' 小货车',
      value: 755278219269
    }
  ],
  carAll: [
    {
      label: '电动车',
      value: 1,
      children: [{
        label: '两轮电动车',
        value: 755278219264
      },
        {
          label: '三轮电动车',
          value: 755278219270
        }
      ]
    },
    {
      label: '面包车',
      value: 2,
      children: [{
        label: '小型面包车',
        value: 755278219265
      },
        {
          label: '中型面包车',
          value: 755278219266
        },
        {
          label: '大型面包车',
          value: 755278219271
        },
        {
          label: '冷藏面包车',
          value: 755278219272
        }],
    },
    {
      label: '小货车',
      value: 3,
      children: [{
        label: '厢式小货车',
        value: 755278219269
      },
        {
          label: '平板小货车',
          value: 755278219273
        },
        {
          label: '仓栏小货车',
          value: 755278219274
        },
        {
          label: '冷藏小货车',
          value: 755278219275
        }],
    },
    {
      label: '中货车',
      value: 4,
      children: [{
        label: '厢式中货车',
        value: 755278219267
      },
        {
          label: '平板中货车',
          value: 755278219276
        },
        {
          label: '仓栏中货车',
          value: 755278219277
        },
        {
          label: '冷藏中货车',
          value: 755278219278
        }],
    },
    {
      label: '大货车',
      value: 5,
      children: [{
        label: '厢式大货车',
        value: 755278219268
      },
        {
          label: '平板大货车',
          value: 755278219279
        },
        {
          label: '仓栏大货车',
          value: 755278219280
        },
        {
          label: '冷藏大货车',
          value: 755278219281
        }],
    },
    {
      label: '乘用车',
      value: 6,
      children: [{
        label: '轿车',
        value: 755278219282
      },
        {
          label: 'suv',
          value: 755278219283
        },],
    },
  ],
  carTypeAll: [
    {
      type: 1,
      label: '两轮电动车',
      value: 755278219264
    },
    {
      type: 1,
      label: '三轮电动车',
      value: 755278219270
    },
    {
      type: 2,
      label: '小型面包车',
      value: 755278219265
    },
    {
      type: 2,
      label: '中型面包车',
      value: 755278219266
    },
    {
      type: 2,
      label: '大型面包车',
      value: 755278219271
    },
    {
      type: 2,
      label: '冷藏面包车',
      value: 755278219272
    },
    {
      type: 3,
      label: '厢式小货车',
      value: 755278219269
    },
    {
      type: 3,
      label: '平板小货车',
      value: 755278219273
    },
    {
      type: 3,
      label: '仓栏小货车',
      value: 755278219274
    },
    {
      type: 3,
      label: '冷藏小货车',
      value: 755278219275
    },
    {
      type: 4,
      label: '厢式中货车',
      value: 755278219267
    },
    {
      type: 4,
      label: '平板中货车',
      value: 755278219276
    },
    {
      type: 4,
      label: '仓栏中货车',
      value: 755278219277
    },
    {
      type: 4,
      label: '冷藏中货车',
      value: 755278219278
    },
    {
      type: 5,
      label: '厢式大货车',
      value: 755278219268
    },
    {
      type: 5,
      label: '平板大货车',
      value: 755278219279
    },
    {
      type: 5,
      label: '仓栏大货车',
      value: 755278219280
    },
    {
      type: 5,
      label: '冷藏大货车',
      value: 755278219281
    },
    {
      type: 6,
      label: '轿车',
      value: 755278219282
    },
    {
      type: 6,
      label: 'suv',
      value: 755278219283
    }
  ],
  businessClass: [
    // {
    //   text: '全款',
    //   value: 1
    // },
    // {
    //   text: '纯租',
    //   value: 2
    // },
    // {
    //   text: '以租代购 ',
    //   value: 3
    // },
    {
      text: '备用车',
      value: 4
    },
    {
      text: '展示车 ',
      value: 5
    },
    {
      text: '库存车',
      value: 6
    }
  ],
  protectClass: [
    {
      text: '新能源',
      value: 1
    },
    {
      text: '国五',
      value: 2
    },
    {
      text: '国四',
      value: 3
    },
    {
      text: '国三',
      value: 4
    },
    {
      text: '国二',
      value: 5
    },
    {
      text: '国六',
      value: 6
    }
  ],
  caseState: [
    {
      text: '待定损(未处理)',
      value: 1
    },
    {
      text: '已定损待结案(处理中) ',
      value: 2
    },
    {
      text: '已结案(完成) ',
      value: 3
    },
    {
      text: '已结案待理赔(完成) ',
      value: 4
    },
    {
      text: '理赔完毕(完成) ',
      value: 5
    },
    {
      text: '销案(完成)',
      value: 6
    }
  ],
  accidentTypes: [
    {
      text: '单方面',
      value: 1
    },
    {
      text: '双方面',
      value: 2
    },
    {
      text: '多方面',
      value: 3
    }
  ],
  accidentLiability: [
    {
      text: '主责',
      value: 1
    },
    {
      text: '全责',
      value: 2
    },
    {
      text: '待确认',
      value: 3
    },
    {
      text: '无责 ',
      value: 4
    },
    {
      text: '同等',
      value: 5
    },
    {
      text: '次等',
      value: 6
    }
  ],
  payment: [
    {
      text: '公司',
      value: 1
    },
    {
      text: '司机',
      value: 2
    }
  ],
  licenceClass: [
    {
      text: '行驶证',
      value: 1
    },
    {
      text: '登记证书 ',
      value: 2
    },
    {
      text: '年检标贴',
      value: 3
    },
    {
      text: '运营标贴',
      value: 4
    },
    {
      text: '网络预约出租汽车运输证',
      value: 5
    },
    {
      text: '产证照片 ',
      value: 6
    },
    {
      text: '综合性能检测卡 ',
      value: 7
    },
    {
      text: '车用气瓶使用证 ',
      value: 7
    }
  ],
  insuranceClass: [
    {
      text: '交强险',
      value: 1
    },
    {
      text: '商业险',
      value: 2
    },
    {
      text: '承运人责任险',
      value: 3
    },
    {
      text: '客伤险',
      value: 4
    },
    {
      text: '车船税',
      value: 5
    },
    {
      text: '盗抢险',
      value: 6
    }
  ],
  InsuranceMatters: [
    {
      text: '第三方责任险',
      value: 1
    },
    {
      text: '机动车损失险',
      value: 2
    },
    {
      text: '司机责任险 ',
      value: 3
    },
    {
      text: '乘客责任险',
      value: 4
    },
    {
      text: '盗抢险',
      value: 5
    },
    {
      text: '涉水险 ',
      value: 6
    },
    {
      text: '玻璃险 ',
      value: 7
    },
    {
      text: '自燃险 ',
      value: 8
    },
    {
      text: '不计免赔 ',
      value: 9
    }
  ],
  paymentPeople: [
    {
      text: '公司',
      value: 1
    },
    {
      text: '个人',
      value: 2
    }
  ],
  Status: [
    {
      text: '待审核',
      value: 0,
      class: 'danger'
    },
    {
      text: '审核通过',
      value: 1,
      class: 'success'
    },
    {
      text: '审核不通过',
      value: 2,
      class: 'info'
    }
  ],
  cdvType: [
    {
      text: '加入车队',
      value: 1
    }
  ],
  lineStatus: [
    {
      text: '离线 ',
      value: 1,
      class: 'danger'
    },
    {
      text: '在线',
      value: 2,
      class: 'success'
    },
    {
      text: '无设备 ',
      value: 3,
      class: 'info'
    },
    {
      text: '未装车',
      value: 4,
      class: 'info'
    }
  ],
  processingStatus: [
    {
      text: '未处理 ',
      value: 1,
      class: 'danger'
    },
    {
      text: '完成',
      value: 2,
      class: 'success'
    },
    {
      text: '处理中',
      value: 3,
      class: 'info'
    }
  ],
  rentalStatus: [
    {
      text: '未租',
      value: 0,
      class: 'danger'
    },
    {
      text: '已租',
      value: 1,
      class: 'success'
    }
  ],
  whether: [
    {
      text: '否',
      value: 1,
      class: 'danger'
    },
    {
      text: '有',
      value: 2,
      class: 'success'
    }
  ],
  accidentMatters: [
    {
      text: '三者',
      value: 1
    },
    {
      text: '主车 ',
      value: 2
    },
    {
      text: '物损费',
      value: 3
    },
    {
      text: '人伤费',
      value: 4
    },
    {
      text: '加速折旧费 ',
      value: 5
    },
    {
      text: '事故罚金 ',
      value: 6
    },
    {
      text: '保险上浮费',
      value: 7
    }
  ],
  paymentStatus: [
    {
      text: '司机账户',
      value: 1
    },
    {
      text: '银行卡',
      value: 2
    },
    {
      text: '支付宝',
      value: 3
    },
    {
      text: '微信',
      value: 4
    },
    {
      text: 'POS',
      value: 5
    },
    {
      text: '现金',
      value: 6
    },
    {
      text: '其他 ',
      value: 7
    },
    {
      text: '减免',
      value: 8
    },
    {
      text: '代扣 ',
      value: 9
    },
    {
      text: '抵扣 ',
      value: 10
    },
    {
      text: '二维码 ',
      value: 11
    },
    {
      text: '信用卡 ',
      value: 12
    }
  ],
  indemnityStatus: [
    {
      text: '商业险',
      value: 1,
      class: 'danger'
    },
    {
      text: '承运人责任险',
      value: 2,
      class: 'success'
    },
    {
      text: '交强险',
      value: 3
    }
  ],
  maintenancePolicyStatus: [
    {
      text: '保养 ',
      value: 1
    },
    {
      text: '维修',
      value: 2
    },
    {
      text: '报废 ',
      value: 3
    },
    {
      text: '事故',
      value: 4
    }
  ],
  maintenanceStatus: [
    {
      text: '未完成 ',
      value: 1,
      class: 'info'
    },
    {
      text: '已完成',
      value: 2,
      class: 'success'
    }
  ],
  maintenanceProjectType: [
    {
      text: '维修',
      value: 1
    },
    {
      text: '保养',
      value: 2
    },
    {
      text: '美容',
      value: 3
    },
    {
      text: '钣喷 ',
      value: 4
    },
    {
      text: '轮胎 ',
      value: 5
    },
    {
      text: '精品',
      value: 6
    },
    {
      text: '洗车 ',
      value: 7
    }
  ],
  options: [
    {
      value: '新能源',
      label: '新能源',
      children: [
        {
          value: '拖车钩',
          label: '拖车钩'
        },
        {
          value: '剩余电量',
          label: '剩余电量'
        },
        {
          value: '充电线',
          label: '充电线'
        },
        {
          value: '充电桩',
          label: '充电桩'
        },
        {
          value: '快速充电口',
          label: '快速充电口'
        },
        {
          value: '普通充电口',
          label: '普通充电口'
        },
        {
          value: '充电宝',
          label: '充电宝'
        }
      ]
    },
    {
      value: '通用',
      label: '通用',
      children: [
        {
          value: '电子标识卡',
          label: '电子标识卡'
        },
        {
          value: '剩余电量',
          label: '剩余电量'
        },
        {
          value: '充电线',
          label: '充电线'
        },
        {
          value: '充电桩',
          label: '充电桩'
        },
        {
          value: '快速充电口',
          label: '快速充电口'
        },
        {
          value: '普通充电口',
          label: '普通充电口'
        },
        {
          value: '电子标识卡',
          label: '电子标识卡'
        },
        {
          value: '充电宝',
          label: '充电宝'
        },
        {
          value: '其他事项',
          label: '其他事项'
        },
        {
          value: '右前雾灯',
          label: '右前雾灯'
        },
        {
          value: '左前雾灯',
          label: '左前雾灯'
        },
        {
          value: '右前倒车镜',
          label: '右前倒车镜'
        },
        {
          value: '左前倒车镜',
          label: '左前倒车镜'
        },
        {
          value: '右后钢圈',
          label: '右后钢圈'
        },
        {
          value: '左后钢圈',
          label: '左后钢圈'
        },
        {
          value: '右前钢圈',
          label: '右前钢圈'
        },
        {
          value: '左前钢圈',
          label: '左前钢圈'
        },
        {
          value: '右底大边',
          label: '右底大边'
        },
        {
          value: '左底大边',
          label: '左底大边'
        },
        {
          value: '车顶',
          label: '车顶'
        },
        {
          value: '后挡风玻璃',
          label: '后挡风玻璃'
        },
        {
          value: '前挡风玻璃',
          label: '前挡风玻璃'
        },
        {
          value: '右后门玻璃',
          label: '右后门玻璃'
        },
        {
          value: '右前门玻璃',
          label: '右前门玻璃'
        },
        {
          value: '左后门玻璃',
          label: '左后门玻璃'
        },
        {
          value: '左前门玻璃',
          label: '左前门玻璃'
        },
        {
          value: '下格栅',
          label: '下格栅'
        },
        {
          value: '中网',
          label: '中网'
        },
        {
          value: '后车牌',
          label: '后车牌'
        },
        {
          value: '前车牌',
          label: '前车牌'
        },
        {
          value: '地毯是否备齐',
          label: '地毯是否备齐'
        },
        {
          value: '座椅是否有污染',
          label: '座椅是否有污染'
        },
        {
          value: '后右灯',
          label: '后右灯'
        },
        {
          value: '后左灯',
          label: '后左灯'
        },
        {
          value: '前右灯',
          label: '前右灯'
        },
        {
          value: '前左灯',
          label: '前左灯'
        },
        {
          value: '前车盖',
          label: '前车盖'
        },
        {
          value: '后保险杠',
          label: '后保险杠'
        },
        {
          value: '前保险杠',
          label: '前保险杠'
        },
        {
          value: '右后翼子板',
          label: '右后翼子板'
        },
        {
          value: '左后翼子板',
          label: '左后翼子板'
        },
        {
          value: '右前翼子板',
          label: '右前翼子板'
        },
        {
          value: '左前翼子板',
          label: '左前翼子板'
        },
        {
          value: '后备箱',
          label: '后备箱'
        },
        {
          value: '右后车门',
          label: '右后车门'
        },
        {
          value: '左后车门',
          label: '左后车门'
        },
        {
          value: '右前车门',
          label: '右前车门'
        },
        {
          value: '左前车门',
          label: '左前车门'
        },
        {
          value: '剩余油量',
          label: '剩余油量'
        },
        {
          value: '右后轮胎更换情况',
          label: '右后轮胎更换情况'
        },
        {
          value: '左后轮胎更换情况',
          label: '左后轮胎更换情况'
        },
        {
          value: '右前轮胎更换情况',
          label: '右前轮胎更换情况'
        },
        {
          value: '左前轮胎更换情况',
          label: '左前轮胎更换情况'
        },
        {
          value: '内饰情况',
          label: '内饰情况'
        },
        {
          value: '车钥匙',
          label: '车钥匙'
        },
        {
          value: '保养手册',
          label: '保养手册'
        },
        {
          value: '导航/行车记录仪卡',
          label: ' 导航/行车记录仪卡'
        },
        {
          value: '充电/放电器',
          label: '充电/放电器'
        },
        {
          value: '运营贴',
          label: '运营贴'
        },
        {
          value: '运营证',
          label: '运营证'
        },
        {
          value: '工具件数',
          label: '工具件数'
        },
        {
          value: '警告牌',
          label: '警告牌'
        },
        {
          value: '三脚架/千斤顶、胎匙/扳手',
          label: '三脚架/千斤顶、胎匙/扳手'
        },
        {
          value: '备胎',
          label: '备胎'
        },
        {
          value: '雨刮、灯光是否正常',
          label: '雨刮、灯光是否正常'
        },
        {
          value: '制动系统是否正常',
          label: '制动系统是否正常'
        },
        {
          value: '转向系统是否正常',
          label: '转向系统是否正常'
        },
        {
          value: '离合器、变速器是否正常',
          label: '离合器、变速器是否正常'
        },
        {
          value: '机油、防冻液、刹车油是否正常',
          label: '机油、防冻液、刹车油是否正常'
        },
        {
          value: '发动机有无漏油',
          label: '发动机有无漏油'
        },
        {
          value: '发动机运转是否正常',
          label: '发动机运转是否正常'
        },
        {
          value: '油箱盖及收音天线是否完好',
          label: '油箱盖及收音天线是否完好'
        },
        {
          value: '左右后视镜是否完好',
          label: '左右后视镜是否完好'
        },
        {
          value: '车身装饰条带是否完好',
          label: '车身装饰条带是否完好'
        },
        {
          value: '玻璃是否完好',
          label: '玻璃是否完好'
        },
        {
          value: '各种灯光是否完好有效',
          label: '各种灯光是否完好有效'
        },
        {
          value: '轮胎钢圈及外壳是否完好',
          label: '轮胎钢圈及外壳是否完好'
        },
        {
          value: '收音机天线是否完好',
          label: '收音机天线是否完好'
        },
        {
          value: '附件是否调换',
          label: '附件是否调换'
        },
        {
          value: '是否有损伤修补痕迹',
          label: '是否有损伤修补痕迹'
        },
        {
          value: '是否有擦挂撞击痕迹',
          label: '是否有擦挂撞击痕迹'
        },
        {
          value: '空调机及装置是否正常',
          label: '空调机及装置是否正常'
        },
        {
          value: 'navigation',
          label: '各类仪表显示是否正常'
        },
        {
          value: '防盗锁、保险锁',
          label: '防盗锁、保险锁'
        },
        {
          value: '灭火器',
          label: '灭火器'
        },
        {
          value: '摇窗机是否灵活',
          label: '摇窗机是否灵活'
        },
        {
          value: '座垫及地毯有无损坏',
          label: '座垫及地毯有无损坏'
        },
        {
          value: '座位是否灵活',
          label: '座位是否灵活'
        },
        {
          value: '车厢灯',
          label: '车厢灯'
        },
        {
          value: '挡阳板及车内后视镜',
          label: '挡阳板及车内后视镜'
        },
        {
          value: '点烟器及烟灰缸',
          label: '点烟器及烟灰缸'
        },
        {
          value: '收录机、CD机',
          label: '收录机、CD机'
        },
        {
          value: '安全带',
          label: ' 安全带'
        },
        {
          value: '年审标志',
          label: '年审标志'
        },
        {
          value: '车辆保险卡',
          label: '车辆保险卡'
        },
        {
          value: '市区路桥年检',
          label: '市区路桥年检'
        },
        {
          value: '强制险标志',
          label: '强制险标志'
        },
        {
          value: '环保标志',
          label: '环保标志'
        },
        {
          value: '行驶证',
          label: '行驶证'
        },
        {
          value: '左前轮',
          label: '左前轮'
        },
        {
          value: '右前轮',
          label: '右前轮'
        },
        {
          value: '左后轮',
          label: '左后轮'
        },
        {
          value: '右后轮',
          label: '右后轮'
        }
      ]
    }
  ],
  crosstown: [
    {
      text: '否',
      value: 1
    },
    {
      text: '是',
      value: 2
    }
  ],
  checkCar: [
    {
      text: '否',
      value: 1
    },
    {
      text: '是  ',
      value: 2
    }
  ],
  paymentCollectionType: [
    {
      text: '定金 ',
      value: 1
    },
    {
      text: '租金',
      value: 2
    },
    {
      text: '押金',
      value: 3
    },
    {
      text: '首付款',
      value: 4
    },
    {
      text: '保证金 ',
      value: 5
    },
    {
      text: '月供',
      value: 6
    },
    {
      text: '尾款 ',
      value: 7
    },
    {
      text: '全款 ',
      value: 8
    },
    {
      text: '挂靠月付',
      value: 9
    },
    {
      text: '挂靠年费',
      value: 10
    },
    {
      text: '挂靠押金',
      value: 11
    },
    {
      text: '其他',
      value: 12
    },
  ],
  trafficStatus: [
    {
      text: '未完成 ',
      value: 0,
      class: 'info'
    },
    {
      text: '已完成',
      value: 1,
      class: 'success'
    }
  ],
  paymentMethod: [
    {
      text: '一次性',
      value: '0',
      class: 'success'
    },
    {
      text: '周付',
      value: '7',
      class: 'success'
    },
    {
      text: '月付',
      value: '1',
      class: 'success'
    },
    {
      text: '季付',
      value: '3',
      class: 'info'
    },
    {
      text: '半年付',
      value: '6',
      class: 'info'
    },
    {
      text: '年付',
      value: '12',
      class: 'info'
    }
  ],
  vehicleInspectionDate: [
    {
      text: '是 ',
      value: '是',
      class: 'success'
    },
    {
      text: '否',
      value: '否',
      class: 'info'
    }
  ],
  trafficDeliveryMattersState: [
    {
      value: '正常',
      label: '正常'
    },
    {
      value: '异常',
      label: '异常'
    },
    {
      value: '裂痕',
      label: '裂痕'
    },
    {
      value: '脱落',
      label: '脱落'
    },
    {
      value: '划伤',
      label: '划伤'
    },
    {
      value: '凹陷',
      label: '凹陷'
    },
    {
      value: '丢失',
      label: '丢失'
    }
  ],
  billState: [
    {
      text: '已完成',
      value: 0,
      class: 'success'
    },
    {
      text: '未完成',
      value: 1,
      class: 'info'
    }
  ],
  receiveMode: [
    {
      text: '是',
      value: 0
    },
    {
      text: '否',
      value: 1
    }
  ],
  isBindStatus: [
    {
      text: '是',
      value: 1
    },
    {
      text: '否',
      value: 0
    }
  ],
  payType: [
    {
      text: '银行卡',
      value: 2
    },
    {
      text: '支付宝',
      value: 3
    },
    {
      text: '微信',
      value: 4
    },
    {
      text: '转账',
      value: 4
    },
    {
      text: 'POS',
      value: 5
    },
    {
      text: '现金',
      value: 6
    },
    {
      text: '其他 ',
      value: 7
    },
    {
      text: '减免',
      value: 8
    },
    {
      text: '代扣 ',
      value: 9
    },
    {
      text: '抵扣 ',
      value: 10
    },
    {
      text: '二维码 ',
      value: 11
    },
    {
      text: '信用卡 ',
      value: 12
    }
  ],
  modelArray: [
    {
      text: '电动车',
      value: '电动车'
    },
    {
      text: '面包车',
      value: '面包车'
    },
    {
      text: '小货车',
      value: '小货车'
    },
    {
      text: '中货车',
      value: '中货车'
    },
    {
      text: '大货车',
      value: '大货车'
    }
  ],
  dataImport: [
    {
      text: '默认',
      value: '0'
    },
    {
      text: '覆盖',
      value: '1'
    }
  ],
  jieSuan: [
    {
      value: 0,
      text: '未完成'
    },
    {
      value: 1,
      text: '已完成'
    },
  ],
  carModelList: [
    {
      arrCar: '面包车',
      value: 0,
      carType: [
        {
          modelName: "小型面包车",
          cmId: 755278219265,
        },
        {
          modelName: "中型面包车",
          cmId: 755278219266,
        },
        {
          modelName: "大型面包车",
          cmId: 755278219271,
        },
        {
          modelName: "冷藏面包车",
          cmId: 755278219272,
        },
      ],
    },
    {
      arrCar: '小货车',
      value: 1,
      carType: [
        {
          modelName: "厢式小货车",
          cmId: 755278219269,
        },
        {
          modelName: "平板小货车",
          cmId: 755278219273,
        },
        {
          modelName: "仓栏小货车",
          cmId: 755278219274,
        },
        {
          modelName: "冷藏小货车",
          cmId: 755278219275,
        },
      ],
    },
    {
      arrCar: '中货车',
      value: 2,
      carType: [
        {
          modelName: "厢式中货车",
          cmId: 755278219267,
        },
        {
          modelName: "平板中货车",
          cmId: 755278219276,
        },
        {
          modelName: "仓栏中货车",
          cmId: 755278219277,
        },
        {
          modelName: "冷藏中货车",
          cmId: 755278219278,
        },

      ],
    },
    {
      arrCar: '大货车',
      value: 3,
      carType: [
        {
          modelName: "厢式大货车",
          cmId: 755278219268,
        },
        {
          modelName: "平板大货车",
          cmId: 755278219279,
        },
        {
          modelName: "仓栏大货车",
          cmId: 755278219280,
        },
        {
          modelName: "冷藏大货车",
          cmId: 755278219281,
        },
      ],

    },
  ],
  cmIdArr: [
    {
      modelName: "小型面包车",
      cmId: 755278219265,
    },
    {
      modelName: "中型面包车",
      cmId: 755278219266,
    },
    {
      modelName: "大型面包车",
      cmId: 755278219271,
    },
    {
      modelName: "冷藏面包车",
      cmId: 755278219272,
    },
    {
      modelName: "厢式小货车",
      cmId: 755278219269,
    },
    {
      modelName: "平板小货车",
      cmId: 755278219273,
    },
    {
      modelName: "仓栏小货车",
      cmId: 755278219274,
    },
    {
      modelName: "冷藏小货车",
      cmId: 755278219275,
    },
    {
      modelName: "厢式中货车",
      cmId: 755278219267,
    },
    {
      modelName: "平板中货车",
      cmId: 755278219276,
    },
    {
      modelName: "仓栏中货车",
      cmId: 755278219277,
    },
    {
      modelName: "冷藏中货车",
      cmId: 755278219278,
    },
    {
      modelName: "厢式大货车",
      cmId: 755278219268,
    },
    {
      modelName: "平板大货车",
      cmId: 755278219279,
    },
    {
      modelName: "仓栏大货车",
      cmId: 755278219280,
    },
    {
      modelName: "冷藏大货车",
      cmId: 755278219281,
    },

  ],
  electriareaList: [
    {
      text: '违章超过3次',
      value: '1'
    },
    {
      text: '超出围栏',
      value: '2'
    },
    {
      text: '逾期超过24小时',
      value: '3'
    },
    {
      text: '逾期超过48小时',
      value: '4'
    },
    {
      text: '逾期超过72小时',
      value: '5'
    },
  ],
  boolStatus: [
    {
      text: '无',
      value: 0
    },
    {
      text: '有',
      value: 1
    },
  ],
  deviceType: [
    {
      text: 'gps',
      value: 0
    },
    // {
    //   text:'设备类型2',
    //   value:1
    // },
  ],
  bindType: [
    {
      label: '未绑定',
      value: '0',
    },
    {
      label: '已绑定',
      value: '1',
    },
  ],
  contractInfo: {
    con1: {
      paymentCollectionType: '租金',
      paymentCollectionMoney: '',
      paymentMethod: '1',
      totPmts: '',
      downPayment: '',
      vehicleInspectionDate: '是'
    },
    con2: {
      paymentCollectionType: '押金',
      paymentCollectionMoney: '',
      paymentMethod: '',
      totPmts: '',
      downPayment: '',
      vehicleInspectionDate: '是'
    },
    con3: {
      paymentCollectionType: '首付款',
      paymentCollectionMoney: '',
      paymentMethod: '',
      totPmts: '',
      downPayment: '',
      vehicleInspectionDate: '是'
    },
    con4: {
      paymentCollectionType: '尾款',
      paymentCollectionMoney: '',
      paymentMethod: '',
      totPmts: '',
      downPayment: '',
      vehicleInspectionDate: '是'
    },
    con5: {
      paymentCollectionType: '定金',
      paymentCollectionMoney: '',
      paymentMethod: '',
      totPmts: '',
      downPayment: '',
      vehicleInspectionDate: '是'
    },
    con6: {
      paymentCollectionType: '违约金',
      paymentCollectionMoney: '',
      paymentMethod: '',
      totPmts: '',
      downPayment: '',
      vehicleInspectionDate: '是'
    },
    con7: {
      paymentCollectionType: '滞纳金',
      paymentCollectionMoney: '',
      paymentMethod: '',
      totPmts: '',
      downPayment: '',
      vehicleInspectionDate: '是'
    },
    con8: {
      paymentCollectionType: '管理费（一次性）',
      paymentCollectionMoney: '',
      paymentMethod: '',
      totPmts: '',
      downPayment: '',
      vehicleInspectionDate: '是'
    },
    con9: {
      paymentCollectionType: '管理费周期',
      paymentCollectionMoney: '',
      paymentMethod: '',
      totPmts: '',
      downPayment: '',
      vehicleInspectionDate: '是'
    },
    con10: {
      paymentCollectionType: 'GPS费用',
      paymentCollectionMoney: '',
      paymentMethod: '',
      totPmts: '',
      downPayment: '',
      vehicleInspectionDate: '是'
    },
    con11: {
      paymentCollectionType: '全款',
      paymentCollectionMoney: '',
      paymentMethod: '',
      totPmts: '',
      downPayment: '',
      vehicleInspectionDate: '是'
    },
    con12: {
      paymentCollectionType: '保证金',
      paymentCollectionMoney: '',
      paymentMethod: '',
      totPmts: '',
      downPayment: '',
      vehicleInspectionDate: '是'
    },
    con13: {
      paymentCollectionType: '里程保证金',
      paymentCollectionMoney: '',
      paymentMethod: '',
      totPmts: '',
      downPayment: '',
      vehicleInspectionDate: '是'
    },
    con14: {
      paymentCollectionType: '月供',
      paymentCollectionMoney: '',
      paymentMethod: '1',
      totPmts: '',
      downPayment: '',
      vehicleInspectionDate: '是'
    },
    con15: {
      paymentCollectionType: '车牌费',
      paymentCollectionMoney: '',
      paymentMethod: '',
      totPmts: '',
      downPayment: '',
      vehicleInspectionDate: '是'
    },
    con16: {
      paymentCollectionType: '延保费',
      paymentCollectionMoney: '',
      paymentMethod: '',
      totPmts: '',
      downPayment: '',
      vehicleInspectionDate: '是'
    },
    con17: {
      paymentCollectionType: '差额费',
      paymentCollectionMoney: '',
      paymentMethod: '',
      totPmts: '',
      downPayment: '',
      vehicleInspectionDate: '是'
    },
    con18: {
      paymentCollectionType: '挂靠年费',
      paymentCollectionMoney: '',
      paymentMethod: '',
      totPmts: '',
      downPayment: '',
      vehicleInspectionDate: '是'
    },
    con19: {
      paymentCollectionType: '租金',
      paymentCollectionMoney: '',
      paymentMethod: '7',
      totPmts: '',
      downPayment: '',
      vehicleInspectionDate: '是'
    },
    con20: {
      paymentCollectionType: '租金',
      paymentCollectionMoney: '',
      paymentMethod: '3',
      totPmts: '',
      downPayment: '',
      vehicleInspectionDate: '是'
    },
    con21: {
      paymentCollectionType: '租金',
      paymentCollectionMoney: '',
      paymentMethod: '6',
      totPmts: '',
      downPayment: '',
      vehicleInspectionDate: '是'
    },
    con22: {
      paymentCollectionType: '租金',
      paymentCollectionMoney: '',
      paymentMethod: '12',
      totPmts: '',
      downPayment: '',
      vehicleInspectionDate: '是'
    },
    con23: {
      paymentCollectionType: '月供',
      paymentCollectionMoney: '',
      paymentMethod: '7',
      totPmts: '',
      downPayment: '',
      vehicleInspectionDate: '是'
    },
    con24: {
      paymentCollectionType: '月供',
      paymentCollectionMoney: '',
      paymentMethod: '3',
      totPmts: '',
      downPayment: '',
      vehicleInspectionDate: '是'
    },
    con25: {
      paymentCollectionType: '月供',
      paymentCollectionMoney: '',
      paymentMethod: '6',
      totPmts: '',
      downPayment: '',
      vehicleInspectionDate: '是'
    },
    con26: {
      paymentCollectionType: '月供',
      paymentCollectionMoney: '',
      paymentMethod: '12',
      totPmts: '',
      downPayment: '',
      vehicleInspectionDate: '是'
    },
    con27: {
      paymentCollectionType: '租金',
      paymentCollectionMoney: '',
      paymentMethod: '0',
      totPmts: '1',
      downPayment: '',
      vehicleInspectionDate: '是'
    },
    con28: {
      paymentCollectionType: '月供',
      paymentCollectionMoney: '',
      paymentMethod: '0',
      totPmts: '1',
      downPayment: '',
      vehicleInspectionDate: '是'
    }
  },
  operType: [
    //    'user' => '用户',
    // 'company' => '分公司',
    // 'group' => '车队',
    // 'salesman' => '员工',
    // 'customer' => '客户',
    // 'contract' => '合同',
    // 'handover' => '交车 ',
    // 'inspection' => '验车',
    // 'vehicle' => '车辆',
    // 'device' => '设备',
    // 'insurance' => '保险',
    // 'matter' => '事故',
    // 'license' => '证照',
    // 'maintenance' => '维保',
    // 'finance' => '财务',
    // 'role' => '角色'
    {
      value: 'user',
      label: '用户',
    },
    {
      value: 'company',
      label: '分公司',
    },
    {
      value: 'group',
      label: '车队',
    },
    {
      value: 'salesman',
      label: '员工',
    },
    {
      value: 'customer',
      label: '客户',
    },
    {
      value: 'contract',
      label: '合同',
    },
    {
      value: 'handover',
      label: '交车',
    },
    {
      value: 'inspection',
      label: '验车',
    },
    {
      value: 'vehicle',
      label: '车辆',
    },
    {
      value: 'device',
      label: '设备',
    },
    {
      value: 'insurance',
      label: '保险',
    },
    {
      value: 'matter',
      label: '事故',
    },
    {
      value: 'license',
      label: '证照',
    },
    {
      value: 'maintenance',
      label: '维保',
    },
    {
      value: 'finance',
      label: '财务',
    },
    {
      value: 'role',
      label: '角色',
    },
  ],
  encType: [
    {
      value: '3',
      label: '圆形围栏',
    },
    {
      value: '2',
      label: '多边形围栏',
    },
    {
      value: '1',
      label: '行政区域围栏',
    },
  ],
  policeType: [
    {
      value: '1',
      label: '驶出报警'
    },
    {
      value: '2',
      label: '驶入报警'
    },

  ],
  refundStatustatu: [
    {
      text: '退押金申请',
      value: 0,
      class: 'success'
    },
    {
      text: '退押金成功',
      value: 1,
      class: 'success'
    },
    {
      text: '退押金失败',
      value: 2,
      class: 'success'
    }
  ],
}
