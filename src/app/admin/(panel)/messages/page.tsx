import { deleteMessage, setMessageRead } from "@/actions/admin";
import { ConfirmButton } from "@/components/admin/ConfirmButton";
import { Badge, PageHeader } from "@/components/admin/kit";
import { prisma } from "@/lib/db";
import { formatDate } from "@/lib/utils";

export default async function MessagesPage() {
  const messages = await prisma.message.findMany({ orderBy: [{ read: "asc" }, { createdAt: "desc" }] });

  return (
    <>
      <PageHeader title="Messages" sub="Enquiries from the contact form. Unread first." />
      {messages.length === 0 && <p className="text-muted">No messages yet.</p>}
      <div className="space-y-4">
        {messages.map((m) => (
          <article key={m.id} id={`m${m.id}`} className={`card p-6 ${m.read ? "opacity-70" : ""}`}>
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div>
                <div className="flex items-center gap-3">
                  <h2 className="text-lg font-bold">{m.name}</h2>
                  {!m.read && <Badge tone="solid">New</Badge>}
                </div>
                <a href={`mailto:${m.email}`} className="text-sm text-muted hover:text-white hover:underline">{m.email}</a>
                {m.company && <span className="text-sm text-muted"> · {m.company}</span>}
              </div>
              <p className="text-xs text-neutral-500">{formatDate(m.createdAt)}</p>
            </div>
            <div className="mt-4 flex flex-wrap gap-2">
              {m.service && <Badge>{m.service}</Badge>}
              {m.budget && <Badge>{m.budget}</Badge>}
            </div>
            <p className="mt-4 whitespace-pre-wrap text-[15px] leading-relaxed">{m.message}</p>
            <div className="mt-5 flex flex-wrap items-center gap-5 border-t border-line pt-4 text-sm">
              <a href={`mailto:${m.email}?subject=${encodeURIComponent("Re: your enquiry to Third Mile Labs")}`} className="font-semibold hover:underline">
                Reply by email →
              </a>
              <form action={setMessageRead}>
                <input type="hidden" name="id" value={m.id} />
                <input type="hidden" name="read" value={m.read ? "0" : "1"} />
                <button className="text-muted hover:text-white">{m.read ? "Mark unread" : "Mark read"}</button>
              </form>
              <form action={deleteMessage} className="ml-auto">
                <input type="hidden" name="id" value={m.id} />
                <ConfirmButton message={`Delete message from ${m.name}?`}>Delete</ConfirmButton>
              </form>
            </div>
          </article>
        ))}
      </div>
    </>
  );
}
