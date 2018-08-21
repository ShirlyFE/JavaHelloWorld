import React from 'react';
import toJson from 'enzyme-to-json';
import { mount } from 'enzyme';
import { fromJS } from 'immutable';
import Alert from 'shared/components/Alert';
import { PaymentOptions } from 'index/Payment/components/PaymentOptions';
import { fieldProps } from 'index/Payment/consts'
import InputNumeric from 'react-base-ui/lib/components/InputNumeric';
import resetActions from 'utils/resetActions';
import { pages } from 'shared/consts';
import Check from 'index/Payment/components/PaymentOptions/Check';
import CreditCard from 'index/Payment/components/PaymentOptions/CreditCard';
import PaymentPlan from 'index/Payment/components/PaymentOptions/PaymentPlan';
import GiftCard from 'index/Payment/components/PaymentOptions/GiftCard';
import Credit from 'index/Payment/components/PaymentOptions/Credit';
import DebitCard from 'index/Payment/components/PaymentOptions/DebitCard';
import Cash from 'index/Payment/components/PaymentOptions/Cash';
import Account from 'index/Payment/components/PaymentOptions/Account';
import ElectronicCheck from 'index/Payment/components/PaymentOptions/ElectronicCheck';

jest.mock('index/Payment/components/PaymentOptions/Check', () => 'Check');
jest.mock('index/Payment/components/PaymentOptions/CreditCard', () => 'CreditCard');
jest.mock('index/Payment/components/PaymentOptions/ElectronicCheck', () => 'ElectronicCheck');
jest.mock('index/Payment/components/PaymentOptions/PaymentPlan', () => 'PaymentPlan');
jest.mock('index/Payment/components/PaymentOptions/GiftCard', () => 'GiftCard');
jest.mock('index/Payment/components/PaymentOptions/Credit', () => 'Credit');
jest.mock('index/Payment/components/PaymentOptions/DebitCard', () => 'DebitCard');
jest.mock('index/Payment/components/PaymentOptions/Cash', () => 'Cash');
jest.mock('index/Payment/components/PaymentOptions/Account', () => 'Account');
jest.mock('index/Payment/components/PaymentOptions/ElectronicCheck/AuthorizationDetails', () => 'AuthorizationDetails');

jest.mock('index/Payment/components/PaymentOptions/utils/payment', () => ({
  getDefaultAmount: jest.fn().mockReturnValue(300),
  getRemaining: jest.fn((index) => index ? 300 : -100)
}));

jest.mock('index/Payment/utils/splitOptions', () => ({
  deleteOption: jest.fn(),
  changeOption: jest.fn(),
  getAvailableOptionIds: jest.fn().mockReturnValue([113, 114, 117]),
  getFormatAmount: jest.fn()
}));

describe('index/Payment/components/PaymentOptions', () => {
  const actions = {
    fetchAutoPaymentMethodList: jest.fn(),
    splitPaymentAction: jest.fn(),
    deletePaymentOptionAction: jest.fn(),
    changePaymentAction: jest.fn(),
    resetPaymentDeleteFlagAction: jest.fn(),
    changePayNowAmountAction: jest.fn(),
    resetGiftCardList: jest.fn(func => func && func()),
    cancelSelectGiftCard: jest.fn(),
    fetchGiftCardList: jest.fn(() => Promise.resolve('')),
    changeGiftCardOption: jest.fn(f => f()),
    changeRemaining: jest.fn(),
    clearOptionErrorAction: jest.fn(),
    clearErrors: jest.fn(),
    removeNewGiftCardAsyncAction: jest.fn(),
    changePaymentPlanAmount: jest.fn(),
    showErrors: jest.fn()
  };

  afterEach(() => {
    resetActions(actions);
  });

  const setup = (props) => mount(<PaymentOptions {...props} />);

  const noErrorState = {
    paynowAlert: {
      title: 'Reset Payment Method',
      message: 'Payment method will be reset, are you sure you want to continue?',
      isError: false
    }
  };
  const defaultPayOptions = {
    data: [
      { ComponentName: 'Check', activeVal: 100 },
      { ComponentName: 'Cash', activeVal: 100 },
      { ComponentName: 'Credit', activeVal: 100 },
      { ComponentName: 'CreditCard', activeVal: 100 },
      { ComponentName: 'ElectronicCheck', activeVal: 100 },
      { ComponentName: 'GiftCard', activeVal: 100 },
      { ComponentName: 'DebitCard', activeVal: 100 },
      { ComponentName: 'PaymentPlan', activeVal: 100, disabled: true },
      { ComponentName: 'Account', activeVal: 100 },
      { ComponentName: '', activeVal: 0 }
    ],
    availableSplitIds: [],
    deleteAPayment: true,
  };
  const defaultEcheckOption = {
    eCheckConfig: {
      show_ach_agreement_for_ecp: true
    }
  };
  const defaultPayment = {
    isDistributePayment: true,
    paymentPlanAmount: 500,
    paymentPlanWording: 'PaymentPlanX',
    paymentPageIndex: 2,
    successPay: false,
    minimumPayNowAmount: 100,
    total: 500,
    payNow: 500,
    isPaymentActionValid: true
  };
  const getProps = (gitCardId, payOptions=defaultPayOptions, echeckOption=defaultEcheckOption, payment=defaultPayment) => ({
    paymentOptions: {
      options: fromJS(payOptions),
      eCheck: fromJS(echeckOption),
      giftCard: fromJS({
        giftCardId: gitCardId,
      })
    },
    payment: fromJS(payment),
    payer: fromJS({
      params: {
        customerId: -1,
        companyId: 15
      }
    }),
    paymentAction: fromJS({
      isSelectMakeAPayment: false
    }),
    isRefund: false,
    showAuthorizationDetails: jest.fn(),
    initialData: {
      permitID: -1,
      paymentPlanInitData: __initialState__.paymentPlanInitData
    },
    ...actions
  });

  it('component should render correctly', () => {
    const component = setup(getProps(113));
    expect(toJson(component)).toMatchSnapshot();
  });

  it('Should pay all when modify the permit by pay the charge or refund the deposit', () => {
    const component = setup(getProps(
      113,
      undefined,
      undefined,
      {
        ...defaultPayment,
        paymentPageIndex: pages.CHARGE_IN_REFUND_FEES,
        errors: ['test err']
      }
    ));
    expect(component.find('InputNumeric').at(0).props().disabled).toEqual(true);
    component.setProps({ isRefund: true });
    expect(component.find('InputNumeric').length).toBe(0);
  });

  it('component should render correctly if it\'s modify', () => {
    const props = getProps();
    const modifyProps = Object.assign({}, props, {
      initialData: {
        permitID: 1862,
        paymentPlanInitData: __initialState__.paymentPlanInitData
      }
    });
    const component = setup(modifyProps);
    expect(toJson(component)).toMatchSnapshot();
  });

  it('component should work fine', () => {
    const props = getProps();
    const component = setup(props);
    const instance = component.instance();

    expect(component).toHaveLength(1);
    expect(component.find('span.paymentplan-label')).toHaveLength(1);
    expect(instance.state.echeckNeedAgreement).toBeFalsy();
    expect(instance.state.paynowAlert.title).toEqual('Reset Payment Method');
    expect(instance.state.paynowAlert.isError).toBeFalsy();
    expect(instance.state.paynowAlert.message).toEqual('Payment method will be reset, are you sure you want to continue?');

    component.find(Check).simulate('change', 100);
    component.instance().clearOptionAndPaymentErrs(0);
    expect(actions.changePaymentAction).toHaveBeenCalledTimes(1);
    expect(actions.clearOptionErrorAction).toHaveBeenCalled();
    expect(actions.clearErrors).toHaveBeenCalled();

    component.find(Cash).simulate('change');
    expect(actions.changePaymentAction).toHaveBeenCalledTimes(2);

    component.find(Credit).simulate('change');
    expect(actions.changePaymentAction).toHaveBeenCalledTimes(3);

    component.find(CreditCard).simulate('change');
    expect(actions.changePaymentAction).toHaveBeenCalledTimes(4);

    component.find(ElectronicCheck).simulate('change');
    expect(actions.changePaymentAction).toHaveBeenCalledTimes(5);

    component.find(GiftCard).simulate('change');
    expect(actions.changePaymentAction).toHaveBeenCalledTimes(6);

    component.find(DebitCard).simulate('change');
    expect(actions.changePaymentAction).toHaveBeenCalledTimes(7);

    expect(component.find(PaymentPlan)).toHaveLength(1);

    component.find(Account).simulate('change');
    expect(actions.changePaymentAction).toHaveBeenCalledTimes(8);

    resetActions(actions);
    const amountInput = component.find(InputNumeric);
    const amountInputHtmlElement = component.find('input').first();
    const alerts = component.find('.modal--alert');

    amountInput.node.input.value = 0;
    amountInput.node.props.onValueChange({ value: 0 });
    amountInputHtmlElement.simulate('blur');
    expect(instance.state.paynowAlert.title).toEqual('System Message');
    expect(instance.state.paynowAlert.isError).toBeTruthy();
    expect(instance.state.paynowAlert.message).toEqual('Please enter the payment amount.');
    expect(alerts.at(1).find('div.is-open')).toHaveLength(1);
    alerts.at(1).find('button.btn-strong').simulate('click');
    expect(actions.changePayNowAmountAction).not.toBeCalled();
    component.setState(noErrorState);

    amountInput.node.input.value = 50;
    amountInput.node.props.onValueChange({ value: 50 });
    amountInputHtmlElement.simulate('blur');
    expect(instance.state.paynowAlert.title).toEqual('System Message');
    expect(instance.state.paynowAlert.isError).toBeTruthy();
    expect(instance.state.paynowAlert.message).toEqual('The Pay Now amount cannot be less than 100.00.');
    expect(alerts.at(1).find('div.is-open')).toHaveLength(1);
    alerts.at(1).find('span.modal-close').simulate('click');
    expect(instance.cache.paynow).toBeNull();
    component.setState(noErrorState);

    amountInput.node.input.value = 300;
    amountInput.node.props.onValueChange({ value: 300 });
    amountInputHtmlElement.simulate('blur');
    expect(instance.state.paynowAlert.isError).toBeFalsy();
    component.setState(noErrorState);

    amountInput.node.input.value = 500;
    amountInput.node.props.onValueChange({ value: 500 });
    amountInputHtmlElement.simulate('blur');
    expect(instance.state.paynowAlert.isError).toBeFalsy();
    component.setState(noErrorState);

    amountInput.node.input.value = 600;
    amountInput.node.props.onValueChange({ value: 600 });
    amountInputHtmlElement.simulate('blur');
    expect(instance.state.paynowAlert.title).toEqual('System Message');
    expect(instance.state.paynowAlert.isError).toBeTruthy();
    expect(instance.state.paynowAlert.message).toEqual(fieldProps.MAX_AMOUNT_MESSAGE_ON_NOT_REFUND);
    component.setState(noErrorState);

    resetActions(actions);
    component.find('.payment-splition').simulate('click');
    expect(actions.changePayNowAmountAction).not.toHaveBeenCalled();

    resetActions(actions);
    component.find('i.icon-trash').at(7).simulate('click');
    alerts.at(0).find('span.modal-close').simulate('click');
    expect(alerts.at(0).find('div.is-open')).toHaveLength(0);
    expect(instance._deleteKey).toBeUndefined()
    expect(instance._deleteActiveVal).toBeUndefined();

    resetActions(actions);
    component.find('i.icon-trash').at(4).simulate('click');
    expect(instance._deleteKey).toEqual(4);
    expect(instance._deleteActiveVal).toEqual(100);
    expect(alerts.at(0).find('div.is-open')).toHaveLength(1);
    alerts.at(0).find('button.btn-strong').simulate('click');
    expect(actions.cancelSelectGiftCard).toHaveBeenCalled();
    expect(actions.deletePaymentOptionAction).toHaveBeenCalled();
    expect(actions.changeRemaining).toHaveBeenCalled();

    resetActions(actions);
    component.find('i.icon-trash').at(5).simulate('click');
    expect(instance._deleteKey).toEqual(5);
    expect(instance._deleteActiveVal).toEqual(100);
    alerts.at(0).find('button.btn-secondary').simulate('click');
    expect(actions.cancelSelectGiftCard).not.toHaveBeenCalled();
    expect(actions.deletePaymentOptionAction).not.toHaveBeenCalled();

    const newProps1 = Object.assign({}, getProps(), {
      paymentAction: fromJS({
        isSelectMakeAPayment: true,
      }),
      payment: props.payment.set('isPaymentActionValid', false)
    });
    component.setProps(newProps1);
    expect(actions.resetPaymentDeleteFlagAction).toBeCalled();
    expect(component.find('span.paymentplan-label')).toHaveLength(1);

    amountInput.node.input.value = 600;
    amountInput.node.props.onValueChange({ value: 600 });
    amountInputHtmlElement.simulate('blur');
    expect(instance.state.paynowAlert.title).toEqual('System Message');
    expect(instance.state.paynowAlert.isError).toBeTruthy();
    expect(instance.state.paynowAlert.message).toEqual('The Pay Now amount cannot be larger than the total amount.');
    component.setState(noErrorState);
  });

  it('component should render fine if disabled', () => {
    const props = Object.assign({}, getProps(), {
      payer: fromJS({
        params: {
          customerId: -1,
          companyId: -1
        }
      })
    });
    const component = setup(props);

    expect(component).toBeTruthy();
    expect(component.find('div.u-hidden').node).toBeTruthy();
  });

  it('component should render fine if it\'s refund', () => {
    const props = getProps();
    const newProps1 = Object.assign({}, props, {
      isRefund: true,
      showAuthorizationDetails: null,
      paymentAction: props.paymentAction.set('isSelectModifyPaymentPlan', true)
    });
    const component = setup(newProps1);

    expect(component).toBeTruthy();
    expect(component.find('div.payment-paynow')).toHaveLength(0);
    expect(component.find('div.payment-splition')).toHaveLength(0);
    expect(component.find('h2').text()).toEqual('PaymentPlanX');
  });

  it('component should render fine if meets error', () => {
    const props = getProps(113);
    const props1 = Object.assign({}, props, {
      payment: props.payment.set('errors', fromJS([
        { key: 0, name: 'check error', message: 'mock check error' }
      ]))
    });

    const component = setup(props1);
    expect(component).toBeTruthy();

    const instance = component.instance();
    resetActions(actions);
    instance.onChange(100, 100, 0);
    expect(actions.changeGiftCardOption).not.toHaveBeenCalled();

    instance.onChange(113, 100, 5);
    expect(actions.clearOptionErrorAction).toHaveBeenCalled();
    expect(actions.clearErrors).toHaveBeenCalled();
    expect(actions.changeGiftCardOption).toHaveBeenCalled();
    expect(actions.showErrors).not.toHaveBeenCalled();

    resetActions(actions);
    const props2 = getProps(113);
    const optionsWithError = props2.paymentOptions.options
      .setIn(['data', 3, 'activeVal'], 80)
      .setIn(['data', 3, 'errors'], fromJS([{ name: 'cvv2 invalid', message: 'mock cvv2 error' }]));
    props2.paymentOptions.options = optionsWithError;
    component.setProps(props2);
    expect(actions.showErrors).toHaveBeenCalled();
  });

  it('paymentPlan should works well', () => {
    const props = getProps();
    const component = setup(props);
    const instance = component.instance();
    const amountInputHtmlElement = component.find('input').last();
    const alerts = component.find(Alert);
    const closeSpy = jest.spyOn(instance, 'closePaynowAlert');
    const changePayNowSpy = jest.spyOn(instance, 'changePaynowAmount');
    instance._paymentPlan.value = 410;

    amountInputHtmlElement.simulate('blur');
    expect(actions.changePaymentPlanAmount).toHaveBeenCalled();
    expect(component.state().paymentPlanAlert).toEqual({
      title: 'System Message',
      message: 'The Pay Now amount cannot be less than 100.00.',
      isError: true
    });

    instance._paymentPlan.value = 510;
    amountInputHtmlElement.simulate('blur');
    expect(actions.changePaymentPlanAmount).toHaveBeenCalled();
    expect(component.state().paymentPlanAlert).toEqual({
      title: 'System Message',
      message: 'The Payment Plan amount cannot be larger than the total amount.',
      isError: true
    });

    instance._paymentPlan.value = 210;
    amountInputHtmlElement.simulate('blur');
    expect(changePayNowSpy).toHaveBeenCalled();

    instance.cache = {
      paynow: {
        preValue: 10
      }
    };
    alerts.get(1).props.onCancel()
    expect(closeSpy).toHaveBeenCalled();
    expect(instance.cache.paynow).toEqual(null);

  });
});
