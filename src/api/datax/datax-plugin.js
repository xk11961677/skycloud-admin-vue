import request from '@/router/axios';
import {baseUrl} from '@/config/env';

export function getList(current, size, params) {
  return request({
    url: '/api/datax/plugin',
    method: 'get',
    params: {
      ...params,
      current,
      size
    }
  })
}

export function getOne(params) {
  return request({
    url: '/api/datax/plugin/' + params,
    method: 'get'
  })
}

export function update(data) {
  return request({
    url: '/api/datax/plugin/',
    method: 'put',
    data
  })
}

export function add(data) {
  return request({
    url: '/api/datax/plugin/',
    method: 'post',
    data
  })
}

export function remove(data) {
  return request({
    url: '/api/datax/plugin/',
    method: 'delete',
    params: {
      "ids":data
    }
  })
}


export function copy(data) {
  return request({
    url: '/api/datax/plugin/copy',
    method: 'post',
    params: {
      "id":data
    }
  })
}
