import configureStore from 'redux-mock-store';
import middlewares from 'shared/api/middlewares';
import { fromJS } from 'immutable';
import first from 'lodash/first';
import mockAPI from 'utils/mockAPI';
import * as actions from 'index/Resource/actions/searchSection';
import { CHANGE_RESOURCES } from '../../../../../src/index/Resource/actions/resourceFilters';
import { FETCH_RESOURCES_BOOKING_SUCCESS } from '../../../../../src/index/Resource/actions/resourceBooking';

describe('index/Resource/actions/searchSection', () => {
  let store = null;
  const initialData = {
    permitID: -1,
    eventID: 2,
    batchID: '1111111',
    receiptID: '2222222',
    receiptEntryID: '3333333'
  };

  beforeEach(() => {
    const mockStore = configureStore(middlewares);
    store = mockStore({
      searchSection: fromJS({
        showSearchBar: {}
      }),
      resourceFilter: {
        centers: fromJS({
          selected: []
        }),
        eventTypes: fromJS({
          selected: []
        }),
        resourceTypes: fromJS({
          selected: []
        }),
        facilityTypes: fromJS({
          selected: []
        }),
        resources: fromJS({
          selected: []
        })
      },
      resourceBooking: fromJS({}),
      bookingInfo: fromJS({
        scheduleTypes: [],
        prepCodeList: [],
        setUpList: [],
        data: {
          eventResource: []
        }
      }),
      onboarding: fromJS({}),
      initialData
    });
  });

  afterEach(() => {
    store.clearActions();
  });

  it('isShowSearchBar should work fine', () => {
    const { isShowSearchBar } = actions;
    const setShowSearchbar = jest.fn();

    store.dispatch(isShowSearchBar(setShowSearchbar));
    const action = first(store.getActions());

    expect(typeof action).toBe('object');
    expect(action.type).toBe('IS_SHOW_SEARCH_BAR');
  });

  it('clearFilter should work fine', () => {
    const { clearFilter } = actions;

    return store.dispatch(clearFilter())
      .then(() => {
        const storeActions = store.getActions();

        expect(storeActions.some(action => action.type
          === 'SET_CENTER')).toBeTruthy();
        expect(storeActions.some(action => action.type
          === 'SET_EVENT_TYPE')).toBeTruthy();
        expect(storeActions.some(action => action.type
          === 'SET_FACILITY_TYPE')).toBeTruthy();
        expect(storeActions.some(action => action.type
          === 'SET_RESOURCE_TYPE')).toBeTruthy();
        expect(storeActions.some(action => action.type
          === 'CHANGE_RESOURCES')).toBeTruthy();
        expect(storeActions.some(action => action.type
          === 'SET_QUICK_VIEW')).toBeTruthy();
        expect(storeActions.some(action => action.type
          === 'SET_RESOURCE_IDS')).toBeTruthy();
        expect(storeActions.some(action => action.type
          === 'SAVE_FILTERS')).toBeTruthy();
        expect(storeActions.some(action => action.type
          === 'FETCH_RESOURCES')).toBeTruthy();
      });
  });

  it('isFixedSearchBar should work fine', () => {
    const {
      isFixedSearchBar,
      IS_FIXED_SEARCHBAR
    } = actions;

    store.dispatch(isFixedSearchBar(''));
    const action = first(store.getActions());

    expect(typeof action).toBe('object');
    expect(action.type).toBe(IS_FIXED_SEARCHBAR);
  });
});
