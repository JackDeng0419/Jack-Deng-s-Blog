import React from 'react';
import { Route, Redirect, Switch } from 'react-router-dom';
import CategoryHome from './home';
import CategoryAddUpdate from './add-update';
import CategoryPreview from './preview';

export default function Category() {
    return (
        <Switch>
            <Route path="/category" component={CategoryHome} exact></Route>
            <Route
                path="/category/addupdate"
                component={CategoryAddUpdate}
                exact></Route>
            <Route
                path="/category/preview"
                component={CategoryPreview}
                exact></Route>
            <Redirect to="/category"></Redirect>
        </Switch>
    );
}
