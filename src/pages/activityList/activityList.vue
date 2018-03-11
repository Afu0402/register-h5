<template>
  <div class="activity-list">
    <div class="activity-item" v-for="(item,index) in activityList" :key="index">
      <div class="activity-img" @click="toIntro(item)">
        <img src="./img/banner.png" alt="">
      </div>
      <button class="activity-button" @click="searchAndApply(item)">结果查询</button>
    </div>
  </div>
</template>

<script>
import alert from '@/components/alert'
import { getExamSubjectList } from '@/api/apis.js'
import { MessageBox } from 'mint-ui'

export default {
  data() {
    return {
      activityList: []
    }
  },
  created() {
    getExamSubjectList({ student_id: this.student.student_id }).then(res => {
        if (res.data.error_code != 0) {
          MessageBox('提示', res.data.message)
        }
        this.activityList = res.data.data
      })
      .catch(err => {
        console.log(err)
      })
  },
  computed: {
    student() {
      return this.$store.state.student_data
    },
    userData () {
      return this.$store.state.user_data
    }
  },
  methods: {
    toIntro(item) {
      if (item.is_apply == 0) {
        this.$router.push({
          name: 'intro',
          params: {
            student_id: this.student.student_id,
            exam_subject_id: item.exam_subject_id
          }
        })
      } else {
        this.$router.push('/result/')
      }
    },
    searchAndApply(item) {
      if (!this.userData.user_id) {
        MessageBox('提示','您还未登录请先登录').then(() => this.$router.push('/login'))
        return
      }
      if (item.is_apply == 0) {
          MessageBox('提示','您还未报名,请先报名')
          return
      }
       this.$router.push({
          name: 'result',
          params: {
            student_id: this.student.student_id,
            exam_subject_id: item.exam_subject_id
          }
        })
    }
  }
}
</script>

<style>
.activity-list {
  box-sizing: border-box;
  width: 100%;
  padding: 15px;
}

.activity-item {
  box-sizing: border-box;
  width: 100%;
  border: 1px solid #ccc;
  padding: 4px;
  margin-bottom: 12px;
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

.activity-button {
  display: block;
  margin: 4px auto 0;
  width: 180px;
  height: 30px;
  background: #f86a18;
  color: #fff;
  border-radius: 90px;
}
</style>
