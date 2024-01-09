import { useState } from 'react';
export default function Home() {
  const [name, setName] = useState("");
  const [keyword, setKeyword] = useState("");
  const [searchResult, setSearchResult] = useState(null);
  const [page, setPage] = useState(1);
  const [total_count, setTotal_count] = useState(1);

  const handleSearch = async () => {
    try {
      setPage(1);
      const response = await fetch(`http://localhost:8000/api/search?keyword=${keyword}&username=${name}&page=${page}`);
      const data = await response.json();
      setSearchResult(data['result']);
      setTotal_count(data['total_count']);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const to_prev = async () => {
    if(page > 1) {
      try {
        const response = await fetch(`http://localhost:8000/api/search?keyword=${keyword}&username=${name}&page=${page-1}`);
        const data = await response.json();
        setSearchResult(data['result']);
        setPage(page - 1);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }
  }
  const to_next = async () => {
    if(page*50 < total_count) {
      console.log(page)
      try {
        const response = await fetch(`http://localhost:8000/api/search?keyword=${keyword}&username=${name}&page=${page+1}`);
        const data = await response.json();
        setSearchResult(data['result']);
        setPage(page + 1);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }
  }

  return (
    <div style={{ marginLeft: '20px' }}>
      <h1>GitHub Respository Search</h1>
      <input type='text' style={{ color: 'black', borderRadius:'3px' }} value={keyword} onChange={(e) => setKeyword(e.target.value)}></input>
      <input type='text' style={{ color: 'black', borderRadius:'3px' }} value={name} onChange={(e) => setName(e.target.value)}></input>
      <button style={{backgroundColor: 'blue', borderRadius:'3px'}} onClick={handleSearch}>Search</button>
      <h1>Search Results</h1> <br/>
      <div style={{margin:"20px"}}><ul>
      {searchResult && (searchResult as any[]).map((item, index) => (
        <li key={index}>
          <a href={item.url} target="_blank">{item.name}</a> <br/>
          <span style={{color:'gray'}}>{item.description}</span>
          <hr/>
        </li>
      ))}
      <button onClick={to_prev} style={{backgroundColor: 'gray', borderRadius:'3px'}}>previous</button>{' '}
      <button onClick={to_next} style={{backgroundColor: 'gray', borderRadius:'3px'}}>Next</button>
      </ul></div>
    </div>
  )
}