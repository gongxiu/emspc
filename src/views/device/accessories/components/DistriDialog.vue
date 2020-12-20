<template>
  <div class="distri__alert">
    <div class="distri__head">分配配件</div>
    <div class="distri__container">
      <div class="distri__part part__left">
        <div class="head">待分配配件</div>
        <div class="content">
          <div class="form">
            <div class="form__ipt">
              <el-input placeholder="请输入名称" />
              <el-checkbox
                class="ipt__checkAll"
                :indeterminate="isIndeterminate"
                v-model="checkAll"
                @change="handleCheckAllChange"
                >全选</el-checkbox
              >
            </div>

            <el-checkbox-group
              v-model="checkedCities"
              @change="handleCheckedCitiesChange"
            >
              <el-checkbox
                class="form__item"
                v-for="city in cities"
                :label="city"
                :key="city"
                >{{ city }}</el-checkbox
              >
            </el-checkbox-group>
          </div>
        </div>
      </div>
      <div class="distri__part part__route">
        <div class="arrow">
          <div>
            <i class="el-icon-check"></i>
          </div>
        </div>
        <div class="arrow">
          <div>
            <i class="el-icon-check"></i>
          </div>
        </div>
      </div>
      <div class="distri__part part__right">
        <div class="head">已分配配件</div>
        <div class="content">
          <div class="form">
            <div class="form__ipt">
              <el-input placeholder="请输入名称" />
              <el-checkbox
                class="ipt__checkAll"
                :indeterminate="isIndeterminate"
                v-model="checkAll"
                @change="handleCheckAllChange"
                >全选</el-checkbox
              >
            </div>

            <el-checkbox-group
              v-model="checkedCities"
              @change="handleCheckedCitiesChange"
            >
              <el-checkbox
                class="form__item"
                v-for="city in cities"
                :label="city"
                :key="city"
                >{{ city }}</el-checkbox
              >
            </el-checkbox-group>
          </div>
        </div>
      </div>
    </div>
    <div class="actions">
      <el-button>取消</el-button>
      <el-button type="primary">确认</el-button>
    </div>
  </div>
</template>

<script>
import Vue from "vue";
const cityOptions = ["上海", "北京", "广州", "深圳"];
export default Vue.extend({
  data() {
    return {
      checkAll: false,
      checkedCities: [],
      cities: cityOptions,
      isIndeterminate: true,
    };
  },
  methods: {
    handleCheckAllChange(val) {
      this.checkedCities = val ? cityOptions : [];
      this.isIndeterminate = false;
    },
    handleCheckedCitiesChange(value) {
      let checkedCount = value.length;
      this.checkAll = checkedCount === this.cities.length;
      this.isIndeterminate =
        checkedCount > 0 && checkedCount < this.cities.length;
    },
  },
});
</script>

<style lang="scss" scoped>
ul,
li {
  list-style: none;
}
.distri__alert {
  width: 800px;
  .distri__head {
    height: 40px;
    line-height: 40px;
    text-indent: 20px;
    border-bottom: 2px solid rgb(153, 146, 146);
  }
}
.distri__container {
  display: flex;
  justify-content: space-between;
  width: 100%;
  padding: 40px 20px;
  .distri__part {
    flex: 1;
    box-sizing: border-box;
  }
  .part__left,
  .part__right {
    border: 1px solid rgb(153, 146, 146);
    border-radius: 5px;
    height: 300px;
    .head {
      padding: 5px 10px 0px 10px;
      line-height: 40px;
      text-indent: 10px;
      border-bottom: 2px solid rgb(153, 146, 146);
    }
    .content {
      padding: 5px 10px 0px 10px;
      .el-checkbox-group {
        padding-top: 10px;
        padding-left: 20px;
        .el-checkbox {
          margin-bottom: 5px;
        }
      }
    }
  }
  .part__route {
    display: flex;
    flex-direction: column;
    align-content: center;
    justify-content: space-around;
    .arrow {
      text-align: center;
      margin-bottom: 40px;
      div {
        display: inline-block;
        height: 60px;
        width: 60px;
        border-radius: 50%;
        border: 2px solid #1890ff;
        text-align: center;
        line-height: 60px;
        i {
          display: inline-block;
          height: 50px;
          width: 50px;
        }
      }
    }
  }
}
.form {
  .form__ipt {
    .el-input {
      width: 150px;
    }
    .ipt__checkAll {
      display: inline-block;
    }
  }
  .form__item {
    display: block;
  }
}
.actions {
  text-align: center;
  .el-button {
    margin-right: 60px;
  }
}
</style>