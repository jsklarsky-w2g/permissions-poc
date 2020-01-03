import React from 'react'
import GenericNotAllowed from 'components/Permissions/GenericNotAllowed'
import { useContext } from 'react'
import { PermissionsContext } from 'App'
import { permissionsMatcher } from './permissionerUtils'
import { PermissionerProps } from './PermissionerTypes'
import Can from './Can'

const Permissioner = ({ children, showDefaultFallback = false }: PermissionerProps): any => {
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

  return match
}

// the single Can component is aliased here on the Permissioner component for easier importing
Permissioner.Can = Can
export default Permissioner
