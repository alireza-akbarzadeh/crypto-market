import UnauthenticatedContentComponent from "@/core/components/layouts/unauthenticated-content";

type PropTypes = {};
export default function NotUserAssetView(props: PropTypes) {
  return (
    <UnauthenticatedContentComponent title="سبد دارایی دیجیتال" backHref="/">
      با وارد کردن میزان ارزهای دیجیتال خود در این بخش می‌توانید بر میزان سود و
      ضرر دارایی های خود نظارت لحظه‌ای داشته باشید.
    </UnauthenticatedContentComponent>
  );
}
