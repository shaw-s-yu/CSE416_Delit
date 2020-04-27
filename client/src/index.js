import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import './css/todo_layout.css'
import './css/todo_style.css'
import '@fortawesome/fontawesome-free/css/all.min.css';
import 'bootstrap-css-only/css/bootstrap.min.css';
import 'mdbreact/dist/css/mdb.css';
import App from './App';

import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import rootReducer from './store/reducers/rootReducer';

import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';
import { API_URL } from './config'

const store = createStore(rootReducer, applyMiddleware(thunk));
const client = new ApolloClient({ uri: `${API_URL}/graphql` });


ReactDOM.render(
    <Provider store={store}>
        <ApolloProvider client={client}>
            <App />
        </ApolloProvider>
    </Provider>,
    document.getElementById('root')
);

