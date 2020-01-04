# Permissions POC

## Goals
1. Reusable logic to conditionally render elements based on a combination of roles and feature flags
2. Be able to permission routes, switch between views given permissions (e.g. write vs read only)
3. Define custom messages when a route is not viewable
4. Provide optional default message when a route is not viewable

## Inspiration
I was unable to find any community standard libraries or approaches to solving this problem. The most prominent library is called [CASL](https://github.com/stalniy/casl/tree/master/packages/casl-react), and the API for my components is derived largely from their implementation. 

I opted not to use CASL because it locked you into their DSL for defining abilities which we might find complicated when using Keycloak's conventions for defining permissions. It would also require some hacking to combine these abilities with the existence of feature flags. So since it is a small library to begin with, using that solution might have added more complexity then building our own.

I also drew from an Auth0 blog [post](https://auth0.com/blog/role-based-access-control-rbac-and-react-apps/) that discussed building RBAC into React apps.

## Examples

### The Provider
In order for these components to work, they must be wrapped in a provider, and the `value` prop must contain `userPermissions` and `userFeatureFlags`.

Example:

```javascript
export const PermissionsContext = React.createContext({});

const App = () => {

  const { data: userPermissions } = usePermissions()
  const { data: userFeatureFlags } = useFeatureFlags()

  return (
    <PermissionsContext.Provider value={{userPermissions, userFeatureFlags }} >
      <App />
    </PermissionsContext.Provider>
  );
}

```
*Note: we could skip the provider entirely if permissions and flags are stored in redux.*

### Can
>Single component to conditionally render content based on permissions and feature flags

```javascript

<Can I={['read:invoices']}>
  <Invoice>
</Can>

```
If the user has the `'read:invoices'` permission, the `<Invoice />` component will render.

#### Multiple Permissions

Since the `I` prop is a `string[]`, we can specify an `operator` with either `'and'` or `'or'`.

```javascript
  <Can I={['create:returns', 'read:outbound'] operator="and"}>
    <CreateReturnsPage>
  </Can>
```

#### With a feature flag
`<Can />` also accepts a `featureFlag` prop, that when present will require the user to have the required permissions AND the feature flag turned on.

```javascript
  <Can 
    I={['create:returns', 'read:outbound']
    operator="and"}
    featureFlag="returns"
  >
    <CreateReturnsPage>
  </Can>
```

### Permissioner
>Swith between multiple `<Can />` components

Often, we don't just need to render or not, we need to choose between options given a set of conditions. `<Permissioner />` works similar to react-router's `<Switch />` component.

But instead of extending `<Route />` like we do now, we simply insert `<Permissioner />` as a child.

It accepts any number of `<Permissioner.Can />` children and will render the first child that satisfies the necessary permissions. It would also work with `<Can />` as children, but that is an unnecessary import and will result in the permissions checker running twice on each render. 

```javascript
<Route exact path="/edit-and-read">
  <Permissioner>
    <Permissioner.Can I={["write:resource"]}>
      <div>WRITE</div>
    </Permissioner.Can>
    <Permissioner.Can I={["read:resource"]}>
      <div>READ</div>
    </Permissioner.Can>
    <Permissioner.Can>
      <div>Custom Fallback message</div>
    </Permissioner.Can>
  </Permissioner>
</Route>
```

In this case, `<Permissioner>` will try to render the first child that meets the conditions set in the `I` prop. If no children meet the conditions, it will render the last child since it has no required permissions.

But, it also provides a `showDefaultFallback` prop, to be rendered by default if no children meet the required permissions.

```javascript
<Route exact path="/feature-flags">
  <Permissioner showDefaultFallback>
    <Permissioner.Can 
      I={["read:resource", "write:resource"]}
      operator="and"
      featureFlag="resource"
    >
      <div>Two Permissions and a feature flag</div>
    </Permissioner.Can>
  </Permissioner>
</Route>
```
