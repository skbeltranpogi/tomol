function toggleLike(element){
  let artwork = element.closest(".artwork");
  
  // Toggle heart color
  element.classList.toggle("liked");
  
  // Toggle red border
  artwork.classList.toggle("liked-box");
}

function toggleComment(element){
  let artwork = element.closest(".artwork");
  let commentArea = artwork.querySelector(".comment-area");

  if(commentArea.style.display === "block"){
    commentArea.style.display = "none";
  }
  else{
    commentArea.style.display = "block";
  }
}

function addComment(button){
  let artwork = button.closest(".artwork");
  let input = artwork.querySelector(".comment-input");
  let text = input.value.trim();

  if(text !== ""){
    let list = artwork.querySelector(".comments-list");
    let li = document.createElement("li");
    li.textContent = text;
    list.appendChild(li);

    // Keep the count exactly as original
    let count = artwork.querySelector(".count");
    count.textContent = parseInt(count.textContent) + 1;

    input.value="";
  }
}