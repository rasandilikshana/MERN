"use client";

import { useRouter } from "next/navigation";
import axios from "axios";
import { API } from "@/lib/api";

export default function DeleteButton({ url, redirectTo, label = "Delete" }) {
  const router = useRouter();

  async function handleClick() {
    if (!confirm("Are you sure?")) return;
    try {
      await axios.delete(`${API}${url}`);
      if (redirectTo) router.push(redirectTo);
      router.refresh();
    } catch (err) {
      alert(err.response?.data?.error || "Delete failed");
    }
  }

  return (
    <button className="danger" onClick={handleClick}>
      {label}
    </button>
  );
}
