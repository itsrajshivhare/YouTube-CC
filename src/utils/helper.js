export const formatDate = (publishedAt) => {
  const date = new Date(publishedAt);
  const options = { month: "short", day: "numeric", year: "numeric" };
  return date.toLocaleDateString("en-US", options);
};
export const formatCount = (value) => {
  const viewCount = parseInt(value).toLocaleString();
  return viewCount;
};
export const formatViewCount = (count) => {
  if (count >= 1e6) {
    return (count / 1e6).toFixed(1) + "M";
  } else if (count >= 1e3) {
    return (count / 1e3).toFixed(1) + "K";
  } else {
    return count;
  }
};
