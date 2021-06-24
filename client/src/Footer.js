import React from 'react';
import RoomIcon from '@material-ui/icons/Room';


import './Footer.css';
import FacebookIcon from '@material-ui/icons/Facebook';
import LinkedInIcon from '@material-ui/icons/LinkedIn';
import InstagramIcon from '@material-ui/icons/Instagram';
import TwitterIcon from '@material-ui/icons/Twitter';

function Footer () {

  return (
    <section className="footer">
      <hr className="footer-seperator" />
      {/* <section className="footer-social-media">
        <a href="/" target="_blank" rel="noopener noreferrer">LinkedIn</a>
      </section> */}
      <section className="footer-info">
        <section className="footer-info-left">
          <section className="footer-info__name">
            
              
          </section>
          {/* <section className="footer-info__returns">
            <h4>Become Host</h4>
          </section>         */}
        </section>
        <section className="footer-info-center">
          <section className="footer-info__email">
            globatross.info@gmail.com
          </section>
          <section className="footer-info__terms">
            Terms and Conditions
            <br />
            © 2021 GLOBATROSS!All rights are reserved.
          </section>
        </section>
        <section className="footer-info-right">
          
          <section className="footer-info__contact">
            {/* <h4>Motivation</h4> */}
            <br />
            Contact Us:
            <br />
            <FacebookIcon />
            <LinkedInIcon />
            <InstagramIcon />
            <TwitterIcon />

          </section>
        </section>
      </section>
      <hr className="footer-seperator" />
    </section>
  )

}

export default Footer;