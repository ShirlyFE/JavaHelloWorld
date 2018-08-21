import URL from '../urls';

export const FETCH_PERMIT_FEE_SUCCESS = 'FETCH_PERMIT_FEE_SUCCESS';
export const DELETE_PERMIT_FEE_DETAIL = 'DELETE_PERMIT_FEE_DETAIL';
export const DECORATE_FACILITY = 'DECORATE_FACILITY';
export const DELETE_RESERVATION_FEE_DETAIL = 'DELETE_RESERVATION_FEE_DETAIL';

export function requestPermitFee(url, params, isModifyWorkflow) {
  const requestSuccessType = isModifyWorkflow ? '' : FETCH_PERMIT_FEE_SUCCESS;

  return {
    types: ['', requestSuccessType, ''],
    promise: API => API.get(url, {
      body: {
        ...params
      }
    })
  };
}

export function fetchPermitFee(requestUrl, requestParams) {
  return (dispatch, getState) => {
    let params = null;
    let url = '';
    let isModifyWorkflow = false;

    if (requestUrl) { // modify workflow
      url = requestUrl;
      params = requestParams;
      isModifyWorkflow = true;
    } else { // new workflow
      url = URL.newReservationFee;
      const { permitID, batchID, receiptID, receiptEntryID } = getState().initialData;

      params = {
        permit_id: permitID || 0,
        batch_id: batchID,
        receipt_id: receiptID,
        receipt_entry_id: receiptEntryID
      };
      isModifyWorkflow = false;
    }
    return dispatch(requestPermitFee(url, params, isModifyWorkflow));
  };
}

function _deletePermitFeeDetail(params) {
  return {
    types: [DELETE_PERMIT_FEE_DETAIL, '', ''],
    promise: API => API.delete(URL.deletePermitFee, {
      body: {
        ...params
      }
    })
  };
}

export function deletePermitFeeDetail(params) { // new workflow
  return dispatch =>
    dispatch(_deletePermitFeeDetail(params))
      .then(() => dispatch(fetchPermitFee()));
}

export function deleteReservationFeeDetail(params) { // modify workflow
  return {
    types: [DELETE_RESERVATION_FEE_DETAIL, '', ''],
    promise: API => API.delete(URL.deletePermitFeeModify, {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(params)
    })
  };
}

export function decorateFacility({ eventFee, feeSummary, eventIndex, eventSummary }) {
  return {
    type: DECORATE_FACILITY,
    payload: {
      eventFee,
      feeSummary,
      eventSummary,
      eventIndex
    }
  };
}

export const resetFeeAsyncAction = (eventID, newEntryID) => (dispatch, getState) => {
  const {
    permitID,
    batchID,
    receiptID,
    receiptEntryID
  } = getState().initialData;
  const entryID = permitID > 0
    ? parseInt(newEntryID, 10)
    : parseInt(receiptEntryID, 10);

  return dispatch({
    types: ['', '', ''],
    promise: API => API.post(URL.resetFee, {
      body: {
        batch_id: parseInt(batchID, 10),
        receipt_id: parseInt(receiptID, 10),
        permit_id: parseInt(permitID, 10) || -1,
        event_id: parseInt(eventID, 10) || -1,
        receipt_entry_id: entryID
      }
    })
  });
};
