<template>
  <div class="result">
    <div class="resutl__main">
      <h3 class="result__title">《{{exam_name}}》</h3>
      <div class="result__wrap">
        <p class="result__succeed">报名成功</p>
        <p class="result__hint">请下载准考证自行打印</p>
        <div class="result__voucher">
          <span v-if="resultDetails.templates == 1"> 审核中...</span>
          <img v-if="resultDetails.templates >= 2" :src="resultDetails.admission_ticket_url" @click="openVerify" alt="">
        </div>
        <button class="button" :class="{'button--has':resultDetails.templates >= 2}" @click="openVerify">保存准考证到相册</button>
        <hr/>
        <div class="result__grade" v-if="resultDetails.templates > 2">
          <div class="result__pass">
            <span>你的综合素养测评结果为：</span>
            <button class="result__tag" v-if="resultDetails.templates == 3">通过</button>
            <button class="result__tag result__tage--red" v-if="resultDetails.templates == 4">不通过</button>
          </div>
          <div class="result__content">
            <span>成绩:</span>
            <span>{{resultDetails.total}}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { MessageBox } from 'mint-ui'
import { getStudentApply, updateStudentExamPerformancePrint} from '@/api/apis.js'
export default {
  data () {
    return {
      resultDetails: {}
    }
  },
  created() {
    if (this.exam_subject_id && this.studentData) {
      const data = {
        student_id: this.studentData.student_id,
        exam_subject_id: this.exam_subject_id
      }
      getStudentApply(data).then(res => {
        const code = res.data.error_code
          if (code.charAt(0) == 3) {
            MessageBox('提示', res.data.message)
            return
          }
          if (code.charAt(0) == 1) {
            MessageBox('提示', '网络错误')
            return
          }
          if (code == 0) {
            console.log(res.data.data)
            this.resultDetails = res.data.data
          }
        })
        .catch(err => console.log(err))
    }
  },
  computed: {
    exam_subject_id() {
      return this.$store.state.exam_id
    },
    studentData() {
      return this.$store.state.student_data
    },
     exam_name() {
      return this.$store.state.exam_name;
    }
  },
  methods: {
    openVerify() {
      if (this.resultDetails.templates < 2) {
        return false;
      }
      updateStudentExamPerformancePrint({student_exam_performance_id: this.resultDetails.student_exam_performance_id})
      window.open('http://dev-jsl-apply-api.thedeer.cn:88/test')
    }
  },
  beforeRouteLeave(to,from,next) {
    if (to.name === 'activitylist') {
      next()
    } else {
      next({ path: '/activitylist' })
    }
  }
}
</script>

<style>
  .result {
    height: 100%;
    box-sizing: border-box;
    padding: 15px;
    overflow: auto;
  }
  
  .resutl__main {
    border-radius: 6px;
    border: 1px solid #ccc;
  }
  
  .result__title {
    background: #ccc;
    color: #535353;
    font-size: 16px;
    text-align: center;
    line-height: 30px;
    height: 30px;
  }
  .result__wrap {
    padding: 12px;
  }
  .result__hint {
    font-size: 14px;
    color: rgb(71, 71, 71);
  }
  .result__voucher {
    position: relative;
    padding-top: 68%;
    background: #ccc;
    text-align: center;
    font-size: 20px;
  }
   .result__voucher > span {
    position: absolute;
    top:50%;
    left: 50%;
    transform: translate(-50%,-50%);
  }
  .result__voucher > img {
    position: absolute;
    top:0;
    left: 0;
    width: 100%;
    height: 100%;
  }
  .result__voucher a {
    color: rgb(65, 65, 65);
  }
  .result__succeed {
    margin:3px 0 15px 0;
    font-size: 36px;
    color: #4f9e08;
    text-align: center;
  }
  .result__succeed::before {
    content: '';
    display: inline-block;
    position: relative;
    top: 15px;
    right: 10px;
    width: 60px;
    height: 60px;
    background: url("./succeed.png") no-repeat;
    background-size: cover;
  }
  .button {
    display: block;
    margin: 12px auto;
    padding:8px 10px;
    background: rgb(158, 158, 158);
    color: #fff;
    border-radius:20px;
  }
  .button--has {
    background: #eb7b16;
  }
  .result__pass {
    font-size: 14px;
    color: rgb(95, 95, 95);
  }
  .result__tag {
    padding:2px 4px;
    border-radius: 8px;
    color: #fff;
    background: #4f9e08;
  }
  .result__tage--red {
    background: red;
  }
  .result__content {
    height: 110px;
    color: rgb(95, 95, 95);
    text-align: center;
    line-height: 110px;
  }
  .result__content span:nth-child(2) {
    font-size:70px;
    color: #4f9e08;
  }
  .result__content span:nth-child(1) {
    position: relative;
    top: -20px;
    right: 20px;
  }
  .result__voucher a {
    display: block;
    width: 100%;
    height: 100%;;
  }
</style>
