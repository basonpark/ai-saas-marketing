"use server";
import axios from "axios";

export const onGetBlogPosts = async () => {
  try {
    console.log("Posts URL:", process.env.NEXT_PUBLIC_CLOUDWAYS_POSTS_URL);
    console.log(
      "Featured Images URL:",
      process.env.NEXT_PUBLIC_CLOUDWAYS_FEATURED_IMAGES_URL
    );

    const postArray: {
      id: string;
      title: string;
      image: string;
      content: string;
      createdAt: Date;
    }[] = [];

    const postsUrl = process.env.NEXT_PUBLIC_CLOUDWAYS_POSTS_URL;
    if (!postsUrl) return;
    const posts = await axios.get(postsUrl);
    const featuredImagesUrl =
      process.env.NEXT_PUBLIC_CLOUDWAYS_FEATURED_IMAGES_URL;
    if (!featuredImagesUrl) return;
    let i = 0;
    while (i < posts.data.length) {
      const image = await axios.get(
        `${featuredImagesUrl}/${posts.data[i].featured_media}`
      );
      if (image) {
        const post: {
          id: string;
          title: string;
          image: string;
          content: string;
          createdAt: Date;
        } = {
          id: posts.data[i].id,
          title: posts.data[i].title.rendered,
          image: image.data.media_details.file,
          content: posts.data[i].content.rendered,
          createdAt: new Date(posts.data[i].date),
        };
        postArray.push(post);
      }
      i++;
    }

    return postArray;
  } catch (error) {
    console.error("Error fetching posts:", error);
    return [];
  }
};

export const onGetBlogPost = async (id: string) => {
  try {
    const postUrl = process.env.NEXT_PUBLIC_CLOUDWAYS_POSTS_URL;
    if (!postUrl) return;
    const post = await axios.get(`${postUrl}/${id}`);
    if (post.data) {
      const authorUrl = process.env.NEXT_PUBLIC_CLOUDWAYS_USERS_URL;
      if (!authorUrl) return;
      const author = await axios.get(`${authorUrl}${post.data.author}`);
      if (author.data) {
        return {
          id: post.data.id,
          title: post.data.title.rendered,
          content: post.data.content.rendered,
          author: author.data.name,
          createdAt: new Date(post.data.date),
        };
      }
    }
  } catch (error) {
    console.error("Error fetching post:", error);
    return null;
  }
};
