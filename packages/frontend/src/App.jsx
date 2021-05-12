import React, { useContext, useEffect, useState } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { AppBar, Grid, Typography } from "@material-ui/core";

import MainBar from "./layout/MainBar";
import LeftBar from "./layout/LeftBar";
import NavBar from "./layout/NavBar";
import RightBar from "./layout/RightBar";
import BottomBar from './layout/BottomBar';



import LoginPage from "./auth/LoginPage";
import RegisterPage from "./auth/RegisterPage";
import LogoutPage from "./auth/LogoutPage";
import FeedPage from "./feed/FeedPage";
import NotFoundPage from "./layout/NotFoundPage";
import StateProvider, { StateContext } from "./StateProvider";
import { checkSession } from "./auth/authApi";

export default function App() {

  return (
    <StateProvider>

      <Router>
        <div className="w-100 py-2">
          
        </div>
        <Switch>
          <Route path="/auth/login">
            <LoginPage />
          </Route>
          <Route path="/auth/register">
            <RegisterPage />
          </Route>
          <Route>
            <Grid container>
              <LeftBar/>
              <MainBar>
                <Switch>
                  <Route path="/" exact>
                    <FeedPage/>
                  </Route>
                  <Route path="/auth/logout">
                    <LogoutPage />
                  </Route>
                  <Route component={NotFoundPage} />
                </Switch>
              </MainBar>

              <BottomBar />
              <NavBar/>
            </Grid>
          </Route>
        </Switch>
      </Router>

    </StateProvider>
  );
}
