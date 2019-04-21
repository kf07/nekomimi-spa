import React, {useState} from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import './App.css';
import RootPage from './pages/Root';
import WatchPage from './pages/Watch';
import NoMatchPage from './pages/NoMatch';
import 'lazysizes';

interface SearchResult {
  query: string;
  items: gapi.client.youtube.SearchResult[];
}

export const AppContext: React.Context<{
  searchResult: SearchResult;
  setSearchResult: React.Dispatch<React.SetStateAction<SearchResult>>;
}> = React.createContext<any>(null);

const App = () => {
  const [searchResult, setSearchResult] = useState<SearchResult>({
    query: '',
    items: []
  });
  return (
    <BrowserRouter>
      <AppContext.Provider value={{ searchResult, setSearchResult }}>
        <Switch>
          <Route exact path="/" component={RootPage}/>
          <Route path="/watch/:id" component={WatchPage}/>
          <Route component={NoMatchPage}/>
        </Switch>
      </AppContext.Provider>
    </BrowserRouter>
  )
}

export default App;
