import request from '@/router/axios';

export const getUsualList = (current, size) => {
  return request({
    url: '/api/log/usual/list',
    method: 'get',
    params: {
      current,
      size
    }
  })
}

export const getApiList = (current, size) => {
  return request({
    url: '/api/log/api/list',
    method: 'get',
    params: {
      current,
      size
    }
  })
}

export const getErrorList = (current, size) => {
  return request({
    url: '/api/log/error/list',
    method: 'get',
    params: {
      current,
      size
    }
  })
}


export const getUsualLogs = (id) => {
  return request({
    url: '/api/log/usual/detail',
    method: 'get',
    params: {
      id,
    }
  })
}
export const getApiLogs = (id) => {
  return request({
    url: '/api/log/api/detail',
    method: 'get',
    params: {
      id,
    }
  })
}
export const getErrorLogs = (id) => {
  return request({
    url: '/api/log/error/detail',
    method: 'get',
    params: {
      id,
    }
  })
}

