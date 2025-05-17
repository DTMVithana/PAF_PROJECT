const currentUser = JSON.parse(localStorage.getItem("user"));

const userPosts = data.filter(post => post.author === currentUser.username);
