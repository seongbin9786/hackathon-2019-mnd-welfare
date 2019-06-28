// 끝이 보인다.
import React from 'react';
import ReactDOM from 'react-dom';

// Redux
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { logger } from 'redux-logger';
import ReduxThunk from 'redux-thunk';
import reducers from './redux';

// Route
import { BrowserRouter, Route, Switch } from 'react-router-dom';

// Animation
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import './styles.css';

// Pages
import AppWrapper from './AppWrapper';
import Header from './Header';
import Page from './Page';
import MainPage from './main/MainPage';
import DetailPage from './detail/DetailPage';
import ListPage from './list/ListPage';
import NewItemPage from './form/NewItemPage';
import EditItemPage from './form/EditItemPage';

// JSON
import { get, save } from './localStorageUtil';

if (get('favorites') === null) {
  save('favorites', []);
}

// logger는 마지막에 놓아야 합니다. 다른 Middleware가 전처리하기 전의 Action이 통과되기 때문입니다.
const store = createStore(reducers, {}, applyMiddleware(ReduxThunk, logger));

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <Header />
      <Route
        render={({ location }) => (
          // We use TransitionGroup as a wrapper for our CSSTransition component
          // to update the 'in' prop correctly when our route changes.
          <TransitionGroup>
            {/* 
          CSSTransition은 -enter, -exit, -enter-active, -exit-active
          클래스명을 enter, exit 시점 타이밍에 적용할 것이므로 이 hook을 활용할 수 있음.
          
          Page enter/exit 은 트랜지션이 시작하자 마자 적용되고,
          active는 enter.exit이 적용된 바로 nextTick에 적용됨.
          (JS를 써서 transition만으로 animation처럼 사용할 수 있게 하는 셈)
          */}
            <CSSTransition
              key={location.pathname}
              classNames="page"
              timeout={{ enter: 800, exit: 400 }}
            >
              {/* 
              Inside these components we add another 
              Route component with the location prop set using 
              the location object we stored earlier 
              to prevent it changing during transition.

              이 부분이 가장 모르겠는데...
              6시 30분 다됐으니 그만해야겠다.

              Finally, you can pass a location to <Route />
              This will prevent them from using the actual location 
              in the router's state. 
              
              This is useful for animation and pending navigation, 
              or any time you want to trick a component into rendering 
              at a different location than the real one.
              */}
              <Route
                location={location}
                render={() => (
                  <Page>
                    <AppWrapper>
                      {/* 
                        We’ve now got routes that stay on the page for 1 second 
                        after the route changes and some useful styling classes 
                        to hook onto to create the page transitions!
                      */}
                      <Switch>
                        <Route exact path="/" component={MainPage} />
                        <Route path="/detail" component={DetailPage} />
                        <Route path="/list" component={ListPage} />
                        <Route path="/new" component={NewItemPage} />
                        <Route path="/edit" component={EditItemPage} />
                      </Switch>
                    </AppWrapper>
                  </Page>
                )}
              />
            </CSSTransition>
          </TransitionGroup>
        )}
      />
    </BrowserRouter>
  </Provider>,
  document.getElementById('root')
);
