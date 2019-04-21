import debounce from 'lodash.debounce';
import React, {useState, useCallback, useContext} from 'react';
import styles from './Root.module.css';
import SearchBar from "../organisms/SearchBar";
import SearchList from "../organisms/SearchList";
import ApiClient from '../utils/ApiClient';
import {AppContext} from '../App';

const RootTemplate = () => {
  const {searchResult, setSearchResult} = useContext(AppContext);
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [query, setQuery] = useState('');
  const [list, setList] = useState<gapi.client.youtube.SearchResult[]>([]);
  const searchList = useCallback(
    debounce(async (q: string) => {
      try {
        setIsError(false);
        if (q.trim() === '') {
          setSearchResult({query: '', items: []});
          return;
        }
        setIsLoading(true)
        const {items} = await ApiClient.search(q);
        setSearchResult({query: q, items: items!});
      } catch (e) {
        setIsError(true)
      } finally {
        setIsLoading(false);
      }
    }, 500),
    []
  );
  return (
    <>
      <SearchBar defaultValue={searchResult.query} onChange={searchList}/>
      <div className={styles.content}>
        <SearchList
          isLoading={isLoading}
          isError={isError}
          query={searchResult.query}
          list={searchResult.items}
        />
      </div>
    </>
  )
};

export default RootTemplate;
