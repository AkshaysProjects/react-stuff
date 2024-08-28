import { createLazyFileRoute } from "@tanstack/react-router";

export const Route = createLazyFileRoute("/login")({
  component: About,
});

function About() {
  return (
    <div className="bg-gray-300 text-3xl font-bold underline">
      Hello from Login!
    </div>
  );
}
