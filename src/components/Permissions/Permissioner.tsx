import React, { ReactElement} from 'react'
import GenericNotAllowed from 'components/Permissions/GenericNotAllowed'
import { useContext } from 'react'
import { PermissionsContext } from 'App'
import { permissionsMatcher } from './permissionerUtils'
import { PermissionerProps, PermissionProps } from './PermissionerTypes'

const Permissioner = ({ children, showDefaultFallback = false }: PermissionerProps): ReactElement => {
  // this could be useRedux if permissions and FF are in redux
  const { userPermissions, userFeatureFlags } = useContext(PermissionsContext)

  // works like react-router Switch
  // finds the first child that satisfies the match conditions and renders only that
  const match = React.Children.toArray(children).find(({ props: { I, operator, featureFlag }}): boolean => {
    return permissionsMatcher({I, featureFlag, operator, userFeatureFlags, userPermissions})
  })
  
  // if there is a "blank" child with no permissions listed last, it will automatically render 
  // if not, and the showDefaultFallback prop is used, then it will render a generic default message 
  if (!match && showDefaultFallback) {
    return <GenericNotAllowed />
  }

  // if there's no match, no custom fallback provided, and no default fallback selected,
  // explicitly return null so React doesn't yell at you
  return match ? match: null
}

// There is no need to import the standalone Can component, which would end up repeating the 
// permissions check. Instead, we provide an aliased Can component namespaced on the Permissioner.
// It is just a vanilla React component with the same props as <Can />, since the funcionality is
// outsourced to the Permissioner parent component.
Permissioner.Can = ({ children }: PermissionProps) => children

export default Permissioner
