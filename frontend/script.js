// Fetch posts for a channel
async function fetchPosts(channel) {
  const response = await fetch(`http://localhost:5000/api/posts/${channel}`);
  const posts = await response.json();
  const postsContainer = document.getElementById(`${channel}-posts`);
  postsContainer.innerHTML = posts.map(post => `
    <div class="post">
      <h3>${post.title}</h3>
      <p>${post.content}</p>
      <small>By ${post.author}</small>
    </div>
  `).join('');
}

// Submit a new post
async function submitPost(channel, title, content) {
  const author = 'Anonymous'; // Replace with logged-in user
  await fetch('http://localhost:5000/api/posts', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ channel, title, content, author }),
  });
  fetchPosts(channel);
}

// Event listeners for forms
document.getElementById('north-island-form').addEventListener('submit', async (e) => {
  e.preventDefault();
  const title = document.getElementById('north-title').value;
  const content = document.getElementById('north-content').value;
  await submitPost('north-island', title, content);
  e.target.reset();
});

document.getElementById('south-island-form').addEventListener('submit', async (e) => {
  e.preventDefault();
  const title = document.getElementById('south-title').value;
  const content = document.getElementById('south-content').value;
  await submitPost('south-island', title, content);
  e.target.reset();
});

// Load posts on page load
fetchPosts('north-island');
fetchPosts('south-island');
