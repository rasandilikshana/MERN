import Link from "next/link";
import { API } from "@/lib/api";

export default async function Home() {
  const res = await fetch(`${API}/courses`);
  const courses = await res.json();

  return (
    <>
      <h1>All Courses</h1>
      {courses.length === 0 && <p>No courses yet. Click "+ New Course" above.</p>}
      {courses.map((c) => (
        <Link key={c._id} href={`/courses/${c._id}`} style={{ display: "block" }}>
          <article className="card">
            <h3>{c.title}</h3>
            <small>by {c.instructor}</small>
            <p style={{ marginTop: 8 }}>{c.description}</p>
          </article>
        </Link>
      ))}
    </>
  );
}
