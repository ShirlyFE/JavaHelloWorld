import React from 'react';
import toJson from 'enzyme-to-json';
import { mount } from 'enzyme';
import { Check } from 'index/Payment/components/PaymentOptions/Check';
import InputNumeric from 'react-base-ui/lib/components/InputNumeric';
import Dropdown from 'react-base-ui/lib/components/Dropdown';
import resetActions from 'utils/resetActions';

jest.mock('index/Payment/components/PaymentOptions/utils/payment', () => ({
  getDefaultAmount: jest.fn(() => (300)),
  getRemaining: jest.fn((index, amount) => amount <= 300 ? -50 : {
    remaining: `$${amount}`
  })
}));

describe('index/Payment/components/PaymentOptions/Check', () => {
  const actions = {
    changeCheckAmount: jest.fn(),
    changeRemaining: jest.fn(),
    updateCheckNumber: jest.fn(),
    clearOptionAndPaymentErrs: jest.fn(),
    onChange: jest.fn()
  };

  const setup = (props) => mount(<Check {...props} />);

  afterEach(() => {
    resetActions(actions);
  });

  it('Check component should render without error', () => {
    const props = {
      item: {
        list: [
          { value: '172', name: 'Credit' },
          { value: '173', name: 'Check' }
        ],
        amount: 0,
        formatCheckAmount: 300,
        errors: [
          {
            key: 0,
            name: 'checkNumber'
          }
        ]
      },
      value: '173',
      index: 0,
      optionLen: 3,
      children: (<span>Check info</span>),
      isRefund: false,
      ...actions
    };
    const component = setup(props);
    expect(toJson(component)).toMatchSnapshot();
  });

  it('Check component in refund workflow should render without error', () => {
    const props = {
      item: {
        list: [
          { value: '172', name: 'Credit' },
          { value: '173', name: 'Check' }
        ],
        amount: 200,
        formatCheckAmount: 200,
        checkNumber: '623'
      },
      value: '173',
      index: 0,
      optionLen: 3,
      children: (<span>Check info</span>),
      isRefund: true,
      ...actions
    };

    const component = setup(props);
    expect(toJson(component)).toMatchSnapshot();
  });

  it('Check component change payment option and amount should work fine', () => {
    const props = {
      item: {
        list: [
          { value: '172', name: 'Credit' },
          { value: '173', name: 'Check' }
        ],
        amount: 200,
        formatCheckAmount: 300,
        checkNumber: ''
      },
      value: '173',
      index: 0,
      optionLen: 3,
      children: (<span>Check info</span>),
      isRefund: false,
      ...actions
    };

    const component = setup(props);

    expect(component.find('.payment-check')).toHaveLength(1);
    expect(component.find('.payment-check-number')).toHaveLength(1);
    expect(component.find('#checkAmount')).toHaveLength(1);

    const confirmButton = component.find('.payment-amount-exception-alert').find('button.btn-strong');
    confirmButton.simulate('click');

    const paymentOptionDropdown = component.find(Dropdown);
    expect(paymentOptionDropdown).toHaveLength(1)
    paymentOptionDropdown.node.props.onChange({});
    expect(actions.onChange).toBeCalled();

    const checkNumInput = component.find('.payment-check-number').find('input');
    checkNumInput.simulate('blur');
    expect(actions.updateCheckNumber).toHaveBeenCalled();

    const amountInput = component.find(InputNumeric);
    const amountInputHtmlElement = component.find('#checkAmount');
    amountInputHtmlElement.simulate('blur');
    expect(actions.changeCheckAmount).not.toHaveBeenCalled();
    expect(actions.changeRemaining).not.toHaveBeenCalled();

    confirmButton.simulate('click');
    expect(actions.changeCheckAmount).toHaveBeenCalledTimes(1);
    expect(actions.changeRemaining).toHaveBeenCalledTimes(1);

    amountInput.node.input.value = 400;
    amountInputHtmlElement.simulate('blur');
    expect(actions.changeCheckAmount).toHaveBeenCalledTimes(2);
    expect(actions.changeRemaining).toHaveBeenCalledTimes(2);
  });

  it('Check component refund process should work fine', () => {
    const props = {
      item: {
        list: [
          { value: '172', name: 'Credit' },
          { value: '173', name: 'Check' }
        ],
        amount: 200,
        formatCheckAmount: 300,
      },
      value: '173',
      index: 0,
      optionLen: 3,
      children: (<span>Check info</span>),
      isRefund: true,
      ...actions
    };

    const component = setup(props);

    expect(component.find('.payment-check')).toHaveLength(1);
    expect(component.find('.payment-check-number')).toHaveLength(0);
    expect(component.find('#checkAmount')).toHaveLength(1);

    const amountInput = component.find(InputNumeric);
    const amountInputHtmlElement = component.find('#checkAmount');
    amountInputHtmlElement.simulate('blur');
    expect(actions.changeCheckAmount).not.toHaveBeenCalled();
    expect(actions.changeRemaining).not.toHaveBeenCalled();

    resetActions(actions);
    const confirmButton = component.find('.payment-amount-exception-alert').find('button.btn-strong');
    confirmButton.simulate('click');
    expect(actions.changeCheckAmount).toHaveBeenCalled();
    expect(actions.changeRemaining).toHaveBeenCalled();

    resetActions(actions);
    amountInput.node.input.value = 400;
    amountInputHtmlElement.simulate('blur');
    expect(actions.changeCheckAmount).toHaveBeenCalled();
    expect(actions.changeRemaining).toHaveBeenCalled();
  });

  it('Check component should work fine even if meets error', () => {
    const props = {
      item: {
        list: [
          { value: '172', name: 'Credit' },
          { value: '173', name: 'Check' }
        ],
        amount: 200,
        formatCheckAmount: 300,
        errors: [
          { message: 'mock check error', name: '' },
          { message: 'mock check number error', name: 'checkNumber' }

        ]
      },
      value: '173',
      index: 0,
      optionLen: 3,
      children: (<span>Check info</span>),
      ...actions
    };

    const component = setup(props);

    expect(component.find('.payment-check')).toHaveLength(1);
    expect(component.find('.payment-check-number')).toHaveLength(1);
    expect(component.find('#checkAmount')).toHaveLength(1);
    expect(component.find('.payment-option-list--error')).toHaveLength(1);

    const amountInput = component.find(InputNumeric);
    const amountInputHtmlElement = component.find('#checkAmount');
    amountInputHtmlElement.simulate('blur');
    expect(actions.changeCheckAmount).not.toHaveBeenCalled();
    expect(actions.changeRemaining).not.toHaveBeenCalled();

    resetActions(actions);
    const checkNumberInput = component.find('.payment-check-number').find('input');
    checkNumberInput.simulate('focus');
    expect(actions.clearOptionAndPaymentErrs).toHaveBeenCalledTimes(1);
    expect(actions.updateCheckNumber).not.toHaveBeenCalled();
    checkNumberInput.simulate('blur', { value: '123' }, true);
    expect(actions.clearOptionAndPaymentErrs).toHaveBeenCalledTimes(2);
    expect(actions.updateCheckNumber).toHaveBeenCalled();

    resetActions(actions);
    const confirmButton = component.find('.payment-amount-exception-alert').find('button.btn-strong');
    confirmButton.simulate('click');
    expect(actions.changeCheckAmount).toHaveBeenCalled();
    expect(actions.changeRemaining).toHaveBeenCalled();

    resetActions(actions);
    amountInput.node.input.value = 400;
    amountInputHtmlElement.simulate('blur');
    expect(actions.changeCheckAmount).toHaveBeenCalled();
    expect(actions.changeRemaining).toHaveBeenCalled();
  });
});
