"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { API } from "@/lib/api";

export default function AddLessonForm({ courseId }) {
  const router = useRouter();
  const [form, setForm] = useState({ title: "", content: "", order: 1 });
  const [submitting, setSubmitting] = useState(false);

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setSubmitting(true);
    try {
      await axios.post(`${API}/courses/${courseId}/lessons`, form);
      setForm({ title: "", content: "", order: 1 });
      router.refresh();
    } catch (err) {
      alert(err.response?.data?.error || "Failed to add lesson");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        name="title"
        placeholder="Lesson title"
        value={form.title}
        onChange={handleChange}
        required
      />
      <textarea
        name="content"
        placeholder="Lesson content..."
        value={form.content}
        onChange={handleChange}
        rows={3}
        required
      />
      <input
        name="order"
        type="number"
        placeholder="Order"
        value={form.order}
        onChange={handleChange}
        min={1}
      />
      <button type="submit" disabled={submitting}>
        {submitting ? "Adding..." : "Add Lesson"}
      </button>
    </form>
  );
}
