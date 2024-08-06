import { Link } from "react-router-dom";

import { NAVIGATION } from "../../constants/constants";

import Logo from "../logo/Logo";

export default function Footer() {
  return (
    <footer className="page-footer page-footer-default">
      <div className="shell">
        <div className="range range-xs-center">
          <div className="cell-lg-10">
            <Logo />
            <div className="text-highlighted-wrap">
              <p className="text-highlighted">
                Barbershop is a No.1 place to have a men’s haircut in San
                Francisco. Here you can get luxury barber experience at a
                reasonable price.
              </p>
            </div>
            <ul className="footer-navigation footer-navigation-horizontal">
              {NAVIGATION.map((page) => (
                <li key={page.url}>
                  <Link to={page.url}>{page.title}</Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
}
