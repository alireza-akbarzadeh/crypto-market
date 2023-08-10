export default function faqModelMapper(data: any) {
  const { title, description } = data;
  return { title, message: description };
}
