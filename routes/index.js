import React from "react";
import { Route } from "react-router-dom";
import RoutesConfig from "./routes.config";

class LoadPage extends React.Component {
  state = {
    Content: null,
  };

  componentDidMount() {
    const { loader } = this.props;

    loader().then((Content) => {
      this.setState({ Content });
    });
  }

  render() {
    const { Content } = this.state;

    if (!Content) {
      return <div>Loading...</div>;
    } else {
      return <Content.default />;
    }
  }
}

const Page = (loader) => () => <LoadPage loader={loader} />;

export default (
  <React.Fragment>
    {RoutesConfig.map((config) => (
      <Route
        key={config.path}
        path={config.path}
        exact={config.exact}
        component={Page(config.import)}
      />
    ))}
  </React.Fragment>
);
