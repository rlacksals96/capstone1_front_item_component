import React from 'react';
import Container from "./Container";
import { Switch, Route,BrowserRouter } from "react-router-dom";

function App(){


    return(
        <div>
            <BrowserRouter>
                <Switch>
                    <Route path="/items" exact={true} component={Container}/>
                </Switch>
            </BrowserRouter>
        </div>
    )
}
export default App;