<template>
  <div class="intro">
    <div class="intro-img">
      <img src="./img/banner.png" alt="">
    </div>
    <h3 class="intro__title">{{details.name}}</h3>
    <p class="intro__content">
      {{details.test_instructions}}
    </p>
    <button class="intro__button" @click="toApply">{{buttonText}}</button>
  </div>
</template>
<script>
import { getExamSubjectDetail } from '@/api/apis.js'
import dataCrypt from '@/dataCrypt/dataCrypt.js'
import { MessageBox } from 'mint-ui'
import formSelect from '@/components/formSelect.vue'
import localforage from '@/localforage/localforage'
export default {
  data() {
    return {
      details: {},
      schools: [
        {
          name: 'xiaoke'
        }
      ]
    }
  },
  components: {
    formSelect
  },
  created() {
    if (this.exam_subject_id && this.student_id) {
      const data = {
        student_id: this.student_id,
        exam_subject_id: this.exam_subject_id
      }
      getExamSubjectDetail(data).then(res => {
          const code = res.data.error_code

          if (code.charAt(0) == 3) {
            MessageBox('提示', res.data.message)
            return false
          }
          if (code.charAt(0) == 1) {
            MessageBox('提示', '网络错误')
            return false
          }
          if (code.charAt(0) == 0) {
            MessageBox('提示', res.data.message)
            this.details = res.data.data
            const applyData = {
              exam_subject_id: this.details.exam_subject_id,
              area_data: this.details.area_data,
              exam_position_data: this.details.exam_position_data
            }
            this.$store.commit('saveApplyInfo', applyData)
            localforage.setItem('applyInfo', applyData, err => console.log(err))
            console.log(res.data.data)
          }
        })
        .catch(err => console.log(err))
    }
  },
  computed: {
    exam_subject_id() {
      return this.$route.params.exam_subject_id
    },
    student_id() {
      return this.$route.params.student_id
    },
    buttonText() {
      if (this.details.is_apply) {
        return this.details.is_apply != 0 ? '已报名(查看结果)' : '报名'
      } else {
        return '报名'
      }
    },
    userData() {
      return this.$store.state.user_data
    }
  },
  methods: {
    toApply() {
      if (!this.userData.user_id) {
        MessageBox('提示', '您还未登录请先登录').then(() =>
          this.$router.push('/')
        )
        return
      }
      if (this.details.is_apply != 0) {
        this.$router.push({
          name: 'result',
          params: {
            student_id: this.student_id,
            exam_subject_id: this.exam_subject_id
          }
        })
      } else {
        this.$router.push('/apply')
      }
    }
  }
}
</script>

<style>
.intro {
  padding: 15px;
  height: 100%;
  background: url('./img/introbg.png') no-repeat;
  background-position: 40% 100%;
}

.intro-img {
  padding: 39.87% 0 0 0;
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
  height: calc(100% - 300px);
  font-size: 14px;
  color: rgb(177, 177, 177);
}
.intro__button {
  display: block;
  background: #f86a18;
  color: #fff;
  padding: 8px 60px;
  border-radius: 30px;
  margin: auto;
  margin-top: 60px;
}
</style>
