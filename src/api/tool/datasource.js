import request from '@/router/axios';
import {baseUrl} from '@/config/env';

export const getList = (current, size, params) => {
  return request({
    url: baseUrl+'/codegen/datasource/list',
    method: 'get',
    params: {
      ...params,
      current,
      size,
    }
  })
}

export const getDetail = (id) => {
  return request({
    url: baseUrl+'/codegen/datasource/detail',
    method: 'get',
    params: {
      id
    }
  })
}

export const remove = (ids) => {
  return request({
    url: baseUrl+'/codegen/datasource/remove',
    method: 'post',
    params: {
      ids,
    }
  })
}

export const add = (row) => {
  return request({
    url: baseUrl+'/codegen/datasource/add',
    method: 'post',
    data: row
  })
}

export const update = (row) => {
  return request({
    url: baseUrl+'/codegen/datasource/update',
    method: 'post',
    data: row
  })
}


export const copy = (id) => {
  return request({
    url: baseUrl+'/codegen/datasource/copy',
    method: 'post',
    params: {
      id,
    }
  })
}

