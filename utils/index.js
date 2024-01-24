export function generateUniqueId() {
    const length = 10
    const characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  
    const uniqueId = Array.from({length}, () => {
      const randomIndex = Math.floor(Math.random() * characters.length);
      return characters[randomIndex];
    }).join("");
  
    return uniqueId;
  }
  