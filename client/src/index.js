import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import './css/todo_layout.css'
import './css/todo_style.css'
import '@fortawesome/fontawesome-free/css/all.min.css';
import 'bootstrap-css-only/css/bootstrap.min.css';
import 'mdbreact/dist/css/mdb.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import rootReducer from './store/reducers/rootReducer';

import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';

const store = createStore(rootReducer, applyMiddleware(thunk));
const client = new ApolloClient({ uri: 'http://localhost:3000/graphql' });


ReactDOM.render(<Provider store={store}>
                    <ApolloProvider client={client}>
                        <App />
                    </ApolloProvider>
                </Provider>, document.getElementById('root'));


// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
