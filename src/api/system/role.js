import request from '@/router/axios';

export const getList = (current, size, params) => {
  return request({
    url: '/api/system/role/list',
    method: 'get',
    params: {
      ...params,
      current,
      size,
    }
  })
}
export const grantTree = () => {
  return request({
    url: '/api/system/menu/grant-tree',
    method: 'get',
  })
}

export const grant = (roleIds, menuIds) => {
  return request({
    url: '/api/system/role/grant',
    method: 'post',
    params: {
      roleIds,
      menuIds
    }
  })
}

export const remove = (ids) => {
  return request({
    url: '/api/system/role/remove',
    method: 'post',
    params: {
      ids,
    }
  })
}

export const add = (row) => {
  return request({
    url: '/api/system/role/submit',
    method: 'post',
    data: row
  })
}

export const update = (row) => {
  return request({
    url: '/api/system/role/submit',
    method: 'post',
    data: row
  })
}


export const getRole = (roleIds) => {
  return request({
    url: '/api/system/menu/role-tree-keys',
    method: 'get',
    params: {
      roleIds,
    }
  })
}

export const getRoleTree = (tenantId) => {
  return request({
    url: '/api/system/role/tree',
    method: 'get',
    params: {
      tenantId,
    }
  })
}
