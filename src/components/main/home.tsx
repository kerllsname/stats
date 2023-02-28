import { Header } from '../header/header';
import './home.css';

const Home = () => {
  return (
    <div className="home">
      <Header />
      <main>
        <div className="main__first-row">
          <div className="main__main-info"></div>
        </div>
      </main>
    </div>
  );
};

export { Home };
