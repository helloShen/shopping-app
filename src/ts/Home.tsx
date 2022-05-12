import React from 'react';
import {Card, CardActionArea} from '@mui/material';
import {Link} from 'react-router-dom';
import Footer from '../js/footer/footer';

const Home: React.FC = ({}) => {
  return (
    <div className="home">
      <div className="home__label">
        <div className="home__label-first">SHOPPINGAPP</div>
        <div className="home__label-second">Powered by</div>
        <div className="home__label-third">
          <div>Typescript</div>
          <div>React</div>
          <div>Material UI</div>
        </div>
      </div>
      <Link to="/shopping-app/shopping">
        <Card className="home__logo-card">
          <CardActionArea>
            <div className="home__logo">
              <span className="home__logo-text">GO</span>
            </div>
          </CardActionArea>
        </Card>
      </Link>
    </div>
  );
};

export default Home;
