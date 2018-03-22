import React from "react";
import { bindActionCreators } from "redux";
import { initStore, setName } from "_redux/store";
import withRedux from "next-redux-wrapper";

import App from "components/App";
import LinkList from "components/LinkList";
import CreateShortLink from "components/CreateShortLink";
import withApollo from "lib/withApollo";

class Index extends React.Component {
  static async getInitialProps({ store, isServer }) {
    // Dispatch action on server side
    store.dispatch(setName("DM-Next-Web Fronend"));
    return { isServer };
  }

  render() {
    const { name } = this.props;
    return (
      <App>
        <h2>{name}</h2>
        <CreateShortLink />
        <LinkList />
      </App>
    );
  }
}

const mapStateToProps = state => {
    return {
        name: state.name
    };
};

const mapDispatchToProps = dispatch => {
  return {
    setName: bindActionCreators(setName, dispatch)
  };
};

export default withRedux(initStore, mapStateToProps, mapDispatchToProps)(
  withApollo(Index)
);