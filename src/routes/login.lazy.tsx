import { createLazyFileRoute } from "@tanstack/react-router";

export const Route = createLazyFileRoute("/login")({
  component: About,
});

function About() {
  return <div className="p-2">Hello from Login!</div>;
}
