import { ALERT_TYPE_ENUM, MODAL_BUTTON_TYPE_ENUM } from '@/common';

export class AlertModalProps {
  display: boolean = false;
  alertType: ALERT_TYPE_ENUM = ALERT_TYPE_ENUM.NORMAL;
  title?: string;
  subTitle?: string[] = [];
  subTitleText?: string = '';
  subTitleAlign?: 'left' | 'center' = 'left';
  message?: string = '';
  messageAlign?: 'left' | 'center' = 'left';
  messageETC?: string = '';
  zIndex?: number;
  cancelButtonName?: string;
  confirmButtonName?: string;
  overlay: boolean = true;
  overlayClose: boolean = true;
  confirmCallback?: Function;
  cancelCallback?: Function;
  callBackUrl?: string;
  buttonType?: MODAL_BUTTON_TYPE_ENUM = MODAL_BUTTON_TYPE_ENUM.BUTTON_ONE;
}
