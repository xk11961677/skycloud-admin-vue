import request from '@/router/axios';

export const getList = (current, size, params) => {
  return request({
    url: '/api/system/dict/list',
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
    url: '/api/system/dict/remove',
    method: 'post',
    params: {
      ids,
    }
  })
}

export const add = (row) => {
  return request({
    url: '/api/system/dict/submit',
    method: 'post',
    data: row
  })
}

export const update = (row) => {
  return request({
    url: '/api/system/dict/submit',
    method: 'post',
    data: row
  })
}


export const getDict = (id) => {
  return request({
    url: '/api/system/dict/detail',
    method: 'get',
    params: {
      id,
    }
  })
}
export const getDictTree = () => {
  return request({
    url: '/api/system/dict/tree?code=DICT',
    method: 'get'
  })
}
