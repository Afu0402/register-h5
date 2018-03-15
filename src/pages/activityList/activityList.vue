<template>
  <div class="activity-list">
    <p class="activity-title">
      <span>小鹿活动</span>
      <span class="out-icon" @click="sginOut">退出</span>
    </p>
    <div class="activity-warp">
      <div class="activity-item" v-for="(item,index) in activityList" :key="index">
        <div class="activity-img" @click="toIntro(item)">
          <img src="./img/banner.jpg" alt="">
        </div>
        <div class="activity-content">
          <div>
            <p class="activity-content__title">{{item.name}}</p>
            <p class="activity-content__time">{{item.exam_time}}</p>
          </div>
           <button class="activity-button" :class="buttonClass(item)" @click="searchAndApply(item)">{{applyStatus(item)}}</button>
        </div>
    </div>
    </div>
  </div>
</template>

<script>
import alert from "@/components/alert";
import { getExamSubjectList, getApplyFlitterInfo } from "@/api/apis.js";
import localforage from "@/localforage/localforage";
import { MessageBox } from "mint-ui";

export default {
  data() {
    return {
      activityList: []
    };
  },
  created() {
    let studentId = 0;
    if (!this.userData) {
      this.$router.push('/login');
      return
    }
    if (this.student_data) {
      studentId = this.student_data.student_id;
    }
    getExamSubjectList({ student_id: studentId })
      .then(res => {
        console.log(res.data);
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
          this.activityList = res.data.data;
        }
      })
      .catch(err => {
        console.log(err);
      });
  },
  computed: {
    userData() {
      return this.$store.state.user_data;
    },
    student_data() {
      return this.$store.state.student_data;
    }
  },
  methods: {
    toIntro(item) {
      if (item.exam_status == 1) {
        this.$router.push("/intro");
        this.$store.commit("setCurrentExamId", item.exam_subject_id);
        this.$store.commit("currentExamName", item.name);
      }
    },
    sginOut() {
      this.$router.push("/login");
      this.$store.commit("clearStoreAndLocal");
    },
    searchAndApply(item) {
      const status = item.exam_status;
      const isApply = item.is_apply;
      this.$store.commit("currentExamName", item.name);
      this.$store.commit("setCurrentExamId", item.exam_subject_id);
      if (status == 0 && isApply == 0) {
        MessageBox("提示", "考试已结束");
        return false;
      }
      if (status == 3 && isApply == 0) {
        MessageBox("提示", "报名已截止");
        return false;
      }
      if (!this.userData.user_id) {
        MessageBox("提示", "您还未登录请先登录").then(() =>
          this.$router.push("/login")
        );
        return;
      }
      if (isApply == 0) {
        getApplyFlitterInfo({ exam_subject_id: item.exam_subject_id }).then(res => {
            if (res.data.error_code == 0) {
              console.log(res.data.data);
              this.$store.commit("saveApplyInfo", res.data.data);
              localforage.setItem("applyInfo", res.data.data, err =>
                console.log(err)
              );
            }
          }
        );
        this.$router.push("/apply");
        return;
      }
      this.$router.push({
        name: "result",
        params: {
          exam_subject_id: item.exam_subject_id
        }
      });
    },
    applyStatus(item) {
      const status = item.exam_status;
      const isApply = item.is_apply;
      if (status == 0 && isApply == 0) {
        return "考试结束";
      }
      if (status == 3 && isApply == 0) {
        return "报名截止";
      }
      if (status == 2) {
        return "即将开启";
      }
      if (isApply != 0) {
        return "查询结果";
      }
      return "我要报名";
    },
    buttonClass(item) {
      const status = item.exam_status;
      const isApply = item.is_apply;
      if (status == 0 && isApply == 0) {
        return "exam-end";
      }
    }
  }
};
</script>

<style>
.activity-list {
  height: 100%;
  background: #F4F5F5;
}
.activity-warp {
  box-sizing: border-box;
  padding: 15px;
  height: 100%;
}
.activity-title {
  position: relative;
  height: 35px;
  background: #f86a18;
  color: #fff;
  font-size: 13px;
  text-align: center;
  line-height: 35px;
}
.out-icon {
  position: absolute;
  right: 10px;
  top:0;
  font-size: 12px;
}

.activity-item {
  box-sizing: border-box;
  width: 100%;
  border-radius: 4px;
  box-shadow: 0 0 5px rgba(7, 0, 0, 0.185);
  margin-bottom: 12px;
  background: #fff;
  overflow: hidden;
}

.activity-img {
  padding: 39.87% 0 0 0;
  position: relative;
}

.activity-img > img {
  position: absolute;
  width: 100%;
  height: 100%;
  left: 0;
  top: 0;
}
.activity-content {
  padding: 12px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.activity-content__title {
  font-size: 15px;
  color: #353535;
  line-height: 24px;
}
.activity-content__time {
  font-size: 12px;
  color: #b2b2b2;
}
.activity-button {
  display: block;
  background: #fa9b46;
  border-radius: 100px;
  width: 80px;
  height: 30px;
  color: #fff;
}
.exam-end {
  background: rgb(160, 160, 160);
}
</style>
