// import Modals from "components/Modals";
import { Text } from '@chakra-ui/react';
import Cards from 'components/Cards';
import Video from 'components/Video';
import { ConnectedRouter } from 'connected-react-router';
import { Page } from 'constants/pages';
import React from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { useSelector } from 'react-redux';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import history from 'store/history';
import { currentPageSelector } from 'store/selectors/pages';

const queryClient = new QueryClient();

const App: React.FC = () => {
  const currentPage = useSelector(currentPageSelector);

  return (
    <QueryClientProvider client={queryClient}>
      <ConnectedRouter history={history}>
        <Router>
          <Switch>
            <Route path="/">
              {currentPage === Page.VIDEO ? (
                <Video />
              ) : currentPage === Page.FLASHCARDS ? (
                <Cards />
              ) : (
                <Text>Unknown page: {currentPage}</Text>
              )}
            </Route>
          </Switch>
        </Router>
      </ConnectedRouter>
    </QueryClientProvider>
  );
};

export default App;
