import React from 'react';
import { mount } from 'enzyme';
import toJson from 'enzyme-to-json';
import { Cash } from 'index/Payment/components/PaymentOptions/Cash';
import InputNumeric from 'react-base-ui/lib/components/InputNumeric';
import Dropdown from 'react-base-ui/lib/components/Dropdown';
import resetActions from 'utils/resetActions';

jest.mock('index/Payment/components/PaymentOptions/utils/payment', () => ({
  getDefaultAmount: jest.fn().mockReturnValue(300),
  getRemaining: jest.fn((index, amount) => amount <= 300 ? -50 : {
    remaining: `$${amount}`
  })
}));

describe('index/Payment/components/PaymentOptions/Cash', () => {
  const actions = {
    changeCashAmount: jest.fn(),
    calculateCashChange: jest.fn(),
    changeRemaining: jest.fn(),
    clearOptionAndPaymentErrs: jest.fn(),
    onChange: jest.fn()
  };

  const initialData = {
    allowPaymentByCashWithChangeCalculation: true
  };

  afterEach(() => {
    resetActions(actions);
  });

  const setup = (props) => mount(<Cash {...props} />);

  it('Cash component should render without error', () => {
    const props = {
      item: {
        list: [
          { value: '172', name: 'Check' },
          { value: '173', name: 'Cash' }
        ],
        amount: 350
      },
      value: '173',
      index: 0,
      optionLen: 1,
      children: (<span>cash info</span>),
      isRefund: false,
      initialData,
      ...actions
    };
    const component = setup(props);
    expect(toJson(component)).toMatchSnapshot();
  });

  it('Cash component in refund workflow should render without error', () => {
    const props = {
      item: {
        list: [
          { value: '172', name: 'Check' },
          { value: '173', name: 'Cash' }
        ],
        amount: 350,
        cashAmountPaid: 100,
        cashChange: 100
      },
      value: '173',
      index: 0,
      optionLen: 3,
      children: (<span>cash info</span>),
      isRefund: true,
      initialData,
      ...actions
    };
    const component = setup(props);
    expect(toJson(component)).toMatchSnapshot();
  });

  it('Cash component payment process should work fine', () => {
    const props = {
      item: {
        list: [
          { value: '172', name: 'Check' },
          { value: '173', name: 'Cash' }
        ],
        amount: 0,
        formatCashAmount: 300
      },
      value: '173',
      index: 2,
      optionLen: 3,
      children: (<span>cash info</span>),
      isRefund: false,
      initialData,
      ...actions
    };

    const component = setup(props);

    expect(component.find('div.payment-option-list')).toHaveLength(1);
    expect(component.find('#cashAmount')).toHaveLength(1);
    expect(component.find('div.payment-cash-change.payment-cash-change-indent')).toHaveLength(1);
    expect(component.find('#cashPaid')).toHaveLength(1);

    const paymentOptionDropdown = component.find(Dropdown);
    expect(paymentOptionDropdown).toHaveLength(1);
    paymentOptionDropdown.node.props.onChange({});
    expect(actions.onChange).toBeCalled();

    const amountInput = component.find(InputNumeric).at(0);
    const amountInputHtmlElement = component.find('#cashAmount');
    expect(amountInputHtmlElement).toHaveLength(1);

    amountInput.node.input.value = 200;
    amountInputHtmlElement.simulate('blur');

    const confirmButton = component.find('.payment-amount-exception-alert').find('button.btn-strong');
    confirmButton.simulate('click');
    expect(actions.changeCashAmount).toHaveBeenCalled();
    expect(actions.changeRemaining).toHaveBeenCalled();
    expect(actions.calculateCashChange).toHaveBeenCalledTimes(1);

    const amountPaidInputHtmlElement = component.find('#cashPaid');
    const amountPaidInput = component.find(InputNumeric).at(1);
    amountPaidInput.node.input.value = 100;
    amountPaidInputHtmlElement.simulate('blur');
    expect(actions.calculateCashChange).toHaveBeenCalledTimes(2);

    amountPaidInput.node.input.value = 500;
    amountPaidInputHtmlElement.simulate('blur');
    expect(actions.calculateCashChange).toHaveBeenCalledTimes(3);

    amountInput.node.input.value = 400;
    amountInputHtmlElement.simulate('blur');
    expect(actions.calculateCashChange).toHaveBeenCalledTimes(4);
  });

  it('Cash component payment process should work fine if meets error', () => {
    const props = {
      item: {
        list: [
          { value: '172', name: 'Check' },
          { value: '173', name: 'Cash' }
        ],
        amount: 0,
        formatCashAmount: 300,
        errors: [{ message: 'cash mock error', name: '' }]
      },
      value: '173',
      index: 2,
      optionLen: 3,
      children: (<span>cash info</span>),
      isRefund: false,
      initialData,
      ...actions
    };

    const component = setup(props);

    expect(component.find('div.payment-option-list')).toHaveLength(1);
    expect(component.find('#cashAmount')).toHaveLength(1);
    expect(component.find('div.payment-cash-change.payment-cash-change-indent')).toHaveLength(1);
    expect(component.find('#cashPaid')).toHaveLength(1);
    expect(component.find('.payment-option-list--error')).toHaveLength(1);
    expect(component.find('.payment-cash-change')).toHaveLength(1);

    const amountInput = component.find(InputNumeric).at(0);
    const amountInputHtmlElement = component.find('#cashAmount');
    expect(amountInputHtmlElement).toHaveLength(1);

    amountInput.node.input.value = 200;
    amountInputHtmlElement.simulate('blur');
    expect(actions.clearOptionAndPaymentErrs).toHaveBeenCalledTimes(1);

    const amountPaidInputHtmlElement = component.find('#cashPaid');
    const amountPaidInput = component.find(InputNumeric).at(1);
    amountPaidInput.node.input.value = 100;
    amountPaidInputHtmlElement.simulate('blur');
    expect(actions.clearOptionAndPaymentErrs).toHaveBeenCalledTimes(2);
  });

  it('Cash component refund process should work fine', () => {
    const props = {
      item: {
        list: [
          { value: '172', name: 'Check' },
          { value: '173', name: 'Cash' }
        ],
        amount: 350,
        formatCashAmount: 350
      },
      value: '173',
      index: 0,
      optionLen: 1,
      children: (<span>cash info</span>),
      isRefund: true,
      initialData,
      ...actions
    };

    const component = setup(props);

    expect(component.find('div.payment-option-list')).toHaveLength(1);
    expect(component.find('#cashAmount')).toHaveLength(1);
    expect(component.find('div.payment-cash-change.payment-cash-change-indent')).toHaveLength(0);
    expect(component.find('#cashPaid')).toHaveLength(0);

    const confirmButton = component.find('.payment-amount-exception-alert').find('button.btn-strong');
    confirmButton.simulate('click');

    const amountInput = component.find(InputNumeric).at(0);
    const amountInputHtmlElement = component.find('#cashAmount');
    expect(amountInputHtmlElement).toHaveLength(1);

    amountInput.node.input.value = 200;
    amountInputHtmlElement.simulate('blur');
    confirmButton.simulate('click', '');
    expect(actions.changeCashAmount).toHaveBeenCalled();
    expect(actions.changeRemaining).toHaveBeenCalled();
    expect(actions.calculateCashChange).toHaveBeenCalledTimes(1);

    amountInput.node.input.value = 400;
    amountInputHtmlElement.simulate('blur');
    confirmButton.simulate('click', '');
    expect(actions.calculateCashChange).toHaveBeenCalledTimes(1);
  });
});
