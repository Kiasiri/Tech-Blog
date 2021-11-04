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
  const title = document.querySelector("#blog-title").value.trim();
  const text = document.querySelector("#blog-text").value.trim();
  if (title && text) {
    const response = await fetch("/api/blogs", {
      method: "POST",
      body: JSON.stringify({ title: title, text: text }),
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
