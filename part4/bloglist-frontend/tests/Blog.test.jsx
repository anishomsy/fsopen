import { render, screen } from "@testing-library/react";
import { Blog } from "../src/components/Blog";
import { describe, it, expect, vi } from "vitest";
import userEvent from "@testing-library/user-event";

describe("<Blog/>", () => {
  const blog = {
    title: "This is a test blog!",
    author: "John Doe",
    url: "https://example.com/test-blog.html",
    likes: 3,
    user: {
      name: "Admin",
    },
  };

  describe("if the view button is not pressed", () => {
    it("should only display blog title and author", async () => {
      render(<Blog blog={blog} userId="" />);
      const TitleAndAuthor = screen.getByText(
        "This is a test blog! - John Doe",
      );
      expect(TitleAndAuthor).toBeDefined();
    });

    it("blog should not desplay likes and url", async () => {
      render(<Blog blog={blog} userId="" />);
      const BlogUrl = screen.queryByText("https://example.com/test-blog.html");
      expect(BlogUrl).toBeNull();
    });
  });

  describe('if the "view" button is clicked', () => {
    describe("blog should display", () => {
      it("url", async () => {
        render(<Blog blog={blog} userId="" />);
        const user = userEvent.setup();
        const viewBtn = screen.getByText("view");
        await user.click(viewBtn);

        const blogUrl = screen.getByText(blog.url);
        expect(blogUrl).toBeDefined();
      });
      it("and likes count", async () => {
        render(<Blog blog={blog} userId="" />);
        const user = userEvent.setup();
        const viewBtn = screen.getByText("view");
        await user.click(viewBtn);

        const likeCount = screen.getByText("likes:3");
        expect(likeCount).toBeDefined();
      });
    });

    it("and like button is clicked", async () => {
      const mockHandleLike = vi.fn();

      render(<Blog blog={blog} userId="" handleLike={mockHandleLike} />);
      const user = userEvent.setup();
      const viewBtn = screen.getByText("view");
      await user.click(viewBtn);

      const likeBtn = screen.getByText("like");
      await user.dblClick(likeBtn);
      expect(mockHandleLike.mock.calls).toHaveLength(2);
    });
  });
});
