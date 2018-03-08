<template>
  <div class="apply">

    <div class="apply__info">
      <h3 class="apply-info__title">您正在报名：《2018小学生综合素养测评》</h3>
      <p class="apply-info__p">请您认真审核个人信息，提交后将无法修改。如有问题请咨询客服QQ:2182412785</p>
      <p class="apply-info__p2">请完善报名资料<span>(以下内容均为必填项)</span></p>
    </div>

    <div class="apply__form">
      <h3 class="apply-form__title">学生信息</h3>
      <div class="apply__warp">
        <form-select :selectList="list" label="考点选择"></form-select>
        <form-input v-model="value" placeholder="学生姓名"></form-input>
        <form-input v-model="value" placeholder="身份证号码/护照号"></form-input>
        <form-select :selectList="sexs" label="性别"></form-select>
        <form-input v-model="value" placeholder="户籍所在地"></form-input>
        <form-select :selectList="sexs" label="就读学校名称"></form-select>
        <form-select :selectList="sexs" label="小学区域"></form-select>
        <form-input v-model="value" placeholder="班级"></form-input>
        <form-select :selectList="sexs" label="职务"></form-select>
      </div>
    </div>
  
    <div class="apply__form">
      <h3 class="apply-form__title">家长信息</h3>
      <div class="apply__warp">
        <form-select :selectList="list" label="考点选择"></form-select>
        <form-input v-model="value" placeholder="学生姓名"></form-input>
        <form-input v-model="value" placeholder="身份证号码/护照号"></form-input>
        <form-select :selectList="sexs" label="性别"></form-select>
        <form-input v-model="value" placeholder="户籍所在地"></form-input>
        <form-select :selectList="sexs" label="就读学校名称"></form-select>
        <form-select :selectList="sexs" label="小学区域"></form-select>
        <form-input v-model="value" placeholder="班级"></form-input>
        <form-select :selectList="sexs" label="职务"></form-select>
      </div>
    </div>

    <button class="apply__button" @click="toResult">提交报名</button>
    
  </div>
</template>

<script>
  import formInput from '@/components/formInput.vue'
  import formSelect from '@/components/formSelect.vue'
  export default {
    data() {
      return {
        value: '',
        list: [
          '悟空',
          '名人',
          '路飞',
        ],
        sexs: [
          '男',
          '女'
        ]
      }
    },
    components: {
      formSelect,
      formInput
    },
    methods: {
      toResult() {
        this.$router.push('/result')
      }
    }
  }
</script>

<style>
  .apply {
    height: 100%;
    padding: 15px;
    overflow: auto;
    box-sizing: border-box;
    -webkit-overflow-scrolling: touch;
  }
  
  .apply__form {
    width: 100%;
    border: 1px solid #ccc;
    border-radius: 4px;
    margin-bottom: 15px;
  }
  
  .apply-form__title {
    width: 100%;
    height: 30px;
    background: #ccc;
    color: rgb(87, 87, 87);
    text-align: center;
    font-size: 14px;
    line-height: 30px;
  }
  
  .apply__warp {
    box-sizing: border-box;
    padding: 10px;
  }
  .apply-info__title {
    font-size: 16px;
    color: rgb(5, 156, 144);
  }
  .apply-info__p {
    font-size:14px;
    color: #f86a18;
    margin: 0;
  }
  .apply-info__p2 {
    margin: 12px 0 0 0;
  }
  .apply__button {
    display: block;
    margin:20px auto 40px;
    color: #fff;
    padding: 10px 60px;
    border-radius: 30px;
    background: #f86a18;
  }
</style>
