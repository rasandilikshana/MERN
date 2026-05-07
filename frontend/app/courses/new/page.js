"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { API } from "@/lib/api";

export default function NewCoursePage() {
  const router = useRouter();
  const [form, setForm] = useState({ title: "", description: "", instructor: "" });
  const [submitting, setSubmitting] = useState(false);

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setSubmitting(true);
    try {
      await axios.post(`${API}/courses`, form);
      router.push("/");
      router.refresh(); // re-renders the home page server component
    } catch (err) {
      alert(err.response?.data?.error || "Failed to create");
      setSubmitting(false);
    }
  }

  return (
    <>
      <h1>New Course</h1>
      <form onSubmit={handleSubmit}>
        <input
          name="title"
          placeholder="Course title"
          value={form.title}
          onChange={handleChange}
          required
        />
        <input
          name="instructor"
          placeholder="Instructor name"
          value={form.instructor}
          onChange={handleChange}
          required
        />
        <textarea
          name="description"
          placeholder="What is this course about?"
          value={form.description}
          onChange={handleChange}
          rows={4}
          required
        />
        <button type="submit" disabled={submitting}>
          {submitting ? "Creating..." : "Create Course"}
        </button>
      </form>
    </>
  );
}
