import React from 'react';
import logo from './logo.svg';
import './App.css';
import AppRouter from './router'
import { usePermissions, useFeatureFlags } from 'utils/hooks'
import {
  FeatureFlagType,
  RolesAndPermissionsType
} from 'utils/permissionUtils'

const defaultFeature: FeatureFlagType = {}
const defaultPermissions: RolesAndPermissionsType = []

const defaults: { 
  userPermissions: RolesAndPermissionsType, 
  userFeatureFlags: FeatureFlagType 
} = {
  userPermissions: defaultPermissions,
  userFeatureFlags: defaultFeature
}

export const PermissionsContext = React.createContext(defaults);

const App: React.FC = () => {

  const { data: userPermissions } = usePermissions()
  const { data: userFeatureFlags } = useFeatureFlags()

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
          <PermissionsContext.Provider value={{userPermissions, userFeatureFlags }} >
            <AppRouter />
          </PermissionsContext.Provider>
      </header>
    </div>

  );
}

export default React.memo(App);

