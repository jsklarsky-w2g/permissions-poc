import { ReactElement, useContext } from 'react'
import { PermissionsContext } from 'App'
import { permissionsMatcher } from './permissionerUtils'
import { PermissionProps } from './PermissionerTypes'

const Can = ({I, featureFlag, children, operator }: PermissionProps): ReactElement => {
  // this could be useRedux if permissions and FF are in redux
  const { userPermissions, userFeatureFlags } = useContext(PermissionsContext)

  const shouldRenderChildren = permissionsMatcher({
    I, 
    featureFlag,
    operator,
    userFeatureFlags,
    userPermissions
  })

  return shouldRenderChildren ? children : null
}

export default Can
