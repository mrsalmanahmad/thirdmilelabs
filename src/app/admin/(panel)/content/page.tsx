import { saveSettings } from "@/actions/admin";
import { AdminInput, Flash, PageHeader } from "@/components/admin/kit";
import { getSettings, SETTING_FIELDS } from "@/lib/settings";

type Props = { searchParams: Promise<{ saved?: string }> };

export default async function ContentPage({ searchParams }: Props) {
  const { saved } = await searchParams;
  const values = await getSettings();
  const groups = [...new Set(SETTING_FIELDS.map((f) => f.group))];

  return (
    <>
      <PageHeader title="Site content" sub="Headlines, copy, contact details and social links used across the site." />
      <Flash saved={saved} />
      <form action={saveSettings} className="space-y-10">
        {groups.map((g) => (
          <fieldset key={g} className="card space-y-5 p-6">
            <legend className="px-2 text-xs font-semibold uppercase tracking-[0.2em] text-muted">{g}</legend>
            {SETTING_FIELDS.filter((f) => f.group === g).map((f) => (
              <AdminInput
                key={f.key}
                label={f.label}
                name={f.key}
                defaultValue={values[f.key]}
                multiline={"multiline" in f && f.multiline}
                rows={3}
                hint={f.group === "Social links" ? "Leave empty to hide." : undefined}
              />
            ))}
          </fieldset>
        ))}
        <div className="sticky bottom-0 -mx-1 border-t border-line bg-ink/90 px-1 py-4 backdrop-blur">
          <button className="btn-solid !py-2.5 !text-sm">Save all changes</button>
        </div>
      </form>
    </>
  );
}
