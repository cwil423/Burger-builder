import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actionTypes from '../../store/actions/actionTypes';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import axios from '../../axios-orders';
import * as burgerBuilderActions from '../../store/actions/burgerBuilder';

const INGREDIENT_PRICES = {
    salad: 0.5,
    cheese: 0.4,
    meat: 1.3,
    bacon: 0.7
};

class BurgerBuilder extends Component {
    // constructor(props) {
    //     super(props);
    //     this.state = {...}
    // }
    state = {
        // totalPrice: 4,
        // purchasable: false,
        purchasing: false,
    }

    componentDidMount () {
        this.props.initIngredients()
    }

    updatePurchaseState () {
        return Object.values(this.props.ings).reduce((a, b) => a + b, 0) > 0
    }

    purchaseHandler = () => {
        this.setState( { purchasing: true } );
    }

    purchaseCancelHandler = () => {
        this.setState( { purchasing: false } );
    }

    purchaseContinueHandler = () => {
        this.props.history.push('/checkout')
    }

    render () {
        const disabledInfo = {
            ...this.props.ings
        };

        for ( let key in disabledInfo ) {
            disabledInfo[key] = disabledInfo[key] <= 0
        }

        let orderSummary = null;
        let burger = this.props.error ? <p>Ingredients can't be loaded!</p> : <Spinner />;

        if ( this.props.ings ) {
            burger = (
                <React.Fragment>
                    <Burger ingredients={this.props.ings} />
                    <BuildControls
                        ingredientAdded={this.props.addIngredient}
                        ingredientRemoved={this.props.removeIngredient}
                        disabled={disabledInfo}
                        purchasable={this.updatePurchaseState()}
                        ordered={this.purchaseHandler}
                        price={this.props.price} />
                </React.Fragment>
            );
            orderSummary = <OrderSummary
                ingredients={this.props.ings}
                price={this.props.price}
                purchaseCancelled={this.purchaseCancelHandler}
                purchaseContinued={this.purchaseContinueHandler} />;
        }
        // {salad: true, meat: false, ...}
        return (
            <React.Fragment>
                <Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandler}>
                    {orderSummary}
                </Modal>
                {burger}
            </React.Fragment>
        );
    }
}

const mapStatetoProps = state => {
    return {
        ings: state.ingredients,
        price: state.price,
        error: state.error
    }

}

const mapDispatchtoProps = dispatch => {
    return {
        addIngredient: (ing) => dispatch( burgerBuilderActions.addIngredient(ing, INGREDIENT_PRICES[ing])),
        removeIngredient: (ing) => dispatch( burgerBuilderActions.removeIngredient(ing, INGREDIENT_PRICES[ing])),
        initIngredients: () => dispatch(burgerBuilderActions.setIngredients())
        
    }
    
}
export default connect(mapStatetoProps, mapDispatchtoProps)(withErrorHandler( BurgerBuilder, axios ));