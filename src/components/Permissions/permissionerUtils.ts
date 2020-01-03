import { MatcherProps } from './PermissionerTypes'
export const permissionsMatcher = ({ 
  userPermissions,
  userFeatureFlags,
  featureFlag,
  operator,
  I,
}: MatcherProps): boolean => {
  let hasPermission = true 
  let hasFeatureFlag = true

  if (I) {
    const checker = (permission: string) => userPermissions.includes(permission)
    switch(operator) {
      case 'and':
        hasPermission = I.every(checker)
        break;
      default:
      case 'or':
        hasPermission = I.some(checker)
        break;
    }
  }

  if (featureFlag) {
    hasFeatureFlag = userFeatureFlags[featureFlag] && userFeatureFlags[featureFlag].value
  }

  return hasFeatureFlag && hasPermission
}