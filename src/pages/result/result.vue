<template>
  <div class="result">
    <p class="common-title">
      <span>小鹿活动</span>
      <span class="back-icon" @click="goblack">返回</span>
    </p>
    <div class="resutl__main">
      <div class="result_background">
        <div class="result__wrap">
        <div class="result__succeed">
          <div class="result-log"></div>
          <div class="result-title">
              <p class="result-title__one">{{exam_name}}</p>
              <p class="result-title__two">报名信息提交成功</p>
          </div>
        </div>
        <div class="result__middle">
          <div class="result__init" :class="{'lineheight': resultDetails.templates == 1}">
            <p class="result-hint__title" v-if="resultDetails.templates == 1"> 审核中...</p>
            <p class="result-hint__text" v-if="resultDetails.templates != 5">
              {{ resultDetails.templates == 1 ? '请您于3月28日18:00后登录下载准考证' : '请下载准考证自行打印'}}
              </p>
          </div>
          <div class="result__voucher" :class="{'result__voucher--no': resultDetails.templates < 2}">
            <div class="result__notpass--status" v-if="resultDetails.templates == 5">
              <p>准考证审核未通过<br/>详情请咨询客服</p>
            </div>
            <img v-if="resultDetails.templates >= 2 && resultDetails.templates < 5" :src="resultDetails.admission_ticket_thumbnail_url" @click="openVerify" alt="">
            <img v-else src="./img/zhunkaoz.png" alt="">
          </div>
          <button class="button"  v-if="resultDetails.templates >= 2 && resultDetails.templates < 5" @click="openVerify">
            <span class="save-icon"></span>保存准考证并打印
          </button>
          </div>
        <div class="result__grade" v-if="resultDetails.templates > 2 && resultDetails.templates < 5">
        <div class="result__pass">
            <span>你的综合素养测评结果为：</span>
          </div>
          <div class="result__content">
            <span>成绩等级:</span>
            <span>{{resultDetails.total}}</span>
          </div>
        </div>
      </div>
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
    if (this.exam_subject_id && this.student_id) {
      const data = {
        student_id: this.student_id,
        exam_subject_id: this.exam_subject_id
      };
      getStudentApply(data).then(res => {
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
            this.resultDetails = res.data.data;
            console.log(this.resultDetails)
            
          }
        })
        .catch(err => (err));
    } else {
      this.$router.push('/activitylist')
    }
  },
  computed: {
    exam_subject_id() {
      return this.$store.state.exam_subject_id;
    },
    student_id () {
      return this.$store.state.student_id;
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
        student_exam_performance_id: this.resultDetails.student_exam_performance_id
      });
      this.$router.push(`/ticket?url=${this.resultDetails.admission_ticket_url}`);
    }
  },
  beforeRouteLeave(to, from, next) {
    console.log(to)
    if (to.name === "activitylist" || to.name === 'ticket') {
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
  line-height: 24px;
}
.lineheight {
  line-height: 36px;
}
.resutl__main {
  box-sizing: border-box;
  padding:15px;
  overflow: auto;
  background: #f4f5f5;
  height: calc(100% - 35px);
}
.result_background {
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
.result__notpass--status {
  position: absolute;
  top:0;
  left: 0;
  right: 0;
  bottom: 0;
  color: #fff;
  background: rgba(0, 0, 0, 0.671);
  z-index: 1;
  vertical-align: middle;
}
.result__notpass--status>p {
  margin-top: 25%;
  font-size: 18px !important;
  }
</style>
