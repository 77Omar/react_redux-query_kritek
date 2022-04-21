import React from 'react';
import './App.css';
import {
    useAddContactMutation,
    useContactQuery,
    useContactsQuery, useDeleteContactMutation,
    useUpdateContactMutation
} from "./services/contactsApi";

function App() {
  // @ts-ignore
  const {data, error, isLoading, isFetching, isSuccess} = useContactsQuery();
  return (
    <div className="App">
      <h1>React Redux Query Kritek</h1>
      {isLoading && <h2>...Loading</h2>}
      {isFetching && <h2>...Fetching</h2>}
      {error && <h2>Something went wrong</h2>}
      {isSuccess && (
          <div>
            {data?.map(contact => {
              return <div className="data" key={contact.id}>
                <span>{contact.name}</span>
                <span><ContactDetail id={ contact.id} /></span>
              </div>
            })}
          </div>
      )}
      <div><AddContact/></div>
    </div>
  );
}

export const ContactDetail = ({id}: {id: string}) => {
  const {data} = useContactQuery(id);
  return (
      <pre>{JSON.stringify(data, undefined, 2)}</pre>
  )
}

export const AddContact = () => {
  const [addContact] = useAddContactMutation();
  const  [updateContact] = useUpdateContactMutation();
  const [deleteContact] = useDeleteContactMutation();
  const contact = {
    "id": "3",
     "name": "kritek",
     "email": "kritek@gmail.com"
  }

      const contactUpdate = {
        "id": "3",
        "name": "Omarfaye",
        "email": "kritek@gmail.com"
    }
  const addHandler = async () => {
    await addContact(contact);
  }
    const updateHandler = async () => {
        await updateContact(contactUpdate);
    }
    const deleteHandler = async () => {
        await deleteContact(contact.id);
    }
  return(
      <>
         <button onClick={ addHandler }>Add Contact</button>
          <button onClick={ updateHandler }>Update Contact</button>
          <button onClick={ deleteHandler }>Delete Contact</button>
      </>
  )
}

export default App;
