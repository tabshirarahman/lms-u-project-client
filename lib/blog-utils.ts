import type { Blog, IBlogPost, SavedBlog } from "@/types/blog";
import { fetcher } from "./api";

type BlogPostProps = {
  data: IBlogPost[];
};

export async function getBlogPosts(): Promise<IBlogPost[]> {
  const blogPosts = await fetcher<BlogPostProps>("/blog/get-all-blog-posts");
  return (
    blogPosts?.data?.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()) ?? []
  );
}

export async function getBlogPost(slug: string): Promise<IBlogPost | undefined> {
  const blogPosts = await fetcher<BlogPostProps>("/blog/get-all-blog-posts");
  return blogPosts?.data?.find((post) => post.slug === slug) ?? undefined;
}

export async function getBlogsByCategory(category: string): Promise<IBlogPost[]> {
  const blogPosts = await fetcher<BlogPostProps>("/blog/get-all-blog-posts");

  return (
    blogPosts?.data.filter(
      (post) => post.category.toLowerCase().replace(/\s+/g, "-") === category,
    ) ?? []
  );
}

export async function getBlogsByTag(tag: string): Promise<IBlogPost[]> {
  const blogPosts = await fetcher<BlogPostProps>("/blog/get-all-blog-posts");

  return (
    blogPosts?.data?.filter((post) =>
      post.tags.some((t) => t.toLowerCase().replace(/\s+/g, "-") === tag),
    ) ?? []
  );
}

// export function getRelatedPosts(currentPost: BlogPost, limit = 3): BlogPost[] {
//   return blogPosts
//     .filter(
//       (post) =>
//         post.id !== currentPost.id &&
//         (post.category === currentPost.category ||
//           post.tags.some((tag) => currentPost.tags.includes(tag)))
//     )
//     .slice(0, limit);
// };

export async function getRelatedPosts(
  currentPost: Blog | IBlogPost,
  limit = 3,
): Promise<IBlogPost[]> {
  const blogPosts = await fetcher<BlogPostProps>("/blog/get-all-blog-posts");

  return blogPosts?.data
    ?.filter(
      (post) =>
        post._id !== ("_id" in currentPost ? currentPost._id : currentPost.id) &&
        (post.category === currentPost.category ||
          post.tags.some((tag) => currentPost.tags.includes(tag))),
    )
    .slice(0, limit);
}

export async function searchBlogPosts(query: string): Promise<IBlogPost[]> {
  const lowercaseQuery = query.toLowerCase();
  const blogPosts = await fetcher<BlogPostProps>("/blog/get-all-blog-posts");
  return blogPosts?.data?.filter(
    (post) =>
      post.title.toLowerCase().includes(lowercaseQuery) ||
      post.excerpt.toLowerCase().includes(lowercaseQuery) ||
      post.content.toLowerCase().includes(lowercaseQuery) ||
      post.tags.some((tag) => tag.toLowerCase().includes(lowercaseQuery)),
  );
}

// Local Storage functions for saved blogs
export function getSavedBlogs(): SavedBlog[] {
  if (typeof window === "undefined") return [];
  const saved = localStorage.getItem("savedBlogs");
  return saved ? JSON.parse(saved) : [];
}

export function saveBlog(blogId: string): void {
  if (typeof window === "undefined") return;
  const savedBlogs = getSavedBlogs();
  const isAlreadySaved = savedBlogs.some((saved) => saved._id === blogId);

  if (!isAlreadySaved) {
    const newSaved: SavedBlog = {
      _id: blogId,
      savedAt: new Date().toISOString(),
    };
    savedBlogs.push(newSaved);
    localStorage.setItem("savedBlogs", JSON.stringify(savedBlogs));
  }
}

export function removeSavedBlog(blogId: string): void {
  if (typeof window === "undefined") return;
  const savedBlogs = getSavedBlogs();
  const filtered = savedBlogs.filter((saved) => saved._id !== blogId);
  localStorage.setItem("savedBlogs", JSON.stringify(filtered));
}

export function isBlogSaved(blogId: string): boolean {
  const savedBlogs = getSavedBlogs();
  return savedBlogs.some((saved) => saved?._id === blogId);
}

export function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export function formatReadTime(minutes: number): string {
  return `${minutes} min read`;
}
