import React from 'react';
import toJson from 'enzyme-to-json';
import { mount, shallow } from 'enzyme';
import { CreditCard } from 'index/Payment/components/PaymentOptions/CreditCard';
import InputNumeric from 'react-base-ui/lib/components/InputNumeric';
import Dropdown from 'react-base-ui/lib/components/Dropdown';
import resetActions from 'utils/resetActions';

jest.mock('index/Payment/actions/paymentOptions/creditCard', () => ({
  fetchCreditCardListAction: jest.fn(),
  setCreditCardLableAction: jest.fn(),
  changeCreditCardAction: jest.fn(),
  changeCreditCardAmount: jest.fn(),
  changeRemaining: jest.fn(),
  getIframeUrlAsyncAction: jest.fn(),
  getInstanceAction: jest.fn()
}));

jest.mock('uuid/v4', () => () => '1')

jest.mock('index/Payment/components/PaymentOptions/utils/payment', () => ({
  getDefaultAmount: jest.fn().mockReturnValue(300)
}));

describe('index/Payment/components/PaymentOptions/creditCard', () => {
  const actions = {
    changeRemaining: jest.fn(),
    changeCreditCardAction: jest.fn(),
    changeCreditCardAmount: jest.fn(),
    fetchCreditCardListAction: jest.fn(),
    setCreditCardLableAction: jest.fn(),
    onChange: jest.fn(),
    addError: jest.fn(),
    clearOptionAndPaymentErrs: jest.fn(),
    getIframeUrlAsyncAction: jest.fn(),
    getInstanceAction: jest.fn()
  };

  afterEach(() => {
    resetActions(actions);
  });

  const setup = (props) => mount(<CreditCard {...props} />);

  it('CreditCard component should render without error', () => {
    const props = {
      item: {
        list: [
          { value: '173', name: 'CreditCard' },
          { value: '172', name: 'Credit' }
        ],
        isUseNewCard: true,
        creditCardListDropDownValue: '445',
        disabled: false
      },
      value: '173',
      index: 0,
      optionLen: 3,
      children: (<span>CreditCard info</span>),
      data: {
        creditCardLabel: 'Credit Card',
        creditCardListDropDown: {
          data: [
            { value: '443', name: '4024023807311440' },
            { value: '444', name: '4024023827278710' },
            { value: '445', name: '4024023885420246' }
          ]
        }
      },
      getIframeUrlAsyncAction: jest.fn(),
      getInstanceAction: jest.fn()
    };
    const component = setup(props);
    expect(toJson(component)).toMatchSnapshot();
  });

  it('CreditCard component in refund workflow should render without error', () => {
    const props = {
      item: {
        list: [
          { value: '173', name: 'CreditCard' },
          { value: '172', name: 'Credit' }
        ],
        isUseNewCard: false,
        creditCardListDropDownValue: '445',
        disables: true
      },
      value: '173',
      index: 2,
      optionLen: 3,
      children: (<span>CreditCard info</span>),
      data: {
        creditCardLabel: 'Credit Card',
        creditCardListDropDown: {
          data: [
            { value: '443', name: '4024023807311440' },
            { value: '444', name: '4024023827278710' },
            { value: '445', name: '4024023885420246' }
          ]
        }
      },
      isRefund: true,
      getIframeUrlAsyncAction: jest.fn(),
      getInstanceAction: jest.fn()
    };
    const component = setup(props);
    expect(toJson(component)).toMatchSnapshot();
  });

  it('CreditCard component change payment option should work fine when not in refund workflow and not use device for pay', () => {
    const props = {
      item: {
        list: [
          { value: '173', name: 'CreditCard' },
          { value: '172', name: 'Credit' }
        ],
        isUseNewCard: true,
        creditCardListDropDownValue: '445',
        disabled: false
      },
      value: '173',
      index: 0,
      optionLen: 3,
      children: (<span>CreditCard info</span>),
      data: {
        creditCardLabel: 'Credit Card',
        creditCardListDropDown: {
          data: []
        }
      },
      ...actions
    };

    const component = setup(props);

    expect(actions.fetchCreditCardListAction).not.toHaveBeenCalled();
    expect(actions.setCreditCardLableAction).not.toHaveBeenCalled();

    expect(component.find('.payment-credit-card')).toHaveLength(1);
    expect(component.find('.iframeContainer')).toHaveLength(1);
    expect(component.find('#creditCardAmount')).toHaveLength(1);

    const paymentOptionDropdown = component.find(Dropdown).at(0);
    paymentOptionDropdown.node.props.onChange({});
    expect(actions.onChange).toBeCalled();
  });

  it('CreditCard component change payment option should work fine when not in refund workflow and use device for pay', () => {
    const props = {
      item: {
        list: [
          { value: '173', name: 'CreditCard' },
          { value: '172', name: 'Credit' }
        ],
        isUseNewCard: true,
        creditCardListDropDownValue: '445',
        disabled: false
      },
      value: '173',
      index: 0,
      optionLen: 3,
      children: (<span>CreditCard info</span>),
      data: {
        creditCardLabel: 'Credit Card',
        creditCardListDropDown: {
          data: []
        }
      },
      ccScanWithMagesafeDevice: true,
      ...actions
    };

    setup(props);

    expect(actions.fetchCreditCardListAction).toHaveBeenCalled();
    expect(actions.setCreditCardLableAction).toHaveBeenCalled();
  });

  it('CreditCard component change payment option should work fine when in refund workflow and use device for pay and has no refund validation for cc.', () => {
    const props = {
      item: {
        list: [
          { value: '173', name: 'CreditCard' },
          { value: '172', name: 'Credit' }
        ],
        isUseNewCard: true,
        creditCardListDropDownValue: '445',
        disabled: false
      },
      value: '173',
      index: 0,
      optionLen: 3,
      children: (<span>CreditCard info</span>),
      data: {
        creditCardLabel: 'Credit Card',
        creditCardListDropDown: {
          data: [{
            cardName: 'text',
            value: '446'
          }]
        }
      },
      ccScanWithMagesafeDevice: true,
      isRefund: true,
      ...actions
    };

    setup(props);

    expect(actions.fetchCreditCardListAction).not.toHaveBeenCalled();
    expect(actions.setCreditCardLableAction).not.toHaveBeenCalled();
    expect(actions.changeCreditCardAmount).not.toHaveBeenCalled();
    expect(actions.changeRemaining).not.toHaveBeenCalled();
  });
  it('CreditCard component change credit card option and amount should work fine', () => {
    const props = {
      item: {
        list: [
          { value: '173', name: 'CreditCard' },
          { value: '172', name: 'Credit' }
        ],
        errors: [{ key: 0, name: '' }],
        isUseNewCard: true,
        creditCardListDropDownValue: '445',
        disabled: false
      },
      value: '173',
      index: 0,
      optionLen: 3,
      children: (<span>CreditCard info</span>),
      data: {
        creditCardLabel: 'Credit Card',
        creditCardListDropDown: {
          data: [
            { value: '443', name: '4024023807311440' },
            { value: '444', name: '4024023827278710' },
            { value: '445', name: '4024023885420246' }
          ]
        }
      },
      ...actions
    };

    const component = setup(props);
    const instance = component.instance();

    expect(instance.state.amount).toEqual(undefined);

    const amountInput = component.find(InputNumeric).at(0);
    const amountInputHtmlElement = component.find('#creditCardAmount');
    amountInput.node.input.value = 400;
    amountInput.node.props.onValueChange({ value: 400 });
    expect(instance.state.amount).toEqual(400);

    amountInputHtmlElement.simulate('blur');
    expect(actions.addError).toHaveBeenCalled();
    expect(actions.changeCreditCardAmount).toHaveBeenCalled();
    expect(actions.changeRemaining).toHaveBeenCalled();
    expect(instance.state.amount).toEqual(300);

    resetActions(actions);
    component.setProps({ item: Object.assign({}, props.item, { disabled: true }) });
    expect(actions.changeCreditCardAction).not.toHaveBeenCalled();
    expect(component.find('.iframeContainer')).toHaveLength(1);

  });

  it('CreditCard component change credit card option and amount in refund workflow should work fine and use device for payment.', () => {
    const props = {
      item: {
        list: [
          { value: '173', name: 'CreditCard' },
          { value: '172', name: 'Credit' }
        ],
        isUseNewCard: true,
        creditCardListDropDownValue: '445',
        disabled: false
      },
      value: '173',
      index: 0,
      optionLen: 3,
      children: (<span>CreditCard info</span>),
      data: {
        creditCardLabel: 'Credit Card',
        creditCardListDropDown: {
          data: [
            { value: '443', name: '4024023807311440' },
            { value: '444', name: '4024023827278710' },
            {
              id: '445',
              name: '4024023885420246',
              value: '445',
              validate_cc_refund_amount: 200,
              remaining_refund_amount: 200
            }
          ]
        }
      },
      isRefund: true,
      ccScanWithMagesafeDevice: true,
      ...actions
    };

    const component = setup(props);
    const instance = component.instance();

    expect(actions.changeCreditCardAmount).toHaveBeenCalledTimes(1);
    expect(actions.changeRemaining).toHaveBeenCalledTimes(1);

    props.item.amount = 400;
    component.setProps({ item: Object.assign({}, props.item) });

    const amountInput = component.find(InputNumeric).at(0);
    const amountInputHtmlElement = component.find('#creditCardAmount');
    amountInput.node.input.value = 500;
    amountInput.node.props.onValueChange({ value: 500 });
    expect(instance.state.amount).toEqual(500);

    amountInputHtmlElement.simulate('blur');
    expect(actions.addError).toHaveBeenCalled();
    expect(actions.changeCreditCardAmount).toHaveBeenCalledTimes(2);
    expect(actions.changeRemaining).toHaveBeenCalledTimes(2);
    expect(instance.state.amount).toEqual(200);

    props.item.isUseNewCard = false;
    props.data.creditCardListDropDown.data[2].validate_cc_refund_amount = 0;
    props.data.creditCardListDropDown.data[2].remaining_refund_amount = 0;
    component.setProps({ item: Object.assign({}, props.item), data: Object.assign({}, props.data) });
    amountInputHtmlElement.simulate('blur');
    expect(actions.changeCreditCardAmount).toHaveBeenCalledTimes(3);
    expect(actions.changeRemaining).toHaveBeenCalledTimes(3);
    expect(instance.state.amount).toEqual('200.00');

    props.item.creditCardListDropDownValue = '444';
    component.setProps({ item: Object.assign({}, props.item) });
    expect(actions.changeCreditCardAction).toHaveBeenCalled();
    expect(actions.changeCreditCardAmount).toHaveBeenCalledTimes(4);
    expect(actions.changeRemaining).toHaveBeenCalledTimes(4);
  });

  it('CreditCard component change credit card in refund workflow should work fine and use device for payment.', () => {
    const props = {
      item: {
        list: [
          { value: '173', name: 'CreditCard' },
          { value: '172', name: 'Credit' }
        ],
        isUseNewCard: true,
        creditCardListDropDownValue: '445',
        disabled: false
      },
      value: '173',
      index: 0,
      optionLen: 3,
      children: (<span>CreditCard info</span>),
      data: {
        creditCardLabel: 'Credit Card',
        creditCardListDropDown: {
          data: [
            { value: '443', name: '4024023807311440' },
            { value: '444', name: '4024023827278710' },
            {
              id: '445',
              name: '4024023885420246',
              value: '445',
              validate_cc_refund_amount: 200,
              remaining_refund_amount: 200
            }
          ]
        }
      },
      isRefund: true,
      ccScanWithMagesafeDevice: true,
      ...actions
    };

    const component = shallow(<CreditCard {...props} />);
    component.find(Dropdown).at(1).simulate('change', {value: 1});
    expect(actions.changeCreditCardAction).toHaveBeenCalledTimes(1);
    component.setProps({ item: Object.assign({}, props.item, { errors: [{ name: 'cardList', message: 'test err 1' }] }) });
    component.find(Dropdown).at(1).simulate('change', {value: 2});
    expect(actions.clearOptionAndPaymentErrs).toHaveBeenCalled();
    expect(actions.changeCreditCardAction).toHaveBeenCalledTimes(2);
  });
});


