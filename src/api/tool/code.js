import request from '@/router/axios';

export const getList = (current, size, params) => {
  return request({
    url: '/api/codegen/code/list',
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
    url: '/api/codegen/code/gen-code',
    method: 'post',
    dataType:'application/octet-stream',
    params: {
      ids
    }
  })
}
export const remove = (ids) => {
  return request({
    url: '/api/codegen/code/remove',
    method: 'post',
    params: {
      ids,
    }
  })
}

export const add = (row) => {
  return request({
    url: '/api/codegen/code/add',
    method: 'post',
    data: row
  })
}

export const update = (row) => {
  return request({
    url: '/api/codegen/code/update',
    method: 'post',
    data: row
  })
}

export const copy = (id) => {
  return request({
    url: '/api/codegen/code/copy',
    method: 'post',
    params: {
      id,
    }
  })
}

export const getCode = (id) => {
  return request({
    url: '/api/codegen/code/detail',
    method: 'get',
    params: {
      id,
    }
  })
}
