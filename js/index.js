window.onload = function () {
  const { useEffect } = window.React;
  const { HashRouter, Redirect, Route, Switch, useHistory } = window.ReactRouterDOM;
  const { CSSTransition, TransitionGroup }  = window.ReactTransitionGroup;
  const { Widgets, Podcast, Episode } = window.CORDOVA_SDK_DEMO;

  localStorage.clear(); // this is temporary, only for demo

  const debug = (function () {
    const playerSelector = 'staytuned-mobile-sdk-player';
    const player = document.querySelector(playerSelector);
    if (!player) {
      throw new Error('<' + playerSelector + ' /> component not found in page <body>');
    }
    const debug = !!~ ['', 'true'].indexOf(player.getAttribute('debug'));
    return debug;
  }());

  const routes = [
    { path: '/sdk', component: Widgets },
    { path: '/sdk/:locationKey/:contentKey', component: Podcast },
    { path: '/sdk/:locationKey/:contentKey/:elementKey', component: Episode }
  ];

  const App = function () {
    const { push: navigate, location, listen } = useHistory();
    listen(() => { window.scrollTo(0, 0); });

    // Content selection
    useEffect(() => {
      const cb = ({ detail }) => {
        const { locationKey, contentKey } = detail;
        navigate(`/sdk/${locationKey}/${contentKey}`);
      };
      document.addEventListener('selectContent', cb);
      return () => document.removeEventListener('selectContent', cb);
    });

    // Element selection
    useEffect(() => {
      const cb = ({ detail }) => {
        const { locationKey, contentKey, elementKey } = detail;
        navigate(`/sdk/${locationKey}/${contentKey}/${elementKey}`);
      };
      document.addEventListener('selectElement', cb);
      return () => document.removeEventListener('selectElement', cb);
    });

    return (
      <TransitionGroup style={{ position: 'relative' }}>
        <CSSTransition
          key={location.pathname}
          classNames="fade"
          timeout={400}
        >
          <Switch location={location}>
            {
              routes.map((r, i) => {
                return <Route key={i}
                              exact={true}
                              path={r.path}
                              render={() => React.createElement(r.component, { debug })}
                        />
              })
            }
            <Redirect from="*" to="/sdk" />
          </Switch>
        </CSSTransition>
      </TransitionGroup>
    );
  }

  ReactDOM.render(
    <HashRouter>
      <App />
    </HashRouter>,
    document.getElementById('sdk-react-demo'),
  );
};



