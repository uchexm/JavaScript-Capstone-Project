export default async (id) => {
  console.log("test", id);
  try {
    await fetch(
      `https://us-central1-involvement-api.cloudfunctions.net/capstoneApi/apps/zzwfsFxqWArAT5ak4r3D/comments?item_id=${id}`
    )
      .then((response) => response.json())
      .then((json) => {
        console.log(json.length);
        document.getElementById(
          "comment-header"
        ).innerHTML = `COMMENTS (${json.length}) `;
        document.getElementById("comments-container").innerHTML = "";
        json.forEach((i) => {
          const comment = `${i.creation_date} ${i.username}: ${i.comment}`;
          const commentElement = document.createElement("p");
          commentElement.innerText = comment;

          // Append the comment to the comments container

          document
            .getElementById("comments-container")
            .appendChild(commentElement);
        });
      });
  } catch {
    document.getElementById("comments-container").innerHTML = "";
    document.getElementById("comment-header").innerHTML = `COMMENTS (0) `;
  }
};
