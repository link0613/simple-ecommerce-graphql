import { ApolloClient } from "apollo-client";
import { HttpLink } from "apollo-link-http";
import { split } from "apollo-link";
import { WebSocketLink } from "apollo-link-ws";
import { getMainDefinition } from "apollo-utilities";
import { InMemoryCache } from "apollo-cache-inmemory";
import fetch from "isomorphic-unfetch";

const httpLink = new HttpLink({
  uri: "https://api.graph.cool/simple/v1/cjeslqfsi0ev60100vkqv4ql3",
  credentials: "same-origin" // Additional fetch() options like `credentials` or `headers`
});
  
const link = process.browser
  ? split(
    ({ query }) => {
      const { kind, operation } = getMainDefinition(query);
        return kind === "OperationDefinition" && operation === "subscription";
    },
    new WebSocketLink({
      uri: `wss://subscriptions.graph.cool/v1/cjeslqfsi0ev60100vkqv4ql3`,
      options: {
        reconnect: true
      }
    }),
    httpLink
  )
  : httpLink;

let apolloClient = null;

// Polyfill fetch() on the server (used by apollo-client)
if (!process.browser) {
  global.fetch = fetch;
}

function create(initialState) {
  return new ApolloClient({
    connectToDevTools: process.browser,
    ssrMode: !process.browser, // Disables forceFetch on the server (so queries are only run once)
    link,
    cache: new InMemoryCache().restore(initialState || {})
  });
}

export default function initApollo(initialState) {
  // Make sure to create a new client for every server-side request so that data
  // isn't shared between connections (which would be bad)
  if (!process.browser) {
    return create(initialState);
  }

  // Reuse client on the client-side
  if (!apolloClient) {
    apolloClient = create(initialState);
  }

  return apolloClient;
}
