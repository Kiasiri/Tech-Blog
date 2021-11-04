async function deleteBlogHandler(event) {
  event.preventDefault();
  if (event.target.hasAttribute("id")) {
    const id = event.target.getAttribute("id");

    const response = await fetch(`/api/blogs/${id}`, {
      method: "DELETE",
    });

    if (response.ok) {
      document.location.replace("/dashboard");
    }
  }
}

async function createBlogHandler(event) {
  event.preventDefault();
  const blogname = document.querySelector("#blog-name").value.trim();
  const blogText = document.querySelector("#blog-text").value.trim();
  if (blogname && blogText) {
    const response = await fetch("/api/blogs", {
      method: "POST",
      body: JSON.stringify({ blogname, blogText }),
      headers: { "Content-Type": "application/json" },
    });
    if (response.ok) {
      document.location.replace("/dashboard");
    } else {
      alert("failed to post");
    }
  }
}
document
  .querySelector("#blog-form")
  .addEventListener("submit", createBlogHandler);
