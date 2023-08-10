import { useSupportTutorialsDS } from "../../data/datasources/support.datasource";
import faqModelMapper from "../../data/model/faq";

export default function useSupportTutorials() {
  const { rows, meta, error, mutate, setSize, size, isLoading } =
    useSupportTutorialsDS(faqModelMapper);
  return { rows, meta, size, setSize, isLoading, mutate };
}
