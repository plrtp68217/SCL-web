const telegram = window.Telegram.WebApp;

export function getTgUserData() { // переименовать либо файл либо функцию

  return {
    userId: telegram.initDataUnsafe.user?.id,
    name: telegram.initDataUnsafe.user?.first_name,
  }
}