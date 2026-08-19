import { createFileRoute, Navigate } from "@tanstack/react-router";

export const Route = createFileRoute("/dizayn/$slug")({
  component: Alias,
});

function Alias() {
  const { slug } = Route.useParams();
  return <Navigate to="/invitation/$id" params={{ id: slug }} />;
}
