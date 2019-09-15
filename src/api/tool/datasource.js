import request from '@/router/axios';

export const getList = (current, size, params) => {
  return request({
    url: '/api/codegen/datasource/list',
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
    url: '/api/codegen/datasource/detail',
    method: 'get',
    params: {
      id
    }
  })
}

export const remove = (ids) => {
  return request({
    url: '/api/codegen/datasource/remove',
    method: 'post',
    params: {
      ids,
    }
  })
}

export const add = (row) => {
  return request({
    url: '/api/codegen/datasource/add',
    method: 'post',
    data: row
  })
}

export const update = (row) => {
  return request({
    url: '/api/codegen/datasource/update',
    method: 'post',
    data: row
  })
}


export const copy = (id) => {
  return request({
    url: '/api/codegen/datasource/copy',
    method: 'post',
    params: {
      id,
    }
  })
}

