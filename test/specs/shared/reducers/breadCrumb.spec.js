/**
 * todo: refactor dependency resolver inside karma.conf.js
 * so we can properly resolve linting errors that occur when
 * importing from json/** directory
 */

/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable import/no-unresolved */

import { is, fromJS } from 'immutable';
import getBreadCrumbReducerHandler from 'shared/reducers/breadCrumb';

describe('shared -> reducers -> breadCrumb', () => {
  it('Should return the expected initial state when has breadcrumb', () => {
    const initData = {
      breadcrumb: [
        {
          key: 'Reservations',
          url: '',
          previous_name: null,
          name: 'Reservations',
          confirm_message: 'If you continue, your pending receipt will be cancelled. Are you sure you want to leave the page?',
          action: null
        }, {
          key: 'Reservation Detail',
          url: '/ui.do?method=reloadReservationDetail&permit_id=3679&batch_id=0&receipt_id=7',
          previous_name: 'Reservations',
          name: 'Reservation Detail',
          confirm_message: null,
          action: {
            api_method: 'POST',
            api_url: '/rest/common/receipt/cancel/',
            api_parameter: {
              batch_id: 0,
              void_draft: false,
              receipt_id: 7
            }
          }
        }, {
          key: 'Payment',
          url: null,
          previous_name: 'currentpage',
          name: 'Payment',
          confirm_message: null,
          action: null
        }
      ],
      batchID: 0,
      receiptID: 0
    };

    const expectedInitialState = fromJS({
      batchID: 0,
      receiptID: 0,
      data: [
        {
          isRoot: true,
          type: 'rootmenuitem',
          name: 'Reservations',
          functionMenu: '',
          promptMessage: 'If you continue, your pending receipt will be cancelled. Are you sure you want to leave the page?',
          url: '',
          action: null
        }, {
          isRoot: false,
          type: 'Reservations',
          name: 'Reservation Detail',
          functionMenu: 'Reservations',
          promptMessage: null,
          url: '/ui.do?method=reloadReservationDetail&permit_id=3679&batch_id=0&receipt_id=7',
          action: {
            parameter: {
              batchID: 0,
              voidDraft: false,
              receiptID: 7
            }
          }
        }, {
          isRoot: false,
          type: 'currentpage',
          name: 'Payment',
          functionMenu: '',
          promptMessage: null,
          url: '',
          action: null
        }
      ]
    });

    expect(is(expectedInitialState, getBreadCrumbReducerHandler(initData)(undefined, {}))).toBe(true);
  });

  it('Should return the expected initial state when has no breadcrumb', () => {
    const expectedInitialState = fromJS({
      batchID: undefined,
      receiptID: undefined,
      data: []
    });

    expect(is(expectedInitialState, getBreadCrumbReducerHandler({})(undefined, {}))).toBe(true);
  })
});
