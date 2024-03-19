const Router = {
  routes: [],
  init(routes) {
    Router.routes = routes;

    $$('.navlink').forEach(link => {
      link.addEventListener('click', e => {
        e.preventDefault();
        const route = e.target.getAttribute('href');
        Router.navigate(route);
      });
    });

    window.addEventListener('popstate', e => {
      Router.navigate(e.state.route, false);
    })

    // check the initial url
    Router.navigate(window.location.pathname ?? '/');
  },
  navigate: (route, addToHistory = true) => {
    console.log('going to ' + route);
    if (addToHistory)
      window.history.pushState({ route }, '', route)

    let pageElement = null;

    const routeExists = Router.routes.find(r => isMatch(r.pathname, route));
    if (routeExists) {
      pageElement = routeExists.getComponent(route);
    }


    if (pageElement) {
      const main = $('main');
      main.innerHTML = '';
      main.appendChild(pageElement);
      window.scrollTo(0, 0);
    }
  }
}

function isMatch(route, pathname) {
  if (route == '/' && (pathname == '' || pathname == '/')) {
    return true;
  }
  const routeParts = route.split('/');
  const pathnameParts = pathname.split('/');
  if (routeParts.length !== pathnameParts.length) {
    return false;
  }
  return routeParts.every((part, i) => {
    if (part[0] === ':') {
      return true;
    }
    return part === pathnameParts[i];
  });
}

export default Router;