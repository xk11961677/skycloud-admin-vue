import request from '@/router/axios';

export const getList = (current, size, params) => {
  return request({
    url: '/api/system/tenant/list',
    method: 'get',
    params: {
      ...params,
      current,
      size,
    }
  })
}
export const remove = (ids) => {
  return request({
    url: '/api/system/tenant/remove',
    method: 'post',
    params: {
      ids,
    }
  })
}

export const add = (row) => {
  return request({
    url: '/api/system/tenant/submit',
    method: 'post',
    data: row
  })
}

export const update = (row) => {
  return request({
    url: '/api/system/tenant/submit',
    method: 'post',
    data: row
  })
}
