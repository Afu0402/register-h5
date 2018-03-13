
<template>
  <div class="form-select">
    <div @click="openSelect">
      <span class="form-select__input">{{value ? value : label}}</span>
      <span :class="selectName" v-if="!disabled"></span>
    </div>
    <ul class="form-select__content" :class="{'h-260': fn}" v-show="selectSwitch">
      <template v-if="selectList">
        <li v-for="(item,index) in selectList" :key="index" :class="{'form-select__active': value === item[akey]}" @click="selected(item)">
          {{item[akey]}}
          <span style="color: red;" v-if="item.residue">(还剩{{item.residue}}个名额)</span>
        </li>
      </template>
    </ul>
  </div>
</template>

<script>
export default {
  name: "form-select",
  data() {
    return {
      allLoaded:false,
      selectSwitch: false,
      value: this.schoolName ? this.schoolName : "",
      scrollTop: 52
    };
  },
  props: {
    selectList: {
      type: Array
    },
    label: {
      type: [String, Number]
    },
    akey: {
      type: String
    },
    aval: {
      type: String
    },
    fn: {
      type: Function
    },
    residue: {
      type: Boolean
    },
    disabled: {
      type: null
    },
    schoolName: {
      type: String
    }
  },
  computed: {
    selectName() {
      return this.selectSwitch ? "triangle-down" : "triangle-up";
    }
  },
  methods: {
    openSelect() {
      if (this.disabled || this.fn) {
        return false;
      }
      this.selectSwitch = !this.selectSwitch;
    },
    updataValue(value) {
      this.$emit("input", value);
    },
    selected(item) {
      this.value = item[this.akey];
      this.$emit("input", item[this.aval]);
      this.openSelect();
    }
  }
};
</script>

<style>
.form-select {
  box-sizing: border-box;
  position: relative;
  padding: 0 12px;
  width: 100%;
  border: 1px solid rgb(243, 243, 243);
  border-radius: 4px;
  height: 35px;
  margin-bottom: 10px;
  background: #fff;
}

.form-select__input {
  display: inline-block;
  width: 80%;
  height: 100%;
  font-size: 14px;
  line-height: 35px;
  color: rgb(90, 90, 90);
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.form-select > div {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.triangle-up {
  width: 0;
  height: 0;
  border-left: 6px solid transparent;
  border-right: 6px solid transparent;
  border-bottom: 8px solid rgb(170, 170, 170);
  border-radius: 2px;
}
.triangle-down {
  width: 0;
  height: 0;
  border-left: 6px solid transparent;
  border-right: 6px solid transparent;
  border-top: 8px solid rgb(170, 170, 170);
  border-radius: 2px;
}
.form-select__content {
  -webkit-overflow-scrolling: touch;
  box-sizing: border-box;
  position: absolute;
  width: 100%;
  background: #fff;
  left: 0;
  top: 40px;
  border: 1px solid #ccc;
  border-radius: 4px;
  color: rgb(156, 156, 156);
  overflow: hidden;
  z-index: 99;
  
}
.form-select__content li {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.h-260 {
  height: 260px;
  overflow: auto;
  padding-bottom: 12px;
}
.form-select__content li {
  height: 26px;
  font-size: 14px;
  line-height: 26px;
  text-indent: 12px;
}
.form-select__active {
  color: #f86a18e1;
}
</style>
