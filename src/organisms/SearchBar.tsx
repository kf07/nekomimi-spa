import { AppBar,InputBase,Toolbar,withStyles } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import React,{useCallback,useState} from 'react';
import styles from './SearchBar.module.css';

interface Props {
  defaultValue: string;
  onChange: (value:string) => void;
}

const SearchBar = (props: Props) => {
  const { defaultValue,onChange } = props;
  const [value, setValue] = useState(defaultValue);
  const handleChange = useCallback(
  (event:React.ChangeEvent<HTMLInputElement>) => {
    const { target } = event;
    setValue(target.value);
    onChange(target.value)
  },
    []
  );
  return (
    <AppBar position="fixed">
      <Toolbar variant="dense">
        <div className={styles.search}>
          <SearchIcon fontSize="small" />
          <StyledInputBase
            placeholder="search..."
            onChange={handleChange}
            value={value}
          />
        </div>
      </Toolbar>
    </AppBar>
  );
};

const StyledInputBase =withStyles({
  root: {
    flexGrow: 1,
    marginLeft: '5px',
    color: "#fff"
  }
})(InputBase);

export default SearchBar;


