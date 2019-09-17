import request from '@/router/axios';
import {baseUrl} from '@/config/env';

// 抽取任务

export function getList(current, size, params) {
  return request({
    url: baseUrl+'/datax/jobConfig',
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
    url: baseUrl+'/datax/jobConfig/' + params,
    method: 'get'
  })
}

export function update(data) {
  return request({
    url: baseUrl+'/datax/jobConfig/',
    method: 'put',
    data
  })
}

export function add(data) {
  return request({
    url: baseUrl+'/datax/jobConfig/',
    method: 'post',
    data
  })
}

export function remove(data) {
  return request({
    url: baseUrl+'/datax/jobConfig/',
    method: 'delete',
    params: {
      "ids":data
    }
  })
}

export function copy(data) {
  return request({
    url: baseUrl+'/datax/jobConfig/copy',
    method: 'post',
    params: {
      "id":data
    }
  })
}

export function viewJobLog(params) {
  return request({
    url: baseUrl+'/datax/job/viewJobLog',
    method: 'get',
    params
  })
}
