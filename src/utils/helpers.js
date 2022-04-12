export const getJSON = async function (url) {
  try {
    const res = await fetch(url);
    const data = await res.json();

    if (!res.ok || data.status === "fail") {
      throw new Error(`From helpers function`);
    }
    return data;
  } catch (err) {
    throw err;
  }
};
