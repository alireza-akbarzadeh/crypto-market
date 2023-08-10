import styles from "./trade.module.scss";
import { Container, Grid, Typography, Tooltip } from "@mui/material";
import { Form, Formik, FormikHelpers } from "formik";
import {
  FCoinSelect,
  FTextField,
} from "@/core/components/form/formik-elements";
import ShimmerText from "@/core/components/common/shimmer-text";
import LoadingButton from "@/core/components/common/loading-button";
import { PhoneIcon } from "@/core/components/common/custom-icon";
import { AppInitialsInterface } from "@/modules/_app/domain/entities/appInitials";
import { CoinDataInterface } from "@/modules/coin/domain/entities/coin";
import ImageFallbackComponent from "@/core/components/common/image-fallback";
import { ifFocused } from "@/core/helpers";

type PropTypes = {
  isSell: boolean;
  toggleIsSell: () => void;
  onSubmit: (values: any, formikHelpers: FormikHelpers<any>) => void;
  handlePriceChange: (coin: CoinDataInterface) => void;
  formikRef: any;

  revalidatePrice: (val: number) => void;
  revalidateAmount: (val: number) => void;
  handleCoinChange: (coin: CoinDataInterface) => void;
  logo?: AppInitialsInterface["logo"];
  cachedLogo?: AppInitialsInterface["logo"];
  selectedCoin?: CoinDataInterface;

  fallbackData?: any;
  scrollable?: boolean;
  initialValues: {
    price: number;
    amount: number;
    coin: string;
  };
};
export default function TradeView(props: PropTypes) {
  const {
    isSell,
    toggleIsSell,
    onSubmit,
    handlePriceChange,
    formikRef,
    revalidatePrice,
    revalidateAmount,
    handleCoinChange,
    logo,
    selectedCoin,

    cachedLogo,
    fallbackData,
    scrollable,
    initialValues,
  } = props;

  const getButtonProps = (
    isBuy: boolean,
    submitForm: any,
    isSubmitting: boolean
  ): any => {
    const active = (isBuy && !isSell) || (!isBuy && isSell);
    return {
      color: active ? "primary" : "inherit",
      variant: "contained",
      fullWidth: true,
      sx: { mb: 2, mt: 1.5 },
      onClick: active ? submitForm : toggleIsSell,
      disabled: isSubmitting,
      loading: isSubmitting && active,
    };
  };
  return (
    <Container className={styles.mainContainer}>
      <div className={styles.container}>
        <Tooltip placement="top-start" title={logo?.title || ""}>
          <div className={styles.logoContainer}>
            <div className={styles.logoHolder} />
            <ImageFallbackComponent
              src={logo?.image === cachedLogo?.image ? undefined : logo?.image}
              alt={logo?.title || cachedLogo?.title}
              layout="fill"
              objectFit="contain"
              fallback={cachedLogo?.image}
              fallbackElement={fallbackImage()}
            />
          </div>
        </Tooltip>
        <Formik
          innerRef={formikRef}
          initialValues={initialValues}
          onSubmit={onSubmit}
        >
          {({ submitForm, isSubmitting }) => (
            <Form className={styles.form}>
              <Grid container spacing={0.25} justifyContent="center">
                <Grid item xs={4}>
                  <FTextField
                    className="left-label text-center small-padding-input"
                    name="price"
                    label="تومان"
                    type="currency"
                    fast={false}
                    inputProps={{
                      disableSuffix: true,
                      "data-cy": "price-input",
                      decimalScale:
                        (selectedCoin?.sellPrice || 0) > 1000 ? 0 : 4,
                    }}
                    onChange={ifFocused(
                      (e) => revalidateAmount(+e.target.value),
                      "name"
                    )}
                    onFocus={(e) => e.target.select()}
                    id="home-price-textfield"
                  />
                </Grid>
                <Grid item xs={4}>
                  <FTextField
                    className="left-label text-center small-padding-input"
                    name="amount"
                    label="واحد"
                    type="currency"
                    fast={false}
                    inputProps={{
                      disableSuffix: true,
                      decimalScale: selectedCoin?.decimal || 6,
                    }}
                    onChange={ifFocused(
                      (e) => revalidatePrice(+e.target.value),
                      "name"
                    )}
                    onFocus={(e) => e.target.select()}
                    id="home-amount-textfield"
                  />
                </Grid>
                <Grid item xs={4}>
                  <FCoinSelect
                    className="left-label"
                    name="coin"
                    label="انتخاب ارز"
                    isSell={isSell}
                    fast={false}
                    onCoinChange={handlePriceChange}
                    onChange={handleCoinChange as any}
                    updatePrice
                    fallbackData={fallbackData}
                    selectedCoin={selectedCoin}
                    id="home-coin-textfield"
                  />
                </Grid>
              </Grid>
              <div className={styles.actionButtons}>
                <LoadingButton
                  data-cy="buy-button"
                  {...getButtonProps(true, submitForm, isSubmitting)}
                >
                  {!isSell && "درخواست"} خرید
                </LoadingButton>
                <LoadingButton
                  {...getButtonProps(false, submitForm, isSubmitting)}
                >
                  {isSell && "درخواست"} فروش
                </LoadingButton>
              </div>
            </Form>
          )}
        </Formik>
        <div className={styles.motto}>
          <ShimmerText component="h2">
            پشتیبانــی ۲۴ ساعتـه
            <br />
            حتی در روزهای تعطیل
            {/* ۷ روز هفته، ۲۴ ساعت شبانه‌روز <br />
            در خدمت شما هستیم */}
          </ShimmerText>
        </div>
        <Typography
          color="primary"
          component="a"
          href="tel:02191079677"
          dir="ltr"
          className={styles.phone}
          fontWeight={700}
        >
          <PhoneIcon fontSize="small" className={styles.phoneIcon} /> 021 -
          91079677
        </Typography>
        {scrollable && <div className={styles.arrows} />}
      </div>
    </Container>
  );
}

function fallbackImage() {
  return (
    <svg
      style={{
        position: "absolute",
        top: "0",
        width: "100%",
        height: "100%",
      }}
      version="1.1"
      viewBox="0 0 550 215"
      xmlns="http://www.w3.org/2000/svg"
    >
      <title>Crypto</title>
      <defs>
        <filter id="a" x="-5%" y="-14.4%" width="110%" height="128.8%">
          <feOffset
            dx="3"
            dy="3"
            in="SourceAlpha"
            result="shadowOffsetOuter1"
          />
          <feGaussianBlur
            in="shadowOffsetOuter1"
            result="shadowBlurOuter1"
            stdDeviation="5"
          />
          <feColorMatrix
            in="shadowBlurOuter1"
            result="shadowMatrixOuter1"
            values="0 0 0 0 0   0 0 0 0 0   0 0 0 0 0  0 0 0 0.5 0"
          />
          <feMerge>
            <feMergeNode in="shadowMatrixOuter1" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>
      <g fill="none" fillRule="evenodd">
        <g transform="translate(19 19)" fillRule="nonzero" filter="url(#a)">
          <path
            id="Shape"
            d="m0 0h34.869c9.5448 0 15.973 0.58008 22.207 2.9004 12.662 4.6406 22.401 15.082 22.401 31.324 0 11.215-5.0647 21.463-20.259 27.844 19.48 3.6738 31.752 17.016 31.752 33.838 0 21.463-17.921 30.551-25.908 33.258-7.7919 2.7071-14.025 2.7071-28.246 2.7071h-36.817v-131.87zm31.558 16.822h-12.662v39.639h12.662c4.8699 0 13.246-0.38672 17.921-3.0938 3.7011-1.9336 10.324-7.1545 10.324-17.596 0-7.3479-3.5063-13.729-9.3501-16.436-5.4543-2.5137-13.246-2.5137-18.895-2.5137h5.831e-4zm5.2595 56.655h-17.921v41.572h18.895c5.4543 0 14.805 0 19.675-1.9336 9.7396-3.6738 13.83-11.989 13.83-18.949 0-5.6074-2.7272-13.922-12.662-17.983-5.0647-2.1269-11.493-2.7071-21.817-2.7071h-5.831e-4z"
            fill="#4285F2"
          />
          <path
            id="Shape"
            d="m109.53 8.7914c5.9982 0 10.596 4.652 10.596 10.079 0 5.4271-4.7984 10.273-10.596 10.273-6.7977 0-10.397-6.0086-10.397-10.273 0-4.8458 4.3986-10.079 10.397-10.079zm8.9973 36.634v87.029h-17.794v-87.029h17.794z"
            fill="#EB4137"
          />
          <path
            id="Path"
            d="m160.27 25.202v18.005h27.186v15.488h-27.186v37.944c0.19145 10.841 0.38291 12.777 3.0632 15.874 3.2547 3.4847 7.4665 3.6783 9.1897 3.6783 3.4461 0 9.9554-0.38718 19.337-6.195v16.068c-8.0409 4.4526-17.039 5.8078-22.017 5.8078-5.9352 0-16.465-2.5167-22.4-11.035-4.212-6.3884-4.212-15.681-4.212-23.618v-38.525h-14.933v-1.7423l31.972-31.749h-5.8e-5z"
            fill="#FBBD06"
          />
          <path
            id="Shape"
            d="m217.27 0v50.5c2.9085-2.0962 11.052-7.8132 24.044-7.8132 23.268 0 37.423 19.628 37.423 43.639 0 30.109-21.135 45.545-44.985 45.545-11.052 0-25.401-2.6679-33.739-6.6698v-125.2h17.257-5.84e-4zm0 66.698v46.307c6.9802 2.0962 15.318 2.6679 18.227 2.6679 10.277 0 25.789-7.2412 25.789-28.585 0-19.247-12.022-28.775-24.432-28.775-9.6953 0-16.094 5.3358-19.584 8.3847l5.83e-4 5.86e-4z"
            fill="#4285F2"
          />
          <path
            id="Shape"
            d="m361.55 116.79v10.573c-7.9493 5.2862-11.245 6.8526-16.674 6.8526-7.561 0-11.632-2.741-13.184-9.0059-7.561 6.069-15.51 9.0059-23.459 9.0059-12.796 0-21.326-10.18-21.326-21.536 0-17.425 15.704-22.711 29.663-27.801l15.316-5.4819v-4.6988c0-10.964-5.2346-15.467-15.704-15.467-9.4999 0-19.193 4.503-27.53 14.488v-18.991c6.7854-8.0272 16.285-11.943 28.888-11.943 17.643 0 31.602 9.0059 31.602 28.976v45.226c0 3.3283 1.1632 4.503 3.2958 4.503 1.7449 0 5.2346-1.762 9.1121-4.6988v2.34e-4zm-29.664-2.1536v-25.648c-14.735 5.0903-27.53 10.18-27.53 20.557 0 7.2441 5.2346 12.334 12.408 12.334 5.4285 0 10.469-2.741 15.122-7.2441z"
            fill="#34A853"
          />
          <path
            id="Path"
            d="m369.71 46.88h16.614v20.034c5.4136-8.7527 13.254-21.785 25.014-21.785 2.4268 0 9.8936 0.19451 19.601 9.9202l-8.7739 15.172c-2.0534-2.1397-9.5203-8.5587-16.054-8.5587-6.1603 0-19.788 7.0027-19.788 26.843v45.71h-16.614v-87.334-0.0011722z"
            fill="#EB4237"
          />
          <path
            id="c"
            d="m512 45.129v13.401h-17.713c6.7388 6.7975 9.0492 11.653 9.0492 19.033 0 7.1861-4.0432 15.537-8.0864 19.615-11.552 12.43-35.041 6.2149-35.041 16.508 0 4.8553 9.0492 7.7687 26.377 11.264 18.483 3.6901 25.03 13.206 25.03 24.277 0 17.285-15.21 27.773-40.817 27.773-23.296 0-39.854-11.07-39.854-26.413 0-12.818 6.7388-20.393 21.756-24.083-5.9684-3.6901-8.6637-7.1861-8.6637-11.07 0-5.6322 5.391-10.488 13.67-12.43v-0.38843c-6.3533-2.719-11.167-6.4089-14.44-11.07-3.0806-4.4669-4.6208-9.905-4.6208-16.314 0-18.644 14.44-30.103 37.737-30.103h35.619-0.002333zm-24.067 30.298c0-8.3513-7.7015-15.343-16.75-15.343-9.434 0-17.136 7.1861-17.136 15.731 0 9.5164 6.9312 15.925 17.328 15.925 9.6265 0 16.558-6.7975 16.558-16.314zm7.1236 75.161c0-11.07-17.713-13.984-28.302-13.984-11.552 0-19.638 5.438-19.638 13.206 0 8.7398 8.4713 13.401 24.067 13.401 15.018 0 23.874-4.6612 23.874-12.624h-5.83e-4z"
            fill="#FBBD07"
          />
          <g transform="translate(439 20)" fill="#6E6E6E">
            <path
              id="Path"
              d="m2.3051 13.5c0.6477 0 1.2002 0.21967 1.6574 0.659 0.4572 0.43933 0.6858 0.97908 0.6858 1.6192 0 0.62762-0.22543 1.1548-0.67628 1.5816-0.45085 0.42678-1.0065 0.64017-1.6669 0.64017-0.6477 0-1.1938-0.21339-1.6383-0.64017-0.4445-0.42678-0.66675-0.95397-0.66675-1.5816 0-0.64017 0.22225-1.1799 0.66675-1.6192 0.4445-0.43933 0.99061-0.659 1.6383-0.659z"
            />
            <path
              id="b"
              d="m22.212 13.651v3.3891c-1.7399 0.64017-3.4417 0.96025-5.1054 0.96025-2.7432 0-4.9308-0.80335-6.5628-2.41-1.632-1.6067-2.4479-3.7594-2.4479-6.4582 0-2.7238 0.79375-4.9205 2.3813-6.59 1.5875-1.6695 3.6767-2.5042 6.2675-2.5042 0.9017 0 1.7113 0.084728 2.4289 0.25418 0.71755 0.16946 1.6034 0.4864 2.6575 0.95084v3.6527c-1.7526-1.1046-3.3782-1.6569-4.8768-1.6569-1.5621 0-2.8448 0.54289-3.8481 1.6287s-1.505 2.4697-1.505 4.1517c0 1.7699 0.54293 3.1757 1.6288 4.2176 1.0859 1.0418 2.5495 1.5628 4.391 1.5628 1.3335 0 2.8639-0.38285 4.5911-1.1485z"
            />
            <path d="m34.538 0.33891c2.667 0 4.8832 0.85042 6.6485 2.5513s2.648 3.8379 2.648 6.4111c0 2.4979-0.89535 4.5722-2.6861 6.2228s-4.045 2.4759-6.7628 2.4759c-2.6289 0-4.826-0.83787-6.5913-2.5136s-2.648-3.7688-2.648-6.2793c0-2.5356 0.89218-4.6475 2.6765-6.3358 1.7844-1.6883 4.0227-2.5324 6.7152-2.5324zm-0.1905 3.0879c-1.6637 0-3.029 0.53975-4.0958 1.6192-1.0668 1.0795-1.6002 2.454-1.6002 4.1234 0 1.6569 0.5461 3.0094 1.6383 4.0575 1.0922 1.0481 2.4956 1.5722 4.2101 1.5722 1.7018 0 3.0956-0.53033 4.1815-1.591 1.0859-1.0607 1.6288-2.4195 1.6288-4.0764 0-1.6444-0.56515-3.0063-1.6955-4.0858-1.1303-1.0795-2.5527-1.6192-4.2672-1.6192z" />
            <path d="m62.046 5.1213v12.577h-3.4862v-9.6402c0-1.9205-0.26035-3.2605-0.78105-4.0199-0.5207-0.75941-1.4288-1.1391-2.7242-1.1391-0.7239 0-1.3875 0.16318-1.9907 0.48954s-1.2922 0.90377-2.0669 1.7322v12.577h-3.4671v-17.322h3.4671v2.2782c1.7653-1.7448 3.4925-2.6172 5.1816-2.6172 2.2225 0 3.9434 1.0418 5.1626 3.1255 1.8542-2.1088 3.791-3.1632 5.8103-3.1632 1.7018 0 3.102 0.61506 4.2005 1.8452 1.0986 1.2301 1.6478 3.1067 1.6478 5.6297v10.224h-3.4671v-10.262c0-1.4435-0.29845-2.5481-0.89535-3.3138-0.5969-0.76569-1.4542-1.1485-2.5718-1.1485-1.4351 0-2.775 0.71548-4.0196 2.1464z" />
          </g>
        </g>
      </g>
    </svg>
  );
  // return (
  //   <svg
  //     fill="none"
  //     style={{
  //       position: "absolute",
  //       top: "0",
  //       width: "100%",
  //       height: "100%",
  //     }}
  //     viewBox="0 0 198 73"
  //     xmlns="http://www.w3.org/2000/svg"
  //   >
  //     <g filter="url(#a)">
  //       <path
  //         d="m3.0051 3.4298 12.871-0.0214c3.5234-0.00586 5.8968 0.19956 8.1991 1.0332 4.6767 1.6672 8.2783 5.4298 8.288 11.292 0.0067 4.0478-1.8567 7.7497-7.4617 10.062 7.193 1.314 11.731 6.1219 11.741 12.194 0.0129 7.7465-6.5971 11.038-9.5436 12.02-2.8747 0.9819-5.1757 0.9857-10.425 0.9944l-13.59 0.0226-0.07914-47.596 2.2e-4 -1.1e-4zm11.659 6.0522-4.6739 0.00777 0.02382 14.307 4.6739-0.0077c1.7977-3e-3 4.8894-0.1477 6.6136-1.1277 1.365-0.7001 3.8066-2.5885 3.8004-6.3571-0.0044-2.6521-1.3026-4.9529-3.4614-5.9264-2.0149-0.90395-4.8911-0.89916-6.9766-0.8957l2e-4 1.1e-4zm1.9755 20.445-6.6154 0.011 0.025 15.005 6.9751-0.0116c2.0134-0.0033 5.465-0.0091 7.2615-0.7099 3.5931-1.332 5.0981-4.3355 5.094-6.8478-0.0034-2.0238-1.0151-5.0232-4.6848-6.4826-1.8708-0.7646-4.2442-0.97-8.0552-0.9637h-2e-4z"
  //         fill="#4285F2"
  //       />
  //       <path
  //         d="m43.442 6.5356c2.2141-0.00368 3.9143 1.6725 3.9175 3.6313 0.0033 1.9588-1.7651 3.7108-3.9053 3.7144-2.5093 0.0041-3.8415-2.1623-3.8441-3.7015-0.0029-1.749 1.6177-3.6405 3.8319-3.6442zm3.3432 13.217 0.0522 31.411-6.5684 0.0109-0.0523-31.411 6.5685-0.0109z"
  //         fill="#EB4137"
  //       />
  //       <path
  //         d="m62.18 12.428 0.0108 6.4983 10.036-0.0167 0.0093 5.5899-10.036 0.0167 0.0228 13.695c0.0772 3.9127 0.149 4.6112 1.1403 5.7276 1.2035 1.2557 2.7584 1.323 3.3945 1.3219 1.2721-0.0021 3.6747-0.1458 7.1343-2.2478l0.0096 5.7995c-2.9655 1.6121-6.2864 2.1067-8.1239 2.1098-2.1909 0.0036-6.0793-0.8983-8.2754-3.9691-1.5586-2.3032-1.5642-5.6572-1.569-8.522l-0.0231-13.905-5.5124 0.0091-1e-3 -0.6288 11.783-11.479v1e-4z"
  //         fill="#FBBD06"
  //       />
  //       <path
  //         d="m83.209 3.2965 0.0303 18.227c1.0724-0.7583 4.0751-2.8268 8.8709-2.8347 8.5887-0.0143 13.826 7.0614 13.841 15.728 0.018 10.867-7.7747 16.452-16.579 16.466-4.0798 0.0067-9.3781-0.9474-12.458-2.3866l-0.0751-45.189 6.3704-0.01059h-2e-4zm0.04 24.073 0.0278 16.714c2.5779 0.7523 5.6561 0.9535 6.7298 0.9517 3.7935-0.0063 9.5153-2.6294 9.5025-10.333-0.0115-6.9469-4.4551-10.378-9.036-10.371-3.579 6e-3 -5.9378 1.9358-7.2243 3.0383l2e-4 2e-4z"
  //         fill="#4285F2"
  //       />
  //       <path
  //         d="m136.54 45.361 7e-3 3.816c-2.931 1.9128-4.147 2.4802-6.151 2.4835-2.791 0.0047-4.296-0.9822-4.872-3.2424-2.787 2.1951-5.72 3.26-8.654 3.2649-4.724 0.0079-7.879-3.6613-7.886-7.7599-0.01-6.289 5.784-8.2065 10.934-10.052l5.65-1.988-3e-3 -1.6959c-6e-3 -3.9573-1.941-5.5793-5.806-5.5729-3.507 0.0059-7.082 1.6371-10.154 5.2459l-0.011-6.8544c2.5-2.9014 6.004-4.3205 10.656-4.3283 6.513-0.0108 11.671 3.2311 11.683 10.439l0.027 16.323c2e-3 1.2013 0.432 1.6246 1.22 1.6233 0.644-0.0011 1.931-0.6392 3.36-1.7016v1e-4zm-10.951-0.7591-0.015-9.2569c-5.436 1.8463-10.157 3.6913-10.15 7.4366 4e-3 2.6146 1.939 4.4486 4.587 4.4442 2.004-0.0033 3.863-0.9957 5.578-2.6239z"
  //         fill="#34A853"
  //       />
  //       <path
  //         d="m139.51 20.123 6.133-0.0102 0.012 7.231c1.993-3.1625 4.879-7.871 9.221-7.8783 0.895-0.0014 3.652 0.0642 7.241 3.5685l-3.23 5.4813c-0.759-0.771-3.519-3.0833-5.931-3.0793-2.274 0.0038-7.3 2.5396-7.288 9.7004l0.027 16.498-6.133 0.0102-0.052-31.521v-4e-4z"
  //         fill="#EB4237"
  //       />
  //       <path
  //         d="m192.03 19.404 8e-3 4.8368-6.538 0.0109c2.491 2.4493 3.347 4.2003 3.351 6.864 5e-3 2.5936-1.483 5.6103-2.973 7.0847-4.257 4.4934-12.931 2.2646-12.925 5.9797 3e-3 1.7524 3.345 2.7984 9.744 4.0493 6.825 1.3205 9.247 4.7513 9.254 8.7468 0.01 6.2387-5.598 10.033-15.051 10.049-8.599 0.0143-14.718-3.9711-14.727-9.5087-8e-3 -4.6264 2.475-7.3644 8.016-8.7055-2.205-1.3282-3.202-2.5883-3.204-3.9902-4e-3 -2.0328 1.983-3.7886 5.038-4.4947v-0.1402c-2.347-0.9774-4.126-2.3063-5.337-3.9867-1.14-1.6103-1.712-3.5721-1.715-5.8853-0.012-6.7292 5.312-10.874 13.912-10.888l13.148-0.0218-1e-3 1e-4zm-8.866 10.95c-5e-3 -3.0143-2.852-5.533-6.192-5.5274-3.483 0.0058-6.321 2.6042-6.316 5.6884 6e-3 3.4347 2.568 5.7437 6.406 5.7373 3.554-0.0059 6.108-2.4636 6.102-5.8983zm2.675 27.123c-7e-3 -3.9955-6.547-5.0362-10.456-5.0297-4.264 0.0071-7.246 1.9748-7.241 4.7787 5e-3 3.1544 3.135 4.8316 8.892 4.822 5.543-0.0092 8.81-1.697 8.805-4.571z"
  //         fill="#FBBD07"
  //       />
  //     </g>
  //     <defs>
  //       <filter
  //         id="a"
  //         x=".0048828"
  //         y=".25873"
  //         width="197.11"
  //         height="71.791"
  //         colorInterpolationFilters="sRGB"
  //         filterUnits="userSpaceOnUse"
  //       >
  //         <feFlood floodOpacity="0" result="BackgroundImageFix" />
  //         <feColorMatrix
  //           in="SourceAlpha"
  //           result="hardAlpha"
  //           values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
  //         />
  //         <feOffset dx="1" dy="1" />
  //         <feGaussianBlur stdDeviation="2" />
  //         <feColorMatrix values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.4 0" />
  //         <feBlend
  //           in2="BackgroundImageFix"
  //           result="effect1_dropShadow_243:11456"
  //         />
  //         <feBlend
  //           in="SourceGraphic"
  //           in2="effect1_dropShadow_243:11456"
  //           result="shape"
  //         />
  //       </filter>
  //     </defs>
  //   </svg>
  // );
}
