import logo from "./logo.svg";
import "./App.css";
import {useQuery,gql} from '@apollo/client'

const query = gql`
  query GetTodosWithUser {
    getTodos {
      title
      user {
        name
        phone
      }
    }
  }
`

function App() {
  const {data,loading} = useQuery(query)
  console.log(data)
  if(loading) return <h1>Loading...</h1>
  return (
    <div className="App">
      {JSON.stringify(data)}
    </div>
  );
}

export default App;
