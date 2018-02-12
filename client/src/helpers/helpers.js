export const addItem = async (item) => {
  const addRes = await fetch('/api/v1/garage', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(item)
  });

  const addMsg = await addRes.json();

  return addMsg;
}

export const getItems = async () => {
  const getRes = await fetch('/api/v1/garage');
  const items = await getRes.json();

  return items;
}

export const updateCleanliness = async (item) => {
  const {cleanliness} = item;
  const updateRes = await fetch(`/api/v1/garage/${item.id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({cleanliness})
  });

  const updateMsg = await updateRes.json();

  return updateMsg;
}