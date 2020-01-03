import React, { ReactElement } from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";

import Home from 'components/Home'
import Permissioner from 'components/Permissions/Permissioner'

const AppRouter = (): ReactElement  => {
  return (
    <Router>
      <Switch>

        <Route exact path="/">
          <Home/>
        </Route>

        <Route exact path="/edit-and-read">
          <Permissioner>
            <Permissioner.Can I={["write:esource"]}>
              <div>WRITE</div>
            </Permissioner.Can>
            <Permissioner.Can I={["red:resource"]}>
              <div>READ</div>
            </Permissioner.Can>
            <Permissioner.Can>
              <div>Custom Fallback message</div>
            </Permissioner.Can>
          </Permissioner>
        </Route>

        <Route exact path="/and">
          <Permissioner>
            <Permissioner.Can I={["read:resdource", "write:resource"]} operator="and">
              <div>Two Permissions (and)</div>
            </Permissioner.Can>
            <Permissioner.Can>
              <div>Custom Fallback message</div>
            </Permissioner.Can>
          </Permissioner>        
        </Route>          

        <Route exact path="/or">
          <Permissioner>
            <Permissioner.Can I={["read:resource", "write:resource"]} operator="or">
              <div>Two Permissions (or)</div>
            </Permissioner.Can>
          </Permissioner>
        </Route>

        <Route exact path="/feature-flags">
          <Permissioner showDefaultFallback>
            <Permissioner.Can I={["read:resource", "write:resource"]} operator="and" featureFlag="resource">
              <div>Two Permissions and a feature flag</div>
            </Permissioner.Can>
          </Permissioner>
        </Route>

      </Switch>
    </Router>
  )
}

export default AppRouter