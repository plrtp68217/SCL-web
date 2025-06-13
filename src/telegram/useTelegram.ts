const telegram = window.Telegram.WebApp;

interface TelegramData {
  userId: number,
  name: string
}

export function getTgUserData(): TelegramData { // переименовать либо файл либо функцию

  return {
    userId: telegram.initDataUnsafe.user!.id,
    name: telegram.initDataUnsafe.user!.first_name!,
  }
}