<template>
  <div class="intro">
    <p class="common-title">
      <span>小鹿活动</span>
      <span class="back-icon" @click="goblack">返回</span>
    </p>
    <div class="intro-wrap">
      <div class="intro-img">
        <img :src="details.detail_image_url" alt="">
        <button class="intro__button" :class="{'exam-end': status == 3}" @click="toApply">{{buttonText}}</button>
      </div>
    </div>
  </div>
</template>
<script>
import { getExamSubjectDetail,getApplyFlitterInfo} from "@/api/apis.js";
import dataCrypt from "@/dataCrypt/dataCrypt.js";
import { MessageBox } from "mint-ui";
import formSelect from "@/components/formSelect.vue";
import localforage from "@/localforage/localforage";
export default {
  data() {
    return {
      details: {},
      imgSrc: '',
      schools: [
        {
          name: "xiaoke"
        }
      ]
    };
  },
  components: {
    formSelect
  },
  created() {
    if (!this.exam_subject_id) {
      this.$router.push('/activitylist');
    }
    const data = {
        exam_subject_id:  this.exam_subject_id,
        student_id: this.student_id
      };
      getExamSubjectDetail(data).then(res => {
          const code = res.data.error_code;
          if (code.charAt(0) == 3) {
            MessageBox("提示", res.data.message);
            return false;
          }
          if (code.charAt(0) == 1) {
            MessageBox("提示", "网络错误");
            return false;
          }
          if (code.charAt(0) == 0) {
            this.details = res.data.data;
          }
        }).catch(err => console.log(err));
  },
  computed: {
    exam_subject_id() {
      return this.$route.query.exam_id;
    },
    student_id () {
      return this.$route.query.student_id;
    },
    islogin() {
      return this.$store.state.islogin;
    },
    buttonText() {
      if (this.details.is_apply) {
        return this.details.is_apply != 0 ? "已报名(查看结果)" : "报名";
      } else {
        return "报名";
      }
    },
    userData() {
      return this.$store.state.user_data;
    }
  },
  methods: {
    goblack() {
      this.$router.go(-1)
    },
    toApply() {
        const status = this.details.exam_status;
        const isApply = this.details.is_apply;
        if(status == 0 && isApply == 0) {
          MessageBox("提示", "考试已结束")
          return false;
        }
        if(status == 3 && isApply == 0) {
          MessageBox("提示", "报名已截止")
          return false;
        }
      if (!this.islogin) {
        MessageBox("提示", "您还未登录请先登录").then(() =>
          this.$router.push("/login")
        );
        return;
      }
      if (this.details.is_apply != 0) {
        this.$router.push('/result');
      } else {
        this.$router.push("/apply");
      }
    }
  }
};
</script>

<style>
.intro {
  height: 100%;
  /* background-size: cover;
  overflow-y: auto;
  -webkit-overflow-scrolling: touch; */
  
}
.intro-wrap {
  overflow-y: auto;
  height: calc(100% - 35px);
  -webkit-overflow-scrolling: touch;
  
}
.intro-img {
  padding: 210% 0 0 0;
  position: relative;
}
.intro-img > img {
  position: absolute;
  width: 100%;
  height: 100%;
  left: 0;
  top: 0;
}
.intro__title {
  color: rgb(5, 202, 202);
  text-align: center;
  margin-top: 15px;
}
.intro__content {
  text-indent: 20px;
  height: calc(100% - 300px);
  font-size: 16px;
  color: rgb(177, 177, 177);
}
.intro__button {
  position: absolute;
  bottom: 30px;
  left: 50%;
  transform: translateX(-50%);
  display: block;
  background: #f86a18;
  color: #fff;
  width: 80%;
  padding:12px 0;
  border-radius: 30px;
  margin: auto;
  font-size: 16px;
}
.exam-end {
  background: rgb(160, 160, 160);
}
</style>
