import debounce from 'lodash.debounce';
import React, {useState, useCallback} from 'react';
import styles from './Root.module.css';
import SearchBar from "../organisms/SearchBar";
import SearchList from "../organisms/SearchList";
import ApiClient from '../utils/ApiClient';

const RootTemplate = () => {
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [query, setQuery] = useState('');
  const [list, setList] = useState<gapi.client.youtube.SearchResult[]>([]);
  const searchList = useCallback(
    debounce(async (q: string) => {
      try {
        setIsError(false);
        setIsLoading(true);
        if (q.trim() !== '') {
          const {items} = await ApiClient.search(q);
          setQuery(q);
          setList(items!)
        } else {
          setList([]);
        }
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
      <SearchBar onChange={searchList}/>
      <div className={styles.content}>
        <SearchList
          isLoading={isLoading}
          isError={isError}
          query={query}
          list={list}
        />
      </div>
    </>
  )
};

export default RootTemplate;
