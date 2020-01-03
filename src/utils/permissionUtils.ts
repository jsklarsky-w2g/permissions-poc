export interface FeatureFlagType {
  [key: string]: { value: boolean}
}
export type RolesAndPermissionsType = string[]

export const getFeatureFlags = async (): Promise<FeatureFlagType> => {
  return new Promise(resolve => setTimeout(() => {
    return resolve({
      resource: {
        value: true,
      },
    })
  }, 0));
}

export const getRolesAndPermissions = async (): Promise<RolesAndPermissionsType> => {
  return new Promise(resolve => setTimeout(() => {
    return resolve(['read:resource', 'write:resource'])
  }, 0));  
}

