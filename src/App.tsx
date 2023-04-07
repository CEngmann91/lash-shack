// Landing page with carousel
// Details of the course, when clicked shows 3 images.
// Add upcoming days/dates that are available for the selected course for the next 3 months.



import './index.scss';
import Layout from './components/Layout/Layout';
import Maintenance from './components/Maintenance/Maintenance';
import useFirestoreData from './hooks/useFirestoreData';

function App() {
  const { data, loadingData, error } = useFirestoreData("maintenance");
  const first = data?.at(0);

  if (!first || loadingData)
    return null;

  const active = first?.active;
  if (active)
    return <Maintenance />

  return <Layout />
}

export default App;
