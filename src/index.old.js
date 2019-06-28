import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import './styles.css';
import AppWrapper from './AppWrapper';
import Header from './Header';
import Page from './Page';
import MainPage from './main/MainPage';
import DetailPage from './detail/DetailPage';
import ListPage from './list/ListPage';
import NewItemPage from './form/NewItemPage';
import EdititemPage from './form/EdititemPage';

ReactDOM.render(
  <BrowserRouter>
    <Header />
    <Route
      render={({ location }) => (
        <TransitionGroup>
          <CSSTransition
            key={location.pathname}
            classNames="page"
            timeout={{ enter: 15000, exit: 15000 }}
          >
            <Route
              location={location}
              render={() => (
                <Page>
                  <AppWrapper>
                    <Switch>
                      <Route exact path="/" component={MainPage} />
                      <Route path="/detail" component={DetailPage} />
                      <Route path="/list" component={ListPage} />
                      <Route path="/new" component={NewItemPage} />
                      <Route path="/edit" component={EdititemPage} />
                    </Switch>
                  </AppWrapper>
                </Page>
              )}
            />
          </CSSTransition>
        </TransitionGroup>
      )}
    />
  </BrowserRouter>,
  document.getElementById('root')
);
