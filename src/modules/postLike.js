export default async (item) => {
  await fetch('https://us-central1-involvement-api.cloudfunctions.net/capstoneApi/apps/zzwfsFxqWArAT5ak4r3D/likes', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      item_id: `${item}`,
    }),
  })
    .then(() => {
      document.getElementById(`${item}`).querySelector('.likes-count').innerHTML = +document.getElementById(`${item}`).querySelector('.likes-count').innerHTML + 1;
    });
};
