/**
 * 全局配置文件
 */
export default {
  title: "SKY",
  indexTitle: 'SKY Admin',
  clientId: 'SKY', // 客户端id
  clientSecret: 'SKY_secret', // 客户端密钥
  tenantMode: true, // 是否开启租户模式
  logo: "S",
  key: 'SKY',//配置主键,目前用于存储
  lockPage: '/lock',
  tokenTime: 6000,
  //http的status默认放行不才用统一处理的,
  statusWhiteList: [],
  //配置首页不可关闭
  isFirstPage: false,
  fistPage: {
    label: "首页",
    value: "/wel/index",
    params: {},
    query: {},
    meta: {
      i18n: 'dashboard'
    },
    group: [],
    close: false
  },
  //配置菜单的属性
  menu: {
    iconDefault: 'iconfont icon-caidan',
    props: {
      label: 'name',
      path: 'path',
      icon: 'source',
      children: 'children'
    }
  }
}
