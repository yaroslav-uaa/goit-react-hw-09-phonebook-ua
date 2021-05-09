import { useMediaQuery } from 'react-responsive';

import n from './Navigation.module.css';
import NavigationForMobile from './NavigationForMobile/NavigationForMobile';
import NavigationForDesktop from './NavigationForDesktop/NavigationForDesktop';

export default function Navigation() {
  const isTabletOrMobile = useMediaQuery({ maxWidth: 449 });

  return (
    <nav className={n.navigation}>
      {isTabletOrMobile ? <NavigationForMobile /> : <NavigationForDesktop />}
    </nav>
  );
}
