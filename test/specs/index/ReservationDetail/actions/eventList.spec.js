import configureStore from 'redux-mock-store';
import { fromJS } from 'immutable';
import middlewares from 'shared/api/middlewares';
import mockAPI from 'utils/mockAPI';
import * as actions from 'index/ReservationDetail/actions/eventList';
import _ from 'lodash';

describe('index -> ReservationDetail -> actions -> eventList', () => {
  let store = null;
  const mockStore = configureStore(middlewares);

  beforeEach(() => {
    store = mockStore({});
  });

  afterEach(() => {
    store.clearActions();
  });

  it('configEvent should work fine', (done) => {
    const { CONFIG_EVENT, configEvent } = actions;

    store.dispatch(configEvent([]));
    const action = _.first(store.getActions());

    expect(typeof action).toBe('object');
    expect(action.type).toBe(CONFIG_EVENT);
    done();
  });

  it('showDetail should work fine', (done) => {
    const { SHOW_DETAIL, showDetail } = actions;

    store.dispatch(showDetail(1));
    const action = _.first(store.getActions());

    expect(typeof action).toBe('object');
    expect(action.type).toBe(SHOW_DETAIL);
    done();
  });

  it('showUpdated should work fine', (done) => {
    const { SHOW_UPDATED, showUpdated } = actions;

    store.dispatch(showUpdated(1));
    const action = _.first(store.getActions());

    expect(typeof action).toBe('object');
    expect(action.type).toBe(SHOW_UPDATED);
    done();
  });


  it('setEventConfig should work fine', (done) => {
    const { SET_EVENT_CONFIG, setEventConfig } = actions;

    store.dispatch(setEventConfig({ eventDetailConfig: {}, eventID: 1 }));
    const action = _.first(store.getActions());

    expect(typeof action).toBe('object');
    expect(action.type).toBe(SET_EVENT_CONFIG);
    done();
  });

  it('getEventDetail should work fine', (done) => {
    const { FETCH_EVENT_DETAIL, getEventDetail } = actions;

    store.dispatch(getEventDetail({ batchID: 1, receiptID: 2, eventID: 3, eventName: 'test' }));
    const action = _.first(store.getActions());
    expect(typeof action).toBe('object');
    expect(action.type).toBe(FETCH_EVENT_DETAIL);
    done();
  });

  it('setEventValidStatus should work fine', (done) => {
    const { SET_EVENT_VALID_STATUS, setEventValidStatus } = actions;

    store.dispatch(setEventValidStatus({ eventIndex: 1 }));
    const action = _.first(store.getActions());
    expect(typeof action).toBe('object');
    expect(action.type).toBe(SET_EVENT_VALID_STATUS);
    done();
  });

  it('showAllInvalidEventDetail should work fine', (done) => {
    const { SHOW_ALL_INVALID_EVENT_DETAIL, showAllInvalidEventDetail } = actions;

    store.dispatch(showAllInvalidEventDetail({ invalidWaiverEvents: [1] }));
    const action = _.first(store.getActions());
    expect(typeof action).toBe('object');
    expect(action.type).toBe(SHOW_ALL_INVALID_EVENT_DETAIL);
    done();
  });

  it('checkAllWaiverRequried should work fine', () => {
    const { checkAllWaiverRequried } = actions;
    const allwaivers = fromJS({
      event_3555_0: {
        data: [
          {
            waiverIndex: 1,
            displayPermitSelected: true,
            isRequired: true,
            agreetowaiverSelected: ''
          }
        ],
        hasNew: false
      }
    });
    const eventValidStatus = fromJS({ event_3555_0: false });

    const result = checkAllWaiverRequried(allwaivers, eventValidStatus, true);

    expect(result).toEqual({
      allRequired: false,
      errors: { 1: 'Required' },
      invalidWaiverEvents: ['event_3555_0'],
      confirmChangeWaiverError: { 1: { error: 'Required', eventIndex: '3555_0' } }

    });
  });

  it('updateEventSummary should work fine', () => {
    const { updateEventSummary, UPDATE_EVENT_SUMMARY } = actions;

    store.dispatch(updateEventSummary('eventInfo', 32));
    const action = _.first(store.getActions());

    expect(typeof action).toBe('object');
    expect(action.type).toBe(UPDATE_EVENT_SUMMARY);
    expect(action.payload).toEqual({
      eventInfo: 'eventInfo',
      eventIndex: 32
    });
  });

  it('updateFee should work fine', () => {
    const { updateFee } = actions;
    const results = {
      event_detail: {
        fee_summary: {
          sub_total: 1,
          taxes: [],
          total: 1,
          amount_paid: 0,
          due_now: 1,
          refund_amount: 0
        },
        event_fee: {
          event_id: 3552,
          event_name: 'Hello',
          permit_id: 4598,
          resource_count: 1,
          booking_count: 1,
          event_fee_total: 1,
          facility_fees: []
        },
        is_event_updated: true
      }
    };


    store.dispatch(updateFee(results, '3553_0'));
    const allActions = store.getActions();

    expect(allActions.length).toBe(3);
    expect(allActions[2].type).toBe('UPDATE_EVENT_SUMMARY');
  });

  it('fetchReservationFeeThenUpdate should work fine', (done) => {
    const {
      fetchReservationFeeThenUpdate
    } = actions;

    const params = {
      batchID: 1,
      receiptID: 2,
      eventID: 2,
      newEntryID: 5,
      eventIndex: 7
    };

    store.dispatch(fetchReservationFeeThenUpdate(params)).then(() => {
      const myActions = store.getActions();
      expect(myActions.length).toBe(5);
      expect(myActions[4].type).toBe('UPDATE_EVENT_SUMMARY');
      done();
    });
  });

  it('restoreHasFetchedDetail should work fine', (done) => {
    const eventIndex = 1;
    store.dispatch(actions.restoreHasFetchedDetail(eventIndex));
    const storeActions = store.getActions();
    expect(Array.isArray(storeActions)).toBeTruthy();
    expect(storeActions.length).toBeGreaterThanOrEqual(1);
    const action = storeActions[storeActions.length - 1];
    expect(typeof action).toBe('object');
    expect(action.type).toBe(actions.RESTORE_HAS_FETCHED_DETAIL);
    expect(action.payload.eventIndex).toBe(eventIndex);
    done();
  });

  it('fetchEventDetail nonMonetaryReceipt equal to true should work fine', (done) => {
    const {
      fetchEventDetail
    } = actions;

    const params = {
      batchID: 1,
      receiptID: 2,
      eventID: 2,
      newEntryID: 5,
      eventIndex: 7,
      onlySetFacilty: ''
    };

    store = mockStore({
      form: {
        permitDetailForm: {
          _asyncValidating: false,
          _initialized: true,
          _submitting: false,
          _submitFailed: false,
          test: {
            value: 1
          }
        }
      },
      question: fromJS({
        showQuestion: true,
        data: [],
        hideQuestions: {},
        allQuestions: {},
        questions: [],
        stateValues: {},
        errorMsg: {},
        fields: {
          test: '23'
        },
        loading: false,
        hasRequiredQuestion: {}
      })
    });

    store.dispatch(fetchEventDetail(params)).then(() => {
      const myActions = store.getActions();
      expect(myActions.length).toBe(7);
      expect(myActions[6].type).toBe('DECORATE_FACILITY');
      done();
    });
  });

  it('addEvent should work fine', (done) => {
    const params = {
      batchID: 1,
      receiptID: 1,
      eventID: 1
    };

    mockAPI({
      path: '/json/ReservationDetail/bookingCountExceed.json',
      result: {
        headers: {
          response_code: '0000',
          response_message: 'Successful',
          page_info: {}
        },
        body: {}
      }
    });

    store.dispatch(actions.addEvent(params)).then(() => {
      const storeActions = store.getActions();
      expect(Array.isArray(storeActions)).toBeTruthy();
      expect(storeActions.length).toBeGreaterThanOrEqual(1);
      done();
    });
  });

  it('requestDeleteEvent should work fine', (done) => {
    store.dispatch(actions.requestDeleteEvent({
      batchID: 1,
      receiptID: 3,
      eventID: 23,
      newEntryID: 564
    }));

    const storeActions = store.getActions();
    expect(Array.isArray(storeActions)).toBeTruthy();
    expect(storeActions.length).toBeGreaterThanOrEqual(1);
    done();
  });

  it('deleteEvent should work fine', (done) => {
    store.dispatch(actions.deleteEvent({
      batchID: 1
    })).then(() => {
      const storeActions = store.getActions();
      expect(Array.isArray(storeActions)).toBeTruthy();
      expect(storeActions.length).toBeGreaterThanOrEqual(1);
      done();
    });
  });
});
