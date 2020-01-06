import React from 'react'
import { render } from '@testing-library/react'
import Can from './Can'
import { PERMISSION_1, PERMISSION_2, PERMISSION_3, makeFlag } from './testUtils'
import { PermissionsContext } from 'App'

function renderCan({permissions, flags, children}) {
  return render(
    <PermissionsContext.Provider value={{ userPermissions: permissions, userFeatureFlags: flags}}>
      {children}
    </PermissionsContext.Provider>
  )
}

describe('<Can /> spec', () => {
  it('Can require two permissions', () => {
    const twoPermissions = (
      <Can 
        I={[PERMISSION_1, PERMISSION_2]}
        operator="and">
        <div data-testid="two-permissions" />
      </Can>
    )
    const { getByTestId } = renderCan({
      permissions: [PERMISSION_1, PERMISSION_2], 
      children: twoPermissions,
      flags: null
    });
    expect(getByTestId('two-permissions')).toBeInTheDocument()
  })

  it('Can block rendering if you are missing a permission', () => {
    const shouldBlock = (
      <Can 
        I={[PERMISSION_1, PERMISSION_2, PERMISSION_3]}
        operator="and">
        <div data-testid="two-permissions" />
      </Can>
    )
    const { queryByTestId } = renderCan({
      permissions: [PERMISSION_1, PERMISSION_2], 
      children: shouldBlock,
      flags: null
    });

    expect(queryByTestId(/two-permissions/i)).toBeNull();
  })

  it('Can render with an or operator', () => {
    const withOr = (
      <Can 
        I={[PERMISSION_1, PERMISSION_2, PERMISSION_3]}
        operator="or">
        <div data-testid="two-permissions" />
      </Can>
    )
    const { queryByTestId } = renderCan({
      permissions: [PERMISSION_1, PERMISSION_2], 
      children: withOr,
      flags: null
    });

    expect(queryByTestId(/two-permissions/i)).toBeInTheDocument();
  })
  
  it('Can require a feature flag', () => {
    const withFeatureFlag = (
      <Can 
        featureFlag="myFlag">
        <div data-testid="two-permissions" />
      </Can>
    )
    const { queryByTestId } = renderCan({
      children: withFeatureFlag,
      flags: makeFlag('myFlag', true),
      permissions: null
    });
    expect(queryByTestId(/two-permissions/i)).toBeInTheDocument();
  })


    it('Can block withou required feature flag', () => {
      const withFeatureFlag = (
        <Can 
          featureFlag="myFlag">
          <div data-testid="two-permissions" />
        </Can>
      )
      const { queryByTestId } = renderCan({
        children: withFeatureFlag,
        flags: makeFlag('myFlag', false),
        permissions: null
      });    

    expect(queryByTestId(/two-permissions/i)).toBeNull();
  })
})
