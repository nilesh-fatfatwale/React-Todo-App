import React, { useState, useEffect } from 'react';
import { FaEdit } from 'react-icons/fa';
import { MdDelete } from 'react-icons/md';
import { GrAdd } from 'react-icons/gr';
import styled from 'styled-components';
const getLocalStorage = () => {
  let list = localStorage.getItem('list');
  if (list) {
    return JSON.parse(localStorage.getItem('list'));
  } else {
    return [];
  }
};

const MainContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background-color: #6421e2; 
`;

const TodoContainer = styled.div`
  background-color: #fff;
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 80%;
`;

const Title = styled.h2`
  font-size: 1.5rem;
  font-weight: 600;
  text-align: center;
  margin-bottom: 2rem;
`;

const FlexContainer = styled.div`
  display: flex;
  flex-direction: column;
  
  @media (min-width: 768px) {
    flex-direction: row;
  }

  align-items: center;
  justify-content: center;
  margin-bottom: 1rem;

  @media (min-width: 768px) {
    margin-bottom: 2rem;
  }

  gap: 1rem;

  @media (min-width: 768px) {
    gap: 2rem;
  }
`;

const Input = styled.input`
  width: 100%;
  padding: 0.5rem;
  border: 1px solid #ccc;
  border-radius: 4px;
  border-top-left-radius: 4px;
  border-top-right-radius: 0;

  @media (min-width: 768px) {
    width: 50%;
    border-top-right-radius: 4px;
  }
`;

const AddButton = styled.button`
  background-color: #2196F3; 
  color: #fff;
  padding: 0.5rem;
  border: none;
  border-radius: 4px;
  border-top-left-radius: 0;
  border-top-right-radius: 4px;
  cursor: pointer;

  @media (min-width: 768px) {
    border-top-left-radius: 4px;
    border-top-right-radius: 0;
  }
`;

const HorizontalLine = styled.hr`
  margin: 1rem 0;
  height: 1px;
  background-color: #000;
  border: 0;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;

  @media (min-width: 768px) {
    flex-direction: row;
    justify-content: space-between;
  }

  align-items: center;
  margin-top: 1rem;

  @media (min-width: 768px) {
    margin-top: 2rem;
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;

  @media (min-width: 768px) {
    justify-content: flex-start;
  }
`;

const Button = styled.button`
  background-color: ${props =>
    props.active ? '#2196F3' : props.color}; 
  color: #fff;
  padding: 0.5rem;

  @media (min-width: 768px) {
    padding: 0.75rem;
  }

  border: none;
  cursor: pointer;
  margin: 0.25rem;

  &:hover {
    background-color: ${props =>
      props.active ? '#1E86E0' : props.hoverColor}; 
  }
`;

const ClearButton = styled.button`
  background-color: #FF0000; 
  color: #fff;
  padding: 0.5rem;

  @media (min-width: 768px) {
    padding: 0.75rem;
  }

  border: none;
  cursor: pointer;
  border-radius: 0.25rem;

  &:hover {
    background-color: #CC0000; 
  }
`;

const ListContainer = styled.div`
  max-height: 48vh;
  overflow-y: auto;
  background-color: #ccc;
  border-radius: 8px;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 1rem;

  @media (min-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
    gap: 2rem;
  }
  padding: 1rem;

  @media (min-width: 768px) {
    padding: 2rem;
  }
`;

const ListItem = styled.div`
  background-color: #000;
  color: #fff;
  border-radius: 8px;
  padding: 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  

  .checkbox-container {
    display: flex;
    align-items: center;

    input[type="checkbox"] {
      margin-right: 8px;
    }

    .completed-text {
      ${props => (props.completed ? 'text-decoration: line-through;' : '')}
    }
  }

  .edit-container {
    display: flex;
    align-items: center;
    gap: 1rem;

    .edit-input {
      color: #000;
      padding: 0.5rem;
    }

    .save-button {
      color: #fff;
      background-color:green;
      padding:8px 10px;
      border-radius:10px;
    }
  }
`;


const App = () => {
  const [list, setList] = useState(getLocalStorage());
  const [name, setname] = useState('');
  const [sortingOption, setSortingOption] = useState('all');
  const [editingIndex, setEditingIndex] = useState(null);
  const [editText, setEditText] = useState(''); 

  const addItem = () => {
    if (name.trim() !== '') {
      setList([...list, { text: name, completed: false }]);
      setname('');
    }
  };

  const removeItem = (index) => {
    const updatedList = [...list];
    updatedList.splice(index, 1);
    setList(updatedList);
  };

  const clearList = () => {
    setList([]);
  };

  const handleSortingChange = (option) => {
    setSortingOption(option);
  };

  const handleCheckboxChange = (index) => {
    const updatedList = [...list];
    updatedList[index].completed = !updatedList[index].completed;
    setList(updatedList);
  };

  const handleEditItem = (index) => {
    setEditingIndex(index);
    setEditText(list[index].text);
  };

  const handleEditItemSave = (index) => {
    const updatedList = [...list];
    updatedList[index].text = editText;
    setList(updatedList);
    setEditingIndex(null); 
  };

  const filteredList = list.filter((item) => {
    if (sortingOption === 'completed') {
      return item.completed;
    } else if (sortingOption === 'uncompleted') {
      return !item.completed;
    } else {
      return true;
    }
  });

  useEffect(() => {
    localStorage.setItem('list', JSON.stringify(list));
  }, [list]);

  return (
    <MainContainer>
      <TodoContainer>
        <Title>Todo List</Title>
       
        <FlexContainer>
      <Input
        type="text"
        placeholder="Enter a todo..."
        value={name}
        onChange={(e) => setname(e.target.value)}
      />
      <AddButton onClick={addItem}>
        <GrAdd />
      </AddButton>
    </FlexContainer>
        
    <HorizontalLine />
        
        
    <Container>
      <ButtonContainer>
        <Button
          active={sortingOption === 'all'}
          color="#2196F3"
          hoverColor="#1E86E0"
          onClick={() => handleSortingChange('all')}
        >
          All
        </Button>
        <Button
          active={sortingOption === 'completed'}
          color="#4CAF50"
          hoverColor="#449D47"
          onClick={() => handleSortingChange('completed')}
        >
          Completed
        </Button>
        <Button
          active={sortingOption === 'uncompleted'}
          color="#9C27B0"
          hoverColor="#8E239D"
          onClick={() => handleSortingChange('uncompleted')}
        >
          Uncompleted
        </Button>
      </ButtonContainer>
      <ClearButton onClick={clearList}>Delete All</ClearButton>
    </Container>


        {filteredList.length > 0 && (
          
    <ListContainer>
    <Grid>
      {filteredList.map((item, index) => (
        <ListItem key={index} completed={item.completed}>
          <div className="checkbox-container">
            <input
              type="checkbox"
              checked={item.completed}
              onChange={() => handleCheckboxChange(index)}
            />
            <span className="completed-text">{item.text}</span>
          </div>
          <div className="edit-container">
            {editingIndex === index ? (
              <>
                <input
                  type="text"
                  value={editText}
                  onChange={(e) => setEditText(e.target.value)}
                  className="edit-input"
                />
                <button
                  className="save-button"
                  onClick={() => handleEditItemSave(index)}
                >
                  Save
                </button>
              </>
            ) : (
              <>
                <button
                  className="text-blue-500"
                  onClick={() => handleEditItem(index)}
                >
                  <FaEdit/>
                  
                </button>
                <button
                  className="text-red-500"
                  onClick={() => removeItem(index)}
                >
                  <MdDelete />
                </button>
              </>
            )}
          </div>
        </ListItem>
      ))}
    </Grid>
  </ListContainer>
        )}
       </TodoContainer>
    </MainContainer>
  );
};

export default App;