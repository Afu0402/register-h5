<template>
  <div class="intro">
    <div class="intro-img">
      <img src="./banner.png" alt="">
    </div>
    <h3 class="intro__title">2018小学生综合素养测评</h3>
    <p class="intro__content">
      Nginx 配置的核心是定义要处理的 URL 以及如何响应这些 URL 请求，即定义一系列的虚拟服务器（Virtual Servers）控制对来自特定域名或者 IP 的请求的处理。 每一个虚拟服务器定义一系列的 location 控制处理特定的 URI 集合。每一个location定义了对映射到自己的请求的处理场景，可以返回一个文件或者代理此请求。 Nginx 由不同的模块组成，这些模块由配置文件中指定的指令控制。 指令分为简单指令和块指令。 一个简单指令包含指令名称和指令参数，以空格分隔，以分号（;）结尾。
      块指令与简单指令类似，但是由大括号（{和}）包围。 如果块指令大括号中包含其他指令，则称该指令为上下文
    </p>
    <button class="intro__button" @click="toApply">报名</button>
  </div>
</template>

<script>
  export default {
    methods: {
      tointroList() {
        this.$router.push('/introList')
      },
      toApply() {
        this.$router.push('/apply')
      }
    }
  }
</script>

<style>
  .intro {
    padding: 15px;
  }
  
  .intro-img {
    padding: 39.87% 0 0 0;
    position: relative;
  }
  .intro-img>img {
    position: absolute;
    width: 100%;
    height: 100%;
    left: 0;
    top: 0;
  }
  .intro__title {
    color:rgb(5, 202, 202);
    text-align: center;
    margin-top: 15px;
  }
  .intro__content {
    margin-bottom: 20px;
    
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
  }
</style>
