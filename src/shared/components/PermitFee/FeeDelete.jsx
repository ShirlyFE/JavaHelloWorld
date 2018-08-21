import React from 'react';
import UIComponent from 'shared/components/UIComponent';
import Alert from 'shared/components/Alert';

export default class FeeDelete extends UIComponent {
  constructor(props) {
    super(props);

    this.state = {
      feeDeleteAlert: {
        title: 'Delete Fee',
        message: 'Are you sure you want to delete the fee?'
      }
    };

    this.confirmCallback = null;
  }

  renderFeeDeleteAlert() {
    const { title, message } = this.state.feeDeleteAlert;

    return (
      <Alert
        ref={alert => (this._refs.feeDeleteAlert = alert)}
        title={title}
        onConfirm={closeAlert => this.onConfirm(closeAlert)}
        cancelText="No"
        confirmText="Yes"
      >
        {message}
      </Alert>
    );
  }

  showWaringAlert(confirmCallback) {
    this.confirmCallback = confirmCallback;
    this._refs.feeDeleteAlert.open();
  }

  onConfirm(closeAlert) {
    /* istanbul ignore else */
    if (closeAlert && typeof closeAlert === 'function') {
      closeAlert();
    }

    (typeof this.confirmCallback === 'function') && this.confirmCallback();
    this.confirmCallback = null;
  }
}

