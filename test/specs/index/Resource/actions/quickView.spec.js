import configureStore from 'redux-mock-store';
import middlewares from 'shared/api/middlewares';
import { fromJS } from 'immutable';
import first from 'lodash/first';
import mockAPI from 'utils/mockAPI';
import * as actions from 'index/Resource/actions/quickView';
import { clearMockActions } from '../../../../utils/mockDispatch';
import deleteQuickViewJSON from 'json/Resource/deleteQuickView.json';

jest.mock('react-base-ui/lib/services/dialog', () => ({
  confirm: jest.fn().mockReturnValue(Promise.resolve())
}));

describe('index/Resource/actions/onboarding', () => {
  let store = null;
  let mockStore = null;
  let API = {
    get: null,
    post: null
  };
  const initialData = {
    permitID: -1,
    eventID: 2,
    batchID: '1111111',
    receiptID: '2222222',
    receiptEntryID: '3333333'
  }


  const dataList = [ {
    "id": 6,
    "name": "test1",
    "value": 6,
    "text": "test1",
    "selected": true,
    "resource_ids": [
        10,
        11
      ]
  } ];

  beforeEach(() => {
    mockStore = configureStore(middlewares);
    store = mockStore({
      monthView: fromJS({showDayView: false}),
      resourceFilter: {
        centers: fromJS({ selected: [] }),
        eventTypes: fromJS({ selected: [] }),
        facilityTypes: fromJS({ selected: [] }),
        resourceTypes: fromJS({ selected: [] }),
        resources: fromJS({ selected: [] })
      },
      resourceBooking: fromJS({
        start_date: '',
        end_date: '',
        include_linked_resources: ''
      }),
      quickView: fromJS(
        {
          data: fromJS(dataList),
          selectedView: 6,
          showModel: false,
          name: 'view',
          errorMessage: ''
        }
      ),
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

  it('fetchQuickView should work fine when select view is not none', () => {
    const { fetchQuickView } = actions;

    store.dispatch(fetchQuickView());
    const storeActions = store.getActions();
    
    expect(storeActions.some(action => action.type
      === 'SET_SELECTED_RESOURCES')).toBeTruthy();
  });

  it('fetchQuickView should work fine when select view is none', () => {
    const { fetchQuickView } = actions;
    store = mockStore({
      monthView: fromJS({showDayView: false}),
      resourceFilter: {
        resources: fromJS(
          { selected: [] }
        )
      },
      resourceBooking: fromJS({
        start_date: '',
        end_date: '',
        include_linked_resources: '',
        resource_ids: []
      }),
      quickView: fromJS(
        {
          data: fromJS([ {
            "id": 6,
            "name": "test1",
            "value": 6,
            "text": "test1",
            "selected": false,
            "resource_ids": [
                10,
                11
            ]
          } ]),
          selectedView: -1,
          showModel: false,
          name: 'view',
          errorMessage: ''
        }
      ),
      initialData
    });
    store.dispatch(fetchQuickView());
    const storeActions = store.getActions();
    expect(storeActions.some(action => action.type
      === '')).toBeTruthy();
  });

  it('selectQuickView should work fine', () => {
    const { selectQuickView } = actions;

    return store.dispatch(selectQuickView())
      .then(() => {
        const storeActions = store.getActions();
        expect(typeof storeActions).toBe('object');
      });
  });

  it('setQuickViewName should work fine', () => {
    const { setQuickViewName } = actions;

    store.dispatch(setQuickViewName({ value: 10 }));
    const action = first(store.getActions());

    expect(typeof action).toBe('object');
    expect(action.type).toBe('SET_QUICK_VIEW');
  });

  it('setQuickView should work fine', () => {
    const { setQuickView } = actions;

    return store.dispatch(setQuickView(-1))
      .then(() => {
        const storeActions = store.getActions();
        expect(storeActions.some(action => action.type
          === 'SET_QUICK_VIEW')).toBeTruthy();
      });
  });

  it('setQuickView should work fine when view is not -1', () => {
    const { setQuickView } = actions;

    return store.dispatch(setQuickView(6))
      .then(() => {
        const storeActions = store.getActions();
        expect(storeActions.some(action => action.type
          === 'SET_SELECTED_RESOURCES')).toBeTruthy();
      });
  });

  it('setQuickView should work fine when change view to a deleted one.', (done) => {
    const { setQuickView } = actions;
    const mockResponse = {
      "headers": {
        "response_code": "0000"
      },
      "body": {
        "message": "The Quick View you are trying to use has been deleted",
        "quick_view_list": [
          {
            "id": 88,
            "name": "7",
            "selected": true,
            "resource_ids": [105, 108, 101]
          }, {
            "id": 80,
            "name": "V1",
            "selected": false,
            "resource_ids": [100, 105, 108]
          }, {
            "id": 87,
            "name": "ds",
            "selected": false,
            "resource_ids": [105, 108, 100, 101]
          }
        ]
      }
    };
    mockAPI({
      path: '/json/Resource/updateSelectedQuickView.json',
      result: mockResponse
    });


    return store.dispatch(setQuickView(6))
      .then(() => {
        const storeActions = store.getActions();
        expect(storeActions.length).toBe(3);
        expect(storeActions[0].type).toEqual('');
        expect(storeActions[1].type).toEqual('');
        expect(storeActions[1].payload).toEqual(mockResponse);
        expect(storeActions[2].type).toEqual('SAVE_QUICK_VIEW');
        expect(storeActions[2].payload.body).toEqual(mockResponse.body);
        done();
      });
  });
  it('showQuickViewModel should work fine', () => {     
    const { showQuickViewModel } = actions;

    store.dispatch(showQuickViewModel({ value: 10 }));
    const action = first(store.getActions());

    expect(action.type).toBe('SHOW_NEW_QUICK_VIEW_DIALOG');
  });

  it('saveQuickView should work fine', () => {
    const { saveQuickView } = actions;

    return store.dispatch(saveQuickView())
      .then(() => {
        const storeActions = store.getActions();
        expect(storeActions.some(action => action.type
          === 'SHOW_NEW_QUICK_VIEW_DIALOG')).toBeTruthy();
      });
  });

  it('saveQuickView failed', () => {
    const { saveQuickView } = actions;

    mockAPI({
      path: '/json/Resource/saveQuickView.json',
      result: {
        "headers": {
          "response_code": "0000",
          "response_message": "Successful"
        },
        "body": {
          "message": "Failed"
        }
      }
    });

    return store.dispatch(saveQuickView())
      .then(() => {
        const storeActions = store.getActions();
        expect(storeActions.some(action => action.type
          === 'SET_QUICK_VIEW_ERROR')).toBeTruthy();
      });
  });

  it('validateQuickView should work fine when name is long text', () => {
    const { validateQuickView } = actions;
    store.dispatch(validateQuickView('whyy whyy whyy whyy whyy whyy whyy whyy whyy whyy whyy whyy whyy whyy', []));
    const action = first(store.getActions());
    
    expect(action.type).toBe('SET_QUICK_VIEW_ERROR');
  });

  it('validateQuickView should work fine when name is long text', () => {
    const { validateQuickView } = actions;
    store.dispatch(validateQuickView('whyy whyy', []));
    const action = first(store.getActions());
    
    expect(action.type).toBe('SET_QUICK_VIEW_NAME');
  });

  it('validateQuickView not passed ', () => {
    const { validateQuickView } = actions;
    store.dispatch(validateQuickView('test1', dataList));
    const action = first(store.getActions());
    
    expect(action.type).toBe('SET_QUICK_VIEW_ERROR');
  });

  it('deleteQuickView should work well when delete the view whick is not currently selected.', (done) => {
    const { deleteQuickView } = actions;
    store.dispatch(deleteQuickView('123')).then(
      () => {
        const storeActions = store.getActions();
        expect(storeActions.length).toEqual(2);
        expect(storeActions[0].type).toEqual('');
        expect(storeActions[1].type).toEqual('DELETE_QUICK_VIEW');
        expect(storeActions[1].payload.body).toEqual(deleteQuickViewJSON.body);
        done()

      }
    )
  });

  it('deleteQuickView should work well when delete the view whick is currently selected.', (done) => {
    const { deleteQuickView } = actions;
    store.dispatch(deleteQuickView('123', '123')).then(
      () => {
        const storeActions = store.getActions();
        expect(storeActions.length).toEqual(3);
        expect(storeActions[0].type).toEqual('SET_QUICK_VIEW');
        expect(storeActions[0].payload.value).toEqual(-1);
        expect(storeActions[1].type).toEqual('');
        expect(storeActions[2].type).toEqual('DELETE_QUICK_VIEW');
        expect(storeActions[2].payload.body).toEqual(deleteQuickViewJSON.body);
        done()
      }
    )
  });
});
