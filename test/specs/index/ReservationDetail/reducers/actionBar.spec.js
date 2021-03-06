import { is, fromJS } from 'immutable';
import getActionBarReducer from 'index/ReservationDetail/reducers/actionBar';
import * as actions from 'index/ReservationDetail/actions/actionBar';

const reducer = getActionBarReducer(__reservationDetail__.__initialState__);

describe('index -> ReservationDetail -> reducers -> actionBar', () => {
  it('should return the initial state', (done) => {
    const initialState = fromJS({
      status: 0,
      disableActions: true
    });
    expect(is(initialState, reducer(undefined, {}))).toBe(true);
    done();
  });

  it('SET_STATUS should work fine', (done) => {
    const state = reducer(undefined, {
      type: actions.SET_STATUS,
      payload: { status: 2 }
    });
    expect(typeof state.toJS()).toBe('object');
    expect(state.toJS().status).toBe(2);
    done();
  });

  it('SET_DISABLED should work fine', () => {
    const state = reducer(undefined, {
      type: actions.SET_DISABLED,
    });
    expect(typeof state.toJS()).toBe('object');
    expect(state.toJS().disableActions).toBe(true);
  });
});
