import React, { Component } from 'react';
import{ connect } from 'react-redux';
import Button from '../../../components/UI/Button/Button';
import classes from './ContactData.module.css';
import axios from '../../../axios-orders'
import Spinner from '../../../components/UI/Spinner/Spinner';
import Input from '../../../components/UI/Input/Input';

class ContactData extends Component {
  state = { 
    orderForm: {
      name: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Your Name'
        },
        value: '',
        validation: {
          required: true,
          
        },
        valid: false,
      },
      street: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Street'
        },
        value: '',
        validation: {
          required: true,
        },
        valid: false,
      },
      zipCode: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Zip Code'
        },
        value: '',
        validation: {
          required: true,
          minLength: 5,
          maxLength: 5
        },
        valid: false,
      },
      country: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Country'
        },
        value: '',
        validation: {
          required: true,
        },
        valid: false,
      },
      email: {
        elementType: 'input',
        elementConfig: {
          type: 'email',
          placeholder: 'Email'
        },
        value: '',
        validation: {
          required: true,
        },
        valid: false,
      },
      deliveryMethod: {
        elementType: 'select',
        elementConfig: {
          options: [
            {value: 'fastest', displayValue: 'Fastest'},
            {value: 'cheapest', displayValue: 'Cheapest'}
          ]
        },
        value: '',
      },
    },
    loading: false
   }

  // checkValidity(value, rules) {
  //   let isValid = true;
  //   if (rules.required) {
  //     isValid = value.trim() !== '' && isValid;
  //   }
  //   if (rules.minlength) {
  //     isValid = value.length >= rules.minLength && isValid;
  //   }
  //   if (rules.maxLength) {
  //     isValid = value.length <= rules.maxLength && isValid;
  //   }
  //   return isValid;
  // }

  InputChangedHandler = (event, inputId) => {
    const orderForm = {...this.state.orderForm};
    const formElement = {...orderForm[inputId]};
    formElement.value = event.target.value
    // formElement.valid = this.checkValidity(formElement.value, formElement.validation)
    orderForm[inputId] = formElement;
    this.setState({orderForm})
  }

  orderHandler = (event) => {
    event.preventDefault();
    this.setState( { loading: true } );
    const formData = {};
    for (let formElementIdentifier in this.state.orderForm) {
      formData[formElementIdentifier] = this.state.orderForm[formElementIdentifier].value;
    }
    console.log(formData)
    const order = {
      ingredients: this.props.ings,
      price: this.props.price,
      customerInfo: formData
    }
   axios.post( '/orders.json', order )
    .then( response => {
      this.setState( { loading: false} );
      this.props.history.push('/')
    })
    .catch( error => {
      this.setState( { loading: false} );
    });
  }

  render() { 
    let orderFormArr = [];
    for (let key in this.state.orderForm) {
      orderFormArr.push({
        id: key,
        config: this.state.orderForm[key]
      });
    };
    let form = (
      <form onSubmit={this.orderHandler}>
        {orderFormArr.map(frm => (
          <Input 
            key={frm.id}
            elementType={frm.config.elementType}  
            elementConfig={frm.config.elementConfig} 
            value={frm.config.value}
            invalid={!frm.config.valid}
            changed={(event) => this.InputChangedHandler(event, frm.id)}/>
        ))}
        <Button btnType='Success'>Order</Button>
      </form>
    );

    if(this.state.loading) {
      form = <Spinner />
    }
    return ( 
      <div className={classes.ContactData}>
        <h4>Enter your Contact Data</h4>
        {form}
      </div>
     );
  }
}

const mapStateToProps = state => {
  return {
    ings: state.ingredients,
    price: state.price
  }
}
 
export default connect(mapStateToProps)(ContactData);