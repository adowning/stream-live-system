import React, {useEffect, useState } from 'react';
import './styles.css';

import LiveActiveCount from '../../components/common/LiveActiveCount';
import NewLiveModal from '../../components/common/NewLiveModal';
import CustomButton from '../../components/common/CustomButton';
import TableHeader from '../../components/common/TableHeader';
import Listlive from '../../components/common/ListLive';
import Layout from '../../components/common/Layout';
import Sidebar from '../../components/Sidebar';
import Api from '../../service/Api';
import { Overlay } from './styles';

const Dashboard = () => {
  const [sidebar, setSidebar] = useState(false);
  const [modal, setModal] = useState(false);
  const [lives, setLives] = useState([]);
  
  useEffect(() => {
   
    Api.get('/api/lives')
    .then(({ data }) => {
      setLives(data);
    });
        
  }, []);

  const openModal = () => {
    setModal(true);
  }

  const closeModal = () => {
    setModal(false);
  }

  const showSidebar = () => setSidebar(!sidebar);

  return (
    <Layout>
      <Overlay sidebar={ sidebar } onClick={ showSidebar } />
      <div className="row">
        <div className="column xlarge-2 large-3 medium-0 small-0">
          <Sidebar 
            isToolbar={ sidebar }
          />
        </div>
        <div className="column xlarge-10 large-9 medium-12 small-12">
          <span className="hamburger" 
            onClick={ showSidebar }
          />
          <div className="main">
            <div className="main-header">
              <LiveActiveCount 
                count={ lives.length } 
              />
              <CustomButton
                onClick={ openModal }
              />
            </div>
            <TableHeader />

            <Listlive
              lives={ lives }
            />

            <NewLiveModal 
              openModal={ modal }
              closeModal={ closeModal }
            />
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default Dashboard;