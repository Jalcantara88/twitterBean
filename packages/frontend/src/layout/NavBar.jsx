import { Grid, AppBar, Typography} from "@material-ui/core";
import React, { useContext } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Button, Box } from "@material-ui/core";
import { Link } from "react-router-dom";
import { StateContext } from "../StateProvider";

const useStyles = makeStyles({
  navItemLink: {
    textDecoration: "none",
  },

});

const NavRow = ({ children }) => (
  <Grid item xs={12}>
    <Box height="40px" lineHeight="40px" paddingBottom="40px">
      {children}
    </Box>
  </Grid>
);

const NavButton = ({ children }) => (
  <Button variant="contained">{children}</Button>
);

const NavItem = ({ children, to }) => {
  const classes = useStyles();
  return (
    <NavRow>
      <Link to={to} className={classes.navItemLink}>
        <NavButton>{children}</NavButton>
      </Link>
    </NavRow>
  );
};

export default function NavBar() {
  const { state, dispatch } = useContext(StateContext);

  return (
    <>
      <AppBar position="static" style={{ backgroundColor: "#734b6d ", bottom: "0", position: "absolute"}}>
        <div className="container">
          <div className="row">
            <div className="col-4">
              <Typography className="pl-1" variant="h4" style={{ padding: 2}}>
                BeansTalk
              </Typography>
            </div>
            <div className="col-4">
              <NavItem to="/">Home</NavItem>
              
            </div>
            <div className="col-4">
              {state.user ? (
                <NavItem to="/auth/logout">Logout</NavItem>
              ) : (
                <NavItem to="/auth/login">Login</NavItem>
              )}
            </div>
          </div>
        </div>

        
      </AppBar>

      
    </>
  );
}

/*
  <Grid item xs={12}>
    <Grid container>
      <Grid item xs={6} />
      <Grid item xs={6}>
        <Grid container>
          <NavItem to="/">Home</NavItem>
          {state.user ? (
            <NavItem to="/auth/logout">Logout</NavItem>
          ) : (
            <NavItem to="/auth/login">Login</NavItem>
          )}
        </Grid>
      </Grid>
    </Grid>
  </Grid>
*/
