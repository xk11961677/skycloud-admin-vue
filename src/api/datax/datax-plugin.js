import request from '@/router/axios';
import {baseUrl} from '@/config/env';

// datax插件api

export function getList(params) {
  return request({
    url: '/api/datax/plugin',
    method: 'get',
    params
  })
}

export function fetchPlugin(params) {
  return request({
    url: '/api/datax/plugin/' + params,
    method: 'get'
  })
}

export function updatePlugin(data) {
  return request({
    url: '/api/datax/plugin/',
    method: 'put',
    data
  })
}

export function createPlugin(data) {
  return request({
    url: '/api/datax/plugin/',
    method: 'post',
    data
  })
}

export function deletePlugin(data) {
  return request({
    url: '/api/datax/plugin/',
    method: 'delete',
    params: data
  })
}
