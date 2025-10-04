interface TelegramData {
  userId: number | undefined,
  name: string | undefined,
}

export function getTelegramData(): TelegramData { // переименовать либо файл либо функцию
  const telegram = window.Telegram.WebApp;

  console.log(telegram);
  
  return {
    userId: telegram.initDataUnsafe.user?.id,
    name: telegram.initDataUnsafe.user?.first_name,
  }
}