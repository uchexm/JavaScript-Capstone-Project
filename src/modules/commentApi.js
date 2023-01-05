const addComment = async (id, name, userComment) => {
  fetch(
    'https://us-central1-involvement-api.cloudfunctions.net/capstoneApi/apps/zzwfsFxqWArAT5ak4r3D/comments',
    {
      method: 'POST',
      body: JSON.stringify({
        item_id: id,
        username: name,
        comment: userComment,
      }),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    },
  );
};

export default addComment;
