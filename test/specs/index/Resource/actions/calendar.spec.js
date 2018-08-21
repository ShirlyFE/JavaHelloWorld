import configureStore from 'redux-mock-store';
import middlewares from 'shared/api/middlewares';
import moment from 'moment';
import { fromJS } from 'immutable';
import * as actions from 'index/Resource/actions/calendar';
import mockAPI from 'utils/mockAPI';

describe('index/Resource/actions/calendar', () => {
  let store = null;
  const mockStore = configureStore(middlewares);
  const bookings = [
    {
      resource: {
        resourceID: 5,
        id: 5,
        maximumTime: 2,
        reservationPeriodUnit: 5,
        resourceName: 'RU 5-month',
        minimumTime: 0,
        events: []
      },
      start: moment('2016-05-31T16:00:00.000Z'),
      end: moment('2016-06-04T16:00:00.000Z')
    },
    {
      resource: {
        resourceID: 4,
        maximumTime: 0,
        reservationPeriodUnit: 6,
        resourceName: 'RU 6-defined-date-range',
        id: '6',
        minimumTime: 0,
        name: 'RU 6-defined-date-range',
        events: [],
        dates: {}
      },
      start: moment('2016-05-31T16:00:00.000Z'),
      end: moment('2016-06-04T16:00:00.000Z')
    },
    {
      resource: {
        resourceID: 6,
        maximumTime: 0,
        reservationPeriodUnit: 7,
        resourceName: 'RU 7-rental-block',
        id: '7',
        minimumTime: 0,
        name: 'RU 7-rental-block',
        events: [],
        dates: {}
      },
      start: moment('2016-05-31T16:00:00.000Z'),
      end: moment('2016-06-04T16:00:00.000Z')
    }
  ]
  const resourceTimeslot = {
    definedDateRangeMap: {},
    rentalBlockMap: {}
  };
  const bookingInfo = fromJS({
    data: {
      eventResource: []
    }
  })

  beforeEach(() => {
    store = mockStore({
      resourceTimeslot,
      bookingInfo
    });
  });

  afterEach(() => {
    store.clearActions();
  });

  it('createBookingsAction should work fine', (done) => {
    const {
      createBookingsAction
    } = actions;

    store.dispatch(createBookingsAction());
    const storeActions = store.getActions();
    expect(storeActions.length).toBe(0);
    store.dispatch(createBookingsAction(bookings))
      .then(
        () => {
          const storeActions = store.getActions();
          expect(storeActions.length).toBe(7);
          const actionTypes = storeActions.map(action => action.type).join(' ');
          expect(actionTypes).toContain('FETCH_DEFINED_DATE_RANGE');
          expect(actionTypes).toContain('LOADING_BAR_SHOW');
          expect(actionTypes).toContain('FETCH_RENTAL_BLOCK');
          expect(actionTypes).toContain('FETCH_DEFINED_DATE_RANGE_SUCCESS');
          expect(actionTypes).toContain('FETCH_RENTAL_BLOCK_SUCCESS');
          expect(actionTypes).toContain('BOOKING_INFO_SHOW');
          done();
        }
      )
  });

  it('createBookingsAction should work fine when has exception.', (done) => {
    const {
      createBookingsAction
    } = actions;
    
    store = mockStore({
      resourceTimeslot
    });

    const mockResponse = {
      "headers": {
        "response_code": "2221",
        "response_message": "error fetch date range",
        "page_info": {}
      },
      "body": {}
    };
    mockAPI({
      path: '/json/Resource/definedDateRange.json',
      result: mockResponse
    });
  
    store.dispatch(createBookingsAction(bookings))
      .catch(
        (err) => {
          expect(store.getActions().length).toBeGreaterThanOrEqual(4);
          expect(err).not.toBeUndefined();
          done();
        }
      )
  });
});
