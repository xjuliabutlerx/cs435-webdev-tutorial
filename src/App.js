import React, { useState, useEffect} from "react"
import './App.css';

function App({ login }){
  const [data, setData] = useState(null);
  const [loading,setloading] = useState(null);
  const [error, setError] = useState(null);

    useEffect(() => {
      if(!login) return;
      setloading(true);

      fetch(`https://api.github.com/users/${login}`)
        .then(response => response.json())
        .then(setData)
        .then(()=> setloading(false))
        .catch(setError);
    },[login]);

    if(loading) return <h1>Loading...</h1>;
    if(error) 
      return <pre>{JSON.stringify(error, null, 2)}</pre>;
    if(!data) return null;

    // To see what kind of data I can return
    //console.log(data);

      return <div>
        <h1 align={"center"}>{data.name}<br/></h1>
        <h3 align={"center"}>{data.login}</h3>
        <div class={"row"}>
          <div class={"col"}>
            <h3>{"Following: " + data.following}</h3>
          </div>
          <div className={"col"}>
            <h3>{"Followers: " + data.followers}</h3>
          </div>
          <div className={"col"}>
            <h3>{"Public Repositories: " + data.public_repos}</h3>
          </div>
        </div>
        <h4>{"Personal Website: "}<a href={"https://xjuliabutlerx.github.io"}>{data.blog}</a></h4>
        <div align={"center"}>
          <p>{"This is my profile picture."}</p>
          <img height={"400px"} alt={data.login} src={data.avatar_url}/>
        </div>
        <p>If you want a fun surprise, click this button!</p>
        <button onClick={surprise}>Surprise Button!</button>
      </div>
}

function surprise() {
  // Resource: https://www.geeksforgeeks.org/how-to-open-url-in-new-tab-using-javascript/
  window.open("https://youtu.be/KLBelKB5oeg", "_blank");
}


export default App;
