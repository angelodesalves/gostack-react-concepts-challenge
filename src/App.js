import React, { useState, useEffect } from "react";
import api from './services/api'
import "./styles.css";

function App() {
  const [repositories, setRepositorie] = useState([]);

  useEffect(() => {
    api.get('repositories').then(response => {
      setRepositorie(response.data);
    })
  }, []);

  async function handleAddRepository() {
    const project = await api.post('repositories', {
			title: `Projeto novo n ${Date.now()}`,
			owner: 'Angelo'
		});
		debugger
		setRepositorie([...repositories, project.data]);
  }

  async function handleRemoveRepository(id) {
		const project = await api.delete(`repositories/${id}`);

		if (project.status === 204) {
			const projectIndex = repositories.findIndex(project => project.id === id )
			let newrepositories = [...repositories];

			newrepositories.splice(projectIndex, 1);
			setRepositorie(newrepositories);
		}
  }

  function getRepotitory(project) {
		return (
			<li key={project.id}>
				{project.title}

				<button onClick={() => handleRemoveRepository(project.id)}>
					Remover
				</button>
			</li>
		);
	}

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map(getRepotitory)}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
