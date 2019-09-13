import request from '@/router/axios';
import {baseUrl} from '@/config/env';

export const loginByUsername = (tenantId, account, password, type) => request({
  url: '/api/auth/token',
  method: 'post',
  params: {
    tenantId,
    account,
    password,
    type
  }
})

export const getButtons = () => request({
  url: '/api/system/menu/buttons',
  method: 'get'
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
  url: '/api/authentication/resources/getMenu',
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
