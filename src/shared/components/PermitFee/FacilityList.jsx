import React from 'react';
import decodeHtmlStr from 'react-base-ui/lib/utils/decodeHtmlStr';
import UIComponent from 'shared/components/UIComponent';
import showAndHideAnimation from '../../utils/showAndHideAnimation';
import FacilityItem from './FacilityItem';

export default class FacilityList extends UIComponent {
  constructor(props) {
    super(props);

    this.bind('showAndHideHandler');
  }

  showAndHideHandler(e, facilityIndex) {
    const control = this._refs[`${this.props.facilityKey}-${facilityIndex}`];
    /* istanbul ignore else */
    if (control) {
      showAndHideAnimation(e, control);
    }
  }

  render() {
    const { facility, feeActionStatus, newEntryID, eventID, eventIndex } = this.props;

    const facilityID = facility.facilityID;
    const transactionID = facility.transactionID;
    const scheduleFees = facility.scheduleFees;
    const additionalFee = facility.additionalFees;

    return (
      <div className="list-wrapper">
        <div className="aaui-flex afx-xl-mg-12 facility-list">
          <div className="afx-col afx-xl-3-12 afx-col-name">
            {decodeHtmlStr(facility.facilityName)}
            {
              facility.centerName ? <p>{decodeHtmlStr(facility.centerName)}</p> : null
            }
          </div>
          <div className="afx-col afx-xl-9-12">
            {
              scheduleFees.map((scheduleFee, index) => {
                const recurringScheduleFees = scheduleFee.recurringScheduleFees;
                const scheduleKey = `facility_${facilityID}_schedule_${index}`;
                const recurringScheduleFeesLength = (
                  recurringScheduleFees && recurringScheduleFees.length);

                /* istanbul ignore else */
                if (scheduleFees.length) {
                  return (
                    <div className="schedule-list">
                      <FacilityItem
                        key={scheduleKey}
                        facilityKey={scheduleKey}
                        facilityID={facilityID}
                        transactionID={transactionID}
                        scheduleFee={scheduleFee}
                        feeActionStatus={feeActionStatus}
                        fetchPermitFee={this.props.fetchPermitFee}
                        permitDetailsChanged={this.props.permitDetailsChanged}
                        showWaringAlert={this.props.showWaringAlert}
                        newEntryID={newEntryID}
                        eventID={eventID}
                        eventIndex={eventIndex}
                      />
                      {
                        recurringScheduleFeesLength ?
                          <div className="recurring-fees">
                            <div className="recurring-title">
                              <span onClick={() => this.showAndHideHandler({ target: this._refs[`recurring-expand-${this.props.facilityKey}-${index}`] }, index)}>
                                {recurringScheduleFeesLength} instance(s) of recurring
                              </span>
                              <i
                                className="icon icon-chevron-down"
                                ref={(i) => { this._refs[`recurring-expand-${this.props.facilityKey}-${index}`] = i; }}
                                onClick={e => this.showAndHideHandler(e, index)}
                              />
                            </div>

                            <div
                              className="schedule-fee"
                              ref={(el) => { this._refs[`${this.props.facilityKey}-${index}`] = el; }}
                            >
                              {
                                recurringScheduleFees.map((recurringFee, recurringIndex) => {
                                  const recurringKey = `facility_${facilityID}_recurring_${recurringIndex}`;

                                  return (
                                    <FacilityItem
                                      key={recurringKey}
                                      facilityKey={recurringKey}
                                      facilityID={facilityID}
                                      transactionID={transactionID}
                                      scheduleFee={recurringFee}
                                      feeActionStatus={feeActionStatus}
                                      fetchPermitFee={this.props.fetchPermitFee}
                                      permitDetailsChanged={this.props.permitDetailsChanged}
                                      showWaringAlert={this.props.showWaringAlert}
                                      newEntryID={newEntryID}
                                      eventID={eventID}
                                      eventIndex={eventIndex}
                                    />
                                  );
                                })
                              }
                            </div>

                          </div> : ''
                      }
                    </div>
                  );
                }
                return '';
              })
            }

            <div className="schedule-list">
              <FacilityItem
                key={`facility_${facilityID}_additional`}
                facilityKey={`facility_${facilityID}_additional`}
                facilityID={facilityID}
                transactionID={transactionID}
                additionalFee={additionalFee}
                feeActionStatus={feeActionStatus}
                fetchPermitFee={this.props.fetchPermitFee}
                permitDetailsChanged={this.props.permitDetailsChanged}
                showWaringAlert={this.props.showWaringAlert}
                newEntryID={newEntryID}
                eventID={eventID}
                eventIndex={eventIndex}
              />
            </div>
          </div>

        </div>
      </div>
    );
  }
}
