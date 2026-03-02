interface Post {
  id: number;
  title: string;
  content: string;
  author: string;
}

export let posts: Post[] = [
  {
    id: 1,
    title:
      'sunt aut facere repellat provident occaecati excepturi optio reprehenderit',
    content:
      'quia et suscipit\nsuscipit recusandae consequuntur expedita et cum\nreprehenderit molestiae ut ut quas totam\nnostrum rerum est autem sunt rem eveniet architecto',
    author: 'Fakhri Muzakki',
  },
  {
    id: 2,
    title: 'ea molestias quasi exercitationem repellat qui ipsa sit aut',
    content:
      'et iusto sed quo iure\nvoluptatem occaecati omnis eligendi aut ad\nvoluptatem doloribus vel accusantium quis pariatur\nmolestiae porro eius odio et labore et velit aut',
    author: 'Fakhri Muzakki',
  },
  {
    id: 3,
    title: 'dolorem eum magni eos aperiam quia',
    content:
      'ut aspernatur corporis harum nihil quis provident sequi\nmollitia nobis aliquid molestiae\nperspiciatis et ea nemo ab reprehenderit accusantium quas\nvoluptate dolores velit et doloremque molestiae',
    author: 'Fakhri Muzakki',
  },
];

export const deletePostById = (id: number) => {
  posts = posts.filter((post) => post.id !== id);
};
