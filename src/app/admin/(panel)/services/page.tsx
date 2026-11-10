import type { Service } from "@prisma/client";
import { deleteService, saveService } from "@/actions/admin";
import { ConfirmButton } from "@/components/admin/ConfirmButton";
import { AdminCheckbox, AdminInput, Flash, PageHeader } from "@/components/admin/kit";
import { prisma } from "@/lib/db";

type Props = { searchParams: Promise<{ saved?: string; error?: string }> };

function ServiceFields({ s }: { s?: Service }) {
  return (
    <>
      {s && <input type="hidden" name="id" value={s.id} />}
      <div className="grid gap-5 sm:grid-cols-[1fr_120px]">
        <AdminInput label="Title" name="title" required defaultValue={s?.title} />
        <AdminInput label="Order" name="order" type="number" defaultValue={s?.order ?? 99} />
      </div>
      <AdminInput label="Short description" name="description" defaultValue={s?.description} />
      <AdminInput label="Details (Services page)" name="details" multiline rows={4} defaultValue={s?.details} hint="One bullet per line." />
      <AdminCheckbox label="Highlight (white card)" name="highlighted" defaultChecked={s?.highlighted} />
    </>
  );
}

export default async function ServicesAdmin({ searchParams }: Props) {
  const { saved, error } = await searchParams;
  const services = await prisma.service.findMany({ orderBy: { order: "asc" } });

  return (
    <>
      <PageHeader title="Services" sub="The “What we build” grid on the home page and the Services page." />
      <Flash saved={saved} error={error} />
      <div className="space-y-4">
        {services.map((s) => (
          <details key={s.id} className="card group">
            <summary className="flex cursor-pointer list-none items-center justify-between gap-4 p-5">
              <span>
                <span className="mr-3 text-sm text-muted">{String(s.order).padStart(2, "0")}</span>
                <span className="font-semibold">{s.title}</span>
              </span>
              <span className="text-sm text-muted group-open:hidden">Edit</span>
              <span className="hidden text-sm text-muted group-open:inline">Close</span>
            </summary>
            <div className="border-t border-line p-5">
              <form action={saveService} className="space-y-5">
                <ServiceFields s={s} />
                <div className="flex items-center justify-between border-t border-line pt-5">
                  <button className="btn-solid !py-2 !text-sm">Save</button>
                </div>
              </form>
              <form action={deleteService} className="mt-3 text-right">
                <input type="hidden" name="id" value={s.id} />
                <ConfirmButton message={`Delete service "${s.title}"?`}>Delete service</ConfirmButton>
              </form>
            </div>
          </details>
        ))}
      </div>

      <details className="card mt-8">
        <summary className="cursor-pointer list-none p-5 font-semibold">+ Add a service</summary>
        <form action={saveService} className="space-y-5 border-t border-line p-5">
          <ServiceFields />
          <button className="btn-solid !py-2 !text-sm">Add service</button>
        </form>
      </details>
    </>
  );
}
