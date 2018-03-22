import React, { Component } from "react";

import gql from "graphql-tag";
import { graphql, withApollo } from "react-apollo";
import InputField from "./InputField";

const GET_LINK_COUNT_QUERY = gql`
  query getLinkCountQuery {
    links: _allLinksMeta {
      count
    }
  }
`;

const CREATE_SHORT_LINK_MUTATION = gql`
  mutation CreateLinkMutation($url: String!, $description: String!) {
    createLink(url: $url, description: $description) {
      id
    }
  }
`;

class CreateShortLink extends Component {
  constructor(props) {
    super(props);
    this.state = {
      description: "",
      url: ""
    };
  }

  createShortLink = async () => {
    const { url, description } = this.state;
    console.log(process.env.APP_URL);
    await this.props.createShortLinkMutation({
      variables: {
        url,
        description
      }
    });
  };

  handleLinkChange = (key, value) => {
    this.setState(state => ({
      ...state.values,
      [key]: value
    }));
  };

  render() {
    return (
      <div>
        <InputField
          type="text"
          value={this.state.url}
          placeholder="Link URL"
          name="url"
          onChangeText={this.handleLinkChange}
        />
        <InputField
          type="text"
          value={this.state.description}
          placeholder="Link description"
          name="description"
          onChangeText={this.handleLinkChange}
        />
        <button onClick={this.createShortLink}>Create</button>
      </div>
    );
  }
}

export default graphql(CREATE_SHORT_LINK_MUTATION, {
  name: "createShortLinkMutation"
})(withApollo(CreateShortLink));
