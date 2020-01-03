import { 
  RolesAndPermissionsType,
  FeatureFlagType
} from 'utils/permissionUtils'
export interface PermissionerProps {
  showDefaultFallback?: boolean
  children?: any
}

type Operator = 'and' | 'or'

export interface PermissionProps {
  I?: string[]
  featureFlag?: string
  children: any
  operator?: Operator
}

export interface MatcherProps {
  userPermissions: RolesAndPermissionsType
  userFeatureFlags: FeatureFlagType
  I?: string[]
  featureFlag?: string
  operator?: Operator
}