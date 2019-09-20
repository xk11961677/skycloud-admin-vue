import request from '@/router/axios';
import {baseUrl} from '@/config/env';
import website from '@/config/website';

//用户登录
export const loginByUsername = (data) => request({
  url: baseUrl + website.loginUrl,
  method: 'post',
  headers: {
    'channel':'doooly-admin-vue'
  },
  data
})

//获取按钮权限
export const getButtons = () => request({
  url: baseUrl+'/authentication/resources/getButton',
  method: 'post'
});

export const getUserInfo = () => request({
  url: baseUrl + '/user/getUserInfo',
  method: 'get'
});

export const refeshToken = () => request({
  url: baseUrl + '/user/refesh',
  method: 'post'
})

export const getMenu = () => request({
  url: baseUrl+'/authentication/resources/getMenu',
  method: 'post'
});

export const getTopMenu = () => request({
  url: baseUrl + '/user/getTopMenu',
  method: 'get'
});

export const sendLogs = (list) => request({
  url: baseUrl + '/user/logout',
  method: 'post',
  data: list
})

export const logout = () => request({
  url: baseUrl + '/user/logout',
  method: 'get'
})
