import React, { useState, useEffect } from 'react'
import api from "./services/api"
import "./styles.css";


function App() {
  const [repositories, setRepo] = useState([])

  useEffect(() => {
    api.get("repositories")
      .then(response =>

        setRepo(response.data))
  }, [])

  async function handleAddRepository() {
    // All good
    const response = await api.post('repositories', { title: "Novo repositório", url: 'https://github.com/leosilvapessanha/GoStackReactBasic', techs: ["Node.js", "ReactJS", "React Native"] });

    setRepo([...repositories, response.data])
  }

  async function handleRemoveRepository(id) {
    // TODO
    await api.delete(`repositories/${id}`)

    const newRepositories = repositories.filter(repo => repo.id !== id) // pega tudo menos o id que foi deletado

    setRepo(newRepositories)
  }

  return (
    <>
      <ul data-testid="repository-list">
        {repositories.map(repository => (
          <li key={repository.id}>
            {repository.title}
            
            <button onClick={() => {
              const ID = repository.id
              handleRemoveRepository(ID)
              }
              }>
              Remover
          </button>
          </li>
        ))}
      </ul>
      <button onClick={handleAddRepository}>Adicionar</button>
    </>
  );
}

export default App;
