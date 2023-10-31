const audio = new Audio("/noti.mp3");
export async function requestAudioPermission() {
  try {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    const audio = new Audio("/noti.mp3");
    stream.getTracks().forEach((track) => track.stop());
  } catch (error) {
    console.error("Error requesting audio permission:", error);
  }
}
export function playNotificationSound(){
  audio.play();
}; 
export function toSlug(str : string | undefined) {
  return str?.toLowerCase().replace(/\s+/g, '-');
}

export function merge(newArr: any[], oldArr: any[]) {
  // Create a mapping of IDs from the old array to their corresponding counts
  const idToCountMap = new Map();
  oldArr?.forEach((item) => {
    idToCountMap.set(item.id, item.count);
  });

  // Merge the arrays based on the conditions
  const mergedArray = newArr.map((newItem) => {
    if (idToCountMap.has(newItem.id)) {
      // Condition 1: ID exists in oldArray, use the count from oldArray
      const oldItem = oldArr.find((item) => item.id === newItem.id);
      newItem.count = idToCountMap.get(newItem.id);
      // Merge other properties from oldItem to newItem
      Object.assign(newItem, oldItem);
    }
    return newItem;
  });

  return mergedArray;
}
export function formatRelativeDate(date: Date): string {
  const now = new Date();
  const propDate = new Date (date)
  const diff = now.getTime() - propDate.getTime();
  const ONE_MINUTE = 1000 * 60;

  const full_date = new Intl.DateTimeFormat(undefined, { dateStyle: 'long', timeStyle: 'short'}).format(propDate)
  const hm = `${propDate.getHours()}:${propDate.getMinutes()} ${propDate.getHours() >= 12 ? 'pm' : 'am'}`

  if (diff < ONE_MINUTE * 60 * 24) {
    return 'Today ' + hm
  } else if (diff < ONE_MINUTE * 60 * 24 * 2) {
    return 'Yesterday ' + hm;
  } else {
    return full_date
  }
}
