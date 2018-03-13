<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
  #app {
    height: 100%;
    max-width: 720px;
    overflow: hidden;
    }
 .login__title {
    height: 30px;
    background: #f86a18;
    text-align:center;
    color: #fff;
    line-height: 30px;
    font-size: 12px;
  }
</style>
