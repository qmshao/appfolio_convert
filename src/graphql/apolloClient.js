import ApolloClient from 'apollo-boost';

const client = new ApolloClient({
  uri: 'http://ice.broke-it.net:2690/api/graphql',
});

client.defaultOptions = {
  watchQuery: {
    fetchPolicy: 'no-cache',
    //errorPolicy: 'ignore',
  },
  query: {
    fetchPolicy: 'no-cache',
    errorPolicy: 'all',
  },
  mutate: {
    errorPolicy: 'all',
  },
};

export default client;
