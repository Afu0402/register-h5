<template>
  <div class="apply">

    <div class="apply-info__title">您正在报名：《2018小学生综合素养测评》</div>
    <div style="padding:15px">
      <div class="apply__info">
        <p class="apply-info__p">请您认真审核个人信息，提交后将无法修改。如有问题请咨询客服QQ:2182412785</p>
        <p class="apply-info__p2">请完善报名资料
          <span style="font-size: 12px;">(以下内容均为必填项)</span>
        </p>
      </div>

      <div class="apply__form">
        <h3 class="apply-form__title">学生信息</h3>
        <hr/>
        <div class="apply__warp">
          <div class="flex">
            <form-input style="width: 48%" v-model="studentData.name" placeholder="学生姓名"></form-input>
            <form-select style="width: 48%" v-model="studentData.sex" :selectList="sexs" akey="name" aval="num" label="性别"></form-select>
          </div>
          <div class="flex">
            <form-input style="width: 48%" v-model="studentData.weight" placeholder="体重"></form-input>
            <form-input style="width: 48%" v-model="studentData.height" placeholder="身高"></form-input>
          </div>
          <form-input @click.native="openPicker" :value="formDate"  disabled placeholder="出生日期"></form-input>
          <form-input v-model="studentData.id_card" placeholder="身份证号码/护照号"></form-input>
          <form-input v-model="studentData.registered_permanent_residence" placeholder="户籍所在地"></form-input>
          <form-input v-model="studentData.family_address" placeholder="家庭地址"></form-input>
          <div class="flex">
            <form-select style="width: 35%" :selectList="areaData" v-model="areaId" akey="name" aval="area_id" label="区域"></form-select>
            <form-select ref="infinite" style="width: 62%" :selectList="schools" v-model="studentData.school_id" akey="name" aval="school_id" :fn="fatchSchoolData" label="就读学校名称"></form-select>
          </div>
          <div class="flex">
            <form-input style="width: 48%" v-model="studentData.classroom" placeholder="班级"></form-input>
            <form-input style="width: 48%" v-model="studentData.duty" placeholder="职务"></form-input>
          </div>
          <form-select v-model="studentData.first_will" :selectList="wills" akey="name" aval="name" label="第一志愿"></form-select>
          <form-select v-model="studentData.second_will" :selectList="wills" akey="name" aval="name" label="第二志愿"></form-select>
          <form-input v-model="studentData.individual_resume" placeholder="个人简介"></form-input>
          <form-input v-model="studentData.rewards_and_punishment" placeholder="奖惩情况"></form-input>
        </div>
      </div>
      <div class="apply__form">
        <h3 class="apply-form__title">父亲信息</h3>
        <hr/>
        <div class="apply__warp">
          <div class="flex">
            <form-input style="width: 48%" v-model="fatherData.name" placeholder="姓名"></form-input>
            <form-select style="width: 48%" :selectList="familyRules" v-model="fatherData.related_type" akey="name" aval="num" label="家庭角色"></form-select>
          </div>
          <form-select :selectList="diploma" v-model="fatherData.standard_of_culture" akey="name" aval="level" label="文化程度"></form-select>
          <form-input v-model="fatherData.work_address" placeholder="单位地址"></form-input>
          <form-input v-model="fatherData.duty" placeholder="职务"></form-input>
          <form-input v-model="fatherData.phone" placeholder="手机号码"></form-input>
          <form-input v-model="fatherData.individual_resume" placeholder="个人简介"></form-input>
        </div>
      </div>

      <div class="apply__form">
        <h3 class="apply-form__title">母亲信息</h3>
        <hr/>
        <div class="apply__warp">
          <div class="flex">
            <form-input style="width: 48%" v-model="motherData.name" placeholder="姓名"></form-input>
            <form-select style="width: 48%" :selectList="familyRules" v-model="motherData.related_type" akey="name" aval="num" label="家庭角色"></form-select>
          </div>
          <form-select :selectList="diploma" v-model="motherData.standard_of_culture" akey="name" aval="level" label="文化程度"></form-select>
          <form-input v-model="motherData.work_address" placeholder="单位地址"></form-input>
          <form-input v-model="motherData.duty" placeholder="职务"></form-input>
          <form-input v-model="motherData.phone" placeholder="手机号码"></form-input>
          <form-input v-model="motherData.individual_resume" placeholder="个人简介"></form-input>
        </div>
      </div>
    </div>

    <button class="apply__button" @click="toResult">提交报名</button>

    <mt-datetime-picker ref="picker" @confirm="handleConfirm" :startDate="new Date(1985)" v-model="pickerVisible" type="date" year-format="{value} 年" month-format="{value} 月" date-format="{value} 日">
    </mt-datetime-picker>
  </div>
</template>

<script>
import formInput from '@/components/formInput.vue'
import formSelect from '@/components/formSelect.vue'
import { getSchoolData, addStudentData } from '@/api/apis.js'
import { MessageBox } from 'mint-ui'
export default {
  data() {
    return {
      areaId: 5151,
      value: '',
      pickerVisible: new Date(),
      studentData: {
        user_id: '',
        name: '',
        id_card: '',
        sex: '',
        birthday: '',
        height: '',
        weight: '',
        registered_permanent_residence: '',
        school_id: '',
        classroom: '',
        duty: '',
        family_address: '',
        individual_resume: '',
        rewards_and_punishment: '',
        first_will: '',
        second_will: '',
        family_data: []
      },
      fatherData: {
        name: '',
        related_type: '',
        standard_of_culture: '',
        work_address: '',
        duty: '',
        phone: '',
        individual_resume: ''
      },
      motherData: {
        name: '',
        related_type: '',
        standard_of_culture: '',
        work_address: '',
        duty: '',
        phone: '',
        individual_resume: ''
      },
      sexs: [{ name: '男', num: 1 }, { name: '女', num: 2 }],
      familyRules: [{ name: '父亲', num: 1 }, { name: '母亲', num: 2 }],
      wills:[{ name: '华伦中学台江校区'}, { name: '华伦中学晋安校区'}],
      diploma: [
        {
          name: '无文化程度',
          level: 0
        },
        {
          name: '小学',
          level: 1
        },
        {
          name: '初中',
          level: 2
        },
        {
          name: '高中',
          level: 3
        },
        {
          name: '专科',
          level: 4
        },
        {
          name: '本科',
          level: 5
        },
        {
          name: '硕士研究生',
          level: 6
        },
        {
          name: '博士',
          level: 7
        },
        {
          name: '博士后',
          level: 8
        }
      ],
      isajaxsend: false,
      schools: [],
      page: 1,
      page_num: 12,
      end: false
    }
  },
  components: {
    formSelect,
    formInput
  },
  created() {
    this.fatchSchoolData()
  },
  computed: {
    formDate() {
      return `${this.pickerVisible.getFullYear()}-${this.pickerVisible.getMonth() +
        1}-${this.pickerVisible.getDate()}`
    },
    userData() {
      return this.$store.state.user_data
    },
    areaData () {
      return this.$store.state.area_data
    }
  },
  watch: {
    areaId () {
      this.$refs.infinite.scrollTop = 52
      this.end = false
      this.schools = []
      this.page = 1
      this.fatchSchoolData()
    }
  },
  methods: {
    openPicker() {
      this.$refs.picker.open()
    },
    handleConfirm(value) {
      const date = Date.parse(value).toString().substr(0, 10)
      this.studentData.birthday = date
    },
    toResult() {
      if (!this.studentData.id_card) {
        MessageBox('提示', '请输入学生信息-身份证')
        return
      }
      if (!this.studentData.name) {
        MessageBox('提示', '请输入学生信息-姓名')
        return
      }
      if (!this.studentData.sex) {
        MessageBox('提示', '选择学生信息-性别')
        return
      }
      if (!this.studentData.birthday) {
        MessageBox('提示', '请选择学生信息-生日')
        return
      }
      if (!this.studentData.height) {
        MessageBox('提示', '请输入学生信息-身高')
        return
      }
      if (!this.studentData.weight) {
        MessageBox('提示', '请输入学生信息-体重')
        return
      }
      if (!this.studentData.registered_permanent_residence) {
        MessageBox('提示', '请输入学生信息-户籍所在地')
        return
      }
      if (!this.studentData.school_id) {
        MessageBox('提示', '请选择学生信息-在读学校')
        return
      }
      if (!this.studentData.classroom) {
        MessageBox('提示', '请输入学生信息-班级')
        return
      }
      if (!this.studentData.family_address) {
        MessageBox('提示', '请输入学生信息-家庭住址')
        return
      }

      if (!this.fatherData.name) {
        MessageBox('提示', '请输入父亲信息-姓名')
        return
      }
      if (!this.fatherData.standard_of_culture) {
        MessageBox('提示', '请输入父亲信息-文化程度')
        return
      }
      if (!this.fatherData.related_type) {
        MessageBox('提示', '请输入父亲信息-家庭角色')
        return
      }
      if (!this.fatherData.work_address) {
        MessageBox('提示', '请输入父亲信息-单位地址')
        return
      }
      if (!this.fatherData.duty) {
        MessageBox('提示', '请输入父亲信息-职务')
        return
      }
      if (!this.fatherData.phone) {
        MessageBox('提示', '请输入父亲信息-联系电话')
        return
      }

      if (!this.motherData.name) {
        MessageBox('提示', '请输入母亲信息-姓名')
        return
      }
      if (!this.motherData.standard_of_culture) {
        MessageBox('提示', '请输入母亲信息-文化程度')
        return
      }
      if (!this.motherData.related_type) {
        MessageBox('提示', '请输入母亲信息-家庭角色')
        return
      }
      if (!this.motherData.work_address) {
        MessageBox('提示', '请输入母亲信息-单位地址')
        return
      }
      if (!this.motherData.duty) {
        MessageBox('提示', '请输入母亲信息-职务')
        return
      }
      if (!this.motherData.phone) {
        MessageBox('提示', '请输入母亲信息-联系电话')
        return
      }
      this.studentData.user_id = this.userData.user_id
      this.studentData.family_data.push(this.fatherData, this.motherData)
      addStudentData(this.studentData).then(res => {
          if(res.data.error_code == 0) {
            const data = JSON.parse(res.data.data)
            MessageBox('提示', '报名成功').then(() => this.$router.push('/activityList'))
            return
          }
            MessageBox('提示', res.data.message)
        })
        .catch(err => {
          console.log(err)
        })
    },
    // 根据区域获取对应区域内的学校
    fatchSchoolData() {
       if(this.isajaxsend) {
           return false;
         }
        if (this.end) {
          return false;
        }
         this.isajaxsend = true
      getSchoolData({ page: this.page, page_num: this.page_num,county_id: this.areaId}).then(res => {
        if (res.data.error_code == 0 && res.data.data) {
          this.schools = this.schools.concat(res.data.data)
          if (res.data.data.length != this.page_num) {
            this.end = true
          } else {
            this.page++
          }
        } else {
          this.end = true
        }
        this.isajaxsend = false
      })
    },
  }
}
</script>

<style>
.apply {
  height: 100%;
  overflow: auto;
  box-sizing: border-box;
  -webkit-overflow-scrolling: touch;
}

.apply__form {
  width: 100%;
  border: 1px solid rgb(241, 241, 241);
  border-radius: 4px;
  margin-bottom: 15px;
  background: #f4f4f4;
}
.apply__form hr {
  width: 98%;
  margin: 0 auto;
  height: 1px;
  border: none;
  background: rgb(223, 222, 222);
}
.apply-form__title {
  width: 100%;
  height: 30px;
  color: #3b3b3b;
  text-align: center;
  font-size: 14px;
  line-height: 30px;
}

.apply__warp {
  box-sizing: border-box;
  padding: 10px;
}
.apply-info__title {
  height: 35px;
  line-height: 35px;
  color: #fff;
  text-align: center;
  background: #f86a18;
}
.apply-info__p {
  font-size: 14px;
  color: #f86a18;
  margin: 0;
}
.apply-info__p2 {
  margin: 12px 0 0 0;
}
.apply__button {
  display: block;
  margin: 20px auto 40px;
  color: #fff;
  padding: 10px 60px;
  border-radius: 30px;
  background: #f86a18;
}
</style>
