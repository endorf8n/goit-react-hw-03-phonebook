import { Component } from 'react';
import {
  AddContactBtn,
  ContactFormLabel,
  Form,
  Input,
} from './contactForm.styled';

export class ContactForm extends Component {
  state = {
    name: '',
    number: '',
  };

  handleChangeValue = e => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  handleSubmit = e => {
    e.preventDefault();
    this.props.onSubmit(this.state);
    this.setState({ name: '', number: '' });
  };

  render() {
    const { name, number } = this.state;
    return (
      <Form onSubmit={this.handleSubmit}>
        <ContactFormLabel>
          Name
          <Input
            value={name}
            onChange={this.handleChangeValue}
            type="text"
            name="name"
            pattern="^([ \u00c0-\u01ffa-zA-Z'\-])+$"
            title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
            required
          />
        </ContactFormLabel>
        <ContactFormLabel>
          Phone
          <Input
            value={number}
            onChange={this.handleChangeValue}
            type="tel"
            name="number"
            pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
            title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
            required
          />
        </ContactFormLabel>

        <AddContactBtn type="submit">Add contact</AddContactBtn>
      </Form>
    );
  }
}
