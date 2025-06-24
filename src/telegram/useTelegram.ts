const telegram = window.Telegram.WebApp;

interface TelegramData {
  userId: number | undefined,
  name: string | undefined,
}

export function getTelegramData(): TelegramData { // переименовать либо файл либо функцию

  return {
    userId: telegram.initDataUnsafe.user?.id,
    name: telegram.initDataUnsafe.user?.first_name,
  }
}