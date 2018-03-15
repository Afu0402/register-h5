<template>
  <div class="result">
    <p class="common-title header-fixed">
      <span>小鹿活动</span>
      <span class="back-icon" @click="goblack">返回</span>
    </p>
    <div class="resutl__main">
      <!-- <h3 class="result__title">《{{exam_name}}》</h3> -->
      <div class="result__wrap">

        <div class="result__succeed">
          <div class="result-log"></div>
          <div class="result-title">
              <p class="result-title__one">{{exam_name}}</p>
              <p class="result-title__two">报名成功</p>
          </div>
        </div>
        <div class="result__middle">
          <div class="result__init" :class="{'lineheight': resultDetails.templates == 1}">
            <span class="result-hint__title" v-if="resultDetails.templates == 1"> 审核中...</span>
            <p class="result-hint__text">
              {{ resultDetails.templates == 1 ? '请您于3月27日下午2:00后登录系统查询' : '请下载准考证自行打印'}}
              </p>
          </div>
          <div class="result__voucher" :class="{'result__voucher--no': resultDetails.templates < 2}">
            <img v-if="resultDetails.templates >= 2" :src="resultDetails.admission_ticket_thumbnail_url" @click="openVerify" alt="">
            <img v-else src="./img/zhunkaoz.png" alt="">
          </div>
          <button class="button"  v-if="resultDetails.templates >= 2" @click="openVerify">
            <span class="save-icon"></span>保存准考证到相册
          </button>
          </div>
        <div class="result__grade" v-if="resultDetails.templates > 2 ">
        <div class="result__pass">
            <span>你的综合素养测评结果为：</span>
          </div>
          <div class="result__content">
            <span>成绩等级:</span>
            <span>{{resultDetails.total}}</span>
          </div>
        </div>
        <!-- <div class="result__grade" v-if="resultDetails.templates == 5">
          <div class="result__content">
            <p class="result__final">终审通过</p>
          </div>
          <div class="result__pass">
            <span>你的综合素养测评结果为：</span>
            <button class="result__tag" v-if="resultDetails.templates == 3">通过</button>
            <button class="result__tag result__tage--red" v-if="resultDetails.templates == 4">不通过</button>
          </div>
        </div> -->
      </div>
    </div>
  </div>
</template>

<script>
import { MessageBox } from "mint-ui";
import {
  getStudentApply,
  updateStudentExamPerformancePrint
} from "@/api/apis.js";
export default {
  data() {
    return {
      resultDetails: {
      }
    };
  },
  created() {
    if (this.exam_subject_id && this.studentData) {
      const data = {
        student_id: this.studentData.student_id,
        exam_subject_id: this.exam_subject_id
      };
      getStudentApply(data)
        .then(res => {
          const code = res.data.error_code;
          if (code.charAt(0) == 3) {
            MessageBox("提示", res.data.message);
            return;
          }
          if (code.charAt(0) == 1) {
            MessageBox("提示", "网络错误");
            return;
          }
          if (code == 0) {
            console.log(res.data.data);
            this.resultDetails = res.data.data;
          }
        })
        .catch(err => console.log(err));
    }
  },
  computed: {
    exam_subject_id() {
      return this.$store.state.exam_id;
    },
    studentData() {
      return this.$store.state.student_data;
    },
    exam_name() {
      return this.$store.state.exam_name;
    }
  },
  methods: {
    goblack() {
      this.$router.push('/activitylist')
    },
    openVerify() {
      if (this.resultDetails.templates < 2) {
        return false;
      }
      updateStudentExamPerformancePrint({
        student_exam_performance_id: this.resultDetails
          .student_exam_performance_id
      });
      window.open("http://dev-jsl-apply-api.thedeer.cn:88/test");
    }
  },
  beforeRouteLeave(to, from, next) {
    if (to.name === "activitylist") {
      next();
    } else {
      next({ path: "/activitylist" });
    }
  }
};
</script>

<style>
.result {
  height: 100%;
  box-sizing: border-box;
  padding:40px 15px 15px 15px;
  overflow: auto;
  background: #f4f5f5;
}
.header-fixed{
  position:absolute;
  top: 0;
  left: 0;
  right: 0;
}
/* .result hr {
  height: 2px;
  border: none;
  border-top: 2px dotted #185598;
} */
.result__middle {
  /* height: 40vh; */
  padding-top: 18px;
  /* margin-bottom: 10vw; */
}

.result__init {
  text-align: center;
  line-height: 26px;
}
.lineheight {
  line-height: 36px;
}
.resutl__main {
  box-sizing: border-box;
  padding: 18px;
  background: #ffffff;
  border-radius: 4px;
  width: 100%;
  height: 100%;
  background: url("./img/result-bg.png") no-repeat;
  background-position: cover;
  background-size: 100%;
}
.result__wrap {
  padding: 12px;
}
.result__hint {
  font-size: 13px;
  color: #888888;
}
.result-hint__title {
  font-size: 22px;
  color: #353535;
}
.result-hint__text {
  font-size: 14px;
  color: #888888;
}
.result__voucher {
  position: relative;
  padding-top: 68%;
  background: rgb(233, 233, 233);
  text-align: center;
  font-size: 20px;
}
.result__voucher--no {
  padding-top: 56.9%;
}
.result__voucher > div p {
  font-size: 14px;
}
.result__voucher img {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}
.result__voucher a {
  color: rgb(65, 65, 65);
}
.result__succeed {
  width: 100%;
  height: 27vw;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 14px;
  color: #4f9e08;
}
.result-log {
  display: inline-block;
  width: 70px;
  height: 75px;
  background: url("./img/succed.png") no-repeat;
  background-size: cover;
  background-size: 100%;
}

.result-title {
  margin-left: 20px;
  color: #888888;
}
.result-title__two {
  font-size: 20px;
  color: #353535;
}
.button {
  display: block;
  margin: 10px auto;
  padding: 8px 10px;
  background: #fa9b46;
  border-radius: 20px;
  font-size: 13px;
  color: #ffffff;
}
.button--has {
  opacity: 1;
}
.result__pass {
  font-size: 14px;
  color: #000000;
}
.result__tag {
  padding: 2px 4px;
  border-radius: 8px;
  color: #fff;
  background: #4f9e08;
}
.result__tage--red {
  background: red;
}
.result__content {
  height: 80px;
  color: rgb(95, 95, 95);
  text-align: center;
  line-height: 80px;
}
.result__content span:nth-child(2) {
  font-size: 70px;
  color: #4f9e08;
}

.result__content span:nth-child(1) {
  font-size: 12px;
  color: #b2b2b2;
}
.result__content .result__final {
  font-size: 50px;
  color: #4f9e08;
}
.result__voucher a {
  display: block;
  width: 100%;
  height: 100%;
}
.save-icon {
  display: inline-block;
  position: relative;
  top: 2px;
  right: 2px;
  width: 14px;
  height: 14px;
  background: url("./img/down.png") no-repeat;
  background-size: 100%;
  background-position: cover;
}
</style>
