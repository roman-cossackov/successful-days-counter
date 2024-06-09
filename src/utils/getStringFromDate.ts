export const getShortStringFromDate = (date: Date): string => {

  const options= {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit'
  };

  //@ts-ignore
  const formattedDate = date.toLocaleDateString('en-US', options );

  const formattedDateWithDots = formattedDate.replace(/\//g, '.');

  return formattedDateWithDots
}