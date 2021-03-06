import configureStore from 'redux-mock-store';
import middlewares from 'shared/api/middlewares';
import { fromJS } from 'immutable';
import first from 'lodash/first';
import find from 'lodash/find';
import * as actions from 'index/Resource/actions/bookingInformation';
import { needsProceed } from 'index/Resource/actions/bookingInformation';
import  mockAPI from 'utils/mockAPI';
import { REDIRECT } from 'shared/actions/route';
import { FETCH_RENTAL_BLOCK_SUCCESS, FETCH_DEFINED_DATE_RANGE_SUCCESS } from 'index/Resource/actions/resourceTimeslot';
import { mockDispatch, getMockActions, clearMockActions } from '../../../../utils/mockDispatch';

describe('index/Resource/actions/bookingInformation', () => {
  let store = null;
  let API = {
    get: null,
    post: null,
    put: null
  };
  const initialData = {
    permitID: -1,
    eventID: 2,
    batchID: '1111111',
    receiptID: '2222222',
    receiptEntryID: '3333333'
  }
  const bookingInfo = {
    data: {
      eventResource: [
        {
          setupMinutes: 0,
          bookingAssignment: 0,
          definedDateRange: [
            {
              id: 17,
              name: 'Dec 1, 2016 to Dec 30, 2016',
              selected: true,
              parent_id: 766,
              text: 'Dec 1, 2016 to Dec 30, 2016',
              value: 17
            }
          ],
          resourceType: 0,
          resourceID: 766,
          reservationPeriodUnit: 6,
          resourceNumber: '',
          resourceName: '1_resource_test_date_range_new',
          cleanupMinutes: 0,
          id: 766,
          bookingDetail: [{
            resourceBookingID: 0,
            attendance: 1,
            dateRangeID: 17,
            pendingID: 'pending_766_1638',
            endEventTime: '',
            isDeleteSchedule: false
          }]
        }, {
          setupMinutes: 0,
          bookingAssignment: 0,
          resourceType: 0,
          resourceID: 1,
          reservationPeriodUnit: 6,
          resourceNumber: '',
          resourceName: 'resource1',
          cleanupMinutes: 0,
          id: 1
        }
      ]
    },
    prepCodeList: fromJS([
      { id: 6, text: 'edc5a12', value: 6 },
      { id: 7, text: '5604a49', value: 7 },
      { id: 8, text: 'f760c9c', value: 8 }
    ]),
    scheduleTypes: fromJS([]),
    setUpList: fromJS([]),
    error: {
      serverMessages: {},
      conflictMessage: []
    }
  };
  const onboarding = {
    hideIntro: true
  };
  const bookingInfoData = {
    eventResource: [
      {
        setupMinutes: 0,
        bookingAssignment: 0,
        definedDateRange: [
          {
            id: 17,
            name: 'Dec 1, 2016 to Dec 30, 2016',
            selected: true,
            parent_id: 766,
            text: 'Dec 1, 2016 to Dec 30, 2016',
            value: 17
          }
        ],
        resourceType: 0,
        resourceID: 766,
        reservationPeriodUnit: 6,
        resourceNumber: '',
        resourceName: '1_resource_test_date_range_new',
        cleanupMinutes: 0,
        id: 766,
        bookingDetail: [{
          resourceBookingID: 0,
          attendance: 1,
          dateRangeID: 17,
          prepCodeID: 6,
          pendingID: 'pending_766_1638',
          endEventTime: '',
          isDeleteSchedule: false
        }]
      },
      {
        setupMinutes: 30,
        bookingAssignment: 0,
        resourceType: 0,
        resourceID: 761,
        reservationPeriodUnit: 1,
        resourceNumber: '',
        resourceName: '1_resource_test_minutes',
        cleanupMinutes: 30,
        id: 761,
        bookingDetail: [
          {
            resourceBookingID: 0,
            attendance: 1,
            dateRangeID: -1,
            prepCodeID: 7,
            pendingID: 'pending_761_4186',
            transactionID: -1,
            reservationType: 0,
            rentalBlockID: -1,
            startEventDatetime: '',
            endEventDatetime: '',
            startEventDate: 'Dec 07, 2016',
            startEventTime: '4:00',
            endEventDate: 'Dec 07, 2016',
            endEventTime: '5:00',
            isDeleteSchedule: false
          }
        ]
      },
      {
        setupMinutes: 0,
        bookingAssignment: 0,
        resourceType: 0,
        resourceID: 756,
        reservationPeriodUnit: 7,
        resourceNumber: '',
        resourceName: '1_resource_test_rental_block',
        cleanupMinutes: 0,
        id: 756,
        rentalBlock: [
          {
            id: 44,
            name: '3:00 to 4:00',
            selected: false,
            parent_id: 756,
            text: '3:00 to 4:00',
            value: 44
          },
          {
            id: 42,
            name: '6:00 to 8:00',
            selected: true,
            parent_id: 756,
            text: '6:00 to 8:00',
            value: 42
          },
          {
            id: 43,
            name: '11:00 to 13:00',
            selected: false,
            parent_id: 756,
            text: '11:00 to 13:00',
            value: 43
          }
        ],
        bookingDetail: [
          {
            resourceBookingID: 0,
            attendance: 1,
            prepCodeID: 8,
            pendingID: 'pending_756_2096',
            rentalBlockID: 42,
            startEventDate: 'Dec 07, 2016',
            isDeleteSchedule: false
          }
        ]
      }
    ],
    checkForWaitlistConflict: true,
    cleanupMinutes: 0,
    eventAttendance: 1,
    eventName: 'test',
    eventType: 'Events',
    eventTypeID: 28,
    permitID: -1,
    scheduleType: 'External Reservation',
    scheduleTypeID: 2,
    setupMinutes: 0
  };

  beforeEach(() => {
    const mockStore = configureStore(middlewares);
    store = mockStore({
      bookingInfo: fromJS(bookingInfo),
      onboarding: fromJS(onboarding),
      initialData
    });
    API.get = jest.fn();
    API.post = jest.fn();
    API.put = jest.fn();
  });

  afterEach(() => {
    store.clearActions();
    clearMockActions();
    API = {
      get: null,
      post: null,
      put: null
    };
  });

  it('fetchPendingBookings works fine', () => {
    const {
      FETCH_PENDING_BOOKINGS_SUCCESS,
      PENDING_BOOKING_INFO_DETAIL_UPDATE,
      fetchPendingBookings
    } = actions;

    return store.dispatch(fetchPendingBookings())
      .then(() => {
        const storeActions = store.getActions();

        expect(Array.isArray(storeActions)).toBeTruthy();
        expect(storeActions.some(action => action.type === '')).toBe(true);
        expect(storeActions.some(action => action.type === PENDING_BOOKING_INFO_DETAIL_UPDATE)).toBe(true);

        expect(storeActions.some(action => action.type === FETCH_PENDING_BOOKINGS_SUCCESS)).toBe(true);
        expect(storeActions
          .filter(action => action.type === FETCH_PENDING_BOOKINGS_SUCCESS)[0].payload.body).toHaveProperty('booking_items');

        expect(storeActions.some(action => action.type === FETCH_DEFINED_DATE_RANGE_SUCCESS)).toBe(true);
        const dateRanges = storeActions
          .filter(action => action.type === FETCH_DEFINED_DATE_RANGE_SUCCESS)[0].payload.body;
        expect(dateRanges).toHaveProperty('items');
        expect(Array.isArray(dateRanges.items)).toBeTruthy();

        expect(storeActions.some(action => action.type === FETCH_RENTAL_BLOCK_SUCCESS)).toBe(true);
        const rentalBlocks = storeActions
          .filter(action => action.type === FETCH_RENTAL_BLOCK_SUCCESS)[0].payload.body;
        expect(rentalBlocks).toHaveProperty('items');
        expect(Array.isArray(rentalBlocks.items)).toBeTruthy();
      });
  });

  it('fetchEventTypes should work fine', () => {
    const {
      UPDATE_RESOURCE_EVENT_TYPES,
      fetchEventTypes
    } = actions;

    return store.dispatch(fetchEventTypes([1]))
      .then(() => {
        const storeActions = store.getActions();
        expect(Array.isArray(storeActions)).toBeTruthy();
        expect(storeActions.some(action => action.type === '')).toBe(true);
        expect(storeActions.some(action => action.type === UPDATE_RESOURCE_EVENT_TYPES)).toBe(true);

        const fetchedEventTypes = storeActions
          .filter(action => action.type === '' && action.payload)[0].payload.body;
        expect(fetchedEventTypes).toHaveProperty('items');
        expect(Array.isArray(fetchedEventTypes.items)).toBeTruthy();
        const fetchedEventType = fetchedEventTypes.items[0];
        expect(fetchedEventType).toHaveProperty('id');
        expect(fetchedEventType).toHaveProperty('name');
        expect(fetchedEventType).toHaveProperty('selected');
        expect(fetchedEventType).toHaveProperty('available_resources');

        const updateEventTypes = storeActions
          .filter(action => action.type === UPDATE_RESOURCE_EVENT_TYPES)[0].payload;
        expect(updateEventTypes).toHaveProperty('eventTypes');
        expect(Array.isArray(updateEventTypes.eventTypes)).toBeTruthy();
        const updateEventType = updateEventTypes.eventTypes[0];
        expect(updateEventType).toHaveProperty('id');
        expect(updateEventType).toHaveProperty('name');
        expect(updateEventType).toHaveProperty('selected');
      });
  });

  it('fetchEventTypes should work fine, no any parameter', () => {
    const {
      UPDATE_RESOURCE_EVENT_TYPES,
      fetchEventTypes
    } = actions;

    return store.dispatch(fetchEventTypes())
      .then(() => {
        const storeActions = store.getActions();
        expect(Array.isArray(storeActions)).toBeTruthy();
        expect(storeActions.some(action => action.type === '')).toBe(true);
        expect(storeActions.some(action => action.type === UPDATE_RESOURCE_EVENT_TYPES)).toBe(false);
      });
  });

  it('fetchScheduleTypes should work fine', (done) => {
    const {
      FETCH_SCHEDULE_TYPES_SUCCESS,
      fetchScheduleTypes
    } = actions;

    const { types, promise } = fetchScheduleTypes();
    expect(types).toEqual(['', FETCH_SCHEDULE_TYPES_SUCCESS, '']);
    expect(typeof promise).toBe('function');
    promise(API);
    expect(API.get.mock.calls[(0, 0)]).toEqual(expect.arrayContaining(['/json/Resource/scheduleTypes.json']));
    expect(API.get.mock.calls[(0, 0)][1]).toEqual({
      body: {
        event_type_id: 0
      }
    });
    done();
  });

  it('fetchPrepCode with value and resource index should work fine', () => {
    const {
      FETCH_PREP_CODE_SUCCESS,
      SET_RESOURCE_DEFAULT_VALUE,
      fetchPrepCode
    } = actions;

    return store.dispatch(fetchPrepCode({key: 1, value: 1, resourceIndex: 0 }))
      .then(() => {
        const storeActions = store.getActions();
        expect(Array.isArray(storeActions)).toBeTruthy();
        expect(storeActions.some(action => action.type === '')).toBe(true);
        expect(storeActions.some(action => action.type === FETCH_PREP_CODE_SUCCESS)).toBe(true);
        expect(storeActions.some(action => action.type === SET_RESOURCE_DEFAULT_VALUE)).toBe(true);

        const fetchedPrepCodes = storeActions
          .filter(action => action.type === FETCH_PREP_CODE_SUCCESS)[0].payload.body;
        expect(fetchedPrepCodes).toHaveProperty('items');
        expect(Array.isArray(fetchedPrepCodes.items)).toBeTruthy();

        const fetchedPrepCode = fetchedPrepCodes.items[0];
        expect(fetchedPrepCode).toHaveProperty('id');
        expect(fetchedPrepCode).toHaveProperty('name');
        expect(fetchedPrepCode).toHaveProperty('selected');
        expect(fetchedPrepCode).toHaveProperty('cleanup_time');
        expect(fetchedPrepCode).toHaveProperty('setup_time');

        const resourceDefaultValue = storeActions
          .filter(action => action.type === SET_RESOURCE_DEFAULT_VALUE)[0].payload.value;
        expect(resourceDefaultValue).toHaveProperty('resourceIndex');
        expect(resourceDefaultValue).toHaveProperty('prepCodeID');
        expect(resourceDefaultValue).toHaveProperty('setupMinutes');
        expect(resourceDefaultValue).toHaveProperty('cleanupMinutes');
      });
  });

  it('fetchPrepCode without value and resource index should work fine, mock no selected data', () => {
    mockAPI({
      path: '/json/Resource/prepCode.json',
      result: {
        "headers": {
          "response_code": "0000",
          "response_message": "Successful"
        },
        "body": {
          "items": [
            {
              "id": 2,
              "name": "lillian_prep code",
              "setup_time": 0,
              "cleanup_time": 45,
              "selected": false
            }, {
              "id": 3,
              "name": "kaely_1_prep code",
              "setup_time": 10,
              "cleanup_time": 20,
              "selected": false
            }
          ]
        }
      }
    });
    const {
      FETCH_PREP_CODE_SUCCESS,
      fetchPrepCode
    } = actions;

    return store.dispatch(fetchPrepCode({key: 1, value: 1, resourceIndex: 0 }))
      .then(() => {
        const storeActions = store.getActions();
        expect(Array.isArray(storeActions)).toBeTruthy();
        expect(storeActions.some(action => action.type === '')).toBe(true);
        expect(storeActions.some(action => action.type === FETCH_PREP_CODE_SUCCESS)).toBe(true);

        const fetchedPrepCodes = storeActions
          .filter(action => action.type === FETCH_PREP_CODE_SUCCESS)[0].payload.body;
        expect(fetchedPrepCodes).toHaveProperty('items');
        expect(Array.isArray(fetchedPrepCodes.items)).toBeTruthy();

        const fetchedPrepCode = fetchedPrepCodes.items[0];
        expect(fetchedPrepCode).toHaveProperty('id');
        expect(fetchedPrepCode).toHaveProperty('name');
        expect(fetchedPrepCode).toHaveProperty('selected');
        expect(fetchedPrepCode).toHaveProperty('cleanup_time');
        expect(fetchedPrepCode).toHaveProperty('setup_time');
      });
  });

  it('fetchPrepCode without value and resource index should work fine, if no arguments data', () => {
    const {
      FETCH_PREP_CODE_SUCCESS,
      fetchPrepCode
    } = actions;
    return store.dispatch(fetchPrepCode({}))
      .then(() => {
        const storeActions = store.getActions();
        expect(Array.isArray(storeActions)).toBeTruthy();
        expect(storeActions.some(action => action.type === '')).toBe(true);
        expect(storeActions.some(action => action.type === FETCH_PREP_CODE_SUCCESS)).toBe(true);

        const fetchedPrepCodes = storeActions
          .filter(action => action.type === FETCH_PREP_CODE_SUCCESS)[0].payload.body;
        expect(fetchedPrepCodes).toHaveProperty('items');
        expect(Array.isArray(fetchedPrepCodes.items)).toBeTruthy();

        const fetchedPrepCode = fetchedPrepCodes.items[0];
        expect(fetchedPrepCode).toHaveProperty('id');
        expect(fetchedPrepCode).toHaveProperty('name');
        expect(fetchedPrepCode).toHaveProperty('selected');
        expect(fetchedPrepCode).toHaveProperty('cleanup_time');
        expect(fetchedPrepCode).toHaveProperty('setup_time');
      });
  });

  it('updatePrepCode should work fine', () => {
    const {
      SET_RESOURCE_DEFAULT_VALUE,
      BOOKING_INFO_DETAIL_UPDATE,
      updatePrepCode
    } = actions;
    store.dispatch(updatePrepCode({ key: 'prepCodeID', value: 8, resourceIndex: 0 }));
    const storeActions = store.getActions();
    expect(Array.isArray(storeActions)).toBeTruthy();
    expect(storeActions.some(action => action.type === SET_RESOURCE_DEFAULT_VALUE)).toBe(true);
    expect(storeActions.some(action => action.type === BOOKING_INFO_DETAIL_UPDATE)).toBe(true);
    const valueToSetAsDefault = storeActions
      .filter(action => action.type === SET_RESOURCE_DEFAULT_VALUE)[0].payload.value;
    expect(valueToSetAsDefault.resourceIndex).toEqual(0);
    expect(valueToSetAsDefault.prepCodeID).toEqual(8);
    const valueToUpdateBooking = storeActions
      .filter(action => action.type === BOOKING_INFO_DETAIL_UPDATE)[0].payload.value;
    expect(valueToUpdateBooking.resourceIndex).toEqual(0);
    expect(valueToUpdateBooking.key).toEqual('prepCodeID');
    expect(valueToUpdateBooking.value).toEqual(8);
  });

  it('updatePrepCode should work fine, if parameter value is equal -1', () => {
    const {
      SET_RESOURCE_DEFAULT_VALUE,
      BOOKING_INFO_DETAIL_UPDATE,
      updatePrepCode
    } = actions;

    store.dispatch(updatePrepCode({ key: 'prepCodeID', value: -1, resourceIndex: 0 }));
    const storeActions = store.getActions();

    expect(storeActions.some(action => action.type === SET_RESOURCE_DEFAULT_VALUE)).toBe(true);
    expect(storeActions.some(action => action.type === BOOKING_INFO_DETAIL_UPDATE)).toBe(true);
  });

  it('fetchSetupCleanUp should work fine', () => {
    const {
      FETCH_SETUP_CLEANUP_SUCCESS,
      fetchSetupCleanUp
    } = actions;

    const { types, promise } = fetchSetupCleanUp();
    expect(types).toEqual(['', FETCH_SETUP_CLEANUP_SUCCESS, '']);
    expect(typeof promise).toBe('function');
    promise(API);
    expect(API.get.mock.calls[(0, 0)]).toEqual(expect.arrayContaining(['/json/Resource/setUpCleanUp.json']));
  });

  it('showBookingInfo should work fine', () => {
    const { showBookingInfo, BOOKING_INFO_SHOW } = actions;
    expect(showBookingInfo()).toEqual({
      type: BOOKING_INFO_SHOW
    });
  });

  it('hideBookingInfo should work fine', () => {
    const {
      BOOKING_INFO_HIDE,
      hideBookingInfo
    } = actions;

    expect(hideBookingInfo()).toEqual({
      type: BOOKING_INFO_HIDE
    });
  });

  it('cleanBookingInfo should work fine', () => {
    const {
      BOOKING_INFO_CLEAN,
      cleanBookingInfo
    } = actions;

    mockDispatch(cleanBookingInfo());
    const mockActions = getMockActions();
    expect(mockActions).toHaveLength(1);

    expect(mockActions[0]).toEqual({
      type: BOOKING_INFO_CLEAN
    });
  });

  it('cleanBookingInfoError should work fine', () => {
    const { cleanBookingInfoError, BOOKING_INFO_CLEAN_ERROR } = actions;
    expect(cleanBookingInfoError()).toEqual({
      type: BOOKING_INFO_CLEAN_ERROR
    });
  });

  it('deleteBookingInfoAllDetails should work fine', () => {
    const { deleteBookingInfoAllDetails, BOOKING_INFO_ALL_DETAILS_DELETE } = actions;
    expect(deleteBookingInfoAllDetails()).toEqual({
      type: BOOKING_INFO_ALL_DETAILS_DELETE
    });
  });

  it('updateBookingInfoEvent should work fine', () => {
    const { updateBookingInfoEvent, BOOKING_INFO_EVENT_UPDATE } = actions;
    const data = { obj: 1 };
    expect(updateBookingInfoEvent(data)).toEqual({
      type: BOOKING_INFO_EVENT_UPDATE,
      payload: {
        value: data
      }
    });
  });

  it('deleteBookingInfoDetail should work fine', () => {
    const { deleteBookingInfoDetail, BOOKING_INFO_DETAIL_DELETE } = actions;
    const data = { obj: 1 };
    expect(deleteBookingInfoDetail(data)).toEqual({
      type: BOOKING_INFO_DETAIL_DELETE,
      payload: {
        value: data
      }
    });
  });

  it('updateBookingInfoDetail should work fine', () => {
    const { updateBookingInfoDetail, BOOKING_INFO_DETAIL_UPDATE } = actions;
    const data = { obj: 1 };
    expect(updateBookingInfoDetail(data)).toEqual({
      type: BOOKING_INFO_DETAIL_UPDATE,
      payload: {
        value: data
      }
    });
  });

  it('displayClientErrors should work fine', () => {
    const { displayClientErrors, BOOKING_INFO_DISPLAY_CLIENT_ERRORS } = actions;
    const data = { obj: 1 };
    expect(displayClientErrors(data)).toEqual({
      type: BOOKING_INFO_DISPLAY_CLIENT_ERRORS,
      payload: {
        value: data
      }
    });
  });

  it('addBookingInfoDetails should work fine', () => {
    const {
      addBookingInfoDetails
    } = actions;
    const data = [
      { resourceID: 3, resourceType: 1 }
    ];
    const mockState = {
      bookingInfo: fromJS({
        data: {
          eventResource: [
            { resourceID: 1 },
            { resourceID: 2 },
            { resourceID: 3 }
          ]
        }
      })
    };

    return store.dispatch(addBookingInfoDetails(data))
      .then(() => {
        const storeActions = store.getActions();
        const firstAction = first(storeActions);

        expect(storeActions.length).toBe(1);
        expect(firstAction.type).toEqual('');
      });
  });

  it('addBookingInfoDetails should work fine, not existing resource booking list', () => {
    const {
      addBookingInfoDetails
    } = actions;
    const data = [
      { resourceID: 4, resourceType: 5 }
    ];
    const mockState = {
      bookingInfo: fromJS({
        data: {
          eventResource: [
            { resourceID: 1 },
            { resourceID: 2 },
            { resourceID: 3 }
          ]
        }
      })
    };

    return store.dispatch(addBookingInfoDetails(data))
      .then(() => {
        const storeActions = store.getActions();
        expect(Array.isArray(storeActions)).toBeTruthy();
        expect(storeActions.some(action => action.type === '')).toBe(true);
      });
  });

  it('pendingBookingInfoProceed should work fine', () => {
    const {
      BOOKING_INFO_PROCEED_SUCCESS,
      BOOKING_INFO_PROCEED_FAILURE,
      pendingBookingInfoProceed
    } = actions;

    return store.dispatch(pendingBookingInfoProceed(bookingInfoData))
      .then(() => {
        const storeActions = store.getActions();
        const noTypeAction = find(storeActions, action => action.type === '');

        expect(Array.isArray(storeActions)).toBeTruthy();
        expect(noTypeAction.meta).toEqual({
          ignoreLoadingbar: true,
          ignoreBusinessErrors: true
        });
        expect(storeActions.some(action => action.type === 'BOOKING_INFO_PROCEED_SUCCESS')).toBeTruthy();
        expect(storeActions.some(action => action.type === 'BOOKING_INFO_CLEAN')).toBeTruthy();
      });
  });

  it('pendingBookingInfoProceed should work fine, if no error, permitID > 0, eventID > 0 and receiptEntryID > 0', () => {
    const {
      BOOKING_INFO_PROCEED_SUCCESS,
      BOOKING_INFO_PROCEED_FAILURE,
      pendingBookingInfoProceed
    } = actions;

    return store.dispatch(pendingBookingInfoProceed(bookingInfoData))
      .then(() => {
        const storeActions = store.getActions();
        const noTypeAction = find(storeActions, action => action.type === '');

        expect(Array.isArray(storeActions)).toBeTruthy();
        expect(noTypeAction.meta).toEqual({
          ignoreLoadingbar: true,
          ignoreBusinessErrors: true
        });
        expect(storeActions.some(action => action.type === 'BOOKING_INFO_PROCEED_SUCCESS')).toBeTruthy();
        expect(storeActions.some(action => action.type === 'BOOKING_INFO_CLEAN')).toBeTruthy();
      });
  });

  it('pendingBookingInfoProceed should work fine, has conflict message.', () => {
    const {
      BOOKING_INFO_PROCEED_SUCCESS,
      BOOKING_INFO_PROCEED_FAILURE,
      pendingBookingInfoProceed
    } = actions;

    const mockStore = configureStore(middlewares);
    store = mockStore({
      bookingInfo: fromJS({
        data: {
          eventResource: [
            {
              setupMinutes: 0,
              bookingAssignment: 0,
              definedDateRange: [
                {
                  id: 17,
                  name: 'Dec 1, 2016 to Dec 30, 2016',
                  selected: true,
                  parent_id: 766,
                  text: 'Dec 1, 2016 to Dec 30, 2016',
                  value: 17
                }
              ],
              resourceType: 0,
              resourceID: 766,
              reservationPeriodUnit: 6,
              resourceNumber: '',
              resourceName: '1_resource_test_date_range_new',
              cleanupMinutes: 0,
              id: 766,
              bookingDetail: [{
                resourceBookingID: 0,
                attendance: 1,
                dateRangeID: 17,
                pendingID: 'pending_766_1638',
                endEventTime: '',
                isDeleteSchedule: false
              }]
            }
          ]
        },
        prepCodeList: fromJS([]),
        scheduleTypes: fromJS([
          {
            id: 1,
            name: 'type1',
            selected: false,
            text:
            'type1',
            value: 1
          }
        ]),
        setUpList: fromJS([]),
        error: {
          serverMessages: {},
          conflictMessage: [1]
        }
      }),
      onboarding: fromJS({}),
      hideIntro: false,
      initialData
    });

    return store.dispatch(pendingBookingInfoProceed(bookingInfoData))
      .then(() => {
        const storeActions = store.getActions();
        const noTypeAction = find(storeActions, action => action.type === '');

        expect(Array.isArray(storeActions)).toBeTruthy();
        expect(noTypeAction.meta).toEqual({
          ignoreLoadingbar: true,
          ignoreBusinessErrors: true
        });
        expect(storeActions.some(action => action.type === 'BOOKING_INFO_PROCEED_SUCCESS')).toBeTruthy();
        expect(storeActions.some(action => action.type === 'BOOKING_INFO_CLEAN')).toBeFalsy();
      });
  });

  it('pendingBookingInfoProceed should work fine, if all deleted booking', () => {
    const {
      BOOKING_INFO_PROCEED_SUCCESS,
      BOOKING_INFO_PROCEED_FAILURE,
      pendingBookingInfoProceed
    } = actions;

    const deletedBookingData = {
      eventResource: [
        {
          setupMinutes: 0,
          bookingAssignment: 0,
          definedDateRange: [
            {
              id: 17,
              name: 'Dec 1, 2016 to Dec 30, 2016',
              selected: true,
              parent_id: 766,
              text: 'Dec 1, 2016 to Dec 30, 2016',
              value: 17
            }
          ],
          resourceType: 0,
          resourceID: 766,
          reservationPeriodUnit: 6,
          resourceNumber: '',
          resourceName: '1_resource_test_date_range_new',
          cleanupMinutes: 0,
          id: 766,
          bookingDetail: [{
            resourceBookingID: 0,
            attendance: 1,
            dateRangeID: 17,
            prepCodeID: 6,
            pendingID: 'pending_766_1638',
            endEventTime: '',
            isDeleteSchedule: true
          }]
        }
      ],
      checkForWaitlistConflict: true,
      cleanupMinutes: 0,
      eventAttendance: 1,
      eventName: 'test',
      eventType: 'Events',
      eventTypeID: 28,
      permitID: -1,
      scheduleType: 'External Reservation',
      scheduleTypeID: 2,
      setupMinutes: 0
    };

    return store.dispatch(pendingBookingInfoProceed(deletedBookingData))
    .then(() => {
      const storeActions = store.getActions();
      const noTypeAction = find(storeActions, action => action.type === '');

      expect(Array.isArray(storeActions)).toBeTruthy();
      expect(noTypeAction.meta).toEqual({
        ignoreLoadingbar: true,
        ignoreBusinessErrors: true
      });
      expect(storeActions.some(action => action.type === 'BOOKING_INFO_PROCEED_SUCCESS')).toBeTruthy();
      expect(storeActions.some(action => action.type === 'BOOKING_INFO_CLEAN')).toBeTruthy();
    });
  });

  it('pendingBookingInfoProceed should work fine, if some deleted booking and any type of reservationPeriodUnit', () => {
    const {
      BOOKING_INFO_PROCEED_SUCCESS,
      BOOKING_INFO_PROCEED_FAILURE,
      pendingBookingInfoProceed
    } = actions;

    const bookingData = {
      eventResource: [
        {
          setupMinutes: 0,
          bookingAssignment: 0,
          definedDateRange: [
            {
              id: 17,
              name: 'Dec 1, 2016 to Dec 30, 2016',
              selected: false,
              parent_id: 766,
              text: 'Dec 1, 2016 to Dec 30, 2016',
              value: 17
            }
          ],
          resourceType: 0,
          resourceID: 766,
          reservationPeriodUnit: 6,
          resourceNumber: '',
          resourceName: '1_resource_test_date_range_new',
          cleanupMinutes: 0,
          id: 766,
          bookingDetail: [{
            resourceBookingID: 0,
            attendance: 1,
            dateRangeID: 16,
            prepCodeID: 6,
            pendingID: 'pending_766_1638',
            endEventTime: '',
            isDeleteSchedule: false
          }, {
            resourceBookingID: 1,
            attendance: 1,
            dateRangeID: 16,
            prepCodeID: 6,
            pendingID: 'pending_766_1631',
            endEventTime: '',
            isDeleteSchedule: true
          }]
        },
        {
          setupMinutes: 30,
          bookingAssignment: 0,
          resourceType: 0,
          resourceID: 761,
          reservationPeriodUnit: 1,
          resourceNumber: '',
          resourceName: '1_resource_test_minutes',
          cleanupMinutes: 30,
          id: 761,
          bookingDetail: [{
              resourceBookingID: 2,
              attendance: 1,
              dateRangeID: -1,
              prepCodeID: 7,
              pendingID: 'pending_761_0',
              transactionID: -1,
              reservationType: 0,
              rentalBlockID: -1,
              startEventDatetime: '',
              endEventDatetime: '',
              startEventDate: 'Dec 07, 2016',
              startEventTime: '4:00',
              endEventDate: 'Dec 07, 2016',
              endEventTime: '5:00',
              isDeleteSchedule: true
            }
          ]
        },{
          setupMinutes: 30,
          bookingAssignment: 0,
          resourceType: 0,
          resourceID: 761,
          reservationPeriodUnit: 2,
          resourceNumber: '',
          resourceName: '1_resource_test_minutes',
          cleanupMinutes: 30,
          id: 761,
          bookingDetail: [{
              resourceBookingID: 2,
              attendance: 1,
              dateRangeID: -1,
              prepCodeID: 7,
              pendingID: 'pending_761_0',
              transactionID: -1,
              reservationType: 0,
              rentalBlockID: -1,
              startEventDatetime: '',
              endEventDatetime: '',
              startEventDate: 'Dec 07, 2016',
              startEventTime: '4:00',
              endEventDate: 'Dec 07, 2016',
              endEventTime: '5:00',
              isDeleteSchedule: false
            }
          ]
        },{
          setupMinutes: 30,
          bookingAssignment: 0,
          resourceType: 0,
          resourceID: 761,
          reservationPeriodUnit: 3,
          resourceNumber: '',
          resourceName: '1_resource_test_minutes',
          cleanupMinutes: 30,
          id: 761,
          bookingDetail: [{
              resourceBookingID: 2,
              attendance: 1,
              dateRangeID: -1,
              prepCodeID: 7,
              pendingID: 'pending_761_0',
              transactionID: -1,
              reservationType: 0,
              rentalBlockID: -1,
              startEventDatetime: '',
              endEventDatetime: '',
              startEventDate: 'Dec 07, 2016',
              startEventTime: '4:00',
              endEventDate: 'Dec 07, 2016',
              endEventTime: '5:00',
              isDeleteSchedule: false
            }
          ]
        },{
          setupMinutes: 0,
          bookingAssignment: 0,
          resourceType: 0,
          resourceID: 756,
          reservationPeriodUnit: 7,
          resourceNumber: '',
          resourceName: '1_resource_test_rental_block',
          cleanupMinutes: 0,
          id: 756,
          rentalBlock: [
            {
              id: 44,
              name: '3:00 to 4:00',
              selected: false,
              parent_id: 756,
              text: '3:00 to 4:00',
              value: 44
            }
          ],
          bookingDetail: [
            {
              resourceBookingID: 0,
              attendance: 1,
              prepCodeID: 8,
              pendingID: 'pending_756_2096',
              rentalBlockID: 42,
              startEventDate: 'Dec 07, 2016',
              isDeleteSchedule: false
            },
          ]
        }
      ],
      checkForWaitlistConflict: true,
      cleanupMinutes: 0,
      eventAttendance: 1,
      eventName: 'test',
      eventType: 'Events',
      eventTypeID: 28,
      permitID: -1,
      scheduleType: 'External Reservation',
      scheduleTypeID: 2,
      setupMinutes: 0
    };

    return store.dispatch(pendingBookingInfoProceed(bookingData))
      .then(() => {
        const storeActions = store.getActions();
        const noTypeAction = find(storeActions, action => action.type === '');

        expect(Array.isArray(storeActions)).toBeTruthy();
        expect(noTypeAction.meta).toEqual({
          ignoreLoadingbar: true,
          ignoreBusinessErrors: true
        });
        expect(storeActions.some(action => action.type === 'BOOKING_INFO_PROCEED_SUCCESS')).toBeTruthy();
        expect(storeActions.some(action => action.type === 'BOOKING_INFO_CLEAN')).toBeTruthy();
      });
  });

  it('pendingBookingInfoProceed should work fine with override rentalblock', () => {
    const {
      BOOKING_INFO_PROCEED_SUCCESS,
      BOOKING_INFO_PROCEED_FAILURE,
      pendingBookingInfoProceed
    } = actions;

    const bookingData = {
      eventResource: [
        {
          setupMinutes: 0,
          bookingAssignment: 0,
          resourceType: 0,
          resourceID: 756,
          reservationPeriodUnit: 7,
          resourceNumber: '',
          resourceName: '1_resource_test_rental_block',
          cleanupMinutes: 0,
          id: 756,
          rentalBlock: [
            {
              id: 44,
              name: '3:00 to 4:00',
              selected: false,
              parent_id: 756,
              text: '3:00 to 4:00',
              value: 44
            }
          ],
          bookingDetail: [
            {
              isRecurring: true,
              baseBookingID: 'pending_756_2096',
              resourceBookingID: 0,
              attendance: 0,
              prepCodeID: 8,
              pendingID: 'pending_756_2096',
              rentalBlockID: 42,
              startEventDate: 'Dec 07, 2016',
              isDeleteSchedule: false,
              isRentalBlockOverride: true,
              overrideRentalBlock: {
                name: '4:00 PM to 7:00 PM'
              }
            },
          ]
        }
      ],
      checkForWaitlistConflict: true,
      cleanupMinutes: 0,
      eventAttendance: 1,
      eventName: 'test',
      eventType: 'Events',
      eventTypeID: 28,
      permitID: -1,
      scheduleType: 'External Reservation',
      scheduleTypeID: 2,
      setupMinutes: 0
    };

    return store.dispatch(pendingBookingInfoProceed(bookingData))
      .then(() => {
        const storeActions = store.getActions();
        const noTypeAction = find(storeActions, action => action.type === '');

        expect(Array.isArray(storeActions)).toBeTruthy();
        expect(noTypeAction.meta).toEqual({
          ignoreLoadingbar: true,
          ignoreBusinessErrors: true
        });
        expect(storeActions.some(action => action.type === 'BOOKING_INFO_PROCEED_SUCCESS')).toBeTruthy();
        expect(storeActions.some(action => action.type === 'BOOKING_INFO_CLEAN')).toBeTruthy();
      });
  });

  it('updatePermitBookingInfo should work fine', (done) => {
    const {
      updatePermitBookingInfo,
      FETCH_SCHEDULE_TYPES_SUCCESS,
      PERMIT_UPDATE_BOOKING_INFO,
      FETCH_PENDING_BOOKINGS_SUCCESS,
      PENDING_BOOKING_INFO_DETAIL_UPDATE,
      MERGE_PERMIT_AND_PENDING_BOOKINGS
    } = actions;

    const mockDetails = [
      {
        "rentalBlock": [
          {
            "id": 2,
            "name": "9:00 AM to 12:00 PM",
            "selected": true,
            "parentID": 6
          }
        ],
        "date_range": [
          {
            "id": 3,
            "name": "2016 Jun 01 to 2016 Jun 03",
            "selected": true,
            "parentID": 4
          }
        ],
        "resourceBookingID": 8622,
        "attendance": 3,
        "eventAttendace": 3,
        "ownerPendingReceipt": true,
        "reservationPeriodUnit": 6,
        "isActivityIgnoreMaximum": true,
        "scheduleTypeID": 3,
        "scheduleType": "kaely scheduleType",
        "bookingAssignment": 0,
        "eventName": "1 f+expiration kaely eventName &amp;",
        "eventTypeId": 35,
        "eventType": "*kaely eventType",
        "reservationScope": "Normal",
        "resourceID": 11,
        "resourceName": "test 4",
        "resourceNumber": "12(facilityNumer)",
        "resourceType": 0,
        "transactionID": 36378,
        "permitID": -1,
        "permitNumber": 349,
        "permitDate": "2016 Jun 1",
        "permitStatus": 2,
        "permitStatusDescription": "Approved",
        "setupMinutes": 30,
        "cleanupMinutes": 30,
        "startEventDate": "2016 Jun 5",
        "endEventDate": "2016 Jun 7",
        "startEventTime": "1:00 AM",
        "endEventTime": "12:30 AM",
        "reservationExpiration": "2016 Jun 4 expiration",
        "startScheduleDate": "2016 Jun 4",
        "endScheduleDate": "2016 Jun 7",
        "startScheduleDay": "Tue",
        "endScheduleDay": "Tue",
        "startScheduleTime": "8:00 PM",
        "endScheduleTime": "11:30 AM",
        "customerID": 32523,
        "customerType": "f customerType",
        "customerName": "customer 1",
        "eventNotes": "aa",
        "companyName": "MM companyName"
      }
    ];

    return store.dispatch(updatePermitBookingInfo(mockDetails))
      .then(() => {
        const storeActions = store.getActions();
        expect(Array.isArray(storeActions)).toBeTruthy();
        expect(storeActions.some(action => action.type === FETCH_SCHEDULE_TYPES_SUCCESS)).toBe(true);
        expect(storeActions.some(action => action.type === PERMIT_UPDATE_BOOKING_INFO)).toBe(true);
        expect(storeActions.some(action => action.type === FETCH_PENDING_BOOKINGS_SUCCESS)).toBe(true);
        expect(storeActions.some(action => action.type === PENDING_BOOKING_INFO_DETAIL_UPDATE)).toBe(true);
        expect(storeActions.some(action => action.type === FETCH_RENTAL_BLOCK_SUCCESS)).toBe(true);
        expect(storeActions.some(action => action.type === MERGE_PERMIT_AND_PENDING_BOOKINGS)).toBe(true);
      })
      .then(done);
  });

  it('updatePermitBookingInfo should work fine, if eventResource.length is not 0 and hideIntro is false, permitID > 0, eventID > 0 and receiptEntryID > 0', (done) => {
    const {
      updatePermitBookingInfo,
      FETCH_SCHEDULE_TYPES_SUCCESS,
      PERMIT_UPDATE_BOOKING_INFO,
      FETCH_PENDING_BOOKINGS_SUCCESS,
      PENDING_BOOKING_INFO_DETAIL_UPDATE,
      MERGE_PERMIT_AND_PENDING_BOOKINGS
    } = actions;

    const mockStore = configureStore(middlewares);

    store = mockStore({
      bookingInfo: fromJS({
        data: {
          eventResource: [
            {
              setupMinutes: 0,
              bookingAssignment: 0,
              definedDateRange: [
                {
                  id: 17,
                  name: 'Dec 1, 2016 to Dec 30, 2016',
                  selected: true,
                  parent_id: 766,
                  text: 'Dec 1, 2016 to Dec 30, 2016',
                  value: 17
                }
              ],
              resourceType: 0,
              resourceID: 766,
              reservationPeriodUnit: 6,
              resourceNumber: '',
              resourceName: '1_resource_test_date_range_new',
              cleanupMinutes: 0,
              id: 766,
              bookingDetail: [{
                resourceBookingID: 0,
                attendance: 1,
                dateRangeID: 17,
                pendingID: 'pending_766_1638',
                endEventTime: '',
                isDeleteSchedule: false
              }]
            }
          ]
        },
        prepCodeList: fromJS([]),
        scheduleTypes: fromJS([
          {
            id: 1,
            name: 'type1',
            selected: false,
            text:
            'type1',
            value: 1
          }
        ]),
        setUpList: fromJS([]),
        error: { serverMessages: {} }
      }),
      onboarding: fromJS({
        hideIntro: false
      }),
      initialData: {
        ...initialData,
        permitID: 1,
        eventID: 1,
        receiptEntryID: 1
      }
    });

    return store.dispatch(updatePermitBookingInfo([]))
      .then(() => {
        const storeActions = store.getActions();
        expect(Array.isArray(storeActions)).toBeTruthy();
        expect(storeActions.some(action => action.type === FETCH_SCHEDULE_TYPES_SUCCESS)).toBe(false);
        expect(storeActions.some(action => action.type === PERMIT_UPDATE_BOOKING_INFO)).toBe(true);
        expect(storeActions.some(action => action.type === FETCH_PENDING_BOOKINGS_SUCCESS)).toBe(true);
        expect(storeActions.some(action => action.type === PENDING_BOOKING_INFO_DETAIL_UPDATE)).toBe(true);
        expect(storeActions.some(action => action.type === FETCH_RENTAL_BLOCK_SUCCESS)).toBe(true);
        expect(storeActions.some(action => action.type === MERGE_PERMIT_AND_PENDING_BOOKINGS)).toBe(true);
      })
      .then(done);
  });

  it('updatePermitBookingInfo should work fine, if eventResource.length is 0 and hideIntro is true, permitID > 0, eventID = 0 and receiptEntryID = 0', () => {
    const {
      updatePermitBookingInfo,
      FETCH_SCHEDULE_TYPES_SUCCESS,
      PERMIT_UPDATE_BOOKING_INFO,
      FETCH_PENDING_BOOKINGS_SUCCESS,
      PENDING_BOOKING_INFO_DETAIL_UPDATE,
      MERGE_PERMIT_AND_PENDING_BOOKINGS
    } = actions;

    const mockStore = configureStore(middlewares);

    store = mockStore({
      bookingInfo: fromJS({
        data: {
          eventResource: []
        },
        prepCodeList: fromJS([]),
        scheduleTypes: fromJS([
          {
            id: 1,
            name: 'type1',
            selected: false,
            text:
            'type1',
            value: 1
          }
        ]),
        setUpList: fromJS([]),
        error: { serverMessages: {} }
      }),
      onboarding: fromJS({
        hideIntro: true
      }),
      initialData: {
        ...initialData,
        permitID: 1,
        eventID: 0,
        receiptEntryID: 0
      }
    });

    return store.dispatch(updatePermitBookingInfo([]))
      .then(() => {
        const storeActions = store.getActions();
        expect(Array.isArray(storeActions)).toBeTruthy();
        expect(storeActions.some(action => action.type === FETCH_SCHEDULE_TYPES_SUCCESS)).toBe(false);
        expect(storeActions.some(action => action.type === PERMIT_UPDATE_BOOKING_INFO)).toBe(false);
        expect(storeActions.some(action => action.type === FETCH_PENDING_BOOKINGS_SUCCESS)).toBe(false);
        expect(storeActions.some(action => action.type === PENDING_BOOKING_INFO_DETAIL_UPDATE)).toBe(false);
        expect(storeActions.some(action => action.type === FETCH_RENTAL_BLOCK_SUCCESS)).toBe(false);
        expect(storeActions.some(action => action.type === MERGE_PERMIT_AND_PENDING_BOOKINGS)).toBe(true);
      });
  });

  it('updatePermitBookingInfo should work fine, if eventResource.length is 0 and hideIntro is false', () => {
    const {
      updatePermitBookingInfo,
      FETCH_SCHEDULE_TYPES_SUCCESS,
      PERMIT_UPDATE_BOOKING_INFO,
      FETCH_PENDING_BOOKINGS_SUCCESS,
      PENDING_BOOKING_INFO_DETAIL_UPDATE,
      MERGE_PERMIT_AND_PENDING_BOOKINGS
    } = actions;

    const mockStore = configureStore(middlewares);

    store = mockStore({
      bookingInfo: fromJS({
        data: {
          eventResource: [{
            resourceID: 1
          }]
        },
        prepCodeList: fromJS([]),
        scheduleTypes: fromJS([
          {
            id: 1,
            name: 'type1',
            selected: false,
            text:
            'type1',
            value: 1
          }
        ]),
        setUpList: fromJS([]),
        error: { serverMessages: {} }
      }),
      onboarding: fromJS({
        hideIntro: false
      }),
      initialData: {
        ...initialData,
        permitID: 1,
        eventID: 0,
        receiptEntryID: 0
      }
    });

    return store.dispatch(updatePermitBookingInfo([]))
      .then(() => {
        const storeActions = store.getActions();
        expect(Array.isArray(storeActions)).toBeTruthy();
        expect(storeActions.some(action => action.type === MERGE_PERMIT_AND_PENDING_BOOKINGS)).toBe(true);
      });
  });

  it('permitBookingInfoProceed should work fine', () => {
    const {
      BOOKING_INFO_PROCEED_SUCCESS,
      BOOKING_INFO_PROCEED_FAILURE,
      BOOKING_INFO_CLEAN,
      permitBookingInfoProceed
    } = actions;

    return store.dispatch(permitBookingInfoProceed(bookingInfoData))
      .then(() => {
        const storeActions = store.getActions();

        expect(Array.isArray(storeActions)).toBeTruthy();
        expect(storeActions.some(action => action.type === BOOKING_INFO_PROCEED_SUCCESS)).toBe(true);
        expect(storeActions.some(action => action.type === BOOKING_INFO_CLEAN)).toBe(true);
      });
  });

  it('permitBookingInfoProceed should work fine, if not need proceed booking', () => {
    const {
      BOOKING_INFO_PROCEED_SUCCESS,
      BOOKING_INFO_PROCEED_FAILURE,
      BOOKING_INFO_CLEAN,
      permitBookingInfoProceed
    } = actions;

    const noNeedProceedData = {
      eventResource: [
        {
          setupMinutes: 0,
          bookingAssignment: 0,
          definedDateRange: [
            {
              id: 17,
              name: 'Dec 1, 2016 to Dec 30, 2016',
              selected: true,
              parent_id: 766,
              text: 'Dec 1, 2016 to Dec 30, 2016',
              value: 17
            }
          ],
          resourceType: 0,
          resourceID: 766,
          reservationPeriodUnit: 6,
          resourceNumber: '',
          resourceName: '1_resource_test_date_range_new',
          cleanupMinutes: 0,
          id: 766,
          bookingDetail: [{
            resourceBookingID: 1,
            attendance: 1,
            dateRangeID: 17,
            prepCodeID: 6,
            pendingID: 'pending_766_1600',
            endEventTime: '',
            isDeleteSchedule: true
          }]
        }
      ],
      checkForWaitlistConflict: true,
      cleanupMinutes: 0,
      eventAttendance: 1,
      eventName: 'test',
      eventType: 'Events',
      eventTypeID: 28,
      permitID: -1,
      scheduleType: 'External Reservation',
      scheduleTypeID: 2,
      setupMinutes: 0
    };

    return store.dispatch(permitBookingInfoProceed(noNeedProceedData))
      .then(() => {
        const storeActions = store.getActions();

        expect(storeActions.some(action => action.type === BOOKING_INFO_PROCEED_SUCCESS)).toBe(true);
      });
  });

  it('permitBookingInfoProceed should work fine, if no seleted', () => {
    const {
      BOOKING_INFO_PROCEED_SUCCESS,
      BOOKING_INFO_PROCEED_FAILURE,
      BOOKING_INFO_CLEAN,
      permitBookingInfoProceed
    } = actions;
    const mockStore = configureStore(middlewares);
    store = mockStore({
      bookingInfo: fromJS(bookingInfo),
      onboarding: fromJS(onboarding),
      initialData,
      initialData: {
        ...initialData,
        eventID: 0,
        receiptEntryID: 0
      }
    });

    const noSelectedBooking = {
      eventResource: [
        {
          setupMinutes: 0,
          bookingAssignment: 0,
          definedDateRange: [
            {
              id: 16,
              name: 'Dec 1, 2016 to Dec 30, 2016',
              selected: false,
              parent_id: 766,
              text: 'Dec 1, 2016 to Dec 30, 2016',
              value: 16
            }
          ],
          resourceType: 0,
          resourceID: 766,
          reservationPeriodUnit: 6,
          resourceNumber: '',
          resourceName: '1_resource_test_date_range_new',
          cleanupMinutes: 0,
          id: 766,
          bookingDetail: [{
            resourceBookingID: 0,
            isRecurring: false,
            dateRangeID: 17,
            prepCodeID: 6,
            pendingID: 'pending_766_1638',
            endEventTime: '',
            isDeleteSchedule: false
          }]
        },
        {
          setupMinutes: 30,
          bookingAssignment: 0,
          resourceType: 0,
          resourceID: 761,
          reservationPeriodUnit: 1,
          resourceNumber: '',
          resourceName: '1_resource_test_minutes',
          cleanupMinutes: 30,
          id: 761,
          bookingDetail: [
            {
              resourceBookingID: 2,
              attendance: 1,
              dateRangeID: -1,
              prepCodeID: 7,
              pendingID: 'pending_761_0',
              transactionID: -1,
              reservationType: 0,
              rentalBlockID: -1,
              startEventDatetime: '',
              endEventDatetime: '',
              startEventDate: 'Dec 07, 2016',
              startEventTime: '4:00',
              endEventDate: 'Dec 07, 2016',
              endEventTime: '5:00',
              isDeleteSchedule: false,
              isRecurring: false,
              baseBookingID: 2
            }, {
              resourceBookingID: 2,
              attendance: 1,
              dateRangeID: -1,
              prepCodeID: 7,
              pendingID: 'pending_761_0',
              transactionID: -1,
              reservationType: 0,
              rentalBlockID: -1,
              startEventDatetime: '',
              endEventDatetime: '',
              startEventDate: 'Dec 07, 2016',
              startEventTime: '4:00',
              endEventDate: 'Dec 07, 2016',
              endEventTime: '5:00',
              isDeleteSchedule: false,
              isRecurring: true,
              baseBookingID: 2
            }, {
              resourceBookingID: 0,
              dateRangeID: -1,
              prepCodeID: 7,
              pendingID: 'pending_761_4186',
              transactionID: -1,
              reservationType: 0,
              rentalBlockID: -1,
              startEventDatetime: '',
              endEventDatetime: '',
              startEventDate: 'Dec 07, 2016',
              startEventTime: '4:00',
              endEventDate: 'Dec 07, 2016',
              endEventTime: '5:00',
              isDeleteSchedule: false,
              hasRecurring: true,
              recurringExceptions: [],
              recurringPattern: {
                type: 1,
                frequency: 1,
                count:2
              },
              masterFacilityScheduleID: 2,
              recurringReservationGroupID: null
            }, {
              resourceBookingID: 0,
              dateRangeID: -1,
              prepCodeID: 7,
              pendingID: 'pending_761_4186',
              transactionID: -1,
              reservationType: 0,
              rentalBlockID: -1,
              startEventDatetime: '',
              endEventDatetime: '',
              startEventDate: 'Dec 07, 2016',
              startEventTime: '4:00',
              endEventDate: 'Dec 07, 2016',
              endEventTime: '5:00',
              isDeleteSchedule: false,
              isRecurring: true,
              baseBookingID: 2,
              hasRecurring: true,
              recurringExceptions: [],
              recurringPattern: {
                type: 1,
                frequency: 1,
                count:2
              },
              recurringReservationGroupID: null
            }
          ]
        },
        {
          setupMinutes: 0,
          bookingAssignment: 0,
          resourceType: 0,
          resourceID: 756,
          reservationPeriodUnit: 7,
          resourceNumber: '',
          resourceName: '1_resource_test_rental_block',
          cleanupMinutes: 0,
          id: 756,
          rentalBlock: [
            {
              id: 44,
              name: '3:00 to 4:00',
              selected: false,
              parent_id: 756,
              text: '3:00 to 4:00',
              value: 44
            }
          ],
          bookingDetail: [
            {
              resourceBookingID: 0,
              attendance: 1,
              prepCodeID: 8,
              pendingID: 'pending_756_2096',
              rentalBlockID: 42,
              startEventDate: 'Dec 07, 2016',
              isDeleteSchedule: false
            }
          ]
        }
      ],
      checkForWaitlistConflict: true,
      cleanupMinutes: 0,
      eventAttendance: 1,
      eventName: 'test',
      eventType: 'Events',
      eventTypeID: 28,
      permitID: -1,
      scheduleType: 'External Reservation',
      scheduleTypeID: 2,
      setupMinutes: 0
    };

    return store.dispatch(permitBookingInfoProceed(noSelectedBooking))
      .then(() => {
        const storeActions = store.getActions();

        expect(storeActions.some(action => action.type === BOOKING_INFO_PROCEED_SUCCESS)).toBe(true);
      });
  });

  it('permitBookingInfoProceed should work fine with override rental block', () => {
    const {
      BOOKING_INFO_PROCEED_SUCCESS,
      BOOKING_INFO_PROCEED_FAILURE,
      BOOKING_INFO_CLEAN,
      permitBookingInfoProceed
    } = actions;
    const mockStore = configureStore(middlewares);
    store = mockStore({
      bookingInfo: fromJS(bookingInfo),
      onboarding: fromJS(onboarding),
      initialData,
      initialData: {
        ...initialData,
        eventID: 0,
        receiptEntryID: 0
      }
    });

    const noSelectedBooking = {
      eventResource: [
        {
          setupMinutes: 0,
          bookingAssignment: 0,
          resourceType: 0,
          resourceID: 756,
          reservationPeriodUnit: 7,
          resourceNumber: '',
          resourceName: '1_resource_test_rental_block',
          cleanupMinutes: 0,
          id: 756,
          rentalBlock: [
            {
              id: 44,
              name: '3:00 to 4:00',
              selected: false,
              parent_id: 756,
              text: '3:00 to 4:00',
              value: 44
            }
          ],
          bookingDetail: [
            {
              resourceBookingID: 0,
              attendance: 1,
              prepCodeID: 8,
              pendingID: 'pending_756_2096',
              rentalBlockID: 42,
              startEventDate: 'Dec 07, 2016',
              isDeleteSchedule: false,
              isRentalBlockOverride: true,
              overrideRentalBlock: {
                id: 'override rental block id',
                name: '4:00 PM to 7:00 PM'
              }
            }
          ]
        }
      ],
      checkForWaitlistConflict: true,
      cleanupMinutes: 0,
      eventAttendance: 1,
      eventName: 'test',
      eventType: 'Events',
      eventTypeID: 28,
      permitID: -1,
      scheduleType: 'External Reservation',
      scheduleTypeID: 2,
      setupMinutes: 0
    };

    return store.dispatch(permitBookingInfoProceed(noSelectedBooking))
      .then(() => {
        const storeActions = store.getActions();

        expect(storeActions.some(action => action.type === BOOKING_INFO_PROCEED_SUCCESS)).toBe(true);
      });
  });

  it('proceed both new added booking and bookings under permit', () => {
    const bookings = [
      {
        // need proceed
        pendingID: '123456',
        isDeleteSchedule: false
      },
      {
        // don't need proceed
        pendingID: '123456',
        isDeleteSchedule: true
      },
      {
        // need proceed
        pendingID: -1
      },
      {
        // need proceed
        pendingID: '123456',
        isDeleteSchedule: true,
        pendingResourceBookingID: '88823'
      }
    ]

    expect(needsProceed(bookings[0])).toEqual(true);
    expect(needsProceed(bookings[1])).toEqual(false);
    expect(needsProceed(bookings[2])).toEqual(true);
    expect(needsProceed(bookings[3])).toEqual(true);
  });

  it('setClearRecurring should work fine', () => {
    const { SET_CLEAR_RECURRING, setClearRecurring } = actions;

    store.dispatch(setClearRecurring(1));
    const action = first(store.getActions());

    expect(typeof action).toBe('object');
    expect(action.type).toBe(SET_CLEAR_RECURRING);
  });

  it('deleteRecurringBookings should work fine', () => {
    const { DELETE_RECURRING_BOOKINGS, deleteRecurringBookings } = actions;

    store.dispatch(deleteRecurringBookings(1));
    const action = first(store.getActions());

    expect(typeof action).toBe('object');
    expect(action.type).toBe(DELETE_RECURRING_BOOKINGS);
  });

  it('setRecurringPattern should work fine', () => {
    const { SET_RECURRING_PATTERN, setRecurringPattern } = actions;

    store.dispatch(setRecurringPattern(1));
    const action = first(store.getActions());

    expect(typeof action).toBe('object');
    expect(action.type).toBe(SET_RECURRING_PATTERN);
  });

  it('clearRecurringGroups should work fine', () => {
    const { CLEAR_RECURRING_GROUPS, clearRecurringGroups } = actions;

    store.dispatch(clearRecurringGroups());
    const action = first(store.getActions());

    expect(typeof action).toBe('object');
    expect(action.type).toBe(CLEAR_RECURRING_GROUPS);
  });

  it('toggleRecurringBookings should work fine', () => {
    const { TOGGLE_RECURRING_BOOKINGS, toggleRecurringBookings } = actions;

    store.dispatch(toggleRecurringBookings(1));
    const action = first(store.getActions());

    expect(typeof action).toBe('object');
    expect(action.type).toBe(TOGGLE_RECURRING_BOOKINGS);
  });

  it('updateIsFillScheduleState should work fine', () => {
    const { UPDATE_IS_FILL_SCHEDULE_STATE, updateIsFillScheduleState } = actions;

    store.dispatch(updateIsFillScheduleState(1));
    const action = first(store.getActions());

    expect(typeof action).toBe('object');
    expect(action.type).toBe(UPDATE_IS_FILL_SCHEDULE_STATE);
  });

  it('resetOverrideRentalBlock should works find', () => {
    const { RESET_OVERRIDE_RENTAL_BLOCK, resetOverrideRentalBlock } = actions;
    store.dispatch(resetOverrideRentalBlock(1, 1));
    const action = first(store.getActions());
    expect(typeof action).toBe('object');
    expect(action.type).toBe(RESET_OVERRIDE_RENTAL_BLOCK);
    expect(action.payload.resourceIndex).toBe(1);
    expect(action.payload.bookingIndex).toBe(1);
  });

  it('setOverrideRentalBlock should works find', () => {
    const { SET_OVERRIDE_RENTAL_BLOCK, setOverrideRentalBlock } = actions;
    store.dispatch(setOverrideRentalBlock('rental block name', 1, 1));
    const action = first(store.getActions());
    expect(typeof action).toBe('object');
    expect(action.type).toBe(SET_OVERRIDE_RENTAL_BLOCK);
    expect(action.payload.resourceIndex).toBe(1);
    expect(action.payload.bookingIndex).toBe(1);
    expect(action.payload.value.name).toBe('rental block name');
  });

  it('setOverrideRentalBlockError should works find', () => {
    const { SET_OVERRIDE_RENTAL_BLOCK_ERROR, setOverrideRentalBlockError } = actions;
    store.dispatch(setOverrideRentalBlockError('booking id', 'error'));
    const action = first(store.getActions());
    expect(typeof action).toBe('object');
    expect(action.type).toBe(SET_OVERRIDE_RENTAL_BLOCK_ERROR);
    expect(action.payload.bookingID).toBe('booking id');
    expect(action.payload.error).toBe('error');
  });
});
