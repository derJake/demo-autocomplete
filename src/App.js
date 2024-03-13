import { useEffect, useState } from 'react';
import './App.css';
import { Alert, Autocomplete, Container, LinearProgress, TextField } from '@mui/material';

function App() {
  const [filterOptions, setFilterOptions] = useState();
  const [inProgress, setInProgress] = useState(false);
  const [error, setError] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  useEffect(() => {
    if (!filterOptions
      && !inProgress) {
      setInProgress(true);

      fetch('http://localhost:8000/filteroptions')
        .then((response) => {
          if (!response.ok) throw new Error(response.status);
          else return response.json();
        })
        .then((data) => {
          setInProgress(false);
          setFilterOptions(data)
        })
        .catch((error) => {
          setErrorMsg(error.message)
          setError(true);
          setInProgress(false);
        })
    }
  }, []);

  return (
    <div className="App">
      <Container>
        {!inProgress
          && filterOptions
          && !error &&
          <Autocomplete
            disablePortal
            id="combo-box-demo"
            disabled={inProgress || error}
            options={filterOptions}
            sx={{ m: 3, width: 300 }}
            renderInput={(params) => <TextField {...params} label="Filter" />}
          />
        }
        {inProgress &&
          <LinearProgress />
        }
        {error &&
          <Alert m={3} severity="error">{errorMsg ? errorMsg : 'This is an error Alert.'}</Alert>
        }
      </Container>
    </div>
  );
}

export default App;
