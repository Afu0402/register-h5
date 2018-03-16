<template>
  <div class="login">
    <div class="login__logo">
      <div></div>
    </div>
    <div class="login__form">
      <div>
        <input type="text" v-model="postData.name" placeholder="学生姓名">
      </div>
      <div>
        <input type="text" v-model="postData.phone" placeholder="家长手机号">
      </div>
      <div>
        <input class="verification" placeholder="请输入验证码" v-model="postData.code" type="text">
        <button class="login-form__button" @click="sendVerifyCode" :disabled="isSendVerify">{{buttonText}}</button>
      </div>
    </div>
    <button class="login__button" @click="login">登录</button>
    <div class="zi-logo">
      <img src="./img/zy-logo.png" alt="">
    </div>

  </div>
</template>

<script>
import dataCrypt from '@/dataCrypt/dataCrypt'
import localforage from '@/localforage/localforage'
import { getVerifyCode, checkVerifyCode } from '@/api/apis.js'
import { MessageBox, Toast } from 'mint-ui'
export default {
  data() {
    return {
      is_bind_student: null,
      time: 60,
      timer: null,
      isSendVerify: false,
      buttonText: '发送验证码',
      postData: {
        name: '',
        phone: '',
        code: ''
      }
    }
  },
  // created () {
  //   if (this.$store.state.islogin) {
  //     this.$router.push('/activitylist');
  //     return
  //   }
  // },
  computed: {
    userData() {
      return this.$store.state.user_data
    }
  },
  methods: {
    sendVerifyCode() {
      const phoneReg = /^1([358][0-9]|4[579]|66|7[0135678]|9[89])[0-9]{8}$/g
      if (!this.postData.name) {
        MessageBox('提示', '请输入姓名')
        return
      }
      if (!this.postData.phone || !phoneReg.test(this.postData.phone)) {
        MessageBox('提示','请输入手机号码')
        return
      }
      const data = {
        phone: this.postData.phone,
        name: this.postData.name
      }
      getVerifyCode(data).then(res => {
          if (res.data.error_code == 0) {
            this.isSendVerify = true
            this.timer = setInterval(() => {
              this.buttonText = `已发送(${--this.time})`
              if (this.time <= 0) {
                clearInterval(this.timer)
                this.buttonText = '发送验证码'
                this.time = 60
                this.isSendVerify = false
              }
            }, 800)
          } else {
            MessageBox('提示',res.data.message)
          }
        })
        .catch(err => {
          console.log(err)
        })
    },
    login() {
      const phoneReg = /^1([358][0-9]|4[579]|66|7[0135678]|9[89])[0-9]{8}$/g
       if (!this.postData.name) {
          MessageBox('提示','请输入姓名')
        return
      }
      if (!this.postData.phone || !phoneReg.test(this.postData.phone)) {
          MessageBox('提示','手机号码格式有误')
        return
      }
      if (!this.postData.code) {
          MessageBox('提示','请输入验证码')
        return
      }

      checkVerifyCode(this.postData).then(res => {
          const code = res.data.error_code
          if (code.charAt(0) == 3) {
           MessageBox('提示', res.data.message)
            return false;
          };
          if (code.charAt(0) == 1) {
           MessageBox('提示', '网络错误')
            return false;
          };
          if (code.charAt(0) == 0) {
            const data = res.data.data;
            this.$store.commit('isLogin', true);
             this.$store.commit('saveUserId', data.user_data.user_id)
            localforage.setItem('user_id', data.user_data.user_id);
            localforage.setItem('isLogin', true);
            this.is_bind_student = data.is_banding_student;
            if (data.student_data && data.student_data.student_id) {
              this.$store.commit('saveStudentId', data.student_data.student_id)
              localforage.setItem('student_id', data.student_data.student_id);
            }
            
            Toast({
              message: '登录成功',
              duration: 1800
            });
            this.$router.push('/activitylist')
          }
        }).catch(err => {
          console.log(err)
        })
    }
  }
}
</script>

<style>
.login {
  box-sizing: border-box;
  height: calc(100% - 30px);
  padding: 0 5.3vw 5.3vw 5.3vw;
}

.login__logo {
  box-sizing: border-box;
  padding-top: 60px;
  height: 150px;
}

.login__logo div {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  margin: auto;
  background: url('./img/logo.png') no-repeat;
  background-size: cover;
}

.login__form {
  text-align: center;
}

.login__form > div {
  margin-top: 30px;
  padding-bottom: 5px;
  border-bottom: 1px solid #ccc;
}

.login__form > div > input {
  display: inline-block;
  outline: none;
  width: 100%;
  height: 40px;
  text-align: center;
  font-size: 16px;
}

.login__form .verification {
  width: 180px;
  text-align: right;
  margin-right:40px;
}

.login-form__button {
  padding: 4px;
  background: #f86a18;
  font-size: 12px;
  color: #fff;
  border-radius: 20px;
}

.login__button {
  display: block;
  width: 100%;
  height: 45px;
  margin-top: 55px;
  font-size: 14px;
  border-radius: 166px;
  background: #f86a18;
  color: #fff;
}

.zi-logo {
  position: relative;
  padding-top: 17.6%;
  margin: auto;
}

.zi-logo > img {
  position: absolute;
  width: 50%;
  height: 50%;
  left: 50%;
  top: 50%;
  transform: translate(-50%, 50%);
}
</style>
