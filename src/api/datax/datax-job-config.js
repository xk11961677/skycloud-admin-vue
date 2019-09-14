import request from '@/router/axios';
import {baseUrl} from '@/config/env';

// 抽取任务

export function getList(current, size, params) {
  console.log(baseUrl);
  return request({
    url: '/api/datax/jobConfig',
    method: 'get',
    params:{
      ...params,
      current,
      size
    }
  })
}

export function getOne(params) {
  return request({
    url: '/api/datax/jobConfig/' + params,
    method: 'get'
  })
}

export function update(data) {
  return request({
    url: '/api/datax/jobConfig/',
    method: 'put',
    data
  })
}

export function add(data) {
  return request({
    url: '/api/datax/jobConfig/',
    method: 'post',
    data
  })
}

export function remove(data) {
  return request({
    url: '/api/datax/jobConfig/',
    method: 'delete',
    params: {
      "ids":data
    }
  })
}

export function copy(data) {
  return request({
    url: '/api/datax/jobConfig/copy',
    method: 'post',
    params: {
      "id":data
    }
  })
}

export function viewJobLog(params) {
  return request({
    url: '/api/datax/job/viewJobLog',
    method: 'get',
    params
  })
}
