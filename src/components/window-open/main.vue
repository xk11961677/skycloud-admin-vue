<template>
  <basic-container>
    <span style="font-size: 14px;">外置页面已打开</span>
  </basic-container>
</template>
<script>
var windowOpenComponentFromPath = "";
export default {
  name: "windowOpen",
  data() {
    return {
      urlPath: this.getUrlPath() // src 路径
    };
  },
  props: ["routerPath"],
  watch: {
    //监听route,防止组件使用一次后,再次使用不执行created等生命周期
    $route: function() {
      this.getUrlPath();
    }
  },
  beforeRouteEnter(to, from, next) {
    //获取全路径
    windowOpenComponentFromPath = from.fullPath;
    next();
  },
  methods: {
    hide() {
      this.$router.$avueRouter.closeTag();
    },
    getUrlPath: function() {
      //获取  src 路径
      let url = window.location.href;
      let src = this.$route.query.src
        ? this.$route.query.src.replace("$", "#")
        : url;
      //打开浏览器新窗口
      window.open(src);
      //关闭当前页面
      this.hide();
      //跳转到原来页面
      this.$router.push(windowOpenComponentFromPath);
      return url;
    }
  }
};
</script>