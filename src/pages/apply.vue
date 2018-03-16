<template>
  <div class="apply">
      
    <div class="apply-info__title">您正在报名：《{{exam_name}}》</div>
    <div style="padding:15px">
      <!-- <div class="apply__info" v-if="!studentInfo">
        <p class="apply-info__p">请您认真审核个人信息，提交后将无法修改。如有问题请咨询客服QQ:2182412785</p>
        <p class="apply-info__p2" >请完善报名资料
          <span style="font-size: 12px;">(以下内容均为必填项)</span>
        </p>
      </div> -->
      <p class="apply-info__p"><span>温馨提示:</span>请认真填写报名信息(以下内容均为必填项)</p>
      <div class="apply__form">
        <h3 class="apply-form__title">学生信息</h3>
        <hr/>
        <div class="apply__warp">
          <div class="flex">
            <form-input style="width: 48%" v-model="studentData.name" :disabled="studentInfo" placeholder="学生姓名"></form-input>
            <form-select style="width: 48%" v-model="studentData.sex" :disabled="studentInfo" :selectList="sexs" :schoolName="sexName" akey="name" aval="num" label="性别"></form-select>
          </div>
          <div class="flex">
           
            <form-select style="width: 35%" v-if="applyData" :disabled="studentInfo" :selectList="applyData.area_data" v-model="areaId" akey="name" aval="area_id" :schoolName="county" label="区域"></form-select>
            <form-select @click.native="openSelect"  :disabled="studentInfo" ref="infinite" style="width: 62%" :fn="fatchSchoolData" :schoolName="schoolName" label="就读学校名称"></form-select>
            <!-- <form-input style="width: 48%" :disabled="studentInfo" v-model="studentData.classroom" placeholder="班级"></form-input>
            <form-input style="width: 48%" :disabled="studentInfo" v-model="studentData.duty" placeholder="职务"></form-input> -->
          </div>
          <!-- <div class="flex">
            <form-input style="width: 48%" v-model="studentData.weight" :disabled="studentInfo" placeholder="体重"></form-input>
            <form-input style="width: 48%" v-model="studentData.height" :disabled="studentInfo" placeholder="身高"></form-input>
          </div> -->
          <!-- <form-input @click.native="openPicker" :value="formDate" disabled placeholder="出生日期"></form-input> -->
          <!-- <form-input v-model="studentData.id_card" :disabled="studentInfo" placeholder="身份证号码/护照号"></form-input> -->
          <!-- <form-input v-model="studentData.registered_permanent_residence" :disabled="studentInfo" placeholder="户籍所在地"></form-input> -->
          <!-- <form-input v-model="studentData.family_address" :disabled="studentInfo" placeholder="家庭地址"></form-input> -->
          <div class="flex">
            <form-select style="width: 48%" v-if="applyData" :disabled="studentInfo" :selectList="classrommData" v-model="studentData.classroom" akey="name"  aval="name" limit :schoolName="studentData.classroom" label="班级"></form-select>
            <form-select style="width: 48%" v-if="applyData" :disabled="studentInfo" :selectList="dutyData" v-model="studentData.duty" akey="name" aval="name" :schoolName="studentData.duty" limit label="职务"></form-select>

          </div>
          <!-- <form-select v-model="studentData.first_will" :disabled="studentInfo" :selectList="wills" akey="name" aval="name" :schoolName="first_will" label="第一志愿"></form-select>
          <form-select v-model="studentData.second_will" :disabled="studentInfo" :selectList="second_wills" akey="name" aval="name" :schoolName="second_will" label="第二志愿"></form-select>
          <form-area  v-model="studentData.individual_resume" :disabled="studentInfo" placeholder="个人简介"></form-area>
          <form-area  v-model="studentData.rewards_and_punishment" :disabled="studentInfo" placeholder="奖惩情况"></form-area> -->
        </div>
      </div>

      <!-- <div class="apply__form" v-if="!studentInfo">
        <h3 class="apply-form__title">父亲信息</h3>
        <hr/>
        <div class="apply__warp">
          <div class="flex">
            <form-input style="width: 40%" v-model="fatherData.name" placeholder="姓名"></form-input>
          <form-select style="width: 56%" :selectList="diploma" v-model="fatherData.standard_of_culture" akey="name" aval="level" label="文化程度" :residue="true"></form-select>
            
          </div>
            <form-input v-model="fatherData.duty" placeholder="职务"></form-input>
          <form-input v-model="fatherData.work_address" placeholder="单位地址"></form-input>
          <form-input v-model="fatherData.phone" placeholder="手机号码"></form-input>
        </div>
      </div>
      
      <div class="apply__form" v-if="!studentInfo">
        <h3 class="apply-form__title">母亲信息</h3>
        <hr/>
        <div class="apply__warp">
          <div class="flex">
            <form-input style="width: 40%" v-model="motherData.name" placeholder="姓名"></form-input>
            <form-select style="width: 56%" :selectList="diploma" v-model="motherData.standard_of_culture" akey="name" aval="level" label="文化程度" :residue="true"></form-select>
          </div>
          <form-input v-model="motherData.work_address" placeholder="单位地址"></form-input>
          <form-input v-model="motherData.duty" placeholder="职务"></form-input>
          <form-input v-model="motherData.phone" placeholder="手机号码"></form-input>
        </div>
      </div> -->
          <div class="apply__form">
          <h3 class="apply-form__title">考点选择</h3>
          <hr/>
          <div class="apply__warp" style="background:#f4f4f4;">
            <form-select style="margin: 0;" v-if="applyData" :selectList="applyData.exam_position_data" v-model="exam_position_id" akey="name" aval="eaxm_position_id" label="考点选择"></form-select>
          </div>
        </div>
    <p class="warm-prompt"><span>温馨提示：</span>"请您认真审核个人信息，提交后无将无法修改。如有问题请咨询客服QQ:2182412785"</p>
    </div>
    <button class="apply__button" @click="sumbit">提交报名</button>
    <mt-datetime-picker @touchmove.native.prevent style="position:fixed;"  ref="picker" @confirm="handleConfirm" :startDate="new Date(1985)" v-model="pickerVisible" type="date" year-format="{value} 年" month-format="{value} 月" date-format="{value} 日">
    </mt-datetime-picker>
    <popup @clickShadow="closeSelect" :open="popupSwitch">
        <ul class="infinite-select" v-infinite-scroll="fatchSchoolData" :infinite-scroll-disabled="end" infinite-scroll-distance="10">
          <li :class="{'selected-li': schoolName == item.name}" v-for="(item,index) in schools" @click="selectSchool(item)" :key="index">{{item.name}}</li>
          <mt-spinner v-if="!end" type="snake"></mt-spinner>
          <li v-else style="color: #ccc;">没有更多了</li>
        </ul>
    </popup>
  </div>
</template>

<script>
import formInput from "@/components/formInput.vue";
import formSelect from "@/components/formSelect.vue";
import formArea from "@/components/formArea.vue";
import popup from "@/components/popup.vue";
import {
  getSchoolData,
  addStudentData,
  addStudentApply,
  getApplyFlitterInfo
} from "@/api/apis.js";
import { MessageBox, Toast, Indicator } from "mint-ui";
import localforage from "@/localforage/localforage";
export default {
  data() {
    return {
      applyData: {},
      first_will: "",
      second_will: "",
      county: "鼓楼区",
      schoolName: "",
      sexName: "",
      popupSwitch: false,
      areaId: 5151,
      value: "",
      pickerVisible: "",
      exam_position_id: "",
      studentData: {
        user_id: "",
        name: "",
        id_card: "",
        sex: "",
        birthday: "",
        height: "",
        weight: "",
        registered_permanent_residence: "",
        school_id: "",
        classroom: "",
        duty: "",
        family_address: "",
        rewards_and_punishment: "",
        first_will: "",
        second_will: "",
        family_data: [],
        individual_resume: ""
      },
      fatherData: {
        name: "",
        related_type: 1,
        standard_of_culture: "",
        work_address: "",
        duty: "",
        phone: "",
        individual_resume: ""
      },
      motherData: {
        name: "",
        related_type: 2,
        standard_of_culture: "",
        work_address: "",
        duty: "",
        phone: "",
        individual_resume: ""
      },
      sexs: [{ name: "男", num: 1 }, { name: "女", num: 2 }],
      familyRules: [{ name: "父亲", num: 1 }, { name: "母亲", num: 2 }],
      wills: [{ name: "华伦中学台江校区" }, { name: "华伦中学晋安校区" }],
      classrommData: [
        { name: "六年级1班" },
        { name: "六年级2班" },
        { name: "六年级3班" },
        { name: "六年级4班" },
        { name: "六年级5班" },
        { name: "六年级6班" },
        { name: "六年级7班" },
        { name: "六年级8班" },
        { name: "六年级9班" },
        { name: "六年级10班" },
        { name: "六年级11班" },
        { name: "六年级12班" },
        { name: "六年级13班" },
        { name: "六年级14班" },
        { name: "六年级15班" },
        { name: "六年级16班" },
        { name: "六年级17班" },
        { name: "六年级18班" },
        { name: "六年级19班" },
        { name: "六年级20班" },
        { name: "其他" }
      ],
      dutyData: [
        { name: "大队长" },
        { name: "大队委" },
        { name: "中队长" },
        { name: "中队委" },
        { name: "班长" },
        { name: "副班长" },
        { name: "劳动委" },
        { name: "学习委" },
        { name: "文娱委" },
        { name: "宣传委" },
        { name: "组织委" },
        { name: "纪律委" },
        { name: "生活委" },
        { name: "体育委" },
        { name: "科代表" },
        { name: "小队长" },
        { name: "小组长" },
        { name: "其他" }
      ],
      second_wills: [{ name: "两者均可" }],
      diploma: [
        {
          name: "无文化程度",
          level: 0
        },
        {
          name: "小学",
          level: 1
        },
        {
          name: "初中",
          level: 2
        },
        {
          name: "高中",
          level: 3
        },
        {
          name: "专科",
          level: 4
        },
        {
          name: "本科",
          level: 5
        },
        {
          name: "硕士研究生",
          level: 6
        },
        {
          name: "博士",
          level: 7
        },
        {
          name: "博士后",
          level: 8
        }
      ],
      isajaxsend: false,
      schools: [],
      page: 1,
      page_num: 10,
      end: false,
      bottomPullText: "上拉刷新"
    };
  },
  components: {
    formSelect,
    formInput,
    formArea,
    popup
  },
  created() {
    if (!this.exam_name) {
      MessageBox('提示', '网络错误').then(() => this.$router.push('/activitylist'))
    }
    this.fatchSchoolData();
    getApplyFlitterInfo({ exam_subject_id: this.exam_id }).then(res => {
      if (res.data.error_code == 0) {
        this.imgSrc = res.data.data.detail_image_url;
        this.applyData = res.data.data
      }
    });
    if (this.studentInfo) {
      this.studentData = Object.assign({}, this.studentInfo);
      this.sexName = this.studentInfo.sex == 1 ? "男" : "女";
      this.pickerVisible = new Date(this.studentInfo.birthday * 1000);
      this.schoolName = this.studentInfo.school_data.school_name;
      this.first_will = this.studentInfo.first_will;
      this.second_will = this.studentInfo.second_will;
      this.county = this.studentInfo.school_data.county;
    }
  },
  computed: {
    formDate() {
      if (this.pickerVisible) {
        return `${this.pickerVisible.getFullYear()}-${this.pickerVisible.getMonth() +
          1}-${this.pickerVisible.getDate()}`;
      }
      return "";
    },
    user_id() {
      return this.$store.state.user_id;
    },
    studentInfo() {
      return this.$store.state.student_data;
    },
    exam_name() {
      return this.$store.state.exam_name;
    },
    exam_id() {
      return this.$store.state.exam_subject_id;
    }
  },
  watch: {
    areaId() {
      this.$refs.infinite.scrollTop = 52;
      this.end = false;
      this.schools = [];
      this.page = 1;
      this.$refs.infinite.value = ''
      this.bottomPullText = "上拉刷新";
      this.fatchSchoolData();
    }
  },
  methods: {
    openSelect() {
      if(this.studentInfo) {
        return false;
      }
      this.popupSwitch = true;
    },
    closeSelect() {
      this.popupSwitch = false;
    },
    selectSchool(item) {
      this.schoolName = item.name;
      this.$refs.infinite.value = item.name;
      this.studentData.school_id = item.school_id;
      this.schoolName = '';
      this.popupSwitch = false;
    },
    openPicker() {
      if (this.studentInfo) {
        return false;
      }
      this.$refs.picker.open();
    },
    handleConfirm(value) {
      const date = Date.parse(value)
        .toString()
        .substr(0, 10);
      this.studentData.birthday = date;
    },
    sumbit() {
      const phoneReg = /^1([358][0-9]|4[579]|66|7[0135678]|9[89])[0-9]{8}$/g;
      const card = /^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}([0-9]|X)$/;

      if (this.studentInfo) {
        this.sumbitStudentApply();
        return;
      }
      if (!this.studentData.name) {
        MessageBox("提示", "请输入学生信息-姓名");
        return;
      }
      if (!this.studentData.sex) {
        MessageBox("提示", "选择学生信息-性别");
        return;
      }
      if (!this.studentData.duty) {
        MessageBox("提示", "请输入学生信息-职务)");
        return;
      }
      // if (!this.studentData.id_card || !card.test(this.studentData.id_card)) {
      //   MessageBox("提示", "请输入学生信息-身份证(规格18位)");
      //   return;
      // }
      // if (!this.studentData.birthday) {
      //   MessageBox("提示", "请选择学生信息-生日");
      //   return;
      // }
      // if (!this.studentData.height) {
      //   MessageBox("提示", "请输入学生信息-身高");
      //   return;
      // }
      // if (!this.studentData.weight) {
      //   MessageBox("提示", "请输入学生信息-体重");
      //   return;
      // }
      // if (!this.studentData.registered_permanent_residence) {
      //   MessageBox("提示", "请输入学生信息-户籍所在地");
      //   return;
      // }
      if (!this.studentData.school_id) {
        MessageBox("提示", "请选择学生信息-就读学校");
        return;
      }
      //  if (!this.studentData.first_will) {
      //   MessageBox("提示", "请输入选择第一志愿");
      //   return;
      // }
      if (!this.studentData.classroom) {
        MessageBox("提示", "请输入学生信息-班级");
        return;
      }
      // if (!this.studentData.family_address) {
      //   MessageBox("提示", "请输入学生信息-家庭住址");
      //   return;
      // }

      // if (!this.fatherData.name) {
      //   MessageBox("提示", "请输入父亲信息-姓名");
      //   return;
      // }
      // if (!this.fatherData.standard_of_culture) {
      //   MessageBox("提示", "请输入父亲信息-文化程度");
      //   return;
      // }
      // if (!this.fatherData.work_address) {
      //   MessageBox("提示", "请输入父亲信息-单位地址");
      //   return;
      // }
      // if (!this.fatherData.duty) {
      //   MessageBox("提示", "请输入父亲信息-职务");
      //   return;
      // }
      // if (!this.fatherData.phone || !phoneReg.test(this.fatherData.phone)) {
      //   MessageBox("提示", "请输入父亲信息-联系电话");
      //   return;
      // }

      // if (!this.motherData.name) {
      //   MessageBox("提示", "请输入母亲信息-姓名");
      //   return;
      // }
      // if (!this.motherData.standard_of_culture) {
      //   MessageBox("提示", "请输入母亲信息-文化程度");
      //   return;
      // }
      // if (!this.motherData.work_address) {
      //   MessageBox("提示", "请输入母亲信息-单位地址");
      //   return;
      // }
      // if (!this.motherData.duty) {
      //   MessageBox("提示", "请输入母亲信息-职务");
      //   return;
      // }
      // if (!this.exam_id) {
      //   MessageBox("提示", "请选择要报名的活动");
      //   return;
      // }
      // if (!this.motherData.phone || this.motherData.phone.length != 11) {
      //   MessageBox("提示", "请输入母亲信息-联系电话(11位手机号码)");
      //   return;
      // }
      if (!this.exam_position_id) {
        MessageBox("提示", "请选择考点");
        return false;
      }
      let residue = this.applyData.exam_position_data.filter(
        item => item.eaxm_position_id == this.exam_position_id
      )[0].residue;
      if (residue == 0) {
        MessageBox("提示", "该考点名额已满请选择其他考点");
        return false;
      }
      this.studentData.user_id = this.user_id;
      this.studentData.family_data.push(this.fatherData, this.motherData);
      Indicator.open({
        text: "报名中...",
        spinnerType: "fading-circle"
      });
      addStudentData(this.studentData).then(res => {
          let errCode = res.data.error_code;
          if (errCode == 0) {
            const studentdata = res.data.data;
            this.$store.commit('saveStudentId',studentdata.student_id)
            this.$store.commit("saveStudentData", studentdata);
            localforage.setItem("student_id", studentdata.student_id, err =>
              console.log(err)
            );
            let data = {
              student_id: studentdata.student_id,
              exam_subject_id: this.exam_id,
              exam_position_id: this.exam_position_id
            };
            addStudentApply(data)
              .then(res => {
                Indicator.close();
                let code = res.data.error_code;
                if (code.charAt(0) == 0) {
                  this.$router.push(`/result?student_id=${studentdata.student_id}&exam_id=${this.exam_id}&name=${this.exam_name}`);
                  return false;
                }
                if (code.charAt(0) == 3) {
                  MessageBox("提示", res.data.message);
                  return false;
                }
                if (code.charAt(0) == 1) {
                  MessageBox("提示", "网络错误");
                  return false;
                }
              })
              .catch(() => Indicator.close());
            return false;
          }
          if (errCode.charAt(0) == 3) {
            MessageBox("提示", res.data.message);
            Indicator.close();
            return false;
          }
          if (errCode.charAt(0) == 1) {
            MessageBox("提示", "网络错误");
            Indicator.close();
            return false;
          }
          if (res.data.error_code == -1) {
            MessageBox("提示", "网络错误");
            Indicator.close();
            return false;
          }
        })
        .catch(err => {
          Indicator.close();
          console.log(err);
        });
    },
    // 提交报名
    sumbitStudentApply() {
      if (!this.exam_position_id) {
        MessageBox("提示", "请选择考点");
        return false;
      }
      if (!this.exam_id) {
        MessageBox("提示", "请选择要报名的活动");
        return;
      }
      let residue = this.applyData.exam_position_data.filter(
        item => item.eaxm_position_id == this.exam_position_id
      )[0].residue;
      if (residue == 0) {
        MessageBox("提示", "该考点名额已满请选择其他考点");
        return false;
      }
      let data = {
        student_id: this.studentInfo.student_id,
        exam_subject_id: this.exam_id,
        exam_position_id: this.exam_position_id
      };
      Indicator.open({
        text: "报名中...",
        spinnerType: "fading-circle"
      });
      addStudentApply(data)
        .then(res => {
          Indicator.close();
          if (res.data.error_code == 0) {
            this.$router.push(`/result?student_id=${this.studentInfo.student_id}&exam_id=${this.exam_id}&name=${this.exam_name}`);
          } else {
            MessageBox("提示", res.data.message);
          }
        })
        .catch(err => Indicator.close());
    },
    // 根据区域获取对应区域内的学校
    fatchSchoolData() {
      if (this.isajaxsend) {
        return false;
      }
      if (this.end) {
        return false;
      }
      this.isajaxsend = true;
      getSchoolData({
        page: this.page,
        page_num: this.page_num,
        county_id: this.areaId
      }).then(res => {
        if (res.data.error_code == 0) {
          this.schools = this.schools.concat(res.data.data);
          this.page++;
        } else {
          this.end = true;
          this.bottomPullText = res.data.message;
        }
        this.isajaxsend = false;
        if (this.$refs.loadmore) {
          this.$refs.loadmore.onBottomLoaded();
        }
      });
    }
  }
};
</script>

<style>
.apply {
  height: 100%;
  overflow-y: auto;
  box-sizing: border-box;
  -webkit-overflow-scrolling: touch;
  font-size: 13px;
}
.warm-prompt {
  color: rgb(247, 10, 10);
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
  margin-bottom: 15px;
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
.infinite-select {
  box-sizing: border-box;
  padding: 10px 0;
  width: 100%;
  height: 100%;
  overflow-y: auto;
  -webkit-overflow-scrolling: touch;
}
.infinite-select li {
  text-align: center;
  overflow-y: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  height: 30px;
  line-height: 30px;
  font-size: 16px;
}
.selected-li {
  color: #f86a18;
}
.mint-spinner-snake {
  margin: auto;
}
</style>
