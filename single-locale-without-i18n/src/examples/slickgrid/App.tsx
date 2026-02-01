import { useEffect } from 'react';
import { Routes as BaseRoutes, Link, Navigate, Route, useLocation } from 'react-router';

import { NavBar } from '../../NavBar.js';
import Example1 from './Example1.js';
import Example2 from './Example2.js';
import Example3 from './Example3.js';

const routes: Array<{ path: string; route: string; component: any; title: string }> = [
  { path: 'example1', route: '/example1', component: <Example1 />, title: '1- Basic Grid / 2 Grids' },
  { path: 'example2', route: '/example2', component: <Example2 />, title: '2- Single Custom Locale' },
  { path: 'example3', route: '/example3', component: <Example3 />, title: '3- Master/Detail Grids' },
];

export default function Routes() {
  const pathname = useLocation().pathname;

  // scroll to active link route
  useEffect(() => {
    const linkElm = document.querySelector('.nav-link.active');
    if (linkElm) {
      linkElm.scrollIntoView({ block: 'nearest' });
    }
  }, [pathname]);

  return (
    <div>
      <NavBar></NavBar>
      <div>
        <div className="panel-wm">
          <section id="panel-left" className="panel-wm-left au-animate">
            <ul className="well nav nav-pills nav-stacked">
              <li className="nav-item fw-bold nav-docs">
                <a className="nav-link" href="https://ghiscoding.gitbook.io/slickgrid-react/" target="_blank">
                  📘 Documentation
                </a>
              </li>
              {routes.map((row) => (
                <li className="nav-item" key={row.route}>
                  <Link className={`nav-link ${pathname === row.route ? 'active' : ''}`} to={row.route}>
                    {row.title}
                  </Link>
                </li>
              ))}
            </ul>
          </section>
          <section className="panel-wm-content">
            <div id="demo-container">
              <BaseRoutes>
                {routes.map((row) => (
                  <Route path={row.route} key={row.route}>
                    <Route index element={row.component} />
                  </Route>
                ))}
                <Route path="*" element={<Navigate to="/example1" replace />} />
              </BaseRoutes>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
