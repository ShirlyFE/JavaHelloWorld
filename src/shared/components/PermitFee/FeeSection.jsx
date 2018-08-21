import PropTypes from 'prop-types';
import React from 'react';
import classNames from 'classnames';
import FeeDelete from './FeeDelete';
import FacilityList from './FacilityList';
import './index.less';

export default class FeeSection extends FeeDelete {

  static propTypes = {
    permitDetailsChanged: PropTypes.func.isRequired,
    feeActionStatus: PropTypes.func.isRequired
  };

  resetFee = (allowResetFees) => {
    if (!allowResetFees) {
      return false;
    }
    const {
      batchID,
      receiptID,
      eventID,
      eventIndex,
      newEntryID
    } = this.props;

    return this.props.resetFeeAsyncAction(eventID, newEntryID)
      .then(() => {
        this.props.permitDetailsChanged();
        return this.props.fetchPermitFee({
          batchID,
          receiptID,
          eventID,
          eventIndex,
          newEntryID
        });
      });
  }

  render() {
    const { facilityFees, newEntryID, eventID, eventIndex, allowResetFees } = this.props;

    return (
      <div
        className="reservartion-panel"
        ref={(reservationPanel) => { this._refs.reservationPanel = reservationPanel; }}
      >
        <div className="panel">
          <div className="aaui-flex permit-fee-list-header">
            <div className="afx-col afx-xl-3-12">RESOURCE</div>
            <div className="afx-col afx-xl-5-12">DATE & TIME</div>
            <div className="afx-col afx-xl-3-12 afx-col-right">AMOUNT WITHOUT TAX</div>
            <div
              className={classNames(
                'afx-col',
                'afx-xl-1-12',
                'link',
                'permit-fee__reset',
                { disabled: !allowResetFees }
              )}
              onClick={() => this.resetFee(allowResetFees)}
            >
              <i className="icon icon-rotate-left" /> Reset fees
            </div>
          </div>
          <div className="permit-fee-list">
            {
              facilityFees.map((facility, index) => {
                const key = `facility_${facility.facilityID}_${index}`;

                return (
                  <FacilityList
                    key={key}
                    facilityKey={key}
                    facility={facility}
                    fetchPermitFee={this.props.fetchPermitFee}
                    permitDetailsChanged={this.props.permitDetailsChanged}
                    showWaringAlert={data => this.showFeeDeleteAlert(data)}
                    feeActionStatus={this.props.feeActionStatus}
                    newEntryID={newEntryID}
                    eventID={eventID}
                    eventIndex={eventIndex}
                  />
                );
              })
            }
          </div>
        </div>
        { this.renderFeeDeleteAlert() }
      </div>
    );
  }

  showFeeDeleteAlert({
    facilityID,
    facilityChargeID,
    transactionID,
    receiptDetailID,
    newEntryID,
    batchID,
    receiptID,
    permitID,
    eventID,
    eventIndex
  }) {
    this.showWaringAlert(() => {
      const params = {
        batch_id: batchID,
        receipt_id: receiptID,
        permit_id: permitID,
        transaction_id: transactionID,
        receipt_detail_id: receiptDetailID,
        facility_id: facilityID,
        facility_charge_id: facilityChargeID,
        new_entry_id: newEntryID
      };

      this.props.deleteReservationFeeDetail(params).then(() => {
        this.props.fetchPermitFee({
          batchID,
          receiptID,
          eventID,
          eventIndex,
          newEntryID
        });
      });
      this.props.permitDetailsChanged();
    });
  }
}

