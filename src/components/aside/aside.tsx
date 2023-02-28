import './aside.css';
import homeIcon from '../../assets/home-icon.svg';
import activeHomeIcon from '../../assets/active-home-icon.svg';
import globalIcon from '../../assets/global-icon.svg';
import activeGlobalIcon from '../../assets/active-global-icon.svg';

const Aside = () => {
  return (
    <aside>
      <ul>
        <li>
          <img src={activeHomeIcon} alt="home" />
        </li>
        <li>
          <img src={globalIcon} alt="global" />
        </li>
      </ul>
    </aside>
  );
};

export { Aside };
