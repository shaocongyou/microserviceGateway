import axios, { type AxiosPromise } from 'axios';

export default class LoginService {
  login(loc: { href: string; hostname: string; pathname: string; port?: string } = window.location) {
    const port = loc.port ? `:${loc.port}` : '';
    let contextPath = loc.pathname;
    if (contextPath.endsWith('accessdenied')) {
      contextPath = contextPath.substring(0, contextPath.indexOf('accessdenied'));
    }
    if (contextPath.endsWith('forbidden')) {
      contextPath = contextPath.substring(0, contextPath.indexOf('forbidden'));
    }
    if (!contextPath.endsWith('/')) {
      contextPath = `${contextPath}/`;
    }
    // If you have configured multiple OIDC providers, then, you can update this URL to /login.
    // It will show a Spring Security generated login page with links to configured OIDC providers.
    loc.href = `//${loc.hostname}${port}${contextPath}oauth2/authorization/oidc`;
  }

  logout(): AxiosPromise<any> {
    return axios.post('api/logout');
  }
}
