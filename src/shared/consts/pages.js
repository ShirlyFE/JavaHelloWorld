/* This enum indicate that previous page of current page,
 and can be used for back button.
*/

export const calendarPage = 0;
export const reservationsPage = 1;
export const permitDetailPage = 2;
export const reservationDetailPage = 3;
export const cartPage = 4;
export const paymentPage = 5;
export const refundDepositsPage = 6;
export const confirmationPage = 7;
export const reloadReservationDetailPage = 8;
export const paymentModificationPage = 9;

// params for the redirect page
export const PAY_NOW = 1; // modify permit and must pay all in payment page immediately.
// Choose modify payment plan when click "Confirm Change" button in the reservation detail page
export const PAY_PLAN = 2;
export const PAY_IN_RESERVATION = 3; // Payment button in the action bar of reservation detail page
export const CHARGE_IN_REFUND_FEES = 4;
export const CALENDAR = 0;

// Search section of the page url
export const sourcePageKey = 'source_page_index';
export const paymentPageIndex = 'payment_page_index';
export const cancelPermit = 'cancel_permit';

export const pageUrls = {
  [calendarPage]: 'ui.do?method=booking',
  [reservationsPage]: 'ui.do?method=showPermits',
  [permitDetailPage]: 'ui.do?method=showPermitDetail',
  [reservationDetailPage]: 'ui.do?method=reservationDetail',
  [cartPage]: 'ui.do?method=showCart',
  [paymentPage]: 'ui.do?method=showPayment',
  [refundDepositsPage]: 'ui.do?method=permitRefund',
  [confirmationPage]: 'ui.do?method=showConfirmation',
  [reloadReservationDetailPage]: 'ui.do?method=reloadReservationDetail',
  [paymentModificationPage]: 'ui.do?method=paymentModification'
};

export const staticPageUrls = {
  [calendarPage]: 'index.Resource.html',
  [reservationsPage]: 'index.Reservation.html',
  [permitDetailPage]: 'index.PermitDetail.html',
  [reservationDetailPage]: 'index.ReservationDetail.html',
  [cartPage]: 'index.Cart.html',
  [paymentPage]: 'index.Payment.html',
  [refundDepositsPage]: 'index.RefundDeposits.html',
  [confirmationPage]: 'index.Confirmation.html',
  [reloadReservationDetailPage]: 'index.ReservationDetail.html',
  [paymentModificationPage]: 'index.Payment.html'
};

export const buildUrl = (pageIndex, objParams) => {
  const params = [];
  let pageUrl = '';

  /* istanbul ignore next */
  if (__STATIC__) {
    pageUrl = `${staticPageUrls[pageIndex]}?`;
  } else {
    pageUrl = pageUrls[pageIndex];
  }

  if (objParams) {
    Object.keys(objParams).forEach((key) => {
      params.push(`&${key}=${objParams[key]}`);
    });
  }
  /* istanbul ignore next */
  return `${__STATIC__ ? '' : window.__environment__.ROOT_URL}/${pageUrl}${params.join('')}`;
};
