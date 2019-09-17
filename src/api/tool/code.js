import request from '@/router/axios';
import {baseUrl} from '@/config/env';

export const getList = (current, size, params) => {
  return request({
    url: baseUrl+'/codegen/code/list',
    method: 'get',
    params: {
      ...params,
      current,
      size
    }
  })
}

export const build = (ids) => {
  return request({
    url: baseUrl+'/codegen/code/gen-code',
    method: 'post',
    params: {
      ids
    }
  })
}
export const remove = (ids) => {
  return request({
    url: baseUrl+'/codegen/code/remove',
    method: 'post',
    params: {
      ids,
    }
  })
}

export const add = (row) => {
  return request({
    url: baseUrl+'/codegen/code/add',
    method: 'post',
    data: row
  })
}

export const update = (row) => {
  return request({
    url: baseUrl+'/codegen/code/update',
    method: 'post',
    data: row
  })
}

export const copy = (id) => {
  return request({
    url: baseUrl+'/codegen/code/copy',
    method: 'post',
    params: {
      id,
    }
  })
}

export const getCode = (id) => {
  return request({
    url: baseUrl+'/codegen/code/detail',
    method: 'get',
    params: {
      id,
    }
  })
}
