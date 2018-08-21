import PropTypes from 'prop-types';
import React from 'react';
import classNames from 'classnames';
import { connect } from 'react-redux';
import decodeHtmlStr from 'react-base-ui/lib/utils/decodeHtmlStr';
import UIComponent from 'shared/components/UIComponent';
import Alert from 'shared/components/Alert';
import formatCharge from 'shared/utils/formatCharge';
import FacilityList from './FacilityList';

import {
  fetchPermitFee,
  deletePermitFeeDetail,
  resetFeeAsyncAction
} from '../../actions/permitFee';

import feesOrderByRecurring from '../../utils/feesOrderByRecurring';

import './index.less';


export class PermitFee extends UIComponent {

  static propTypes = {
    permitDetailsChanged: PropTypes.func.isRequired
  }

  constructor(props) {
    super(props);

    this.currentFacilityID = null;
    this.currentFacilityChargeID = null;

    this.bind('showWaringAlert', 'onConfirm');
  }

  showWaringAlert({ facilityID, facilityChargeID, transactionID, receiptDetailID }) {
    this.currentFacilityID = facilityID;
    this.currentFacilityChargeID = facilityChargeID;
    this.transactionID = transactionID;
    this.receiptDetailID = receiptDetailID;

    this.warningAlert.open();
  }

  onConfirm() {
    const { batchID, receiptID, receiptEntryID } = this.props.initialData;
    const params = {
      batch_id: batchID,
      receipt_id: receiptID,
      receipt_entry_id: receiptEntryID,
      facility_id: this.currentFacilityID,
      facility_charge_id: this.currentFacilityChargeID
    };

    this.props.deletePermitFeeDetail(params);
    this.props.permitDetailsChanged();
    this.warningAlert.onClose();
  }

  componentDidMount() {
    this.props.fetchPermitFee();
  }

  resetFee = (allowResetFees) => {
    if (!allowResetFees) {
      return false;
    }

    return this.props.resetFeeAsyncAction()
      .then(() => {
        this.props.permitDetailsChanged();
        return this.props.fetchPermitFee();
      });
  }

  render() {
    const permitFeeData = this.props.permitFeeData;
    const facilityFees = feesOrderByRecurring(permitFeeData.get('facilityFees').toJS());
    const subTotal = formatCharge(permitFeeData.get('subTotal'));
    const taxes = permitFeeData.get('taxes').toJS();
    const total = formatCharge(permitFeeData.get('total'));
    const feeActionStatus = permitFeeData.get('feeActionStatus') || {};
    const allowResetFees = feeActionStatus.allowResetFees;

    return (
      <div className="permit-fee panel reservation-fee">
        <div className="permit-fee-title">Fee</div>
        <div className="aaui-flex permit-fee-list-header">
          <div className="afx-col afx-xl-3-12">RESOURCE</div>
          <div className="afx-col afx-xl-5-12">DATE & TIME</div>
          <div className="afx-col afx-xl-3-12 afx-col-right fee-amount-right">AMOUNT WITHOUT TAX</div>
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
        <div>
          <div className="permit-fee-list">
            {
              facilityFees.map((facility, index) => {
                const key = `facility_${facility.facilityID}_${index}`;

                return (
                  <FacilityList
                    key={key}
                    facilityKey={key}
                    facility={facility}
                    feeActionStatus={feeActionStatus}
                    fetchPermitFee={this.props.fetchPermitFee}
                    permitDetailsChanged={this.props.permitDetailsChanged}
                    showWaringAlert={this.showWaringAlert}
                    showAddIcon
                    showEditIcon
                    showDeleteIcon
                  />
                );
              })
            }
          </div>
          <div className="permit-fee-list-footer">
            <div className="aaui-flex">
              <div className="afx-col afx-xl-11-12 afx-col-right fee-amount-right">
                <div className="col-name">
                  <div>Subtotal</div>
                  {
                    taxes.map((tax, index) => {
                      const taxNameKey = `tax_name_${index}`;
                      const taxName = tax.name;

                      return (
                        <div className="tax-label" key={taxNameKey}>{decodeHtmlStr(taxName)}</div>
                      );
                    })
                  }
                </div>
                <div className="col-amount">
                  <div>{subTotal}</div>
                  {
                    taxes.map((tax, index) => {
                      const taxMountKey = `tax_mount_${index}`;
                      const taxAmount = formatCharge(tax.amount);

                      return (
                        <div key={taxMountKey}>{taxAmount}</div>
                      );
                    })
                  }
                </div>
              </div>
              <div className="afx-col afx-xl-1-12" />
            </div>
            <div className="aaui-flex">
              <div className="afx-col afx-xl-11-12 afx-col-right afx-col-total">
                TOTAL
                <span className="fee-amount-right text-color-strong">{total}</span>
              </div>
              <div className="afx-col afx-xl-1-12" />
            </div>
          </div>
        </div>
        <div className="delete-warning">
          <Alert
            onClose={this.close}
            ref={node => (this.warningAlert = node)}
            title="Delete Fee"
            onCancel={this.onCancel}
            onConfirm={this.onConfirm}
            onOpen={this.onOpen}
            cancelText="No"
            confirmText="Yes"
          >
            Are you sure you want to delete the fee?
          </Alert>
        </div>
      </div>
    );
  }
}

export default connect(
  null,
  {
    fetchPermitFee,
    deletePermitFeeDetail,
    resetFeeAsyncAction
  }
)(PermitFee);
