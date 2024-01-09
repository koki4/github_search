import { useState, useEffect } from 'react';

function CheckApi() {
  const [data, setData] = useState({ message: '' });

  useEffect(() => {
    fetch('http://localhost:8000/hello')
    .then((res)=> res.json())
    .then((profile)=>{
      setData(profile)
      console.log(profile.message)
      console.log(data)
    })
  }, []); // 空の配列を依存リストとして渡すことで、マウント時に一度だけ実行

  return (
    <div>
      <p>Data from API:</p>
      <p>{data.message}</p>
    </div>
  );
}

export default CheckApi;
