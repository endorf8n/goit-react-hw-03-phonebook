import { Component } from 'react';
import { ContactForm } from './ContactForm/ContactForm';
import { ContactList } from './ContactList/ContactList';
import { Filter } from './Filter/Filter';
import { AppWrapper, TitleApp, TitleContacts } from './app.styled';

export class App extends Component {
  state = {
    contacts: [],
    filter: '',
  };

  addContact = ({ name, number }) => {
    const contact = {
      name,
      number,
      id: crypto.randomUUID(),
    };

    const isExist = this.state.contacts.find(
      elem => elem.name.toLowerCase() === name.toLowerCase()
    );
    if (isExist) {
      alert(`"${name}" is already in contacts!`);
      return;
    }

    this.setState(prevState => ({
      contacts: [...prevState.contacts, contact],
    }));
  };

  countTotalContacts = () => {
    return this.state.contacts.length;
  };

  onFilterChange = e => {
    this.setState({ filter: e.target.value });
  };

  getFilteredContact = () => {
    const { contacts, filter } = this.state;

    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(filter.toLowerCase().trim())
    );
  };

  deleteContact = id => {
    this.setState(prevState => ({
      contacts: prevState.contacts.filter(contact => contact.id !== id),
    }));
  };

  render() {
    const filteredContacts = this.getFilteredContact();
    const total = this.countTotalContacts();

    return (
      <AppWrapper>
        <TitleApp>Phonebook</TitleApp>
        <ContactForm onSubmit={this.addContact} />
        <TitleContacts>Contacts</TitleContacts>

        {total === 0 ? (
          'There is no contacts in your phonebook!'
        ) : (
          <>
            <Filter filter={this.state.filter} onFilter={this.onFilterChange} />
            <ContactList
              contacts={filteredContacts}
              deleteContact={this.deleteContact}
            />
          </>
        )}
      </AppWrapper>
    );
  }
}
