import ContentView from "./ContentView";
import PreviewNotice from "@/components/content/PreviewNotice";
import { getPageContent } from "@/lib/content/server";
import type { ContentPageProps } from "@/lib/content/values";
export { contentMetadata as generateMetadata } from "@/lib/content/server";

export default async function Page({ searchParams }: ContentPageProps) {
  const { content, preview } = await getPageContent(searchParams);
  return <><PreviewNotice preview={preview} /><ContentView content={content} /></>;
}
