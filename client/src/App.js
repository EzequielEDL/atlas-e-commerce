import React from "react";
import { connect } from "react-redux";
import { getUser } from "./stores/user/actions/user_actions";
import { getUserAuthenticated } from './controllers/users';
import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";
import { Navbar, Footer, LogoAnimSvg } from "./components";
import routes from "./pages";
import {loadCartGuest} from "./stores/cart/actions/cart_actions";

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      isReady : false
    }
  }

  async componentDidMount(){
    await getUserAuthenticated(this.props.getUser);
    this.setState( { isReady : true } )
    const lengthCartStore = window.localStorage.getItem('products_cart') ? window.localStorage.getItem('products_cart').length : 0;
    if (!this.props.user.hasOwnProperty('role') && lengthCartStore > 0) {
      this.props.loadCartGuest();
    }
  }

  render(){
    return (
      <>
      {
        this.state.isReady ? (
          <BrowserRouter>
            <Navbar />
            <Switch>
              {
                routes.map((e, i) => (
                  <Route key={i} exact path={e.path} render={ e.hasOwnProperty("auth") ?(
                    (e.auth === "paleto" && !this.props.user.hasOwnProperty('role')) ||
                    (this.props.user && (e.auth === 'all' || this.props.user.role === e.auth)
                    ) ? e.render
                      : () => (<Redirect to="/" />))
                    :(
                      e.render
                    )
                  }
                  />
                ))
              }


            </Switch>
            <Footer />
          </BrowserRouter>
        ):(
          <LogoAnimSvg width="50%" height="50%" />
        )
      }
      </>
  );
  }
}

const mapActionsToProps = dispatch => {
  return {
    getUser: (user) => dispatch(getUser(user)),
    loadCartGuest: () => dispatch(loadCartGuest())
  };
};

const mapStateToProps = state => {
  return {
    user: state.user_store.user,
  };
};

export default connect(mapStateToProps, mapActionsToProps)(App);
