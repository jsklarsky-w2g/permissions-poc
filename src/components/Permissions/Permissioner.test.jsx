import React from 'react'
import { render } from '@testing-library/react'
import Permissioner from './Permissioner'
import { PERMISSION_1, PERMISSION_2, PERMISSION_3, makeFlag } from './testUtils'
import { PermissionsContext } from 'App'

function renderPermissioner(permissions, flags) {
  return render(
    <PermissionsContext.Provider value={{ userPermissions: permissions, userFeatureFlags: flags}}>
      <Permissioner>
        <Permissioner.Can I={[PERMISSION_1, PERMISSION_2]} operator="and">
          <div>TWO PERMISSIONS</div>
        </Permissioner.Can>
        <Permissioner.Can I={[PERMISSION_1, PERMISSION_2]} operator="or">
          <div>ONE PERMISSION</div>
        </Permissioner.Can>
        <Permissioner.Can I={[PERMISSION_3]} operator="or" featureFlag="myFlag">
          <div>ONE PERMISSION AND FEATURE FLAG</div>
        </Permissioner.Can>        
        <Permissioner.Can>
          <div>NO PERMISSIONS</div>
        </Permissioner.Can>        
      </Permissioner>
    </PermissionsContext.Provider>
  )
}

describe('<Permissioner /> spec', () => {
  it('Can render a component with 2 permissions and AND operator', () => {
    const { getByText } = renderPermissioner([PERMISSION_1, PERMISSION_2]);
    expect(getByText('TWO PERMISSIONS', {exact: true})).toBeInTheDocument()
  })

  it('Can render a component with 2 permissions and OR operator', () => {
    const { getByText } = renderPermissioner([PERMISSION_2]);
    expect(getByText('ONE PERMISSION', {exact: true})).toBeInTheDocument()
  })

  it('Can render a component with permissions and a feature flag', () => {
    const { getByText } = renderPermissioner([PERMISSION_3], makeFlag('myFlag', true));
    expect(getByText('ONE PERMISSION AND FEATURE FLAG', {exact: true})).toBeInTheDocument()
  })

  it('Can render block a component with without feature flag', () => {
    const { getByText } = renderPermissioner([PERMISSION_3], makeFlag('myFlag', false));
    expect(getByText('NO PERMISSIONS', {exact: true})).toBeInTheDocument()
  })  
})


