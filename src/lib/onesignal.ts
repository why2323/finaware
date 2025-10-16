import OneSignal from 'react-onesignal';

const ONESIGNAL_APP_ID = import.meta.env.VITE_ONESIGNAL_APP_ID || '';

export const initializeOneSignal = async () => {
  if (!ONESIGNAL_APP_ID) {
    console.warn('OneSignal App ID not configured');
    return;
  }

  try {
    await OneSignal.init({
      appId: ONESIGNAL_APP_ID,
      allowLocalhostAsSecureOrigin: true,
    });

    console.log('OneSignal initialized successfully');
  } catch (error) {
    console.error('OneSignal initialization error:', error);
  }
};

export const sendNotification = async (heading: string, content: string) => {
  // This would be called from your backend/admin panel
  // For now, we'll just log it
  console.log('Notification would be sent:', { heading, content });
};

export const subscribeToNotifications = async () => {
  try {
    await OneSignal.Slidedown.promptPush();
  } catch (error) {
    console.error('Error subscribing to notifications:', error);
  }
};