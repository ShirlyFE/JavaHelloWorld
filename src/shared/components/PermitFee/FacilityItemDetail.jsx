import React from 'react';
import decodeHtmlStr from 'react-base-ui/lib/utils/decodeHtmlStr';
import UIComponent from 'shared/components/UIComponent';
import formatCharge from 'shared/utils/formatCharge';
import URL from '../../urls';

export default class FacilityItemDetail extends UIComponent {
  constructor(props) {
    super(props);

    this.bind('deleteAlertOpen');
  }

  deleteAlertOpen() {
    this.props.showWaringAlert();
  }

  render() {
    const {
      facilityID,
      transactionID,
      facilityScheduleID,
      facilityChargeID,
      feeActionStatus,
      detailFee,
      newEntryID,
      receiptDetailID,
      permitID,
      eventID,
      eventIndex
    } = this.props;
    const detailUnitFee = formatCharge(detailFee.unitFee);
    const detailAmount = formatCharge(detailFee.amount);
    let unitCharge = '';

    if (detailFee.isPercentageDiscount) {
      unitCharge = `${detailFee.unitFee.toFixed(2)}%`;
    } else {
      unitCharge = `${detailUnitFee} ${detailFee.abbrevUnitOfMeasure} x ${detailFee.quantity}`;
    }

    return (
      <div className="facility-item item-detail-list">
        <div className="afx-col item-fee-name">
          <div className="facility-fee">{decodeHtmlStr(detailFee.chargeName)}</div>
        </div>
        <div className="afx-col item-fee-detail">{decodeHtmlStr(unitCharge)}</div>
        <div className="afx-col item-amount fee-amount">{decodeHtmlStr(detailAmount)}</div>
        <div className="afx-col item-option">
          <div className="facility-option">
            {
              feeActionStatus.allowEditFee && <i
                className="icon icon-sign-m" title="Edit charge"
                onClick={() => this.props.onAddNewCharge(
                  permitID > 0 ? URL.editChargeModify : URL.addNewCharge,
                  {
                    facilityID,
                    transactionID,
                    facilityScheduleID,
                    facilityChargeID,
                    newEntryID,
                    receiptDetailID,
                    eventID,
                    eventIndex,
                    sdirequath: Date.now()
                  }
                )}
              />
            }
            {
              feeActionStatus.allowDeleteFee &&
              <i className="icon icon-trash" title="Delete charge" onClick={this.deleteAlertOpen} />
            }
          </div>
        </div>
      </div>
    );
  }
}
