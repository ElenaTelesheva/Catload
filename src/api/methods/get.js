const get = async ({ url, params }) => {
  console.log(url);
  const requestOptions = {
    method: 'GET',
    mode: 'cors',
  };

  const response = await fetch(`${url}?${params}`, requestOptions);
  try {
    const data = await response.json();
    return data;
  } catch (e) {
    alert(e.message);
    return 1;
  }
};

export default get;
