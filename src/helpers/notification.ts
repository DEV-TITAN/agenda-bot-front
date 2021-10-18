import { notification } from 'antd';
import 'antd/lib/notification/style/index.css';

export function showSuccessNotification(message: string, duration?: number) {
  notification.success({
    message,
    duration,
  });
}

export function showErrorNotification(message: string, duration?: number) {
  notification.error({
    message,
    duration,
  });
}
