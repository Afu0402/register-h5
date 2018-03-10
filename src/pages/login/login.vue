<template>
  <div class="login">
    <div class="login__logo">
      <div></div>
    </div>
    <div class="login__form">
      <div>
        <input type="text" v-model="name" placeholder="学生姓名">
      </div>
      <div>
        <input type="text" v-model="phone" placeholder="家长手机号">
      </div>
      <div>
        <input class="verification" v-model="verifyCode" type="text">
        <button class="login-form__button" @click="sendVerifyCode">发送验证码</button>
      </div>
    </div>
    <button class="login__button" @click="login">登录</button>
    <div class="zi-logo">
      <img src="./zy-logo.png" alt="">
    </div>

    <alert :text="text" @confirm="open = false" v-if="open"></alert>
  </div>
</template>

<script>
import { getVerifyCode } from '@/api/apis.js'
import alert from '@/components/alert'
export default {
  data() {
    return {
      open: false,
      text: '',
      name: '',
      phone: '',
      verifyCode: ''
    }
  },
  components: {
    alert
  },
  methods: {
    toActivityList() {
      this.$router.push('/activityList')
    },
    openAlert (msg) {
      this.open = true
      this.text = msg
    },
    sendVerifyCode() {
      if (!this.name) {
        this.openAlert('请输入姓名')
        return
      }
      if (!this.phone) {
        this.openAlert('请输入手机号码')
        return
      }
      const data = {
        name: this.name,
        phone: this.phone
      }
      getVerifyCode(data)
        .then(res => {
          console.log(res)
        })
        .catch(err => {
          console.log(err)
        })
    },
    login () {
      if (!this.verifyCode) {
        this.openAlert('请输入验证码')
        return
      }
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
  background: url('./logo.png') no-repeat;
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
  text-align: center;
}

.login__form .verification {
  width: 140px;
  text-align: right;
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
  margin-top: 70px;
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
