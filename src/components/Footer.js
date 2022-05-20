import React from 'react';
import '../styles/footer.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faInstagram,
  faLinkedinIn,
  faGithub,
} from '@fortawesome/free-brands-svg-icons';

const Footer = () => {
  return (
    <div className="footer">
      <h3>Jhonatan Ordonez</h3>

      <div className="social-follow">
        <ul>
          <li>
            <a href="https://github.com/jonathanedd">
              <FontAwesomeIcon icon={faGithub} />
            </a>
          </li>
          <li>
            <a href="https://www.linkedin.com/in/jonaedd/">
              <FontAwesomeIcon icon={faLinkedinIn} />
            </a>
          </li>
          <li>
            <a href="https://www.instagram.com/jonaedd/">
              <FontAwesomeIcon icon={faInstagram} />
            </a>
          </li>
        </ul>
      </div>

      <h4>Academlo 2022</h4>
    </div>
  );
};

export default Footer;
