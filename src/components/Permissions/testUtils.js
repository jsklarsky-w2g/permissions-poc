export const PERMISSION_1 = 'permission1'
export const PERMISSION_2 = 'permission2'
export const PERMISSION_3 = 'permission3'

export const userPermissions = [PERMISSION_1, PERMISSION_2]
export const userFeatureFlags = {
  flagOn: {
    value: true
  },
  flagOff: {
    value: false
  }
}

export const makeFlag = (flag, value) => {
  return {
    [flag]: { value }
  }
}