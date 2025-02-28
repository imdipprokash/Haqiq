export const timeAgo = (publishedAt: string): string => {
  const publishedDate: Date = new Date(publishedAt);
  const currentDate: Date = new Date();

  const diffInMilliseconds: number =
    currentDate.getTime() - publishedDate.getTime();

  const minutesAgo: number = Math.floor(diffInMilliseconds / (1000 * 60));
  const hoursAgo: number = Math.floor(minutesAgo / 60);
  const daysAgo: number = Math.floor(hoursAgo / 24);

  if (daysAgo > 0) {
    return `${daysAgo} days ago`;
  } else if (hoursAgo > 0) {
    return `${hoursAgo} hours ago`;
  } else {
    return `${minutesAgo} minutes ago`;
  }
};