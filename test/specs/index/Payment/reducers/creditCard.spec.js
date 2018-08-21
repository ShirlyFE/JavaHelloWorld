import { fromJS } from 'immutable';
import { CHANGE_PAYER, CHANGE_AGENT } from 'index/Payment/actions/payer';
import {
  CREDITCARD_FETCH_LIST_SUCCESS,
  CREDITCARD_UPDATE_LABLE,
  CREDITCARD_ADD_NEW_CREDITCARD,
  CREDITCARD_SETUP_NEW_CARD_ONLY,
} from 'index/Payment/actions/paymentOptions/creditCard';
import getCreditCardReducer, { USE_NEW_CARD_ENTITY } from 'index/Payment/reducers/paymentOptions/creditCard';

const reducer = getCreditCardReducer(__payment__.__initialState__);

// blocked by index/Payment/components/PaymentOptions/utils/payment.js
// which should not import store to do changes
jest.mock('index/Payment/store', () => ({}));

describe('index/Payment/reducers/paymentOptions/creditCard', () => {
  it('CREDITCARD_UPDATE_LABLE should work fine', () => {
    const value = 'creditCardX';
    const state = reducer(fromJS({}), {
      type: CREDITCARD_UPDATE_LABLE,
      payload: { value }
    });
    expect(state.get('creditCardLabel')).toEqual(value);
  });

  it('CREDITCARD_SETUP_NEW_CARD_ONLY should work fine', () => {
    const state = reducer(fromJS({}), { type: CREDITCARD_SETUP_NEW_CARD_ONLY });
    expect(state.get('creditCardListDropDown')).toEqual(fromJS({ data: [USE_NEW_CARD_ENTITY] }));
  });

  it('CREDITCARD_FETCH_LIST_SUCCESS should work fine', () => {
    const body = {
      items: {
        is_show_credit_card: true,
        saved_credit_card_list: [
          { other_number: '33412', selected: true, card_number: '481', cardtype: 'visa', id: 99123 }
        ]
      }
    };
    const state = reducer(fromJS({}), {
      type: CREDITCARD_FETCH_LIST_SUCCESS,
      payload: { body }
    });
    expect(state.get('creditCardListDropDown')).toEqual(fromJS({
      data: [{
        other_number: '33412',
        selected: true,
        card_number: '481',
        cardtype: 'visa',
        id: 99123,
        name: 'visa ends in 481',
        text: 'visa ends in 481',
        value: '481'
      }, {
        value: 'newOptionValue',
        text: 'Use new card'
      }],
      selected: ['481']
    }));
  });

  it('CREDITCARD_FETCH_LIST_SUCCESS should work fine if it\'s refund', () => {
    const body = {
      credit_card_refund: {
        is_show_credit_card: true,
        credit_card_list: [
          { other_number: '33412', selected: true, card_number: '481', cardtype: 'visa', id: 99123 }
        ],
        allow_new_card: true,
      }
    };
    const state = reducer(fromJS({
      isRefund: true
    }), {
      type: CREDITCARD_FETCH_LIST_SUCCESS,
      payload: { body }
    });
    expect(state.get('defaultOtherNumber')).toEqual('33412');
    expect(state.get('creditCardListDropDownValue')).toEqual('481');
    expect(state.get('creditCardListDropDown')).toEqual(fromJS({
      data: [{
        other_number: '33412',
        selected: true,
        card_number: '481',
        cardtype: 'visa',
        id: 99123,
        name: 'visa ends in 481',
        text: 'visa ends in 481',
        value: '481'
      }, {
        value: 'newOptionValue',
        text: 'Use new card'
      }],
      selected: ['481']
    }));
  });

  it('CREDITCARD_ADD_NEW_CREDITCARD should work fine', () => {
    const payload = USE_NEW_CARD_ENTITY;
    const state = reducer(fromJS({
      creditCardListDropDown: { data: [] }
    }), {
      type: CREDITCARD_ADD_NEW_CREDITCARD,
      payload
    });
    expect(state.getIn(['creditCardListDropDown', 'data'])).toEqual(fromJS([
      { value: 'newOptionValue', text: 'Use new card' }
    ]));
  });

  it('CREDITCARD_ADD_NEW_CREDITCARD should work fine with new option', () => {
    const payload = { value: '1112', text: '8812#visa' };
    const state = reducer(fromJS({
      creditCardListDropDown: { data: [USE_NEW_CARD_ENTITY] }
    }), {
      type: CREDITCARD_ADD_NEW_CREDITCARD,
      payload
    });
    expect(state.getIn(['creditCardListDropDown', 'data'])).toEqual(fromJS([
      payload,
      { value: 'newOptionValue', text: 'Use new card' }
    ]));
  });
});
