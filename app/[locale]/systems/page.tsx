import { notFound } from "next/navigation";
import { getDictionary } from "../../i18n/dictionaries";
import { isLocale, localeCodes } from "../../i18n/config";
import { SystemsPage } from "../../components/SystemsPage";

export function generateStaticParams() {
  return localeCodes.map((locale) => ({ locale }));
}

export default async function Page({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const { ui } = await getDictionary(locale);
  return <SystemsPage locale={locale} t={ui} />;
}
