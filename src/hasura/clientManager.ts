import { ApolloClient, DefaultOptions, InMemoryCache } from '@apollo/client';

const defaultOptions: DefaultOptions = {
    watchQuery: {
        fetchPolicy: 'no-cache',
        errorPolicy: 'ignore',
    },
    query: {
        fetchPolicy: 'no-cache',
        errorPolicy: 'all',
    },
};

export const client = new ApolloClient({
    uri: process.env.EKS + process.env.HASURA_API,
    cache: new InMemoryCache({ addTypename: false }),
    defaultOptions,
    headers: { 'x-hasura-admin-secret': process.env.HASURA_ADMIN_SECRET },
});
