import type { Job } from "@prisma/client";
import { saveJob } from "@/actions/admin";
import { AdminCheckbox, AdminInput } from "@/components/admin/kit";

export function JobForm({ job }: { job?: Job }) {
  return (
    <form action={saveJob} className="space-y-6">
      {job && <input type="hidden" name="id" value={job.id} />}
      <div className="grid gap-6 sm:grid-cols-2">
        <AdminInput label="Job title" name="title" required defaultValue={job?.title} placeholder="Junior QA Engineer" />
        <AdminInput label="URL slug" name="slug" defaultValue={job?.slug} hint="Leave empty to generate from title." />
        <AdminInput label="Location" name="location" defaultValue={job?.location ?? "Lahore"} />
        <AdminInput label="Type" name="employment" defaultValue={job?.employment ?? "Full-time · On-site"} />
        <AdminInput label="Hours" name="hours" defaultValue={job?.hours ?? "10 AM – 7 PM"} />
        <AdminInput label="Days off" name="daysOff" defaultValue={job?.daysOff ?? "Fri & Sat off"} />
      </div>
      <AdminInput label="Short summary" name="summary" multiline rows={3} defaultValue={job?.summary} />
      <div className="grid gap-6 sm:grid-cols-2">
        <AdminInput label="What you'll do" name="responsibilities" multiline rows={7} defaultValue={job?.responsibilities} hint="One point per line." />
        <AdminInput label="What we're looking for" name="requirements" multiline rows={7} defaultValue={job?.requirements} hint="One point per line." />
      </div>
      <AdminCheckbox label="Published (visible on the careers page)" name="published" defaultChecked={job?.published ?? true} />
      <div className="border-t border-line pt-6">
        <button className="btn-solid !py-2.5 !text-sm">{job ? "Save changes" : "Post job"}</button>
      </div>
    </form>
  );
}
