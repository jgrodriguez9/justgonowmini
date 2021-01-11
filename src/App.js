import { Suspense } from 'react';
import Switch from 'react-bootstrap/esm/Switch';
import { I18nextProvider, withTranslation } from 'react-i18next';
import { BrowserRouter, Route } from 'react-router-dom';
import PrivateRoute from './components/PrivateRoute';
import logo from './logo.svg';
import Home from './pages/Home';
import Welcome from './pages/Welcome';
import i18n from './i18n'


function App() {
  return (
    <BrowserRouter>
        <Switch>
          <Suspense fallback="loading">
            <I18nextProvider i18n={i18n}>
              <Route path="/welcome" component={Welcome} />
              <PrivateRoute path="/" component={Home} />
            </I18nextProvider>            
          </Suspense>
        </Switch>
    </BrowserRouter>
  );
}

export default withTranslation()(App);
