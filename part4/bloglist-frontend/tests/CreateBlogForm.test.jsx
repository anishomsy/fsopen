import { render, screen } from "@testing-library/react";
import { CreateBlogForm } from "../src/components/Blog";
import { describe, it, expect, vi } from "vitest";
import userEvent from "@testing-library/user-event";

describe("<CreateBlogForm />", () => {
  it("updates parents and calls onSubmit", async () => {
    const user = userEvent.setup();

    const mockCreateBlog = vi.fn();

    const TestBlog2 = {
      title: "This is a blog test!",
      author: "Jane Doe",
      url: "https://example.com/test-blog2.html",
    };

    render(<CreateBlogForm createBlog={mockCreateBlog} />);
    const titleInput = screen.getByPlaceholderText("title");
    const authorInput = screen.getByPlaceholderText("author");
    const urlInput = screen.getByPlaceholderText("url");
    const submitButton = screen.getByText("create");
    await user.type(titleInput, TestBlog2.title);
    await user.type(authorInput, TestBlog2.author);
    await user.type(urlInput, TestBlog2.url);

    await user.click(submitButton);
    expect(mockCreateBlog.mock.calls[0][0]).toStrictEqual(TestBlog2);
  });
});
