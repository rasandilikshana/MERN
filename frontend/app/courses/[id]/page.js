import Link from "next/link";
import { notFound } from "next/navigation";
import { API } from "@/lib/api";
import AddLessonForm from "@/components/AddLessonForm";
import DeleteButton from "@/components/DeleteButton";

export default async function CourseDetailPage({ params }) {
  const { id } = await params; // Next.js 16: params is a Promise

  // Run both fetches in parallel
  const [courseRes, lessonsRes] = await Promise.all([
    fetch(`${API}/courses/${id}`),
    fetch(`${API}/courses/${id}/lessons`),
  ]);

  if (courseRes.status === 404) notFound();

  const course = await courseRes.json();
  const lessons = await lessonsRes.json();

  return (
    <>
      <p><Link href="/">← Back to courses</Link></p>

      <h1>{course.title}</h1>
      <small>by {course.instructor}</small>
      <p style={{ margin: "12px 0" }}>{course.description}</p>

      <div className="row">
        <DeleteButton
          url={`/courses/${course._id}`}
          redirectTo="/"
          label="Delete Course"
        />
      </div>

      <h2>Lessons ({lessons.length})</h2>
      {lessons.length === 0 && <p>No lessons yet — add the first one below.</p>}

      {lessons.map((l) => (
        <article key={l._id} className="card">
          <h3>{l.order}. {l.title}</h3>
          <p style={{ margin: "8px 0" }}>{l.content}</p>
          <DeleteButton url={`/lessons/${l._id}`} label="Delete Lesson" />
        </article>
      ))}

      <h2>Add Lesson</h2>
      <AddLessonForm courseId={course._id} />
    </>
  );
}
