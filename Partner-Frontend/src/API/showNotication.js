import { notification } from 'antd';

export const openNotificationWithIcon =  (type, title, description, placement) => {
   notification[type]({
    message: title,
    description:description,
      placement: placement
  });
};