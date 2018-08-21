import configureStore from 'redux-mock-store';
import { fromJS } from 'immutable';
import middlewares from 'shared/api/middlewares';
import * as actions from 'index/Payment/actions/paymentOptions/creditCard';
import { PAYMENT_OPTIONS_UPDATE_BY_KEY } from 'index/Payment/actions/paymentOptions/options';
import jsonGetIframeURL from 'json/Payment/getIframeUrl.json';
import mockAPI from 'utils/mockAPI';

jest.mock('index/Payment/store', () => ({
  getState: jest.fn(),
  dispatch: jest.fn()
}));

describe('index -> payment -> actions -> paymentOptions -> creditCard', () => {
  let store = null;

  beforeEach(() => {
    const mockStore = configureStore(middlewares);
    store = mockStore({
      initialData: {
        permitID: 12,
        batchID: 0,
        receiptID: 1222,
        showPriorCC: false
      },
      payment: fromJS({
        isRefund: false
      })
    });
  });

  afterEach(() => {
    store.clearActions();
  });

  it('setCreditCardLableAction method should work fine', () => {
    const { setCreditCardLableAction, CREDITCARD_UPDATE_LABLE } = actions;
    store.dispatch(setCreditCardLableAction('CreditCardLabel'));
    const storeActions = store.getActions();
    expect(storeActions.some(action => action.type === CREDITCARD_UPDATE_LABLE)).toBeTruthy();
  });

  it('changeCreditCardAmount method should work fine', () => {
    const { changeCreditCardAmount } = actions;
    store.dispatch(changeCreditCardAmount({ amount: 100, key: 'amount', formatCreditCardAmount: '$100.00' }));
    const storeActions = store.getActions();
    expect(storeActions.some(action => action.type === PAYMENT_OPTIONS_UPDATE_BY_KEY)).toBeTruthy();
  });

  it('addCreidtCardAction method should work fine', () => {
    const { addCreidtCardAction, CREDITCARD_ADD_NEW_CREDITCARD } = actions;
    store.dispatch(addCreidtCardAction(0, {}));
    const storeActions = store.getActions();
    expect(storeActions.some(action => action.type === CREDITCARD_ADD_NEW_CREDITCARD)).toBeTruthy();
  });

  it('changeCreditCardAction method should work fine', () => {
    const { changeCreditCardAction } = actions;
    store.dispatch(changeCreditCardAction(0, 120));
    const storeActions = store.getActions();
    expect(storeActions.some(action => action.type === PAYMENT_OPTIONS_UPDATE_BY_KEY)).toBeTruthy();
  });

  it('getPriorCreditCardListAction method should work fine', () => {
    const { getPriorCreditCardListAction, CREDITCARD_FETCH_LIST_SUCCESS } = actions;
    return store.dispatch(getPriorCreditCardListAction(true, true)).then(() => {
      const storeActions = store.getActions();
      expect(storeActions.some(action => action.type === CREDITCARD_FETCH_LIST_SUCCESS)).toBeTruthy();
    });
  });

  it('fetchCreditCardListAction method should work fine', () => {
    const { fetchCreditCardListAction, CREDITCARD_SETUP_NEW_CARD_ONLY } = actions;
    store.dispatch(fetchCreditCardListAction());
    const storeActions = store.getActions();
    expect(storeActions.some(action => action.type === CREDITCARD_SETUP_NEW_CARD_ONLY)).toBeTruthy();
  });

  it('fetchCreditCardListAction method should work fine if it\'s refund', () => {
    const { fetchCreditCardListAction, CREDITCARD_FETCH_LIST_SUCCESS } = actions;
    const store = configureStore(middlewares)({
      initialData: {
        permitID: 12,
        batchID: 0,
        receiptID: 1222,
        showPriorCC: false
      },
      payment: fromJS({
        isRefund: true
      })
    });
    const optIndex = 0;
    return store.dispatch(fetchCreditCardListAction(optIndex)).then(() => {
      const storeActions = store.getActions();
      expect(storeActions.some(action => action.type === CREDITCARD_FETCH_LIST_SUCCESS)).toBeTruthy();
      expect(storeActions.some(action => action.type === PAYMENT_OPTIONS_UPDATE_BY_KEY)).toBeTruthy();
    });
  });

  it('fetchCreditCardListAction method should work fine if it\'s in new permit workflow and should show the saved cc when pay with credit card.', (done) => {
    const { fetchCreditCardListAction } = actions;
    const store = configureStore(middlewares)({
      initialData: {
        permitID: 12,
        batchID: 0,
        receiptID: 1222,
        showPriorCC: true
      },
      payment: fromJS({
        isRefund: false
      })
    });
    const optIndex = 0;
    return store.dispatch(fetchCreditCardListAction(optIndex)).then(() => {
      const storeActions = store.getActions();
      expect(storeActions.length).toBe(2);
      expect(storeActions.some(action => action.type === 'Payment/PaymentOptions/CREDITCARD_FETCH_LIST_SUCCESS')).toBeTruthy();
      done();
    });
  });

  it('getIframeUrlAsyncAction should work well when in refund workflow and used device for credit card payment.', (done) => {
    const { getIframeUrlAsyncAction } = actions;
    const store = configureStore(middlewares)({
      initialData: {
        permitID: 12,
        batchID: 0,
        receiptID: 1222,
        showPriorCC: true,
        ccScanWithApdDevice: true
      },
      payment: fromJS({
        isRefund: true
      }),
      payer: fromJS({
        params: {
          customerId: 1,
          companyId: 0
        }
      }),
      paymentAction: fromJS({
        isSelectModifyPaymentPlan: false
      })
    });
    const showPriorCC = true;
    return store.dispatch(getIframeUrlAsyncAction(showPriorCC)).then((url) => {
      const storeActions = store.getActions();
      expect(storeActions.length).toBeGreaterThanOrEqual(2);
      const getUrlSuccessAction = storeActions.filter(action => action.type === 'NOACTION');
      expect(getUrlSuccessAction.length).toBe(1);
      expect(getUrlSuccessAction[0].payload).toEqual(jsonGetIframeURL);
      expect(url).toEqual('https://checkoutcui-vip.int.aw.dev.activenetwork.com/checkout/index/payment-method?code=84e90b89-4147-46ae-8489-bf99724808df')
      done();
    });
  })

  it('getIframeUrlAsyncAction should work well when in refund workflow and did not use device for credit card payment, and can not refund to new cc.', (done) => {
    const { getIframeUrlAsyncAction } = actions;
    const store = configureStore(middlewares)({
      initialData: {
        permitID: 12,
        batchID: 0,
        receiptID: 1222,
        showPriorCC: true,
        ccScanWithApdDevice: false,
        ccScanWithMagesafeDevice: false
      },
      payment: fromJS({
        isRefund: true
      }),
      payer: fromJS({
        params: {
          customerId: 1,
          companyId: 0
        }
      }),
      paymentAction: fromJS({
        isSelectModifyPaymentPlan: false
      })
    });
    const showPriorCC = true;
    return store.dispatch(getIframeUrlAsyncAction(showPriorCC)).then((url) => {
      const storeActions = store.getActions();
      expect(storeActions.length).toBeGreaterThanOrEqual(2);

      const getUrlSuccessAction = storeActions.filter(action => action.type === 'NOACTION');
      expect(getUrlSuccessAction.length).toBe(1);
      expect(getUrlSuccessAction[0].payload).toEqual(jsonGetIframeURL);
      expect(url).toEqual('https://checkoutcui-vip.int.aw.dev.activenetwork.com/checkout/index/payment-method?code=84e90b89-4147-46ae-8489-bf99724808df')
      
      done();
    });
  })

  it('getIframeUrlAsyncAction should work well when not in the refund workflow.', (done) => {
    const { getIframeUrlAsyncAction } = actions;
    const store = configureStore(middlewares)({
      initialData: {
        permitID: 12,
        batchID: 0,
        receiptID: 1222,
        showPriorCC: true,
        ccScanWithApdDevice: false,
        ccScanWithMagesafeDevice: false
      },
      payment: fromJS({
        isRefund: false
      }),
      payer: fromJS({
        params: {
          customerId: 1,
          companyId: 0
        }
      }),
      paymentAction: fromJS({
        isSelectModifyPaymentPlan: true
      })
    });
    const showPriorCC = true;

    return store.dispatch(getIframeUrlAsyncAction(showPriorCC)).then((url) => {
      const storeActions = store.getActions();
      expect(storeActions.length).toBeGreaterThanOrEqual(2);

      const getUrlSuccessAction = storeActions.filter(action => action.type === 'NOACTION');
      expect(getUrlSuccessAction.length).toBe(1);
      expect(getUrlSuccessAction[0].payload).toEqual(jsonGetIframeURL);
      expect(url).toEqual('https://checkoutcui-vip.int.aw.dev.activenetwork.com/checkout/index/payment-method?code=84e90b89-4147-46ae-8489-bf99724808df')
 
      done();
    });
  })
  it('submitCCPaymentIframeAsyncAction method should work fine if the pci iframe has not prepare well', (done) => {
    const { submitCCPaymentIframeAsyncAction } = actions;

    submitCCPaymentIframeAsyncAction()().catch(
      (err) => {
        expect(err).toEqual('the payment instance has not been init yet.');
        done()
      }
    )
  });

  it('submitCCPaymentIframeAsyncAction method should work fine if the pci iframe has prepare well', () => {
    const { submitCCPaymentIframeAsyncAction, getInstanceAction } = actions;
    const mockIframeInstance = {
      submitIframePromise: jest.fn()
    };
    
    getInstanceAction(mockIframeInstance)();
    submitCCPaymentIframeAsyncAction()();

    expect(mockIframeInstance.submitIframePromise).toHaveBeenCalled();
  });
});
