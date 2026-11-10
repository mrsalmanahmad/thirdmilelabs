import type { Project } from "@prisma/client";
import { saveProject } from "@/actions/admin";
import { AdminCheckbox, AdminInput } from "@/components/admin/kit";

export function ProjectForm({ project }: { project?: Project }) {
  return (
    <form action={saveProject} className="space-y-6">
      {project && <input type="hidden" name="id" value={project.id} />}
      <div className="grid gap-6 sm:grid-cols-2">
        <AdminInput label="Project name" name="name" required defaultValue={project?.name} />
        <AdminInput label="Website URL" name="url" type="url" required defaultValue={project?.url} placeholder="https://" />
        <AdminInput label="Category" name="category" defaultValue={project?.category} placeholder="Mobile App · Platform" />
        <AdminInput label="URL slug" name="slug" defaultValue={project?.slug} hint="Leave empty to generate from name." />
      </div>
      <AdminInput label="Tagline" name="tagline" defaultValue={project?.tagline} placeholder="One sentence that sells it." />
      <AdminInput
        label="Case study"
        name="description"
        multiline
        rows={8}
        defaultValue={project?.description}
        hint="Leave a blank line between paragraphs."
      />
      <div className="grid gap-6 sm:grid-cols-3">
        <AdminInput label="Tags" name="tags" defaultValue={project?.tags} hint="Comma separated." />
        <AdminInput label="Year" name="year" defaultValue={project?.year} placeholder="2025" />
        <AdminInput label="Sort order" name="order" type="number" defaultValue={project?.order ?? 0} hint="Lower shows first." />
      </div>
      <div className="flex flex-wrap gap-8">
        <AdminCheckbox label="Published" name="published" defaultChecked={project?.published ?? true} />
        <AdminCheckbox label="Featured on home page" name="featured" defaultChecked={project?.featured ?? true} />
      </div>
      <div className="border-t border-line pt-6">
        <button className="btn-solid !py-2.5 !text-sm">{project ? "Save changes" : "Add project"}</button>
      </div>
    </form>
  );
}
