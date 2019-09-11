import request from '@/router/axios';

export const resetPassword = (userIds) => {
  return request({
    url: '/api/user/reset-password',
    method: 'post',
    params: {
      userIds,
    }
  })
}
export const getList = (current, size, params) => {
  return request({
    url: '/api/user/list',
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
    url: '/api/user/remove',
    method: 'post',
    params: {
      ids,
    }
  })
}

export const add = (row) => {
  return request({
    url: '/api/user/submit',
    method: 'post',
    data: row
  })
}

export const update = (row) => {
  return request({
    url: '/api/user/update',
    method: 'post',
    data: row
  })
}

export const getUser = (id) => {
  return request({
    url: '/api/user/detail',
    method: 'get',
    params: {
      id,
    }
  })
}
