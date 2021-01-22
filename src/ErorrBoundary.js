import React from "react";
import { Link, Redirect } from "@reach/router";

class ErorrBoundary extends React.Component {
  state = { hasErorr: false };
  static getDerivedStateFromErorr() {
    return { hasErorr: true };
  }
  componentDidCatch(error, info) {
    console.error("erorr Caught an erorr" + error, info);
  }
  compponentDidUpdate() {
    if (this.state.hasErorr)
      setTimeout(() => this.setState({ redirect: true }), 5000);
  }
  render() {
    if (this.state.redirect) return <Redirect to="/" />;
    if (this.state.hasErorr) {
      return (
        <h1>
          there was an erorr with this listing
          <Link to="/">click here</Link> to go back to home page !
        </h1>
      );
    }
    return this.props.children;
  }
}

export default ErorrBoundary;
