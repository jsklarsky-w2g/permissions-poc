import { useState, useEffect } from 'react'
import { FeatureFlagType,
  RolesAndPermissionsType,
  getRolesAndPermissions,getFeatureFlags } from './permissionUtils'


function useFetch<DataType>(
  initialValue: DataType,
  fetcher: Function,
): {
  data: DataType;
  isLoading: boolean;
} {
  const [data, setData] = useState(initialValue);
  const [isLoading, setIsLoading] = useState(false);

  useEffect((): void => {
    const fetchData = async () => {
      setIsLoading(true);
      const payload: DataType = await fetcher();
      setData(payload);
      setIsLoading(false);
    };
    fetchData();
  }, [fetcher]);

  return { isLoading, data };
}

export const usePermissions = () => {
  const initialValue: RolesAndPermissionsType  = []
  return useFetch<RolesAndPermissionsType>(
    initialValue,
    getRolesAndPermissions
  ) 
}

export const useFeatureFlags = () => {
  const initialValue = {}
  return useFetch<FeatureFlagType>(
    initialValue,
    getFeatureFlags
  ) 
}
